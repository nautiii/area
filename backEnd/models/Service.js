const { string } = require('@hapi/joi');
const mongoose = require('mongoose');
const googleService = require('./Google').schema;

const AreaSchema = mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    action: {
        type: Object,
        required: true,
    },
    reaction: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('Area', AreaSchema, 'Area');
module.exports.availableServices = availableServices;