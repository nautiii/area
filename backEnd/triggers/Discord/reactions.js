const axios = require('axios')
const base_url = 'https://discord.com/api'
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.login("ODExNTgzNTQ3NzUyMTg1ODU3.YC0UFA.k5k7okG3PZT5lU_v3P3WqF7W6J0");

async function handleReactions(action, reaction, user, actionValues)
{
    if (reaction.name = 'Bot notification')
        await sendNotification(action, reaction, user, actionValues)
}

async function getDiscordUser(access_token)
{
    let url = base_url + "/users/@me"

    let responseData = {}

    const config = {
        headers: { Authorization: 'Bearer ' + access_token },
    };

    await axios.get(url, config).then((response) => {
        responseData = response.data
    })
    .catch(error => {
        console.log(error)
    });

    return responseData
}

async function sendNotification(action, reaction, user, actionValues)
{
    const discordUser = await getDiscordUser(user.discordProvider.authToken)
    try {
        bot.users.fetch(discordUser.id)
        .then(async (user) => {
            actionValues.map(async (actionValue) => {
                if (reaction.param == "Notification content") {
                    let message = null
                    if (action.service == "Google Drive" && action.name == "File created" && action.param == "File name")
                        message = "New file '" + actionValue + "' created on Google Drive"
                    if (action.service == "Google Calendar" && action.name == "Event created" && action.param == "Event time slot") {
                        let parsed = actionValue.split('/')
                        message = "New event instantiated between '" + parsed[0] + "' and '" + parsed[1] + "' created on Google Calendar"
                    }
                    if (action.service == "Google Calendar" && action.name == "Event created" && action.param == "Event name") {
                        message = "New event '" + actionValue + "' created on Google Calendar"
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
                    await user.send(message)
                }
            });
        })
        .catch( error => {
            console.log(error)
        })
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    handleReactions: handleReactions,
    sendNotification: sendNotification
}