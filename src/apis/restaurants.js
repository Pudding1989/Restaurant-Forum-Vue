import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getRestaurants({ page, categoryId }) {
    // 產生 queryString
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`restaurants?${searchParams}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  getFeeds() {
    return apiHelper.get('restaurants/feeds', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
