<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ followers.length }}</strong> followers (追隨者)
    </div>
    <!-- <div> -->
    <transition-group name="fade" tag="div" class="card-body">
      <router-link
        v-for="follower in followers"
        :key="follower.id"
        :to="{ name: 'user', params: { id: follower.id } }"
      >
        <img
          :src="follower.image | nullAvatar"
          loading="lazy"
          width="60"
          height="60"
          class="avatar"
        />
      </router-link>
    </transition-group>
    <!-- </div> -->
  </div>
</template>

<script>
import { nullAvatarFilter } from '../utils/mixins'

export default {
  props: {
    followers: {
      type: Array,
      required: true
    }
  },
  mixins: [nullAvatarFilter]
}
</script>

<style scoped>
.card-body a {
  width: 60px;
}

.fade-enter-active,
.fade-leave-active {
  display: inline-block;
  transition: opacity 0.35s ease-out,
    transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.285);
}

.fade-enter {
  opacity: 0;
  transform: translateY(-50%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(25%);
}
</style>
