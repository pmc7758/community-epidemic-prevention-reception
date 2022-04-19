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

export const getOrderListByPage = (current, limit, orderQuery) => request({
  url: `/whouse/order/getOrderListByPage/${current}/${limit}`,
  method: 'POST',
  data: orderQuery
})

export const deleteOrder = (orderId) => request({
  url: `/whouse/order/deleteOrder/${orderId}`,
  method: 'DELETE'
})

export const finishOrder = (orderId) => request({
  url: `/whouse/order/finishOrder/${orderId}`,
  method: 'GET'
})
