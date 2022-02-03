<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />

    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination
      :current-page="currentPage"
      :total-page="totalPage"
      :category-id="categoryId"
      :previous-page="previousPage"
      :next-page="nextPage"
    />
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import RestaurantsNavPills from '../components/RestaurantsNavPills.vue'
import RestaurantsPagination from '../components/RestaurantsPagination.vue'

const dummyData = {
  restaurants: [
    {
      id: 1,
      name: 'Jonathon Connelly',
      tel: '587-975-9942 x397',
      address: '5561 Maybell Vista',
      opening_hours: '08:00',
      description: 'amet non ut',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=36.448866481618424',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 2,
      name: 'Alanna Stracke',
      tel: '813-690-7428',
      address: '0152 Alvena Corner',
      opening_hours: '08:00',
      description: 'Porro incidunt tempora id cumque voluptate a volup',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=39.02209584712721',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 3,
      name: 'Julie Windler',
      tel: '(477) 964-8761 x67476',
      address: '8746 Pfeffer Fords',
      opening_hours: '08:00',
      description: 'Tempora non et quam. Assumenda odio enim iure volu',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=87.97693141450307',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 4,
      name: 'Corine Berge',
      tel: '353-686-3815 x9944',
      address: '402 Zachary Grove',
      opening_hours: '08:00',
      description: 'Quia amet ut quidem alias et eos assumenda. Numqua',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=65.03715520321542',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 5,
      name: 'Janie Walsh',
      tel: '814.258.2187 x170',
      address: '5400 Holden Center',
      opening_hours: '08:00',
      description: 'Neque enim fuga repudiandae est. Et suscipit velit',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=55.32861943631882',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 6,
      name: 'Franz Rutherford Jr.',
      tel: '754.254.0451 x93002',
      address: '2985 Marjorie Square',
      opening_hours: '08:00',
      description: 'Molestias veniam aspernatur ea maxime a aut possim',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=99.60749304082437',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 7,
      name: 'Sandy Kuhlman',
      tel: '743.715.7184 x28378',
      address: "308 O'Kon Throughway",
      opening_hours: '08:00',
      description: 'Assumenda sit vel adipisci officia nisi mollitia p',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=54.030404307063606',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 8,
      name: 'Doug Hegmann',
      tel: '050-118-8496 x770',
      address: '2147 Florencio Wall',
      opening_hours: '08:00',
      description: 'Mollitia odit unde voluptas.',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=17.847453207262642',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 9,
      name: 'Mathilde Heidenreich',
      tel: '813-641-3441 x197',
      address: '4018 Cristopher Locks',
      opening_hours: '08:00',
      description: 'voluptas quia at',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=39.42049008627797',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 10,
      name: 'Kacey Cremin',
      tel: '756.320.3803 x37570',
      address: '8296 Gerhold Mountain',
      opening_hours: '08:00',
      description: 'atque recusandae quidem',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=12.576851635191687',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      isFavorited: false,
      isLiked: false,
    },
  ],
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
    },
    {
      id: 5,
      name: '素食料理',
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
    },
    {
      id: 6,
      name: '美式料理',
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
    },
    {
      id: 7,
      name: '複合式料理',
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
    },
  ],
  categoryId: '',
  page: 1,
  totalPage: [1, 2, 3, 4, 5],
  prev: 1,
  next: 2,
}

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
  },
  data() {
    return {
      // 設定預設值
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
    }
  },
  methods: {
    fetchRestaurants() {
      // 拉取資料
      const {
        restaurants,
        categories,
        categoryId,
        page,
        totalPage,
        prev,
        next,
      } = dummyData
      // 賦值到vue裡來
      this.restaurants = restaurants
      this.categories = categories
      this.categoryId = categoryId
      this.currentPage = page
      this.totalPage = totalPage
      this.previousPage = prev
      this.nextPage = next
    },
  },
  created() {
    this.fetchRestaurants()
  },
}
</script>
