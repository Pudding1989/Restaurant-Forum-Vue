/* eslint-disable no-unused-vars */ /* eslint-disable no-unused-vars */
<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>

      <tbody v-for="user in users" :key="user.id">
        <tr>
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? 'admin' : 'user' }}</td>
          <td>
            <button
              v-if="currentUser.id !== user.id"
              @click.stop.prevent="toggleUserRole(user.id)"
              type="button"
              class="btn btn-link"
            >
              {{ user.isAdmin ? 'set as user' : 'set as admin' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav'

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
      updatedAt: '2022-01-29T20:17:31.000Z'
    },
    {
      id: 2,
      name: 'user1',
      email: 'user1@example.com',
      password: '$2a$10$UFVyItuSQsryCf3cGEkbC.86d2x2eHeV2JEhMUkkVSpD3rjwx7wWS',
      isAdmin: false,
      image: null,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z'
    },
    {
      id: 3,
      name: 'user2',
      email: 'user2@example.com',
      password: '$2a$10$kivRe9l0JPSxc9bRNH0fg.7zaPgulbhRF0KDkoDK92OGiYz58AXoi',
      isAdmin: false,
      image: null,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z'
    }
  ]
}

// 模擬向後端請求目前使用者資料
const dummyUser = {
  currentUser: {
    id: 1,
    name: 'root',
    email: 'root@example.com',
    image: null,
    isAdmin: true
  }
}

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      users: [],
      currentUser: dummyUser.currentUser
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.users = dummyData.users
    },
    toggleUserRole(selectUserId) {
      this.users = this.users.map((user) => {
        if (selectUserId === user.id) {
          return {
            ...user,
            isAdmin: !user.isAdmin
          }
        }
        return user
      })
    }
  }
}
</script>
