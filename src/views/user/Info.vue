<template>
  <div class="content">
    <van-nav-bar @click-left="onClickLeft" left-arrow title="个人信息"/>
    <van-cell-group>
      <van-cell center title="头像" is-link to=''>
        <template #right-icon>
            <van-uploader :max-count="1" v-model="user.avatar" :after-read="afterRead" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group @click="submitUser" to='/edit' is-link>
      <van-cell title="姓名" :value="user.realName" is-link to='/edit'/>
      <van-cell title="性别" :value="user.sex" is-link to='/edit'/>
      <van-cell title="年龄" :value="user.age" is-link to='/edit'/>
      <van-cell title="电话" :value="user.phone" is-link to='/edit'/>
      <van-cell title="地址" :value="user.address" is-link to='/edit'/>
    </van-cell-group>
    <p/>
    <van-cell-group>
      <van-cell title="邮箱" :value="user.email" is-link :to="{ name:'EditEmail', params: { email : this.user.email }}"/>
    </van-cell-group>
    <p/>
    <van-cell-group>
      <van-cell title="修改密码" is-link to='/editPwd'/>
    </van-cell-group>
  </div>
</template>

<script>
import * as serviceAPI from '@/api/service'
import * as API from '@/api/index'
import * as memberAPI from '@/api/member'

export default {
  data () {
    return {
      user: {
        id: this.$store.getters.userId,
        avatar: [
          { url: '', isImage: true }
        ],
        realName: '',
        sex: '',
        age: '',
        phone: '',
        email: '',
        address: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    getUserInfo () {
      API.getUserInfo(this.user.id)
        .then(res => {
          this.user.avatar[0].url = res.data.avatar
          this.user.realName = res.data.realName
          this.user.sex = (res.data.sex === 1 ? '女' : '男')
          this.user.age = res.data.age
          this.user.phone = res.data.phone
          this.user.email = res.data.email
          this.user.address = res.data.address
        })
    },
    submitUser () {
      this.$bus.$emit('user', this.user)
    },
    afterRead (file) {
      const fd = new FormData()
      fd.append('file', file.file)
      fd.append('fileType', 'file')
      file.status = 'uploading'
      file.message = '上传中...'
      serviceAPI.uploadFile(fd)
        .then(response => {
          this.user.avatar[0].url = response.data
          var avatar = response.data
          memberAPI.updateAvatar(avatar, this.$store.getters.userId)
            .then(response => {
              this.$toast.success('修改头像成功')
            })
        })
      file.status = 'done'
    }
  }
}
</script>

<style scoped>

</style>
