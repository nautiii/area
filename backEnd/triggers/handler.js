const User = require('../models/User');

// GOOGLE
const GoogleDriveActions = require('./Google/Drive/actions.js')
const GoogleDriveReactions = require('./Google/Drive/reactions.js')
const GoogleCalendarActions = require('./Google/Calendar/actions.js')
const GoogleCalendarReactions = require('./Google/Calendar/reactions.js')
const GoogleMailReactions = require('./Google/Mail/reaction.js')

// DISCORD
const DiscordActions = require('./Discord/actions.js')
const DiscordReactions = require('./Discord/reactions.js')
// GITHUB
const GithubActions = require('./Github/actions.js');

//FACEBOOK
const FacebookActions = require('./Facebook/action.js');

// SPOTIFY
const SpotifyActions = require('./Spotify/actions.js')

async function handleTriggers()
{
    try {
        const users = await User.find()
        for (const user of users) {
            if (user.actions.length && user.actions.length > 0) {
                await triggerUserArea(user);
            }
        }
    }
    catch(err){return}
}

async function triggerUserArea(user)
{
    const {actions} = user;

    try {
        await Promise.all(actions.map(async (action) => {
            let actionValues = await actionRouter(action.action, user)
            console.log("dev", actionValues)
            await reactionRouter(action.action, action.reaction, user, actionValues)
        }));
    }
    catch(err) {
        console.log(err)
    }
}

async function actionRouter(action, user)
{
    let res = []

    if (action.service == 'Google Drive')
        res = await GoogleDriveActions.handleActions(action, user)
    if (action.service == 'Google Calendar')
        res = await GoogleCalendarActions.handleActions(action, user)
    if (action.service == 'Discord')
        res = await DiscordActions.handleActions(action, user)
    if (action.service == 'Spotify')
        res = await SpotifyActions.handleActions(action, user)
    if (action.service == 'Github')
        res = await GithubActions.handleActions(action, user)
    if (action.service == 'Facebook')
        res = await FacebookActions.handleActions(action, user)
    return res
}

async function reactionRouter(action, reaction, user, actionValues)
{
    if (reaction.service == 'Google Drive')
        await GoogleDriveReactions.handleReactions(reaction, user, actionValues)
    if (reaction.service == 'Google Calendar')
        await GoogleCalendarReactions.handleReactions(reaction, user, actionValues)
    if (reaction.service == 'Discord')
        await DiscordReactions.handleReactions(action, reaction, user, actionValues)
    if (reaction.service == 'Google Mail')
        await GoogleMailReactions.handleReactions(action, reaction, user, actionValues)
}

module.exports = { handleTriggers };