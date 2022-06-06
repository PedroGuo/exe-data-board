import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'

let baseURL = process.env.VUE_APP_BASE_API
console.log(baseURL)
if (process.env.NODE_ENV === 'production') {
  baseURL = `//api.${location.host}/api`
}

const fetchInstance = axios.create({
  baseURL
  // timeout: 2000,
})

// request拦截器
fetchInstance.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['xc-auth'] = store.getters.token
  }
  config.withCredentials = true
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// response拦截器
fetchInstance.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('request error')
    } else {
      return response.data
    }
  },
  error => {
    if (error.message !== 'cancel') {
      console.log('err:' + error)// for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    return Promise.reject(error)
  }
)

export default fetchInstance
