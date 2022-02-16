<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'
import authorizationAPI from './../apis/authorization'

export default {
  data() {
    return {
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        // 如果email、password 為空，使用Toast提示
        // 然後 return 不繼續往後執行
        if (!this.email) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 Email'
          })
          return
        } else if (!this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入密碼'
          })
          return
        }

        // 防止使用者一直送出請求
        this.isProcessing = true

        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })

        // 取得 API 資料，判斷狀態
        const { data } = response
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        // 將 token 存放在 localStorage
        localStorage.setItem('token', data.token)
        // 成功登入後，轉址到餐廳
        // 不用還原 isProcessing 的狀態
        this.$router.push('/restaurants')

      } catch (error) {
        this.password = ''

        // 錯誤提示
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })
        // 登入失敗，把還原按鈕狀態
        this.isProcessing = false

        console.log('error', error)
      }
    }
  }
}
</script>
