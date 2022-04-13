<template>
  <Spinner v-if="isLoading" />
  <table v-else class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>

    <transition-group tag="tbody" name="tbody" appear>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>
          {{ restaurant.Category ? restaurant.Category.name : '未分類' }}
        </td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }"
            class="btn btn-link"
            >Show</router-link
          >

          <router-link
            :to="{
              name: 'admin-restaurant-edit',
              params: { id: restaurant.id }
            }"
            class="btn btn-link"
            >Edit</router-link
          >

          <button
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
            type="button"
            class="btn btn-link"
          >
            Delete
          </button>
        </td>
      </tr>
    </transition-group>
  </table>
</template>

<script>
import Spinner from '../components/Spinner.vue'

import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

export default {
  components: { Spinner },

  data() {
    return {
      restaurants: [],
      isLoading: true
    }
  },
  created() {
    this.fetchRestaurants()
  },
  methods: {
    async fetchRestaurants() {
      this.isLoading = true
      try {
        this.isLoading
        const { data } = await adminAPI.restaurants.get()

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.restaurants = data.restaurants

        this.isLoading = false
      } catch (error) {
        this.isLoading = false

        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳，<br>請稍後再試'
        })
      }
    },
    async deleteRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.delete({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 篩選要留下來的
        this.restaurants = this.restaurants.filter(
          (restaurant) => restaurant.id !== restaurantId
        )

        Toast.fire({
          icon: 'success',
          title: '刪除餐廳成功'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳，<br>請稍後再試'
        })
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
  visibility: hidden;
  position: absolute;
}

.tbody-move {
  transition: all 0.35s cubic-bezier(0.8, -0.6, 0.1, 1.4);
}
</style>
