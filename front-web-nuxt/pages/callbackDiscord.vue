<template></template>

<script>
import axios from 'axios'

const formUrlEncode = (data) => {
  return Object.entries(data)
    .map(([k, v]) => k + '=' + v)
    .join('&')
}

export default {
  layout: 'empty',

  async mounted() {
    let url = new URL(window.location.href)

    let code = url.searchParams.get('code')

    let responseData = {}
    const data = {
      client_id: '811583547752185857',
      client_secret: 'Xc3uRBHEUFCPINClaVTi_DYBHFehuKMH',
      grant_type: 'authorization_code',
      code: code,
      scope: 'identify guilds email',
      redirect_uri: 'http://localhost:8081/callbackDiscord'
    }

    const config = {
      method: 'post',
      url: 'https://discord.com/api/oauth2/token',
      data: formUrlEncode(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    await axios(config)
      .then(function (response) {
        console.log(response)
        responseData = response.data
      })
      .catch(function (error) {
        console.log(error.response)
        responseData = error.response
      })
    console.log(responseData)

    let expireDate = new Date()
    expireDate.setSeconds(expireDate.getSeconds() + responseData.expires_in)

    let tokenObject = {
      token: responseData.access_token,
      expires_at: expireDate
    }

    localStorage.setItem('discord-token', JSON.stringify(tokenObject))

    await this.setDiscordToken(responseData.access_token)

    window.close()
  },

  methods: {
    async setDiscordToken(discordToken) {
      let userData = JSON.parse(localStorage.getItem("api-user"))

      let responseData = {}
      const data = JSON.stringify({
        token: discordToken
      })

      const config = {
        method: 'patch',
        url: 'http://localhost:8080/api/discord/register',
        headers: {
          'Content-Type': 'application/json',
          'access-token': userData.accessToken
        },
        data: data
      }

      await axios(config)
        .then(function (response) {
          responseData = response.data
        })
        .catch(function (error) {
          console.log(error.response)
          responseData = error.response
        })
      if (responseData.success) {
        console.log(responseData)
      }
    }
  }
}
</script>

<style>
</style>