import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const getNoticeByTime = (regionalId) => request({
  url: `/pac/regionalNotice/getNoticeByTime/${regionalId}`,
  method: 'GET'
})

export const getNoticeList = (regionalId) => request({
  url: `/pac/regionalNotice/getNoticeList/${regionalId}`,
  method: 'GET'
})
