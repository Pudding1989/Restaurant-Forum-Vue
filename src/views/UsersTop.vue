<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <userTopCard v-for="user in users" :key="user.id" :top-user-prop="user" />
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserTopCard from '../components/UserTopCard.vue'

const dummyData = {
  users: [
    {
      id: 1,
      name: 'root',
      email: 'root@example.com',
      password: '$2a$10$8Fhj4kFkv54mtmkPQFu/PeJfNwLqalcUWMqCofo5.jV2xQFBBXvx6',
      isAdmin: true,
      image: null,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      Followers: [],
      FollowerCount: 0,
      isFollowed: false
    },
    {
      id: 2,
      name: 'user1',
      email: 'user1@example.com',
      password: '$2a$10$UFVyItuSQsryCf3cGEkbC.86d2x2eHeV2JEhMUkkVSpD3rjwx7wWS',
      isAdmin: false,
      image: null,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      Followers: [],
      FollowerCount: 0,
      isFollowed: false
    },
    {
      id: 3,
      name: 'user2',
      email: 'user2@example.com',
      password: '$2a$10$kivRe9l0JPSxc9bRNH0fg.7zaPgulbhRF0KDkoDK92OGiYz58AXoi',
      isAdmin: false,
      image: null,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      Followers: [],
      FollowerCount: 0,
      isFollowed: false
    }
  ]
}

export default {
  components: {
    NavTabs,
    UserTopCard
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>
