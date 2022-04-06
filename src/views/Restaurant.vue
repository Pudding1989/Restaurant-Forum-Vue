<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :restaurant-prop="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->

    <RestaurantComments
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <CreateComment
      :restaurant-id="restaurant.id"
      :submitBtn="submitBtn"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail.vue'
import RestaurantComments from '../components/RestaurantComments.vue'
import CreateComment from '../components/CreateComment.vue'
import restaurantsAPI from '../apis/restaurants'
import commentsAPI from '../apis/comments'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },

  data() {
    return {
      // 根據餐廳個別頁分類資料
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: [],
      // 發送 API時 disabled 按鈕
      submitBtn: false
    }
  },

  // 進入路由前從API請求目前使用者，元件用 computed 自動載入
  computed: {
    // 從 Vuex 取得 currentUser 的資料
    ...mapState(['currentUser'])
  },

  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId })

        // 依照資料結構分層取出
        const { restaurant, isFavorited, isLiked } = data
        // 取出放在 restaurant 要用的值
        const {
          id,
          name,
          tel,
          address,
          opening_hours,
          Category,
          image,
          description,
          Comments
        } = restaurant

        // 賦值進vue
        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : '未分類',
          image,
          openingHours: opening_hours,
          tel,
          address,
          description,
          isFavorited,
          isLiked
        }
        this.restaurantComments = Comments.sort((a, b) => {
          return new Date(a.updatedAt) - new Date(b.updatedAt)
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },

    afterDeleteComment(commentId) {
      // 篩選要留下的comment，來刪除指定comment
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      )
    },

    async afterCreateComment(payload) {
      const { restaurantId, text } = payload

      if (!text.trim().length) {
        Toast.fire({ icon: 'error', title: '評論內容不可空白' })
        return
      }

      try {
        this.submitBtn = true

        const { data } = await commentsAPI.create({
          restaurantId,
          text
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 依照comment的資料結構打包 推進評論的陣列裡
        this.restaurantComments.push({
          // id: commentId,
          RestaurantId: restaurantId,
          User: {
            id: this.currentUser.id,
            name: this.currentUser.name
          },
          text,
          createdAt: new Date()
        })

        this.submitBtn = false
      } catch (error) {
        this.submitBtn = false

        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    }
  },
  created() {
    // 動態路由的 params 是 :id
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params
    this.fetchRestaurant(restaurantId)
    next()
  }
}
</script>
