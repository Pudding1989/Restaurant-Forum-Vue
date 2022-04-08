<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          v-model="profile.name"
          name="name"
          class="form-control"
          placeholder="Enter Name"
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          :src="profile.image || require('../assets/Error-Photos.png')"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
        />
        <input
          id="image"
          type="file"
          @change="previewImg"
          name="image"
          accept="image/*"
          class="form-control-file"
        />
      </div>

      <button :disabled="isProcessing" type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      profile: {
        name: '',
        image: ''
      },
      isProcessing: false
    }
  },

  computed: {
    currentUser() {
      const { id, name, image } = this.$store.state.currentUser
      return {
        id,
        name,
        image
      }
    }
  },

  watch: {
    '$store.state.currentUser': {
      deep: true,
      handler: function () {
        this.setUser()
      }
    },

    '$route.params.id': {
      handler: function (paramsId) {
        Number(paramsId) !== this.currentUser.id &&
          Toast.fire({
            icon: 'warning',
            title: '不可能讓你改個網址<br>就能偷改別人資料的～哼',
            timer: 5000,
            timerProgressBar: true
          })
      }
    }
  },

  methods: {
    setUser() {
      const { name, image } = this.currentUser
      this.profile = {
        name,
        image
      }
    },

    previewImg(event) {
      // 取得瀏覽器的 FileList
      const fileList = event.target.files
      console.log('fileList => ', fileList)
      if (fileList.length) {
        // 由瀏覽器 API 將 Blob物件產生的暫時連結
        this.profile.image = window.URL.createObjectURL(fileList[0])
      }
    },

    async handleSubmit(event) {
      if (!this.profile.name.trim().length) {
        Toast.fire({ icon: 'error', title: '您還沒有填寫名稱' })
        return
      }

      if (Number(this.$route.params.id) !== this.currentUser.id) {
        this.$router.push({ name: 'not-found' })
        return
      }

      this.isProcessing = true
      try {
        //把整個<form>元素(event.target) 的值，拿來建立一個（key/value）集合
        const formData = new FormData(event.target)
        // 透過 API 將表單資料送到伺服器
        for (let [name, value] of formData.entries()) {
          console.log(name + ': ' + value)
        }

        const { data } = await usersAPI.update({
          userId: this.currentUser.id,
          formData
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        // 呼叫 vuex 裡的action 更新 currentUser
        await this.$store.dispatch('fetchCurrentUser')

        Toast.fire({ icon: 'success', title: '個人資料已更新' })

        this.$router.push({
          name: 'user',
          params: { id: this.currentUser.id }
        })
      } catch (error) {
        this.isProcessing = false
        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    }
  },

  created() {
    this.setUser()
  }
}
</script>
