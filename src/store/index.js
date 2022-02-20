import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'

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
  // 用來修改 state 的方法，只允許同步
  //  commit 發動 mutations
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  // dispatch 發動 actions
  actions: {
    async fetchCurrentUser({commit}) {
      try {
        const { data } = await usersAPI.getCUrrentUser()
        const { id, name, email, image, isAdmin } = data

        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })
      } catch (error) {
        console.log('error', error)
        console.error(error.message)
      }
    }
  },
  modules: {}
})
