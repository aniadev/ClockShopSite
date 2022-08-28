import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import { includes } from 'lodash'

// const isAlreadyFetchingAccessToken = false
// let subscribers: any[] = []
const API_URL: string | undefined = process.env.VUE_APP_BASE_API

const request = axios.create({
  baseURL: API_URL,
  withCredentials: false
})

request.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
request.defaults.headers.common['Authorization'] = Cookies.get('access_token') ? 'Bearer ' + Cookies.get('access_token') : ''

request.interceptors.request.use(request => {
  return request
})
request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error.response)
    let message = ''
    const { config, data, status } = error.response
    // const originalRequest = config
    if (status === 401 || data.errorCode === 401 || (status === 404 && data.status === 'USER_NOT_FOUND')) {
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      request.defaults.headers.common['Authorization'] = ''
      location.href = '/login'
    }

    if (status === 400 && includes(config.url, '/login')) {
      message = 'Error username or password'
    }
    if (status === 400 && includes(config.url, '/register')) {
      if (data.status === 'USERNAME_EXIST') {
        message = 'Username already exist'
      } else if (data.status === 'PASSWORD_TOO_SHORT') {
        message = 'Password too short'
      } else if (data.status === 'MISSING_PARAMETER') {
        message = 'Missing parameter'
      }
    }
    if (status !== 200) {
      message = data.message
    }
    if (message) {
      Message.error({ message, duration: 5000 })
    }
    if (!error.response || error.response.status >= 500) {
      // error.message = 'Không thể kết nối đến máy chủ'
      let message = ''
      message = 'ERROR: 500'
      Message.error({ message, duration: 5000 })
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default request
