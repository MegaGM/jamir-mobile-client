import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import * as appSettings from 'tns-core-modules/application-settings'
const emptyAuthError = { code: '', message: '' }


export default {
  namespaced: true,
  state: {
    authError: emptyAuthError,
    authToken: null,
  },
  getters: {
    authError: (state) => state.authError,
    authToken: (state) => {
      if (state.authToken) {
        return state.authToken
      }
      else {
        try {
          const serializedAuthToken = appSettings.getString('authToken')
          if (serializedAuthToken) {
            const deserializedAuthToken = JSON.parse(serializedAuthToken)
            return deserializedAuthToken
          }
        } catch (err) {
          console.error('[ERROR] [Vuex] [Auth/deserializeAuthToken]', err)
        }
        return null
      }
    },
  },
  mutations: {
    logIn(state, { authToken }) {
      state.authError = emptyAuthError
      state.authToken = authToken
      appSettings.setString('authToken', JSON.stringify(authToken))
    },
    logOut(state) {
      appSettings.remove('authToken')
      state.authError = emptyAuthError
      state.authToken = null
    },
    setAuthError(state, authError) {
      state.authError = authError
    },
    clearErrors(state) {
      state.authError = emptyAuthError
    },
  },
  actions: {
    async logInAttempt({ state, commit }, { username, password }) {
      try {
        const { authToken, authError } = await new Promise((resolve, reject) => {
          Vue.$socket.emit('Auth/logInAttempt', { username, password }, makeDefaultSCCallback(reject, resolve))
        })

        commit('clearErrors')

        if (authToken) {
          commit('logIn', { authToken })
        }
        else {
          commit('logOut')
          commit('setAuthError', authError)
        }
      } catch (err) {
        console.error('[ERROR] [Vuex] [Auth/logInAttempt]', err)
        return { authToken: null, authError: err }
      }
    },
  }
}

function makeDefaultSCCallback(reject, resolve) {
  return function (err, payload) {
    if (err) {
      reject(err)
    }
    else {
      resolve(payload)
    }
  }
}
