import request from '@/utils/request.js'

export const getVodListByPage = (current, limit, vod) => request({
  url: `/pac/regionalVideo/videoListByCondition/${current}/${limit}`,
  method: 'POST',
  data: vod
})

// 根据视频id获取视频凭证
export const getPlayAuth = (vid) => request({
  url: `/vod/video/getPlayAuth/${vid}`,
  method: 'get'
})
