const mongoose = require('mongoose');

const discordService = mongoose.Schema({
    name: {
     type: String,
     default: 'Discord',
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

module.exports = mongoose.model('discordService', discordService, 'discordService');