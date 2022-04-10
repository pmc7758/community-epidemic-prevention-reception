import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const saveNucleic = (nucleic) => request({
  url: '/pac/nucleicTest/saveOrUpdateNucleic',
  method: 'POST',
  data: nucleic
})
