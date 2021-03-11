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

    let expireDate = new Date()
    expireDate.setSeconds(expireDate.getSeconds() + 3600)

    let tokenObject = {
      token: code,
      expires_at: expireDate
    }

    localStorage.setItem('github-token', JSON.stringify(tokenObject))

    await this.setGithubAuthCode(code)

    window.close()
  },

  methods: {
    async setGithubAuthCode(githubAuthCode) {
      let userData = JSON.parse(localStorage.getItem("api-user"))

      let responseData = {}

      const data = JSON.stringify({
        code: githubAuthCode
      })

      const config = {
        method: 'patch',
        url: 'http://localhost:8080/api/github/register',
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