<template>
  <div class="col-md-6 col-lg-4">
    <div v-show="!isLoading" class="card mb-4">
      <img
        @load="changeLoading"
        class="card-img-top"
        :src="restaurant.image | nullRestaurant"
        alt="Card image cap"
        width="286px"
        height="180px"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
            >{{ restaurant.name }}</router-link
          >
        </p>
        <span class="badge badge-secondary">{{
          restaurant.Category.name
        }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          v-if="restaurant.isFavorited"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
          :disabled="favoriteBtn"
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
        >
          移除最愛
        </button>
        <button
          type="button"
          v-else
          @click.stop.prevent="addFavorite(restaurant.id)"
          :disabled="favoriteBtn"
          class="btn btn-primary btn-border favorite mr-2"
        >
          加到最愛
        </button>
        <button
          type="button"
          v-if="restaurant.isLiked"
          @click.stop.prevent="deleteLike(restaurant.id)"
          :disabled="likeBtn"
          class="btn btn-danger like mr-2"
        >
          Unlike
        </button>

        <button
          type="button"
          v-else
          @click.stop.prevent="addLike(restaurant.id)"
          :disabled="likeBtn"
          class="btn btn-primary like mr-2"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { nullRestaurantFilter } from '../utils/mixins'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },

  mixins: [nullRestaurantFilter],
  data() {
    return {
      restaurant: this.initialRestaurant,
      isLoading: true,
      favoriteBtn: false,
      likeBtn: false
    }
  },
  methods: {
    changeLoading() {
      this.isLoading = false
    },

    async addFavorite(restaurantId) {
      this.favoriteBtn = true
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId })

        // 用回傳值來確認是否成功，有成功才操作畫面
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        }

        this.favoriteBtn = false
      } catch (error) {
        this.favoriteBtn = false

        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，<br>請稍後再試'
        })
      }
    },
    async deleteFavorite(restaurantId) {
      this.favoriteBtn = true
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        }

        this.favoriteBtn = false
      } catch (error) {
        this.favoriteBtn = false

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳移除最愛，<br>請稍後再試'
        })
        console.log(error)
      }
    },
    async addLike(restaurantId) {
      this.likeBtn = true
      try {
        const { data } = await usersAPI.addLike({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 收到後端成功後，才切換資料
        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        }

        this.likeBtn = false
      } catch (error) {
        this.likeBtn = false

        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法對這家餐廳按讚，<br>請稍後再試'
        })
      }
    },
    async deleteLike(restaurantId) {
      this.likeBtn = true
      try {
        const { data } = await usersAPI.deleteLike({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 後端回傳後再操作 vue
        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        }

        this.likeBtn = false
      } catch (error) {
        this.likeBtn = false

        Toast.fire({
          icon: 'error',
          title: '無法對這家餐廳取消讚，<br>請稍後再試'
        })
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.badge.badge-secondary {
  padding: 0;
  margin: 8px 0;
  color: #bd2333;
  background-color: transparent;
}

.btn,
.btn-border.btn:hover {
  margin: 7px 14px 7px 0;
}

.card {
  margin-bottom: 2rem !important;
}
.card-img-top {
  background-color: #efefef;
}

.card-body {
  padding: 17.5px;
}

.card-footer {
  padding: 9px 17.5px;
  border-color: rgb(232, 232, 232);
  background: white;
}
</style>
