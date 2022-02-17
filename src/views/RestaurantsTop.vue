<template>
  <div class="container py-5">
    <!-- NavTab 元件 -->
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>
    <hr />

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
            <img class="card-img" :src="restaurant.image | nullRestaurant" />
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
              @click="deleteFavorite(restaurant)"
              type="button"
              class="btn btn-danger mr-2"
            >
              移除最愛
            </button>
            <button
              type="button"
              v-else
              @click="addFavorite(restaurant)"
              class="btn btn-primary"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import { nullRestaurantFilter } from '../utils/mixins'
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  components: {
    NavTabs
  },
  mixins: [nullRestaurantFilter],
  data() {
    return {
      restaurants: []
    }
  },
  methods: {
    async fetchRestaurants() {
      try {
        const {data} = await restaurantsAPI.getTopRestaurants()
        this.restaurants = data.restaurants
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得人氣餐廳，<br>請稍後再試'
        })
      }

    },
    addFavorite(restaurant) {
      restaurant.isFavorited = true
    },
    deleteFavorite(restaurant) {
      restaurant.isFavorited = false
    }
  },
  created() {
    this.fetchRestaurants()
  }
}
</script>
