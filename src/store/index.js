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
    isAuthenticated: false,
    // 把token 存在vuex
    token: ''
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
      // 登入時，在 state儲存 token
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },

    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false

      // 登出時，把 state 中的 token清空
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  // dispatch 發動 actions
  actions: {
    async fetchCurrentUser({ commit }) {
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

        return true
      } catch (error) {
        console.log('error', error)
        console.error(error.message)
        // 若驗證失敗，登出
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {}
})
