const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const googleSchema = mongoose.Schema({
    name: {
     type: String,
     default: 'Google',
    },
    authToken: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('googleService', googleSchema, 'googleService');