const mongoose = require('mongoose');

const statsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ProductionCapacity: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    }

});

module.exports = mongoose.model('stats', statsSchema);