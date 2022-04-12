import { apiHelper } from '../utils/helpers'

export default {
  getCUrrentUser() {
    return apiHelper.get('/get_current_user')
  },

  get({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },

  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },

  addFavorite({ restaurantId }) {
    // 官方範例是axios.post(url[, data[, config]])
    // 剛好這一個 post不用夾帶資料
    return apiHelper.post(`/favorite/${restaurantId}`, null)
  },

  deleteFavorite({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`)
  },

  addLike({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null)
  },

  deleteLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`)
  },

  getTopUsers() {
    return apiHelper.get('/users/top')
  },

  addFollowing({ userId }) {
    // POST 方法第二個參數是資料，沒有資料要填 null
    return apiHelper.post(`/following/${userId}`, null)
  },

  deleteFollowing({ userId }) {
    // POST 方法第二個參數是資料，沒有資料要填 null
    return apiHelper.delete(`/following/${userId}`)
  }
}
