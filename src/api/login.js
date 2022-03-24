import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const login = ({ phone, password }) => request({
  url: '/ucenter/member/login',
  method: 'POST',
  data: {
    phone,
    password
  }
})
