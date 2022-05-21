<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="邮箱编辑"/>
    <van-form ref="emailForm">
        <van-field
            v-model="bindEmailDTO.email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            :rules="[{ required: true, message: '请填写正确的邮箱格式', pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ }]"
        />
        <van-field
            v-if="controller"
            v-model="bindEmailDTO.newEmail"
            name="换绑新邮箱"
            label="换绑新邮箱"
            placeholder="换绑新邮箱"
            :rules="[{ required: true, message: '请填写正确的邮箱格式', pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ }]"
        />
        <van-field
            v-model="bindEmailDTO.code"
            name="验证码"
            label="验证码"
            placeholder="邮箱验证码"
        >
          <template #button>
            <van-button size="small" type="primary" :disabled="disabled" native-type="submit" @click="code">发送验证码</van-button>
          </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" @click="bindEmail">绑定邮箱</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import * as memberAPI from '@/api/member'

export default {
  data () {
    return {
      controller: true,
      disabled: false,
      bindEmailDTO: {
        newEmail: '',
        email: '',
        code: '',
        confirmCode: '',
        memberId: this.$store.getters.userId
      }
    }
  },
  mounted () {
    const email = this.$route.params.email
    if (email) {
      this.bindEmailDTO.email = email
    } else {
      this.controller = false
    }
  },
  methods: {
    bindEmail () {
      this.$refs.emailForm.validate().then(() => {
        memberAPI.bindEmail(this.bindEmailDTO)
          .then(response => {
            this.$toast.success('绑定成功')
            this.$router.back()
          })
      })
    },
    onClickLeft () {
      this.$router.back()
    },
    code () {
      this.$refs.emailForm.validate().then(() => {
        this.disabled = true
        var id = setTimeout(function () {
          this.disabled = false
        }, 6000)
        clearTimeout(id)
        memberAPI.sendCode(this.bindEmailDTO.email)
          .then(response => {
            this.bindEmailDTO.confirmCode = response.data.confirmCode
            this.$toast.success(response.data.message)
          })
      })
    }
  }
}
</script>

<style>

</style>
