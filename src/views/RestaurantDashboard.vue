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
      <li>評論數： {{ restaurant.commentsLength }} </li>
      <li>瀏覽次數： {{ restaurant.viewCounts }} </li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
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
    viewCounts: 3,
    createdAt: '2022-01-29T20:17:31.000Z',
    updatedAt: '2022-02-01T08:32:23.000Z',
    CategoryId: 4,
    Category: {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z'
    },
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
  }
}

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
    fetchRestaurant() {
      const { name ,viewCounts, Category, Comments } = dummyData.restaurant
      // 對應 data 的命名
      this.restaurant.name = name
      this.restaurant.categoryName = Category.name
      this.restaurant.viewCounts = viewCounts
      this.restaurant.commentsLength = Comments.length
    }
  },
  created(){
    this.fetchRestaurant()
  }
}
</script>
