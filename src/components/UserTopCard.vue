<template>
  <div class="col-3">
    <router-link :to="{name:'user', params:{id:user.id} }">
      <img :src="user.image | nullAvatar" width="140px" height="140px" />
    </router-link>
    <h2>{{ user.name }}</h2>
    <span class="badge badge-secondary"
      >追蹤人數：{{ user.FollowerCount }}</span
    >
    <p class="mt-3">
      <button
        type="button"
        v-if="user.isFollowed"
        @click="unfollowUser"
        class="btn btn-danger"
      >
        取消追蹤
      </button>
      <button type="button" v-else @click="followUser" class="btn btn-primary">
        追蹤
      </button>
    </p>
  </div>
</template>

<script>
import { nullAvatarFilter } from "../utils/mixins";

export default {
  props: {
    topUserProp: {
      type: Object
    }
  },
  mixins:[nullAvatarFilter],
  data() {
    return {
      user: this.topUserProp
    }
  },
  methods: {
    followUser() {
      this.user = {
        ...this.user,
        isFollowed: true
      }
    },
    unfollowUser() {
      this.user = {
        ...this.user,
        isFollowed: false
      }
    }
  }
}
</script>
