<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <Spinner v-if="isLoading" />
    <table v-else class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>

      <transition-group tag="tbody" name="tbody">
        <tr v-for="(user, index) in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? 'admin' : 'user' }}</td>
          <td>
            <button
              v-if="currentUser.id !== user.id"
              @click.stop.prevent="toggleUserRole(user.id, user.isAdmin, index)"
              :disabled="user.isProcessing"
              type="button"
              class="btn btn-link"
            >
              {{ user.isAdmin ? 'set as user' : 'set as admin' }}
            </button>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav'
import Spinner from '../components/Spinner'

import { mapState } from 'vuex'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

export default {
  components: {
    AdminNav,
    Spinner
  },

  data() {
    return {
      users: [],
      isProcessing: false,
      isLoading: true
    }
  },

  computed: {
    ...mapState(['currentUser'])
  },

  created() {
    this.fetchUser()
  },

  methods: {
    async fetchUser() {
      this.isLoading = true
      try {
        const response = await adminAPI.users.get()

        if (response.statusText !== 'OK') {
          throw new Error(response.status)
        }

        this.users = response.data.users.map((user) => ({
          ...user,
          isProcessing: false
        }))

        this.isLoading = false
      } catch (error) {
        this.isLoading = false

        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    },

    async toggleUserRole(userId, userAdmin, index) {
      this.users[index].isProcessing = true
      try {
        this.isProcessing = true
        const { data } = await adminAPI.users.update({
          userId,
          isAdmin: `${!userAdmin}`
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.users = this.users.map((user) => {
          if (userId === user.id) {
            return {
              ...user,
              isAdmin: !userAdmin
            }
          }
          return user
        })

        this.users[index].isProcessing = false
      } catch (error) {
        this.users[index].isProcessing = false

        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    }
  }
}
</script>

<style scoped>
.tbody-enter,
.tbody-leave-to {
  transform-origin: bottom;
  transform: scaleY(0);
}

.tbody-enter-to,
.tbody-leave {
  transform-origin: top;
  transform: scaleY(1);
}

.tbody-enter-active {
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.285);
}

.tbody-leave-active {
  transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.1, 1);
  /* visibility: hidden;
  position: absolute; */
}
</style>
