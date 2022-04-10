import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const uploadFile = (file) => request({
  url: '/oss/getOssFile',
  method: 'POST',
  data: file
})
