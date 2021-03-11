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
      client_id: '35109c16a1ed4b79b477b68ed36679a0',
      client_secret: 'fbae154e05984131a8e284dcebe5616c',
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:8081/callbackSpotify'
    }

    const config = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: formUrlEncode(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    await axios(config)
      .then(function (response) {
        responseData = response.data
      })
      .catch(function (error) {
        console.log(error.response)
      })
    console.log(responseData)

    let expireDate = new Date()
    expireDate.setSeconds(expireDate.getSeconds() + 3600)

    let tokenObject = {
      token: responseData.access_token,
      expires_at: expireDate
    }

    localStorage.setItem('spotify-token', JSON.stringify(tokenObject))

    await this.setSpotifyAuthCode(responseData.access_token)

    window.close()
  },

  methods: {
    async setSpotifyAuthCode(spotifyAuthCode) {
      let userData = JSON.parse(localStorage.getItem("api-user"))

      let responseData = {}

      const data = JSON.stringify({
        token: spotifyAuthCode
      })

      const config = {
        method: 'patch',
        url: 'http://localhost:8080/api/spotify/register',
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