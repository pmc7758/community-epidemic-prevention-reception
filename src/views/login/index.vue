<template>
    <div>
        <van-nav-bar @click-left="onClickLeft" left-arrow title="登 录"/>
        <van-form>
            <van-field
              v-model="user.phone"
              name="phone"
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
                <van-button
                  round block
                  type="info"
                  loading-text="登录中..."
                  loading-type="spinner"
                  native-type="submit"
                  :disabled="isLoading"
                  :loading="isLoading"
                  @click="login">登 录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { setToken } from '@/utils/token'
import * as loginAPI from '@/api/login'

export default {
  data () {
    return {
      isLoading: false,
      user: {
        phone: '17607750062',
        password: '123456'
      }
    }
  },
  methods: {
    async login () {
      this.isLoading = true
      await loginAPI.login(this.user)
        .then(response => {
          setToken(response.data)
        })
      // 里面是异步执行，有可能会页面跳转了，数据没用存到vuex中，所以要把路由跳转放方法外面
      await this.$store.dispatch('getUserInfo')
      this.$router.push('/layout/user')
      this.isLoading = false
    },
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">

</style>
