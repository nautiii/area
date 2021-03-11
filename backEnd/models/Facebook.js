const mongoose = require('mongoose');

const facebookService = mongoose.Schema({
    name: {
     type: String,
     default: 'Facebook',
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

module.exports = mongoose.model('facebookService', facebookService, 'facebookService');