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
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail.vue'
import RestaurantComments from '../components/RestaurantComments.vue'
import CreateComment from '../components/CreateComment.vue'

const dummyData = {
  restaurant: {
    id: 1,
    name: 'Jonathon Connelly',
    tel: '587-975-9942 x397',
    address: '5561 Maybell Vista',
    opening_hours: '08:00',
    description: 'amet non ut',
    image:
      'https://loremflickr.com/320/240/restaurant,food/?random=36.448866481618424',
    viewCounts: 1,
    createdAt: '2022-01-29T20:17:31.000Z',
    updatedAt: '2022-01-31T16:21:41.781Z',
    CategoryId: 4,
    Category: {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z'
    },
    FavoritedUsers: [],
    LikedUsers: [],
    Comments: [
      {
        id: 51,
        text: 'Molestias excepturi fugit ducimus sit.',
        UserId: 2,
        RestaurantId: 1,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        User: {
          id: 2,
          name: 'user1',
          email: 'user1@example.com',
          password:
            '$2a$10$UFVyItuSQsryCf3cGEkbC.86d2x2eHeV2JEhMUkkVSpD3rjwx7wWS',
          isAdmin: false,
          image: null,
          createdAt: '2022-01-29T20:17:31.000Z',
          updatedAt: '2022-01-29T20:17:31.000Z'
        }
      },
      {
        id: 101,
        text: 'Temporibus quis id.',
        UserId: 2,
        RestaurantId: 1,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        User: {
          id: 2,
          name: 'user1',
          email: 'user1@example.com',
          password:
            '$2a$10$UFVyItuSQsryCf3cGEkbC.86d2x2eHeV2JEhMUkkVSpD3rjwx7wWS',
          isAdmin: false,
          image: null,
          createdAt: '2022-01-29T20:17:31.000Z',
          updatedAt: '2022-01-29T20:17:31.000Z'
        }
      },
      {
        id: 1,
        text: 'Minima harum enim ducimus sed ut doloremque.',
        UserId: 3,
        RestaurantId: 1,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        User: {
          id: 3,
          name: 'user2',
          email: 'user2@example.com',
          password:
            '$2a$10$kivRe9l0JPSxc9bRNH0fg.7zaPgulbhRF0KDkoDK92OGiYz58AXoi',
          isAdmin: false,
          image: null,
          createdAt: '2022-01-29T20:17:31.000Z',
          updatedAt: '2022-01-29T20:17:31.000Z'
        }
      }
    ]
  },
  isFavorited: false,
  isLiked: false
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
      currentUser: dummyUser.currentUser,
      restaurantComments: []
    }
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log('擷取的餐廳 ID', restaurantId)
      // 依照資料結構分層取出
      const { restaurant, isFavorited, isLiked } = dummyData
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
        categoryName: Category.name,
        image,
        openingHours: opening_hours,
        tel,
        address,
        description,
        isFavorited,
        isLiked
      }
      this.restaurantComments = Comments
    },

    afterDeleteComment(commentId) {
      // 篩選要留下的comment，來刪除指定comment
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      )
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload
      // 依照comment的資料結構打包 推進評論的陣列裡
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date()
      })
    }
  },
  created() {
    // 動態路由的 params 是 :id
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  }
}
</script>
