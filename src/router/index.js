import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Restaurants from '../views/Restaurants.vue'
//  要載入 dispatch 方法
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes: [
    {
      // 預設首頁
      path: '/',
      name: 'root',
      redirect: '/restaurants'
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'sign-up',
      // 延遲載入
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants
    },
    {
      path: '/restaurants/feeds',
      name: 'restaurants-feeds',
      component: () => import('../views/RestaurantsFeeds.vue')
    },
    {
      path: '/restaurants/top',
      name: 'restaurants-tops',
      component: () => import('../views/RestaurantsTop.vue')
    },
    {
      path: '/restaurants/:id',
      name: 'restaurant',
      component: () => import('../views/Restaurant.vue')
    },
    {
      path: '/restaurants/:id/dashboard',
      name: 'restaurant-dashboard',
      component: () => import('../views/RestaurantDashboard.vue')
    },
    {
      path: '/users/top',
      name: 'users-tops',
      component: () => import('../views/UsersTop.vue')
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: () => import('../views/UserEdit.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('../views/User.vue')
    },
    {
      // 轉址admin，要完全比對
      path: '/admin',
      exact: true,
      redirect: '/admin/restaurants'
    },
    {
      path: '/admin/restaurants',
      name: 'admin-restaurants',
      component: () => import('../views/AdminRestaurants.vue')
    },
    {
      path: '/admin/restaurants/new',
      name: 'admin-restaurant-new',
      component: () => import('../views/AdminRestaurantNew.vue')
    },
    {
      path: '/admin/restaurants/:id',
      name: 'admin-restaurant',
      component: () => import('../views/AdminRestaurant.vue')
    },
    {
      path: '/admin/restaurants/:id/edit',
      name: 'admin-restaurant-edit',
      component: () => import('../views/AdminRestaurantEdit.vue')
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('../views/AdminCategories.vue')
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/AdminUsers.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token

  let isAuthenticated = store.state.isAuthenticated

  // 有 token，而且 store 中的 token 不一樣時
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    // 使用 dispatch 呼叫 Vuex 內的 actions
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAuthentication = ['sign-in', 'sign-up']

  //  token 無效時，進入需要驗證的頁面轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next({ name: 'sign-in' })
    return
  }

  // token 有效時，進入需要驗證的頁面轉址到餐廳列表
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next({ name: 'restaurants' })
    return
  }

  next()
})

export default router
