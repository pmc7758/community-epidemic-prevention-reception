import theAxios from 'axios'
import { getToken } from '@/utils/token'
import { Notify } from 'vant'

const service = theAxios.create({
  baseURL: 'http://localhost:8222',
  timeout: 20000
})

const errorHandle = (status, info) => {
  switch (status) {
    case 400:
      Notify({ type: 'danger', message: '服务器收到客户端通过PUT或者POST请求提交的表示，表示的格式正确，但服务器不懂它什么意思' })
      break
    case 401:
      Notify({ type: 'danger', message: '客户端试图对一个受保护的资源进行操作，却又没有提供正确的认证证书' })
      break
    case 403:
      Notify({ type: 'danger', message: '客户端请求的结构正确，但是服务器不想处理它' })
      break
    case 404:
      Notify({ type: 'danger', message: '资源被围定义(网络请求地址错误)' })
      break
    case 500:
      Notify({ type: 'danger', message: '服务器异常，请稍后重试' })
      break
    case 503:
      Notify({ type: 'danger', message: '最可能的原因是资源不足：服务器突然收到太多请求，以至于无法全部处理' })
      break
    default:
      console.log(info)
      break
  }
}

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
    errorHandle(error.response.status, error.message)
    console.log('err' + error) // for debug
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
