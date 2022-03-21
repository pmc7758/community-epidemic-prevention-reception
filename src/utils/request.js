import theAxios from 'axios'

const axios = theAxios.create({
  baseURL: 'http://localhost:8222',
  timeout: 20000
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
