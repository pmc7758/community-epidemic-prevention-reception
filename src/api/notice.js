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

// 查询公告
export const selectNoticeOne = (id) => request({
  url: `/pac/regionalNotice/getNoticeById/${id}`, // 接口地址
  method: 'get' // 提交方式
})

// 查询公告
export const report = (report) => request({
  url: '/pac/regionalNotice/reportByNotice', // 接口地址
  method: 'post', // 提交方式
  data: report
})
