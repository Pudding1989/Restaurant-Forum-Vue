<template>
  <div class="col-3">
    <router-link :to="{ name: 'user', params: { id: user.id } }">
      <img :src="user.image | nullAvatar" width="140px" height="140px" />
    </router-link>
    <h2>{{ user.name }}</h2>
    <span class="badge badge-secondary"
      >追蹤人數：{{ user.followerCount}}</span
    >
    <p class="mt-3">
      <button
        type="button"
        v-if="user.isFollowed"
        @click="deleteFollowing(user.id)"
        class="btn btn-danger"
      >
        取消追蹤
      </button>
      <button
        type="button"
        v-else
        @click="addFollowing(user.id)"
        class="btn btn-primary"
      >
        追蹤
      </button>
    </p>
  </div>
</template>

<script>
import { nullAvatarFilter } from '../utils/mixins'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  props: {
    topUserProp: {
      type: Object
    }
  },
  mixins: [nullAvatarFilter],
  data() {
    return {
      user: this.topUserProp
    }
  },
  methods: {
    async addFollowing(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 收到再操作vue屬性
        this.user = {
          ...this.user,
          isFollowed: true
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，<br>請稍後再試'
        })
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.user = {
          ...this.user,
          isFollowed: false
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤，<br>請稍後再試'
        })
      }
    }
  }
}
</script>
