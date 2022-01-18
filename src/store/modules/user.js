import axios from 'axios'

export const namespaced = true

export const state = {
  token: null
}

export const mutations = {
  SET_DATA(state, token) {
    state.token = token
    localStorage.setItem('shawToken', JSON.stringify(token))
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      token
    }`
  },
  LOG_OUT() {
    localStorage.removeItem('shawToken')
    location.reload()
  }
}

export const actions = {
  logIn({ commit }, token) {
    commit('SET_DATA', token)
  },
  setData({ commit }, token) {
    commit('SET_DATA', token)
  },
  logOut({ commit }) {
    commit('LOG_OUT')
  }
}

export const getters = {
  getToken (state) {
    return state.token
  }
}