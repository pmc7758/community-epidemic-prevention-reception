import theAxios from 'axios'
import { getToken } from '@/utils/token'
import { Notify } from 'vant'

const service = theAxios.create({
  baseURL: 'http://localhost:8222',
  timeout: 20000
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken) {
      config.headers.token = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // debugger
    if (res.code !== 20000) {
      Notify({ type: 'danger', message: res.message })
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Notify({ type: 'danger', message: error.message })
    return Promise.reject(error)
  }
)

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return service({
    url,
    method,
    params,
    data,
    headers
  })
}
