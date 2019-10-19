const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const Personal = require('../models/personal');
const multer = require('multer');

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: "dk1qehn2l",
    api_key: "171923673547221",
    api_secret: "Tsuf_KdVEMHIfT95k0Wm-10S694"
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "Profiles",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

//Register Route
router.post('/register', parser.single("profile"), (req, res, next) => {
    Personal.find({ userId: req.body.userId })
        .exec()
        .then(personal => {
            if (personal.length >= 1) {
                return res.status(409).json({
                    message: 'User Details already exit'
                });

            }  else {

                        const personal = new Personal({
                            _id: new mongoose.Types.ObjectId(),
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            mobile: req.body.mobile,
                            DOB: req.body.dob,
                            profile: req.file.url,
                            userId: req.body.userId
                        });

                        personal.save()
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
    Personal.find({ userId: id })
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
    Personal.find({})
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