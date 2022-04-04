import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const getGoodsListByPage = (current, limit, goodsQuery) => request({
  url: `/whouse/commodity/getCommodityList/${current}/${limit}`,
  method: 'POST',
  data: goodsQuery
})

export const submitOrder = (userId, buyCar) => request({
  url: `/whouse/order/saveOrder/${userId}`,
  method: 'POST',
  data: buyCar
})
