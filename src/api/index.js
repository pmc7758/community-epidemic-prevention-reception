import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const getUserInfo = (id) => request({
  url: `/pac/member/getMemberInfo/${id}`,
  method: 'GET'
})
