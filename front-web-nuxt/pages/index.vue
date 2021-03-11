<template>
  <div v-if="$store.state.user.isLogin">
    <v-row class="service-row ma-5" width="100%">
      <service-auth
        serviceTitle="Google"
        serviceLogo="/image/google_logo.png"
        :loginFunction="signInGoogle"
        :logoutFunction="signOutGoogle"
        cookieName="google-token"
      ></service-auth>
      <service-auth
        serviceTitle="Facebook"
        serviceLogo="/image/facebook_logo.png"
        :loginFunction="signInFacebook"
        :logoutFunction="signOutFacebook"
        cookieName="facebook-token"
      ></service-auth>
      <service-auth
        serviceTitle="Github"
        serviceLogo="/image/github_logo.png"
        :loginFunction="signInGithub"
        :logoutFunction="signOutGithub"
        cookieName="github-token"
      ></service-auth>
      <service-auth
        serviceTitle="Discord"
        serviceLogo="/image/discord_logo.png"
        :loginFunction="signInDiscord"
        :logoutFunction="signOutDiscord"
        cookieName="discord-token"
      ></service-auth>
      <service-auth
        serviceTitle="Spotify"
        serviceLogo="/image/spotify_logo.png"
        :loginFunction="signInSpotify"
        :logoutFunction="signOutSpotify"
        cookieName="spotify-token"
      ></service-auth>
    </v-row>
  </div>
</template>

<script>
import ServiceAuth from '~/components/ServiceAuth'
import axios from 'axios'

export default {
  components: {
    ServiceAuth
  },

  auth: 'guest',

  methods: {
    async signInGoogle() {
      let googlerUser

      await this.$gAuth.signIn(function (user) {
        googlerUser = user
      })

      console.log(googlerUser)
      this.setGoogleToken(googlerUser)
    },

    async setGoogleToken(googleUser) {
      let responseData = {}
      const baseUrl = 'http://localhost:8080'
      const data = JSON.stringify({
        token: googleUser.uc.access_token
      })

      const config = {
        method: 'patch',
        url: baseUrl + '/api/google/register',
        headers: {
          'Content-Type': 'application/json',
          'access-token': this.$store.state.user.accessToken
        },
        data: data
      }

      let expireDate = new Date();
      expireDate.setSeconds(expireDate.getSeconds() + 3600);


      let tokenObject = { token: googleUser.uc.access_token, expires_at: expireDate}

      localStorage.setItem("google-token", JSON.stringify(tokenObject))

      await axios(config)
        .then(function (response) {
          console.log(response)
          responseData = response.data
        })
        .catch(function (error) {
          console.log(error.response)
          responseData = error.response
        })
      if (responseData.success) {
        console.log(responseData)
        return true
      }
      else
        return false
    },

    async signOutGoogle() {
      await this.$gAuth.signOut()
      localStorage.removeItem('google-token')
    },

    async signInFacebook() {
      await this.$auth.loginWith('facebook')
    },

    async signOutFacebook() {
      localStorage.removeItem('facebook-token')
    },

    async signInGithub() {
      window.open("https://github.com/login?client_id=0360b42df58644e440de&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D0360b42df58644e440de%26code_challenge_method%3Dimplicit%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8081%252FcallbackGithub%26response_type%3Dcode%26scope%3Duser%2Bemail%26state%3D8u06XMZzdK",
      "", "width=500,height=700");
    },

    async signOutGithub() {
      localStorage.removeItem('github-token')
    },

    async signInDiscord() {
      window.open("https://discord.com/api/oauth2/authorize?client_id=811583547752185857&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2FcallbackDiscord&response_type=code&scope=identify%20email%20connections%20guilds%20bot&permissions=2048",
      "", "width=500,height=700");
    },

    async signOutDiscord() {
      localStorage.removeItem('discord-token')
    },

    async signInSpotify() {
      window.open("https://accounts.spotify.com/authorize?client_id=35109c16a1ed4b79b477b68ed36679a0&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2FcallbackSpotify&scope=user-read-private%20user-library-read%20playlist-read-private%20user-read-currently-playing",
      "", "width=500,height=700");
    },

    async signOutSpotify() {
      localStorage.removeItem('spotify-token')
    },

    getTokens() {
      console.log(this.$auth.$storage.getCookies())
    }
  }
}
</script>

<style lang="css" scoped>
.service-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
