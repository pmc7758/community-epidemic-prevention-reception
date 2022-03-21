import request from '@/utils/request.js'

// 导入该方法就可以直接使用
export const login = ({ username, password }) => request({
  url: '',
  method: 'POST',
  data: {
    username,
    password
  }
})
