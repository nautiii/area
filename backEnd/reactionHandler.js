const {newCalendar} = require("./googleCalendar/reaction");
const {createFileReaction} = require('./triggers/googleDrive')
// const actions = require("./models/actions");

function reactionHandler(token, data) {

    const {reaction, serviceReaction} = data;
    switch (serviceReaction)
    {
        case "Google Drive": {
            if (reaction == "Create File")
                return createFileReaction(token, serviceReaction);
        }
        case "Google Calendar": {
            if (reaction == "Create event")
                return newCalendar(token, {summary: serviceReaction});
            if (reaction == "Create calendar")
                return newCalendar(token, {summary: serviceReaction});
        }
        // case "Discord":
        // case "Gmail"
        default:
            console.log("DEFAULT")
            return;
    }
}

module.exports.reactionHandler = reactionHandler;