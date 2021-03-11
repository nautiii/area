const mongoose = require('mongoose');

const githubBranches = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    branchesNames: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('githubBranches', githubBranches, 'githubBranches');
