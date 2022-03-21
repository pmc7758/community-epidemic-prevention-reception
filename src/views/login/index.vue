<template>
    <div>
        <van-nav-bar title="登 录"/>
        <van-form>
            <van-field
              v-model="user.username"
              name="username"
              label="账户"
              placeholder="请输入手机号"
              :rules="[{ required: true, message: '请填写11位手机号', pattern: /^1[3-9]\d{9}$/ }]"
            />
            <van-field
              v-model="user.password"
              type="password"
              name="password"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '密码不能为空' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" :disabled="isLoading" :loading="isLoading" @click="login">登 录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
// import { loginAPI } from '@/api/login'
import { setToken } from '@/utils/token'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login (user) {
      this.isLoading = true
      // loginAPI.login(this.user)
      setToken()
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
