const mongoose = require('mongoose');
const AreaService = require('./Action').schema;
const googleService = require('./Google').schema;
const githubService = require('./Github').schema;
const spotifyService = require('./Spotify').schema;
const discordService = require('./Discord').schema;
const facebookService = require('./Facebook').schema;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    googleProvider: {
        type: googleService,
        default: ({})
    },
    githubProvider: {
        type: githubService,
        default: ({})
    },
    discordProvider: {
        type: discordService,
        default: ({})
    },
    facebookProvider: {
        type: facebookService,
        default: ({})
    },
    spotifyProvider: {
        type: spotifyService,
        default: ({})
    },
    actions: {
        type: [AreaService],
        default: ([])
    }

})

module.exports = mongoose.model('User', UserSchema);