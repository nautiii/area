const mongoose = require('mongoose');

const spotifySchema = mongoose.Schema({
    name: {
     type: String,
     default: 'Spotify',
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

module.exports = mongoose.model('spotifyService', spotifySchema, 'spotifyService');