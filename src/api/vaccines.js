import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const saveVaccines = (vaccines) => request({
  url: '/pac/vaccines/saveOrUpdateVac',
  method: 'POST',
  data: vaccines
})
