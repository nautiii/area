const axios = require('axios')
const base_url = 'https://www.googleapis.com/drive/v3'

async function handleActions(action, user)
{
    let actionValue = []

    if (action.name = 'File created')
        actionValue = await fileCreated(action, user)

    return actionValue
}

async function fileCreated(action, user)
{
    let url = base_url + "/files?orderBy=createdTime desc&key=" + process.env.GOOGLE_API_KEY + "&fields=files(name, createdTime)";
    let responseData = {}
    let result = []

    const config = {
        headers: { Authorization: 'Bearer ' + user.googleProvider.authToken },
    };

    await axios.get(url, config).then((response) => {
        responseData = response.data
        let currentDate = new Date(Date.now() - (29 * 1000))

        if (responseData.files.length > 0) {
            responseData.files.forEach(file => {
                let fileCreatedTime = new Date(file.createdTime)

                if (fileCreatedTime >= currentDate && file.name.startsWith('[AREA]') == false) {
                    if (action.param == 'File name')
                        result.push(file.name)
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
    fileCreated: fileCreated
}
