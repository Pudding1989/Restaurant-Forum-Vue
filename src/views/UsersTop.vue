<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">美食達人</h1>
      <hr />
      <div class="row text-center">
        <userTopCard
          v-for="user in users"
          :key="user.id"
          :top-user-prop="user"
        />
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserTopCard from '../components/UserTopCard.vue'
import Spinner from '../components/Spinner.vue'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  components: {
    NavTabs,
    UserTopCard,
    Spinner
  },
  data() {
    return {
      users: [],
      isLoading: true
    }
  },
  methods: {
    async fetchUsers() {
      this.isLoading = true
      try {
        const { data } = await usersAPI.getTopUsers()
        console.log(data)
        this.users = data.users.map((user) => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed
        }))

        this.isLoading = false
      } catch (error) {
        this.isLoading = false

        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得美食達人，<br>請稍後再試'
        })
      }
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>
