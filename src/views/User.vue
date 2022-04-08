<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <!-- UserProfileCard 元件 -->
      <UserProfileCard
        :user="user"
        :followBtn="followBtn"
        @emit-follow="addFollowing"
        @emit-unFollow="deleteFollowing"
      />
      <div class="row">
        <div class="col-md-4">
          <!-- UserFollowingsCard 元件 -->
          <UserFollowingsCard :followings="followings" />
          <br />
          <!-- UserFollowersCard 元件 -->
          <UserFollowersCard :followers="followers" />
        </div>

        <div class="col-md-8">
          <!-- UserCommentsCard 元件 -->
          <UserCommentsCard :comments="comments" />

          <br />
          <!-- UserFavoritedRestaurantsCard 元件 -->
          <UserFavoritedRestaurantsCard
            :favoritedRestaurants="favoritedRestaurants"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from '../components/UserProfileCard.vue'
import UserFollowingsCard from '../components/UserFollowingsCard.vue'
import UserFollowersCard from '../components/UserFollowersCard.vue'
import UserCommentsCard from '../components/UserCommentsCard.vue'
import UserFavoritedRestaurantsCard from '../components/UserFavoritedRestaurantsCard.vue'

import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard
  },
  data() {
    return {
      user: {
        id: '',
        name: '',
        email: '',
        image: '',
        isFollowed: false,
        isCurrentUser: false,
        commentsAmount: -1,
        favoritedRestaurantsAmount: -1,
        followingsAmount: -1,
        followersAmount: -1
      },
      // currentUser: {},
      followings: [],
      followers: [],
      comments: [],
      favoritedRestaurants: [],
      followBtn: false
    }
  },

  computed: {
    currentUser() {
      // 單取一個值用 this.$store.state即可
      return {
        id: this.$store.state.currentUser.id,
        image: this.$store.state.currentUser.image
      }
    }
  },

  methods: {
    async fetchUser(userId) {
      try {
        const response = await usersAPI.get({ userId })

        if (response.statusText !== 'OK') {
          throw new Error(response.data)
        }

        const { profile, isFollowed } = response.data
        const {
          id,
          name,
          email,
          image,
          Followings,
          Followers,
          Comments,
          FavoritedRestaurants
        } = profile
        // 打包給 Profile Card
        this.user = {
          ...this.user,
          id,
          name,
          email,
          image,
          isFollowed,
          isCurrentUser: id === this.currentUser.id,
          commentsAmount: Comments.length,
          favoritedRestaurantsAmount: FavoritedRestaurants.length,
          followingsAmount: Followings.length,
          followersAmount: Followers.length
        }
        this.followings = [...Followings]
        this.followers = [...Followers]
        this.comments = [...Comments]
        this.favoritedRestaurants = [...FavoritedRestaurants]
      } catch (error) {
        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    },

    async addFollowing() {
      this.followBtn = true
      try {
        const { data } = await usersAPI.addFollowing({ userId: this.user.id })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.user.isFollowed = true

        this.followers.push({ id: this.currentUser.id, image: this.currentUser.image })

        this.followBtn = false
      } catch (error) {
        this.followBtn = false

        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    },
    async deleteFollowing() {
      this.followBtn = true
      try {
        const { data } = await usersAPI.deleteFollowing({
          userId: this.user.id
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.followers = this.followers.filter(
          (user) => user.id !== this.currentUser.id
        )

        this.user.isFollowed = false

        this.followBtn = false
      } catch (error) {
        this.followBtn = false

        console.log(error)
        Toast.fire({ icon: 'error', title: `${error}` })
      }
    }
  },
  created() {
    this.fetchUser(this.$route.params.id)
  },

  beforeRouteUpdate(to, from, next) {
    this.fetchUser(to.params.id)
    next()
  }
}
</script>
