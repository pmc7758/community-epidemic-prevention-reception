import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const saveTrip = (trip) => request({
  url: '/pac/temperatureInfo/saveTrip',
  method: 'POST',
  data: trip
})

export const getTripListByPage = (current, limit, memberId) => request({
  url: `/pac/reception/user/getTripListByMemberId/${current}/${limit}/${memberId}`,
  method: 'GET'
})

export const deleteTrip = (id) => request({
  url: `/pac/reception/user/deleteTrip/${id}`,
  method: 'DELETE'
})
