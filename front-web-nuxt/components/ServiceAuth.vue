<template>
  <div>
    <v-card class="pa-3 ma-3" width="200">
      <v-row justify="center">
        <v-card-title>{{ serviceTitle }}</v-card-title>
      </v-row>
      <v-divider></v-divider>
      <v-col>
        <v-row class="pa-3" justify="center">
          <v-img
            :src="serviceLogo"
            max-height="48"
            max-width="48"
          />
        </v-row>
        <v-row justify="center">
          <v-btn v-if="!loggedIn" @click="login">Login</v-btn>
          <v-btn v-else color="error" @click="logout">Logout</v-btn>
        </v-row>
      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    loggedIn: false
  }),

  mounted() {
    if (this.getTokenData() == false)
      this.loggedIn = false
    else {
      this.loggedIn = true;
    }
  },

  props: {
    serviceTitle: {
      type: String,
      required: true
    },
    serviceLogo: {
      type: String,
      required: true
    },
    loginFunction: {
      type: Function,
      required: true
    },
    logoutFunction: {
      type: Function,
      required: true
    },
    cookieName: {
      type: String,
      required: true
    }
  },

  methods: {
    async login() {
      await this.loginFunction()

      this.loggedIn = true
    },

    async logout() {
      await this.logoutFunction();
      this.loggedIn = false
    },

    getTokenData() {
      let tokenData = JSON.parse(localStorage.getItem(this.cookieName))

      if (tokenData) {
        let currentDate = new Date()
        let expireDate = new Date(tokenData.expires_at)

        if (currentDate > expireDate)
          return false
        else
          return true
      }
      else
        return false
    }
  }
}
</script>

<style lang="css" scoped>
</style>