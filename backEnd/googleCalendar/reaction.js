const axios = require('axios')

async function newCalendar(token, calendarName) {
    const {summary, start, end} = dataContent;
    let base_url = "https://www.googleapis.com/calendar/v3/calendars"
    let url = base_url + "/?calendarId=primary/events";
    try {
        await axios({
            method: 'post',
            url: url,
            headers: {"Authorization": 'Bearer ' + token},
            data: {
                summary: calendarName
            }
        })
    }catch(err) {console.log({message: "Token outdated"});}
}

module.exports = { newCalendar };