import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const saveVaccines = (vaccines) => request({
  url: '/pac/vaccines/saveOrUpdateVac',
  method: 'POST',
  data: vaccines
})

export const getVacListByPage = (current, limit, memberId) => request({
  url: `/pac/reception/user/getVacListByMemberId/${current}/${limit}/${memberId}`,
  method: 'GET'
})

export const deleteVac = (id) => request({
  url: `/pac/reception/user/deleteVac/${id}`,
  method: 'DELETE'
})
