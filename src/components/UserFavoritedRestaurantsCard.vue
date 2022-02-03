<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ favoritedRestaurants.length }}</strong> 收藏的餐廳
    </div>

    <div class="card-body">
      <router-link
        v-for="favoriteRestaurant in favoritedRestaurants"
        :key="favoriteRestaurant.id"
        :to="{
          name: 'restaurant',
          params: { id: favoriteRestaurant.Favorite.RestaurantId }
        }"
      >
        <img
          :src="favoriteRestaurant.image | nullRestaurant"
          loading="lazy"
          width="60"
          height="60"
          class="avatar"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { nullRestaurantFilter } from '../utils/mixins'

export default {
  props: {
    favoritedRestaurants: {
      type: Array,
      required: true
    }
  },
  mixins: [nullRestaurantFilter]
}
</script>
