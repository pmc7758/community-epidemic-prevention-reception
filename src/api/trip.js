import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const saveTrip = (trip) => request({
  url: '/pac/temperatureInfo/saveTrip',
  method: 'POST',
  data: trip
})
