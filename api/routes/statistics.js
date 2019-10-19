const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Stats = require('../models/statistics');


//Register Route
router.post('/register', (req, res, next) => {
    Stats.find({ userId: req.body.userId })
        .exec()
        .then(stats => {
            if (stats.length >= 1) {
                return res.status(409).json({
                    message: 'User Details already exit'
                });

            } else {

                const stats = new Stats({
                    _id: new mongoose.Types.ObjectId(),
                    ProductionCapacity: req.body.ProductionCapacity,
                    userId: req.body.userId
                });

                stats.save()
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
    Stats.find({ userId: id })
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
    Stats.find({})
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