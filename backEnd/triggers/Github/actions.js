const axios = require('axios')
const base_url = 'https://api.github.com/'

async function handleActions(action, user)
{
    let actionValue = []

    if (action.name == 'New commit')
        actionValue = await projectCommits(action, user)
    if (action.name == 'New pull request')
        actionValue = await pullRequest(action, user)
    if (action.name == 'New Fork')
        actionValue = await newFork(action, user)
    return actionValue
}

async function newFork(action, user)
{
    let url = base_url
    let responseDataUsr = {}
    let res = {}
    let result = []

    const config = {
        headers: { Authorization: 'Bearer ' + user.githubProvider.authToken },
    };

    await axios.get(url, config).then((response) => {
    })
    .catch(error => {
        console.log(error)
    });
    await axios.get(url + "user", config).then((response) => {
        responseDataUsr = response.data
    })
    .catch(error => {
        console.log(error)
    });

    await axios.get(base_url + "repos/" + responseDataUsr.login + "/" + action.input + "/forks", config).then((response) => { //action.params.untruc
        res = response.data
    })
    .catch(error => {
        console.log(error)
    });

    let currentDate = new Date(Date.now() - (29 * 1000))

    res.map((elem) => {

        let elemDate = new Date(elem.created_at)
        
        if (elemDate >= currentDate) {
            if (action.param == 'Fork name')
                result.push(elem.owner.login)
        }
    })

    return result;
}

async function pullRequest(action, user)
{
    let url = base_url
    let responseDataUsr = {}
    let res = {}
    let result = []

    const config = {
        headers: { Authorization: 'Bearer ' + user.githubProvider.authToken },
    };

    await axios.get(url, config).then((response) => {
    })
    .catch(error => {
        console.log(error)
    });
    await axios.get(url + "user", config).then((response) => {
        responseDataUsr = response.data
    })
    .catch(error => {
        console.log(error)
    });

    await axios.get(base_url + "repos/" + responseDataUsr.login + "/" + action.input + "/pulls", config).then((response) => { //action.params.untruc
        res = response.data
    })
    .catch(error => {
        console.log(error)
    });

    let currentDate = new Date(Date.now() - (29 * 1000))

    res.map((elem) => {

        let elemDate = new Date(elem.created_at)
        
        if (elemDate >= currentDate) {
            if (action.param == 'Pull request title')
                result.push(elem.title)
            if (action.param == 'Pull request author')
                result.push(elem.user.login)
        }
    })

    return result;
}

async function projectCommits(action, user)
{
    let url = base_url
    let responseData = {}
    let responseDataUsr = {}
    let responseDataCommit = {}
    let result = []

    const config = {
        headers: { Authorization: 'Bearer ' + user.githubProvider.authToken },
    };

    await axios.get(url, config).then((response) => {
        responseData = response.data
    })
    .catch(error => {
        console.log(error)
    });
    await axios.get(url + "user", config).then((response) => {
        responseDataUsr = response.data
    })
    .catch(error => {
        console.log(error)
    });

    await axios.get(base_url + "repos/" + responseDataUsr.login + "/" + action.input + "/commits", config).then((response) => {
        responseDataCommit = response.data
    })
    .catch(error => {
        console.log(error)
    });

    let currentDate = new Date(Date.now() - (29 * 1000))

    responseDataCommit.map((elem) => {

        let elemDate = new Date(elem.commit.committer.date)

        if (elemDate >= currentDate) {
            if (action.param == 'Commit author')
                result.push(elem.commit.author.name)
            if (action.param == 'Commit message')
                result.push(elem.commit.message)
        }
    })
    return result;
}

module.exports = {
    handleActions: handleActions,
    projectCommits: projectCommits
}