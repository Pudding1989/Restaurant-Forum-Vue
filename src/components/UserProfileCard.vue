<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image | nullAvatar" width="300px" height="300px" />
      </div>

      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ user.name }}</h5>
          <p class="card-text">{{ user.email }}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ user.commentsAmount }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ user.favoritedRestaurantsAmount }}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{ user.followingsAmount }}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{ user.followersAmount }}</strong> followers (追隨者)
            </li>
          </ul>
          <p></p>
          <div v-if="user.isCurrentUser" style="display: contents">
            <router-link :to="{ name: 'user-edit', params: { id: user.id } }">
              <button type="button" class="btn btn-primary">edit</button>
            </router-link>
          </div>
          <div v-else style="display: contents">
            <transition name="fade" mode="out-in">
              <button
                v-if="user.isFollowed"
                @click="emitUnFollow"
                :key="'UnFollow'"
                :disabled="followBtn"
                type="button"
                class="btn btn-danger"
              >
                取消追蹤
              </button>
              <button
                v-else
                @click="emitFollow"
                :key="'follow'"
                :disabled="followBtn"
                type="button"
                class="btn btn-primary"
              >
                追蹤
              </button>
            </transition>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import { nullAvatarFilter } from '../utils/mixins'

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    followBtn: {
      type: Boolean
    }
  },
  mixins: [nullAvatarFilter],
  methods: {
    emitFollow() {
      this.$emit('emit-follow')
    },
    emitUnFollow() {
      this.$emit('emit-unFollow')
    }
  }
}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.25s ease-in,
    transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.285);
}

.fade-leave-active {
  transition: opacity 0.1s ease-out;
}

.fade-enter {
  opacity: 0.6;
  transform: scale(80%);
}

.fade-leave-to {
  opacity: 0;
}
</style>
