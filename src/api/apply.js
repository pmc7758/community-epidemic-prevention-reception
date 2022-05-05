import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const saveApply = (apply) => request({
  url: '/pac/regionalApply/saveOrUpdateApply',
  method: 'POST',
  data: apply
})

export const getApplyListByPage = (current, limit, memberId) => request({
  url: `/pac/reception/user/getApplyListByMemberId/${current}/${limit}/${memberId}`,
  method: 'GET'
})

export const deleteApply = (id) => request({
  url: `/pac/reception/user/deleteApply/${id}`,
  method: 'DELETE'
})
