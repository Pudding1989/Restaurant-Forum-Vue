<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <transition-group name="sort" appear>
      <div v-for="comment in restaurantComments" :key="comment.id">
        <blockquote class="blockquote mb-0">
          <button
            v-if="currentUser.isAdmin"
            @click.stop.prevent="handleDeleteButtonClick(comment.id)"
            type="button"
            class="btn btn-danger float-right"
          >
            Delete
          </button>
          <h3>
            <router-link :to="{ name: 'user', params: { id: comment.UserId } }">
              {{ comment.User.name }}
            </router-link>
          </h3>
          <p>{{ comment.text }}</p>
          <footer class="blockquote-footer">
            {{ comment.createdAt | fromNow }}
          </footer>
        </blockquote>
        <hr />
      </div>
    </transition-group>
  </div>
</template>

<script>
import { fromNowFilter } from '../utils/mixins'

// 模擬登入使用者
const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentUser: dummyUser.currentUser
    }
  },
  methods: {
    handleDeleteButtonClick(commentId) {
      // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
      this.$emit('after-delete-comment', commentId)
    }
  }
}
</script>

<style scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.blockquote-footer {
  font-size: 12.5px;
}

/* Vue Transition */
.sort-enter-active {
  transform-origin: top;
  transition: opacity 0.35s ease-in,
    transform 0.35s cubic-bezier(0.8, -0.6, 0.1, 1.4);
}

.sort-enter {
  opacity: 0;
  transform: translateY(-100%) scaleY(0%);
}

.sort-leave-active {
  transform-origin: 85% 50%;
  transition: opacity 0.35s ease-out, transform 0.35s ease-in-out;
}

.sort-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0%);
}
</style>
