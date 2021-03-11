const axios = require('axios')
const {reformatDateString} = require('../../../utils/dateReformat')

async function handleReactions(reaction, user, actionValues)
{
    if (reaction.name == 'Create event') {
        await createEvent(reaction, user, actionValues)
    }
}

async function createEvent(reaction, user, actionValues)
{
    let base_url = "https://www.googleapis.com/calendar/v3/calendars/primary/events?key="
    let url = base_url + process.env.GOOGLE_API_KEY;

    let config = {
        method: 'post',
        headers: { 'Authorization': 'Bearer ' + user.googleProvider.authToken },
        url: url,
        data: {}
    };
    try {
        await Promise.all(actionValues.map(async (actionValue) => {
            if (reaction.param == 'Event name') {
                let dateStart = new Date();
                let dateEnd =  new Date(dateStart.getTime() + 15*60000);

                console.log("END", reformatDateString(dateEnd))
                console.log("START", reformatDateString(dateStart))
                config.data = {
                    "end": {
                        "dateTime": reformatDateString(dateEnd)
                    },
                    "start": {
                        "dateTime": reformatDateString(dateStart)
                    },
                    "summary": "[AREA] " + actionValue
                }
                const result = await axios(config)
            }
            else if (reaction.param == 'Description content') {
                let dateStart = new Date();
                let dateEnd =  new Date(dateStart.getTime() + 15*60000);

                config.data = {
                    "summary": "[AREA]",
                    "end": {
                        "dateTime": reformatDateString(dateEnd)
                      },
                      "start": {
                        "dateTime": reformatDateString(dateStart)
                      },
                    "description": actionValue
                }
                const result = await axios(config)
            }
        }))


    } catch(err) {
    }
    return false;
}

module.exports = {
    handleReactions: handleReactions,
    createEvent: createEvent
}
