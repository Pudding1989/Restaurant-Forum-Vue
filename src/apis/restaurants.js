import { apiHelper } from '../utils/helpers'

export default {
  getRestaurants({ page, categoryId }) {
    // 產生 queryString
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams}`)
  },

  // 請求個別餐廳
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },

  getFeeds() {
    return apiHelper.get('/restaurants/feeds')
  },

  getTopRestaurants() {
    return apiHelper.get('/restaurants/top')
  }
}
