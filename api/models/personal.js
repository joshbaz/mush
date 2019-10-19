const mongoose = require('mongoose');

const personalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mobile: {
        type:String
    },
    DOB: {
        type: String,
       
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    }

});

module.exports = mongoose.model('Personal', personalSchema);