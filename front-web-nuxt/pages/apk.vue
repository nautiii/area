<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-card class="pa-3" height="130">
        <h3>Download Area's application apk</h3>
        <v-divider />
        <v-row class="fill-height" justify="center" align="center">
          <v-btn color="blue" dark href="/app-release.apk" download>
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {

  methods: {}

}
</script>

<style lang="css" scoped>

</style>
