<template>
  <div>
    <v-app-bar
      :color="backgroundColor"
      flat
      height="85"
      :clipped-left="true"
      app
    >
      <v-row class="ma-0 pa-0" no-gutters>
        <v-img
          v-if="logoPath"
          :src="logoPath"
          class="ma-3"
          max-height="48"
          max-width="48"
        />
        <p class="ma-4 app-title" :style="{ color: titleColor }">
          {{ title }}
        </p>
      </v-row>
      <v-row v-if="log && loggedIn == false" class="ma-0 pa-0" justify="end">
        <v-menu
          open-on-hover
          offset-y
          nudge-left="5"
          nudge-bottom="1"
          open-delay="50"
          close-delay="50"
          transition="slide-y-transition"
          :close-on-content-click="false"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              class="login-button"
              width="90"
              :color="loginButtonColor"
              light
              v-bind="attrs"
              v-on="on"
            >
              Login
            </v-btn>
          </template>
          <v-card class="login-card pa-3" width="400">
            <v-row class="pa-3" justify="center">
              <h3>Login</h3>
            </v-row>
            <v-divider />
            <v-text-field
              v-model="loginForm.username"
              color="purple darken-2"
              label="Username"
              required
            />
            <v-text-field
              v-model="loginForm.password"
              color="purple darken-2"
              label="Password"
              required
            />
            <v-row class="pa-3" justify="center">
              <v-btn @click="confirmLogin"> Confirm </v-btn>
            </v-row>
          </v-card>
        </v-menu>
        <v-menu
          open-on-hover
          offset-y
          nudge-left="5"
          nudge-bottom="1"
          open-delay="50"
          close-delay="50"
          transition="slide-y-transition"
          :close-on-content-click="false"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              class="signup-button"
              width="90"
              :color="signupButtonColor"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Sign up
            </v-btn>
          </template>
          <v-card class="signup-card pa-3" width="400">
            <v-row class="pa-3" justify="center">
              <h3>Sign up</h3>
            </v-row>
            <v-divider />
            <v-text-field
              v-model="signupForm.username"
              color="purple darken-2"
              label="Username"
              required
            />
            <v-text-field
              v-model="signupForm.email"
              color="purple darken-2"
              label="Email"
              required
            />
            <v-text-field
              v-model="signupForm.password"
              color="purple darken-2"
              label="Password"
              required
            />
            <v-row class="pa-3" justify="center">
              <v-btn @click="confirmSignUp"> Confirm </v-btn>
            </v-row>
          </v-card>
        </v-menu>
      </v-row>
      <v-row v-if="log && loggedIn == true" class="ma-0 pa-0" justify="end">
        <v-avatar :color="signupButtonColor">
          <v-menu
            open-on-hover
            offset-y
            nudge-left="5"
            nudge-bottom="1"
            open-delay="50"
            close-delay="50"
            transition="slide-y-transition"
            :close-on-content-click="false"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                :color="loginButtonColor"
                light
                v-bind="attrs"
                v-on="on"
                icon
              >
                <v-icon dark> mdi-account-circle </v-icon>
              </v-btn>
            </template>
            <v-card class="pa-3">
              <v-row class="pa-3" justify="center">
                <h3>User</h3>
              </v-row>
              <v-divider />
              <h3>{{ this.$store.state.user.username }}</h3>
              <p>{{ this.$store.state.user.email }}</p>
              <v-row class="pa-3" justify="center">
                <v-btn @click="confirmLogout" width="90" color="#ff6961" dark>
                  Logout
                </v-btn>
              </v-row>
            </v-card>
          </v-menu>
        </v-avatar>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Header',

  props: {
    title: {
      type: String,
      required: true
    },
    titleColor: {
      type: String,
      default: '#FEFEE2',
      required: false
    },
    backgroundColor: {
      type: String,
      default: '#00A6FB',
      required: false
    },
    logoPath: {
      type: String,
      default: null,
      required: false
    },
    log: {
      type: Boolean,
      default: false,
      required: false
    },
    loginButtonColor: {
      type: String,
      default: '#e0e0e0',
      required: false
    },
    signupButtonColor: {
      type: String,
      default: '#7082b0',
      required: false
    }
  },

  data: () => ({
    loginForm: {
      username: '',
      password: ''
    },
    signupForm: {
      username: '',
      email: '',
      password: ''
    },
    loggedIn: false
  }),

  mounted() {
    let userData = JSON.parse(localStorage.getItem("api-user"))

    if (userData) {
      this.$store.commit('user/setUserData', userData)
      this.loggedIn = true
      this.$store.commit('user/setLogin', true)
    }
  },

  methods: {
    clearAuthForms() {
      this.loginForm.username = ''
      this.loginForm.password = ''
      this.signupForm.username = ''
      this.signupForm.password = ''
      this.signupForm.email = ''
    },

    async confirmLogin() {
      let responseData = {}
      const baseUrl = 'http://localhost:8080'
      const data = JSON.stringify({
        username: this.loginForm.username,
        password: this.loginForm.password
      })

      const config = {
        method: 'post',
        url: baseUrl + '/api/user/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
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
      if (responseData.success) {
        this.loggedIn = true
        this.clearAuthForms()
        const user = {
          username: responseData.username,
          email: responseData.email,
          accessToken: responseData.accessToken
        }

        console.log(responseData)

        this.$store.commit('user/setUserData', user)
        this.$store.commit('user/setLogin', true)
        localStorage.setItem("api-user", JSON.stringify(user))
      }
    },

    async confirmSignUp() {
      let responseData = {}
      const baseUrl = 'http://localhost:8080'
      const data = JSON.stringify({
        username: this.signupForm.username,
        password: this.signupForm.password,
        email: this.signupForm.email
      })

      const config = {
        method: 'post',
        url: baseUrl + '/api/user/register',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
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
      if (responseData.success) {
        this.loggedIn = true
        this.clearAuthForms()
        const user = {
          username: responseData.username,
          email: responseData.email,
          accessToken: responseData.accessToken
        }
        console.log(responseData)

        this.$store.commit('user/setUserData', user)
        this.$store.commit('user/setLogin', true)
        localStorage.setItem("api-user", JSON.stringify(user))
      }
    },

    confirmLogout() {
      if (this.loggedIn) this.loggedIn = false
      this.$store.commit('user/setLogin', false)
      localStorage.removeItem("api-user")
    }
  }
}
</script>

<style lang="css" scoped>
.app-title {
  font-size: 28px;
}

.signup-button {
  margin-left: 15px;
}
</style>
