const axios = require('axios')

async function handleActions(action, user)
{
    let actionValue = []

    if (action.name == 'Facebook likes') {
        actionValue = await facebookAction('https://graph.facebook.com/me/likes', user)
    }
    return actionValue
}

async function facebookAction(url, user)
{
    let res = {}
    let result = []

    const config = {
        headers: { Authorization: 'Bearer ' + user.facebookProvider.authToken },
    };

    await axios.get(url, config).then((reponse) => {
        res = reponse.data
    })
    .catch(error => {
        console.log(error)
    });

    let currentDate = new Date(Date.now() - (29 * 1000))

    res.data.map((elem) => {

        let elemDate = new Date(elem.created_time)

        if (elemDate >= currentDate) {
            result.push(elem.name)
        }
    })

    return result;
}

module.exports = {
    handleActions: handleActions,
    facebookAction: facebookAction
}