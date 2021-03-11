export const state = () => ({
    username: String,
    email: String,
    isLogin: false,
    accessToken: String,
    actions: Array(),


})

export const mutations = {

  setLogin(state, log) {
    state.isLogin = log
  },
  setUserData(state, user) {
    state.username = user.username
    state.email = user.email
    state.accessToken = user.accessToken
  },

  addAction(state, newAction) {
    state.actions.push(newAction)
  },

  resetActions(state) {
    state.actions = []
  },

  deleteAction(state, actionId) {
    let index = 0
    let res = 0

    state.actions.forEach(action => {
      if (action._id == actionId)
        res = index
      index += 1
    });

    state.actions.splice(res, 1)
  },

  updateAction(state, newAction)
  {
    let index = 0
    let i = 0

    state.actions.forEach(action => {
      if (action._id == newAction._id)
        index = index

      i += 1
    });

    state.actions.splice(index, 1, newAction);
  }

}