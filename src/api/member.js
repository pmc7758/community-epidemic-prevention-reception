import request from '@/utils/request.js'
import qs from 'qs'
// 导入该方法就可以直接使用
export const saveOrUpdateMember = (member, flag) => request({
  url: `/pac/member/addMember/${flag}`,
  method: 'POST',
  data: member
})

export const updateAvatar = (avatar, memberId) => request({
  url: `/pac/member/updateAvatar/${memberId}`,
  method: 'POST',
  data: qs.stringify({
    avatar: avatar
  }),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})