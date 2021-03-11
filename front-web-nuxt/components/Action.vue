<template>
  <div>
    <v-card class="pa-3" width="300">
      <p><b>Action Service :</b> {{ actionServiceProps }}</p>
      <p><b>Action:</b> {{ actionProps }}</p>
      <p><b>Reaction Service :</b> {{ reactionServiceProps }}</p>
      <p><b>Reaction:</b> {{ reactionProps }}</p>
      <v-divider class="ma-3" />
      <v-row class="pa-3" justify="space-around"  align="center">

        <v-dialog
        v-model="modalVisible"
        transition="slide-y-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" >Update</v-btn>
          <!-- <v-btn dark v-bind="attrs" v-on="on">Update</v-btn> -->
        </template>
        <template>
          <v-card>
            <v-toolbar dark>Select your Area</v-toolbar>
            <v-card-text class="pa-3">
              <v-select
                label="Action service"
                :items="serviceItems"
                item-text="name"
                @change="changeActionService"
              />
              <v-select
                v-if="actionService"
                label="Select your action"
                :items="actionService.actions"
                item-text="name"
                @change="changeSelectedAction"
              />
              <v-select
                v-if="selectedAction"
                label="Select your action parameter"
                :items="selectedAction.params"
                item-text="name"
                @change="changeSelectedActionParam"
              />
              <v-text-field
                v-if="selectedActionParam && selectedActionParam.input"
                v-model="actionParamInput"
                color="purple darken-2"
                :label="selectedActionParam.placeholder"
              />

              <v-select
                v-if="(selectedActionParam && selectedActionParam.input == false) || (selectedActionParam && selectedActionParam.input && String(actionParamInput).length >= 3)"
                label="Reaction service"
                :items="serviceItems"
                item-text="name"
                @change="changeReactionService"
              />
              <v-select
                v-if="reactionService"
                label="Select your reaction"
                :items="reactionService.reactions"
                item-text="name"
                @change="changeSelectedReaction"
              />
              <v-select
                v-if="selectedReaction"
                label="Select your reaction parameter"
                :items="availableReactionsParam"
                item-text="name"
                @change="changeSelectedReactionParam"
              />
              <v-text-field
                v-if="selectedReactionParam && selectedReactionParam.input"
                v-model="reactionParamInput"
                color="purple darken-2"
                :label="selectedReactionParam.placeholder"
              />
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                v-if="(selectedReactionParam && selectedReactionParam.input == false) || (selectedReactionParam && selectedReactionParam.input && String(reactionParamInput).length >= 3)"
                color="success"
                @click="updateItem"
                >Confirm</v-btn
              >
              <v-btn text @click="modalVisible = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
        <v-btn color="error" @click="deleteItem" >Delete</v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  data() {
    return {
      actionService: null,
      selectedAction: null,
      selectedActionParam: null,
      actionParamInput : "",
      reactionService: null,
      selectedReaction: null,
      selectedReactionParam: null,
      reactionParamInput : "",
      availableReactionsParam: null,
      modalVisible: false,
      serviceItems: []
    }
  },

  props: {
    actionServiceProps: {
      type: String,
      required: true
    },
    actionProps: {
      type: String,
      required: true
    },
    reactionServiceProps: {
      type: String,
      required: true
    },
    reactionProps: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },

   async mounted() {
    await this.fetchServices()
  },

  methods: {
    async fetchServices() {
      let responseData = {}

      const config = {
        method: 'get',
        url: 'http://localhost:8080/api/actions',
        headers: {
          'Content-Type': 'application/json',
          'access-token': this.$store.state.user.accessToken
        }
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
        console.log(responseData.services)
        this.serviceItems = responseData.services
      }
    },

    async deleteItem() {
      await this.removeAction()
      this.$store.commit('user/deleteAction', this.id)
    },

    async updateItem()
    {
      let newAction = {
        _id: this.id,
        action: {
          name: this.selectedAction.name,
          service: this.actionService.name,
          param: this.selectedActionParam.name,
          type: this.selectedActionParam.type,
          input: this.actionParamInput
        },
        reaction: {
          name: this.selectedReaction.name,
          service: this.reactionService.name,
          param: this.selectedReactionParam.name,
          type: this.selectedReactionParam.type,
          input: this.reactionParamInput
        }
      }

      console.log(newAction)

      this.$store.commit('user/updateAction', newAction)

      await this.setUpdateAction(newAction);

      this.modalVisible = false
    },

    async setUpdateAction(newAction) {
      let responseData = {}
      const data = JSON.stringify({
        action: newAction.action,
        reaction: newAction.reaction,
        id: newAction._id
      })

      const config = {
        method: 'patch',
        url: 'http://localhost:8080/api/user/action',
        headers: {
          'Content-Type': 'application/json',
          'access-token': this.$store.state.user.accessToken
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
        console.log(responseData)

        return responseData.id
      }
    },

    async removeAction() {
      let responseData = {}
      const data = JSON.stringify({
        _id: this.id
      })

      const config = {
        method: 'delete',
        url: 'http://localhost:8080/api/user/action',
        headers: {
          'Content-Type': 'application/json',
          'access-token': this.$store.state.user.accessToken
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

      }
    },

    changeActionService(serviceName) {
      const selectedService = this.serviceItems.find(
        (elem) => elem.name == serviceName
      )
      this.actionService = selectedService
    },

    changeSelectedAction(actionName) {
      const selectedAction = this.actionService.actions.find(
        (elem) => elem.name == actionName
      )
      this.selectedAction = selectedAction
    },

    changeSelectedActionParam(actionParamName) {
      const selectedActionParam = this.selectedAction.params.find(
        (elem) => elem.name == actionParamName
      )
      this.selectedActionParam = selectedActionParam
    },

    changeReactionService(serviceName) {
      const selectedService = this.serviceItems.find(
        (elem) => elem.name == serviceName
      )
      this.reactionService = selectedService
    },

    changeSelectedReaction(reactionName) {
      const selectedReaction = this.reactionService.reactions.find(
        (elem) => elem.name == reactionName
      )

      this.selectedReaction = selectedReaction
      this.getAvailableReactionParams()
    },

    changeSelectedReactionParam(reactionParamName) {
      const selectedReactionParam = this.selectedReaction.params.find(
        (elem) => elem.name == reactionParamName
      )

      this.selectedReactionParam = selectedReactionParam

      console.log(this.selectedReactionParam)
    },

    getAvailableReactionParams() {
      const actionParamType = this.selectedActionParam.type
      let result = []

      this.selectedReaction.params.forEach((element) => {
        if (element.type == actionParamType) {
          result.push(element)
        }
      })
      this.availableReactionsParam = result
    },
  }

}
</script>

<style>
</style>