const mongoose = require('mongoose');

const farmSchema = mongoose.Schema({
    farmhouseID: mongoose.Schema.Types.ObjectId,
    MushroomType: {
        type: String,
        required: true
    },
    GrowHouse: {
        type: String,
        required: true
    },
    GrowTimes: {
        type: String
    },
   
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    }

});

module.exports = mongoose.model('farmHouse', farmSchema);