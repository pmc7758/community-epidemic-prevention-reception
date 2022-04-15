import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/api/login'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    avatar: '',
    regionalId: ''
  },
  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_REGIONALID: (state, regionalId) => {
      state.regionalId = regionalId
    }
  },
  actions: {
    // 登录后拿token去拿个人信息
    getUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          // debugger
          const data = response.data

          commit('SET_AVATAR', data.avatar)
          commit('SET_USERID', data.id)
          commit('SET_REGIONALID', data.regionalId)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    logout ({ commit, state }) {
      commit('SET_AVATAR', '')
      commit('SET_USERID', '')
      commit('SET_REGIONALID', '')
      sessionStorage.removeItem('vuex')
    }
  },
  getters: {
    avatar: state => state.avatar,
    userId: state => state.userId,
    regionalId: state => state.regionalId
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
