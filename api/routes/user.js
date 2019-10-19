const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Register Route
router.post('/register', (req, res, next) => {
    User.find({email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email already exits'
                });

            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: err
                        });
                        
                    } else {

                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });

                        user.save()
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
        });


});


//this router is for the login
router.post('/login', (req, res, next) => {
    //checks for the email 
    User.find({ email: req.body.email })
        .exec()
        .then(user => {

            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            //this is to compare the hashed passwords that have benn created
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                //checks for an error occurrence
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        _id: user[0]._id
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "24h"
                        },
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        email: user[0].email,
                        _id: user[0]._id
                    });
                }
                //if the response above is not achieved
                res.status(401).json({
                    message: 'Auth failed'
                });

            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


router.patch('/:_id', (req, res, next) => {
    const id = req.params._id;
    //delcaration of update operations.
    const updateOps = {};

    for (const ops of req.body) {
        UpdateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id },
        { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: err
            });
        });
})

//The delete route
router.delete('/:_id', (req, res, next) => {
    User.remove({ userId: req.params._id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'account deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/:_id', (req, res, next) => {
    const id = req.params._id;
    User.find({ _id: id })
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
    User.find({})
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

//router.post('/upload', parser.single('profile'), (req, res, next) => {
  //  console.log(req.file)
//});
module.exports = router;