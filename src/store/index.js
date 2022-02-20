import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  // 用來修改函式的方法
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      },
        state.isAuthenticated = true
    }
  },
  actions: {},
  modules: {}
})
