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

// 模擬後端請求
const dummyData = {
  restaurants: [
    {
      id: 50,
      name: 'Lula King',
      tel: '077.048.3299',
      address: '11653 Schulist Parkways',
      opening_hours: '08:00',
      description: 'Eveniet qui provident sit dignissimos ipsam est re',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=90.61258218764578',
      viewCounts: 2,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-02-01T09:47:47.000Z',
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0
    },
    {
      id: 49,
      name: 'Mollie Hegmann',
      tel: '265-716-1975 x0377',
      address: '036 Harvey Gateway',
      opening_hours: '08:00',
      description: 'Quo fugiat eum quia nemo doloribus. Est autem iure',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=0.6450284123356687',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0
    },
    {
      id: 48,
      name: 'Petra Ziemann IV',
      tel: '1-296-985-7292 x364',
      address: '1646 Forrest Station',
      opening_hours: '08:00',
      description: 'Neque qui minus voluptatibus error et quisquam.',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=43.541833731605514',
      viewCounts: 2,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-02-01T09:51:08.000Z',
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0
    },
    {
      id: 47,
      name: 'Max Pagac',
      tel: '(383) 454-1640 x52190',
      address: '414 Wiegand Lodge',
      opening_hours: '08:00',
      description: 'Dicta sed distinctio incidunt animi. Nihil volupta',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=25.555857646380797',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0
    },
    {
      id: 46,
      name: 'Alford Homenick',
      tel: '(636) 500-3259',
      address: '365 Jefferey Lakes',
      opening_hours: '08:00',
      description: 'Harum quisquam necessitatibus qui. Culpa optio min',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=46.43168723513189',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0
    },
    {
      id: 45,
      name: 'Glenna Goodwin',
      tel: '(208) 074-2694 x58821',
      address: '8198 Bechtelar Corner',
      opening_hours: '08:00',
      description: 'Qui nobis consequatur quisquam ducimus error aut. ',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=80.01595312267997',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0
    },
    {
      id: 44,
      name: 'Evan Brekke',
      tel: '1-486-595-8088 x9719',
      address: '683 Valentina Mill',
      opening_hours: '08:00',
      description: 'Est eos voluptatem et molestias. Voluptatum pariat',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=62.5665616274109',
      viewCounts: 1,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-02-01T09:47:51.000Z',
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0
    },
    {
      id: 43,
      name: 'Maximus Schiller',
      tel: '(910) 127-2437 x84644',
      address: '4545 Gaylord Hill',
      opening_hours: '08:00',
      description: 'ut quam qui',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=23.619538335779943',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0
    },
    {
      id: 42,
      name: 'Morgan Funk',
      tel: '1-297-184-6977',
      address: '14551 Wunsch Shores',
      opening_hours: '08:00',
      description: 'Sint quo vel. Veritatis accusamus hic hic laudanti',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=83.68662227006105',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0
    },
    {
      id: 41,
      name: 'Jalon Macejkovic II',
      tel: '(421) 066-4480 x993',
      address: '45326 Alf Circles',
      opening_hours: '08:00',
      description: 'consequatur voluptate aut',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=48.49587313641577',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0
    }
  ]
}

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
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants
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
