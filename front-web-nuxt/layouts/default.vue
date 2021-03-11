<template>
  <v-app>
    <Header
      title="Area"
      title-color="#F8F9F9"
      background-color="#485679"
      logo-path="/image/area_logo.png"
      :log="true"
      login-button-color="#e0e0e0"
      signup-button-color="#7082b0"
    />
    <Sidebar :items="items" background-color="#363636" text-color="#F8F9F9" />
    <v-main>
      <div class="layout-div">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from '~/components/app/Header'
import Sidebar from '~/components/app/Sidebar'

export default {
  components: {
    Header,
    Sidebar
  },

  data () {
    return {
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Your actions',
          to: '/actions'
        },
        {
          icon: 'mdi-download',
          title: 'APK',
          to: '/apk'
        },
        {
          icon: 'mdi-information',
          title: 'About',
          to: '/about'
        }
      ]
    }
  },
}
</script>

<style lang="css" scoped>

.layout-div {
  width: 100%;
  height: 100%;
}

</style>
