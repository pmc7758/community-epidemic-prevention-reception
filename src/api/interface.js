import { get } from '@/utils/req'
import base from './base'

const api = {
  getDataInfo (params) {
    return get('http://api.tianapi.com/txapi/ncov/index', params)
  },
  /**
     * 各个省市疫情数据
     */
  getProvinceNcov () {
    return get(base.baseUrl + base.provinceNcov)
  },

  // 绘制曲线图数据
  getSwiperImg () {
    return get(base.baseUrl + base.swiperImg)
  },

  /** 防疫城市数据 */
  getCitys (params) {
    return get(base.baseUrl + base.citys, params)
  },
  // 防疫政策查询
  getCitysPolicy (params) {
    return get(base.baseUrl + base.policy, params)
  }
}

export default api
