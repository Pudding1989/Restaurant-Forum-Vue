<template>
            <div class="card">
            <div class="card-header"><strong>{{comments.length}}</strong> 已評論餐廳</div>

            <div class="card-body">
              <router-link v-for="comment in comments" :key="comment.id" :to="{name: 'restaurant', params: {id:comment.RestaurantId} }">
                <img
                  :src="comment.Restaurant.image|nullRestaurant"
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
import { nullRestaurantFilter } from "../utils/mixins";

export default {
  props:{
    comments:{
      type:Array,
      required: true
    }
  },
  mixins:[nullRestaurantFilter]
}
</script>