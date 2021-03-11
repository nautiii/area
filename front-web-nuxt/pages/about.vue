<template>
  <div>
    <div>
      <h1>About page</h1>
      <pre class="json ma-8">{{ this.data | pretty }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    clientIp: '',
    data: ''
  }),

  async created() {
    await this.getClientIp()
    await this.generateJson()
  },

  filters: {
    pretty: function (value) {
      return JSON.stringify(value, null, 2)
    }
  },

  methods: {
    async getClientIp() {
      let resIp = ''

      await fetch('https://api.ipify.org?format=string')
        .then(function (x) {
          return x.text()
        })
        .then(function (ip) {
          resIp = ip
        })
      this.clientIp = resIp
    },

    generateJson() {
      this.data = {
        client: {
          host: this.clientIp
        },
        server: {
          current_time: Date.now(),
          services: [
            {
              "name": "Facebook",
              "actions": [{
                  "name": "like_page",
                  "description": "A new page has been liked"
                }],
            }, {
              "name": "Google Drive",
              "actions": [{
                  "name": "file_created",
                  "description": "A new file has been created"
                }],
              "reactions": [{
                  "name": "create_file",
                  "description": "Create a new file"
              }]
            }, {
              "name": "Google Calendar",
              "actions": [{
                  "name": "event_created",
                  "description": "A new event has been created"
                }],
              "reactions": [{
                  "name": "create_event",
                  "description": "Create a new event"
              }]
            }, {
              "name": "Github",
              "actions": [{
                  "name": "new_commit",
                  "description": "A new commit has been made"
                }, {
                  "name": "new_pull_request",
                  "description": "A new pull request has been made"
                }, {
                  "name": "new_fork",
                  "description": "A new fork has been made"
                }]
            }, {
              "name": "Discord",
              "actions": [{
                  "name": "server_created",
                  "description": "A new server has been created"
                }],
              "reactions": [{
                  "name": "bot_notification",
                  "description": "Send a notification"
              }]
            }, {
              "name": "Spotify",
              "actions": [{
                  "name": "track_added",
                  "description": "add a track name in a playlist"
                }]
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
.json {
  text-align: left;
  color: black;
}
</style>
