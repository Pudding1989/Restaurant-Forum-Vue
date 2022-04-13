<template>
  <div class="container py-5">
    <!-- NavTab 元件 -->
    <NavTabs />
    <spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">最新動態</h1>
      <hr />
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <!-- 最新餐廳 NewestRestaurants -->
          <NewestRestaurants v-bind:restaurantsProp="restaurants" />
        </div>
        <div class="col-md-6">
          <!-- 最新評論 NewestComments-->
          <h3>最新評論</h3>
          <NewestComments v-bind:commentsProp="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import NewestRestaurants from '../components/NewestRestaurants.vue'
import NewestComments from '../components/NewestComments.vue'
import Spinner from '../components/Spinner.vue'
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    }
  },
  methods: {
    async fetchFeeds() {
      this.isLoading = true
      try {
        // fetch API
        const { data } = await restaurantsAPI.getFeeds()
        const { restaurants, comments } = data

        this.restaurants = restaurants
        // 檢查 comment 的餐廳跟留言資料是否存在
        this.comments = comments.filter(
          (comment) => comment.Restaurant && comment.text
        )

        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false

        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  },

  created() {
    this.fetchFeeds()
  }
}
</script>
