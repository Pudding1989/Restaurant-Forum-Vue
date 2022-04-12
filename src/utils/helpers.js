import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000/api'

// 使用 axios interceptors 把所有 api 加入 Authorization 標頭
const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
