import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const saveApply = (apply) => request({
  url: '/pac/regionalApply/saveOrUpdateApply',
  method: 'POST',
  data: apply
})
