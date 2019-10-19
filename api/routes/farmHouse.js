const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const FarmHouse = require('../models/farmHouse');


//Register Route
router.post('/register', (req, res, next) => {
    FarmHouse.find({ userId: req.body.userId })
        .exec()
        .then(farmHouse => {
            if (farmHouse.length >= 1) {
                return res.status(409).json({
                    message: 'User Details already exit'
                });

            } else {

                const farmHouse = new FarmHouse({
                    _id: new mongoose.Types.ObjectId(),
                    MushroomType: req.body.MushroomType,
                    GrowHouse: req.body.GrowHouse,
                    GrowTimes: req.body.GrowTimes,
                    userId: req.body.userId
                });

                farmHouse.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'successfully reqistered'

                        });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: err
                        });

                    });

            }
        });
}
);



router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    FarmHouse.find({ userId: id})
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});
router.get('/', (req, res, next) => {
    FarmHouse.find({})
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;