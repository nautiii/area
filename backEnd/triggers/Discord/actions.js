const axios = require('axios')
const base_url = 'https://discord.com/api'

function getCreationDate(id)
{
    return new Date((id / 4194304) + 1420070400000)
}

async function handleActions(action, user)
{
    let actionValue = []

    if (action.name = 'Server created')
        actionValue = await serverCreated(action, user)

    return actionValue
}

async function serverCreated(action, user)
{
    let url = base_url + "/users/@me/guilds"

    let responseData = {}
    let result = []

    const config = {
        headers: { Authorization: 'Bearer ' + user.discordProvider.authToken },
    };

    await axios.get(url, config).then((response) => {
        responseData = response.data
        let currentDate = new Date(Date.now() - (29 * 1000))
        let realDate = new Date(Date.now())

        responseData.forEach(server => {
            if (server.owner == true) {
                let creationDate = getCreationDate(server.id)

                if (creationDate > currentDate) {
                    if (action.param == 'Server name') {
                        result.push(server.name)
                    }
                }
            }
        });
    })
    .catch(error => {
        console.log(error)
    });

    return result
}

module.exports = {
    handleActions: handleActions,
    serverCreated: serverCreated,
}