const axios = require('axios')
const base_url = 'https://api.spotify.com/v1'


async function handleActions(action, user)
{
    let actionValue = []

    if (action.name = 'Track added')
        actionValue = await trackAddedToPlaylist(action, user)

    return actionValue
}

async function getUserPlaylists(token)
{
    let url = base_url + "/me/playlists"
    let responseData = {}

    const config = {
        headers: { Authorization: 'Bearer ' + token },
    };

    await axios.get(url, config).then((response) => {
        responseData = response.data
    })
    .catch(error => {
        console.log(error)
    });

    return responseData
}

async function getUserPlaylistByName(token, playlistName)
{
    let userPlaylists = await getUserPlaylists(token)
    let result = null

    userPlaylists.items.forEach(playlist => {
        if (playlist.name == playlistName) {
            result = playlist
        }
    });

    return result
}

async function trackAddedToPlaylist(action, user)
{
    let playlist = await getUserPlaylistByName(user.spotifyProvider.authToken, action.input)
    let url = base_url + "/playlists/" + playlist.id + "/tracks?fields=items(added_at,added_by.id, track.name)"
    let responseData = {}
    let result = []

    const config = {
        headers: { Authorization: 'Bearer ' + user.spotifyProvider.authToken },
    };

    await axios.get(url, config).then((response) => {
        responseData = response.data
    })
    .catch(error => {
        console.log(error)
    });
    let reversedTracks = responseData.items.reverse()
    let currentDate = new Date(Date.now() - (29 * 1000))

    reversedTracks.forEach(trackData => {
        let addedDate = new Date(trackData.added_at)

        if (addedDate >= currentDate) {
            if (action.param == 'Track name')
                result.push(trackData.track.name)
        }
        else
            return

    })

    console.log(result)

    return result
}

module.exports = {
    handleActions: handleActions,
    trackAddedToPlaylist: trackAddedToPlaylist,
}