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
              placeholder="请输入密码,初始密码为手机号"
              :rules="[{ required: true, message: '密码不能为空' }]"
            />
            <van-field
              v-model="sms"
              center
              clearable
              label="验证码"
              placeholder="请输入结果验证"
            >
              <template #button>
                <van-button size="small" type="primary" @click="getCode">{{ code }}</van-button>
              </template>
            </van-field>
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
      sms: '',
      result: '',
      code: '',
      isLoading: false,
      user: {
        phone: '17607750062',
        password: '123456'
      }
    }
  },
  mounted () {
    this.getCode()
  },
  methods: {
    async login () {
      if (this.sms !== this.result) {
        this.$toast.fail('验证码错误')
        this.getCode()
        return
      }
      this.isLoading = true
      await loginAPI.login(this.user)
        .then(response => {
          setToken(response.data)
        })
      // 里面是异步执行，有可能会页面跳转了，数据没用存到vuex中，所以要把路由跳转放方法外面
      await this.$store.dispatch('getUserInfo')
      this.$router.push('/layout/user')
    },
    onClickLeft () {
      this.$router.back()
    },
    getCode () {
      const x = Math.floor(Math.random() * 10 + 1)
      const y = Math.floor(Math.random() * 10 + 1)
      this.result = (x + y).toString()
      this.code = x + '  +  ' + y
    }
  }
}
</script>

<style scoped lang="less">

</style>
