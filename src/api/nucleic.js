import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const saveNucleic = (nucleic) => request({
  url: '/pac/nucleicTest/saveOrUpdateNucleic',
  method: 'POST',
  data: nucleic
})

export const getNucleicListByPage = (current, limit, memberId) => request({
  url: `/pac/reception/user/getTestListByMemberId/${current}/${limit}/${memberId}`,
  method: 'GET'
})

export const deleteNucleicTest = (id) => request({
  url: `/pac/reception/user/deleteNucleicTest/${id}`,
  method: 'DELETE'
})
