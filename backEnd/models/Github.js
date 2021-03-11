const mongoose = require('mongoose');
const GithubBranches = require('./GithubBranches').schema;

const githubService = mongoose.Schema({
    name: {
     type: String,
     default: 'Github',
    },
    authToken: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: false
    },
    repositories: {
        type: [GithubBranches],
        default: []
    }
})

module.exports = mongoose.model('githubService', githubService, 'githubService');