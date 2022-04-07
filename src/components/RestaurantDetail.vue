<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image | nullRestaurant"
        style="width: 250px; margin-bottom: 25px"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel | telFormat }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id } }"
        >Dashboard</router-link
      >
      <transition name="fade" mode="out-in">
        <button
          type="button"
          v-if="restaurant.isFavorited"
          :key="'deleteFavorite'"
          @click="deleteFavorite"
          :disabled="favoriteBtn"
          class="btn btn-danger btn-border mr-2"
        >
          移除最愛
        </button>
        <button
          v-else
          @click="addFavorite"
          :key="'addFavorite'"
          type="button"
          :disabled="favoriteBtn"
          class="btn btn-primary btn-border mr-2"
        >
          加到最愛
        </button>
      </transition>

      <transition name="fade" mode="out-in">
        <button
          type="button"
          v-if="restaurant.isLiked"
          @click="deleteLike"
          :key="'deleteLike'"
          :disabled="likeBtn"
          class="btn btn-danger like mr-2"
        >
          Unlike
        </button>
        <button
          type="button"
          v-else
          @click="addLike"
          :key="'addLike'"
          :disabled="likeBtn"
          class="btn btn-primary like mr-2"
        >
          Like
        </button>
      </transition>
    </div>
  </div>
</template>

<script>
import { telFormat, nullRestaurantFilter } from '../utils/mixins'
import { Toast } from '../utils/helpers'
import usersAPI from '../apis/users'

export default {
  mixins: [telFormat, nullRestaurantFilter],
  props: {
    restaurantProp: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.restaurantProp,
      favoriteBtn: false,
      likeBtn: false
    }
  },

  watch: {
    restaurantProp(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },

  methods: {
    async addFavorite() {
      this.favoriteBtn = true
      try {
        const { data } = await usersAPI.addFavorite({
          restaurantId: this.restaurant.id
        })

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
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    },
    async deleteFavorite() {
      this.favoriteBtn = true
      try {
        const { data } = await usersAPI.deleteFavorite({
          restaurantId: this.restaurant.id
        })

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

        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    },
    async addLike() {
      this.likeBtn = true
      try {
        const { data } = await usersAPI.addLike({
          restaurantId: this.restaurant.id
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        }

        this.likeBtn = false
      } catch (error) {
        this.likeBtn = false

        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    },
    async deleteLike() {
      this.likeBtn = true
      try {
        const { data } = await usersAPI.deleteLike({
          restaurantId: this.restaurant.id
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        }

        this.likeBtn = false
      } catch (error) {
        this.likeBtn = false

        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    }
  }
}
</script>

<style scoped>
button:disabled {
  cursor: default;
}

.fade-enter-active {
  transition: opacity 0.25s ease-in,
    transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.285);
}

.fade-leave-active {
  transition: opacity 0.1s ease-out;
}

.fade-enter {
  opacity: 0.6;
  transform: scale(80%);
}

.fade-leave-to {
  opacity: 0;
}
</style>
