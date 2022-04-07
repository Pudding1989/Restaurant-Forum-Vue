<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      restaurant: {
        name: '',
        categoryName: '',
        commentsLength: -1,
        viewCounts: -1
      }
    }
  },
  methods: {
    async fetchRestaurant() {
      try {
        const { data } = await restaurantsAPI.getRestaurant({
          restaurantId: this.$route.params.id
        })

        const { name, viewCounts, Category, Comments } = data.restaurant
        // 對應 data 的命名
        this.restaurant.name = name
        this.restaurant.categoryName = Category.name
        this.restaurant.viewCounts = viewCounts
        this.restaurant.commentsLength = Comments.length
      } catch (error) {
        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    }
  },
  created() {
    this.fetchRestaurant()
  }
}
</script>
