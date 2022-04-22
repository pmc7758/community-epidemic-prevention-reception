<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="密码更改"/>
    <van-form ref="updatePwdForm">
        <van-field
            v-model="updatePwd.oldPwd"
            name="旧密码"
            label="旧密码"
            placeholder="填入旧密码"
            :rules="[{ required: true, message: '旧密码不能为空' }]"
        />
        <van-field
            v-model="updatePwd.newPwd"
            name="新密码"
            label="新密码"
            placeholder="填入新密码"
            :rules="[{ required: true, message: '新密码不能为空' }]"
        />
        <van-field
            v-model="updatePwd.confirmPwd"
            name="确认密码"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ required: true, message: '确认密码不能为空' }]"
        >
        </van-field>
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" @click="changePwd">确认更改</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import * as memberAPI from '@/api/member'
import { removeToken } from '@/utils/token'

export default {
  data () {
    return {
      updatePwd: {
        memberId: this.$store.getters.userId,
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      }
    }
  },
  methods: {
    changePwd () {
      this.$refs.updatePwdForm.validate().then(() => {
        if (this.newPwd !== this.confirmPwd) {
          this.$toast.fail('确认密码不一致')
        } else {
          memberAPI.updatePwd(this.updatePwd)
            .then(response => {
              this.$toast.success('修改密码成功,请重新登录')
              removeToken()
              this.$store.dispatch('logout')
              this.$router.push('/login')
            })
        }
      })
    },
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
