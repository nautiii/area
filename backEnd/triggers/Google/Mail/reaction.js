const axios = require('axios')
//const { gmail } = require('googleapis/build/src/apis/gmail')
const { google } = require('googleapis')
const base64url = require('base64url')

async function handleReactions(action, reaction, user, actionValue)
{
    actionValue = await sendMessage(action, reaction, user, actionValue)
}

async function createMessage(action, actionValue)
{
    let message = null;
    if (action.service == "Google Drive" && action.name == "File created" && action.param == "File name")
        message = "New file '" + actionValue + "' created on Google Drive"
    if (action.service == "Google Calendar" && action.name == "Event created" && action.param == "Event time slot") {
        let parsed = actionValue.split('/')
        message = "New event instantiated between '" + parsed[0] + "' and '" + parsed[1] + "' created on Google Calendar"
    }
    if (action.service == "Discord" && action.name == "Server created" && action.param == "Server name")
        message = "New server '" + actionValue + "' created on Discord"
    if (action.service == "Discord" && action.name == "Server joined" && action.param == "Server name")
        message = "New server '" + actionValue + "' joined on Discord"
    if (action.service == "Spotify" && action.name == "Track added" && action.param == "Track name")
        message = "New track '" + actionValue + "' added to your playlist " + action.input
    if (action.service == "Github" && action.name == "New commit" && action.param == "Commit author")
        message = "New commit has been made by '" + actionValue + "'"
    if (action.service == "Github" && action.name == "New commit" && action.param == "Commit message")
        message = "New commit '" + actionValue + "' has been made"
    if (action.service == "Github" && action.name == "New pull request" && action.param == "Pull request title")
        message = "New pull request '" + actionValue + "' has been made"
    if (action.service == "Github" && action.name == "New pull request" && action.param == "Pull request author")
        message = "New pull request has been made by '" + actionValue + "'"
    if (action.service == "Github" && action.name == "New Fork" && action.param == "Fork name")
        message = "New fork has been made by '" + actionValue + "'"
    if (action.service == "Facebook")
        message = "You like a new page named '" + actionValue + "'"
    return message
}

async function sendMessage(action, reaction, user, actionValues)
{
    const gmailAuth = new google.auth.OAuth2();
    gmailAuth.setCredentials({ access_token: user.googleProvider.authToken })
    google.gmail({version : 'v1', auth: user.googleProvider.authToken});
    let gmail = null

    try {
        gmail = await google.gmail({ version: 'v1', auth: gmailAuth });
    }
    catch (error) {
        console.log(error)
    }
    try {
        await Promise.all(actionValues.map(async (actionValue) => {
            let message = await createMessage(action, actionValue)
            let email = "From: <me>\n" + "To: <" + reaction.input + ">\n" +"Subject: AREA MAIL\n\n" + message + "\n";
            var base64EncodedEmail = base64url.encode(email);
            gmail.users.messages.send({
            'userId': "me",
            'resource' : {
                'raw': base64EncodedEmail
            }
            });
        }))
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    handleReactions: handleReactions
}