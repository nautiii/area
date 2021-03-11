const {google} = require('googleapis')
const axios = require('axios')
const base_url = 'https://www.googleapis.com/drive/v3'

async function handleReactions(reaction, user, actionValues)
{
    if (reaction.name = 'Create file')
        await createFile(reaction, user, actionValues)
}

async function createFile(reaction, user, actionValues)
{
    const driveAuth = new google.auth.OAuth2()
    driveAuth.setCredentials({ access_token: user.googleProvider.authToken })
    let drive = null

    try {
        drive = await google.drive({ version: 'v3', auth: driveAuth });
    }
    catch(error) {
        console.log(error)
    }

    await Promise.all(actionValues.map(async (actionValue) => {
        let filename = "[AREA]"

        if (reaction.param == 'File name')
            filename = filename + ' - ' + actionValue
        if (actionValue == filename)
            return

        var fileMetadata = {
            'name': filename
        };

        var media = {
            mimeType: 'application/vnd.google-apps.document',
        };

        try {
            await drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id'
            })
        }
        catch(error) {
            console.log(error)
        }
    }));
}

module.exports = {
    handleReactions: handleReactions,
    createFile: createFile
}