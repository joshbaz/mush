const express = require('express');

const app = express();

const morgan = require('morgan');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://jkimbareeba:' + process.env.MONGO_ATLAS_PW + '@akilidb-ovu0c.mongodb.net/akili?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//creating headers to allow access transmission of data from server to the client
app.use((req, res, next) => {
    //on the * , there can be a link to the actual website.
    res.header('Access-Control-Allow-Origin', '*');
    //this is for which kind of headers we want to accept
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    //checks the incoming method request (method giving us access to the http request)
    //the browser will always send an Option request
    //cannot be avoided
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/user', userRoutes);
//error handling on the request thus a 404 error
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

//error handling especially on failure of operations
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;