const { model } = require('mongoose');
const {availableServices} = require('../utils')


function findAction(serviceIndex, keyName, inputedKey) {
    if (serviceIndex - 1 > availableServices.length) {
        console.log("size")
        return false;
    }
    for (let i = 0; i < availableServices[serviceIndex][keyName].length; i++) {
        if (availableServices[serviceIndex][keyName][i] == inputedKey)
            return true;
    }
    return false;
}

function findService(searchedService) {
    for (let i = 0; i < availableServices.length; i++) {
        if (availableServices[i].name === searchedService)
            return i
    }
    return -1
}

function actionVerifier(action) {
    console.log(action)
    let indexServiceAction = - 1;
    let indexServiceReaction = -1;
    if (!action.action || !action.serviceAction || !action.reaction || !action.serviceReaction) {
        return false;
    }
    if ((indexServiceAction = findService(action.serviceAction)) === -1|| (indexServiceReaction = findService(action.serviceReaction)) === - 1) {
        return false;
    }
    console.log(indexServiceAction)
    console.log(indexServiceReaction)
    if (!findAction(indexServiceAction, "actions", action.action) || !findAction(indexServiceReaction, "reactions", action.reaction)) {
        return false;
    }
    return true;
}

module.exports = { actionVerifier };