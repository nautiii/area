const axios = require('axios')

async function handleActions(action, user)
{
    let actionValue = []


    if (action.name == 'Event created')
        actionValue = await eventCreated(action, user)
    return actionValue
}

async function getUserCalendar(calendarName, user)
{
    let responseData = []
    let result = null
    const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList`
    const config = {
        headers: { Authorization: 'Bearer ' + user.googleProvider.authToken },
    };

    await axios.get(url, config).then(response => {
        responseData = response.data.items
    })

    // console.log(responseData)
    responseData.map(calendar => {
        if (calendar.summary == calendarName)
            result = calendar
    });

    return result
}

async function eventCreated(action, user)
{
    let calendar = await getUserCalendar(action.input, user);
    if (calendar == null)
        return []

    let getInfos = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${user.googleProvider.authToken}`
    const profileInfos = await axios.get(getInfos)
    let url = `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events?orderBy=updated`
    let responseData = {}
    let result = []

    const config = {
        headers: { Authorization: 'Bearer ' + user.googleProvider.authToken },
    };

    await axios.get(url, config).then((response) => {
        responseData = response.data
        let currentDate = new Date(Date.now() - (29 * 1000))
        if (responseData.items.length > 0) {
            responseData.items.forEach(file => {
                let eventCreatedTime = new Date(file.updated)
                if (eventCreatedTime >= currentDate) {
                    if (action.param == 'Event name' && file.summary.startsWith('[AREA]') == false) {
                        result.push(file.summary)
                    }
                    if (action.param == 'Event time slot' && file.summary.startsWith('[AREA]') == false) {
                        let time1 = String(new Date(file.start.dateTime).toDateString() + ' ' + new Date(file.start.dateTime).toTimeString().slice(0, -41))
                        let time2 = String(new Date(file.end.dateTime).toDateString() + ' ' + new Date(file.end.dateTime).toTimeString().slice(0, -41))
                        result.push(String(time1 + '/' +  time2))
                    }
                }
            });
        }
    })
    .catch(error => {
        console.log(error)
    });
    return result;
}

module.exports = {
    handleActions: handleActions,
    eventCreated: eventCreated
}
