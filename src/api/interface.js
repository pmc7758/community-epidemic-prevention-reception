import { get } from '@/utils/req'
import base from './base'

const api = {
  getDataInfo (params) {
    return get('http://api.tianapi.com/txapi/ncov/index1', params)
  },

  /**
     * 各个省市疫情数据
     */
  getProvinceNcov () {
    return get(base.baseUrl + base.provinceNcov)
  }
}

export default api
