<template>
  <div class="container py-5">
    <!-- NavTab 元件 -->
    <NavTabs />
    <Spinner v-if="isLoading" />

    <template v-else>
      <h1 class="mt-5">人氣餐廳</h1>
      <hr />

      <transition-group name="sort">
        <div
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="card mb-3"
          style="max-width: 540px; margin: auto"
        >
          <div class="row no-gutters">
            <div class="col-md-4">
              <router-link
                :to="{ name: 'restaurant', params: { id: restaurant.id } }"
              >
                <img
                  class="card-img"
                  :src="restaurant.image | nullRestaurant"
                />
              </router-link>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ restaurant.name }}</h5>
                <span class="badge badge-secondary"
                  >收藏數：{{ restaurant.FavoriteCount }}</span
                >
                <p class="card-text">
                  {{ restaurant.description }}
                </p>
                <router-link
                  :to="{ name: 'restaurant', params: { id: restaurant.id } }"
                  class="btn btn-primary mr-2"
                  >Show</router-link
                >

                <button
                  v-if="restaurant.isFavorited"
                  @click="deleteFavorite(restaurant.id)"
                  type="button"
                  class="btn btn-danger mr-2"
                >
                  移除最愛
                </button>
                <button
                  type="button"
                  v-else
                  @click="addFavorite(restaurant.id)"
                  class="btn btn-primary"
                >
                  加到最愛
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import Spinner from '../components/Spinner.vue'
import { nullRestaurantFilter } from '../utils/mixins'
import restaurantsAPI from '../apis/restaurants'
// for 新增移除餐廳
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  components: {
    NavTabs,
    Spinner
  },
  mixins: [nullRestaurantFilter],
  data() {
    return {
      restaurants: [],
      isLoading: true
    }
  },
  methods: {
    async fetchRestaurants() {
      this.isLoading = true
      try {
        const { data } = await restaurantsAPI.getTopRestaurants()
        this.restaurants = data.restaurants

        this.isLoading = false
      } catch (error) {
        this.isLoading = false

        Toast.fire({
          icon: 'error',
          title: '無法取得人氣餐廳，<br>請稍後再試'
        })
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId })

        // 呼叫 API
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurants = this.restaurants
          .map((restaurant) => {
            if (restaurant.id === restaurantId) {
              return {
                ...restaurant,
                isFavorited: true,
                FavoriteCount: ++restaurant.FavoriteCount
              }
            }
            // 要傳回其他id不符的餐廳資料
            return restaurant
          }) // 由大至小排序整個 restaurants 陣列
          .sort((a, b) => b.FavoriteCount - a.FavoriteCount)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，<br>請稍後再試'
        })
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurants = this.restaurants
          .map((restaurant) => {
            if (restaurant.id === restaurantId) {
              return {
                ...restaurant,
                isFavorited: false,
                FavoriteCount: --restaurant.FavoriteCount
              }
            }
            // 要傳回其他id不符的餐廳資料
            return restaurant
          })
          .sort((a, b) => b.FavoriteCount - a.FavoriteCount)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳移除最愛，<br>請稍後再試'
        })
      }
    }
  },
  created() {
    this.fetchRestaurants()
  }
}
</script>

<style lang="css" scoped>
.sort-move {
  transition: all 0.8s cubic-bezier(0.8, -0.6, 0.1, 1.4);
}
</style>
