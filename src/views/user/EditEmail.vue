<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="邮箱编辑"/>
    <van-form>
        <van-field
            v-model="email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
        />
        <van-field
            name="验证码"
            label="验证码"
            placeholder="邮箱验证码"
        >
        </van-field>
        <div style="margin: 16px;">
            <van-button round block type="info" :disabled="disabled" native-type="submit" @click="code">发送验证码</van-button>
        </div>
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" @click="bindEmail">绑定邮箱</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: false,
      email: ''
    }
  },
  mounted () {
    this.email = this.$route.params.email
  },
  methods: {
    bindEmail () {

    },
    onClickLeft () {
      this.$router.back()
    },
    code () {
      this.disabled = true
      var id = setTimeout(function () {
        this.disabled = false
      }, 6000)
      clearTimeout(id)
    }
  }
}
</script>

<style>

</style>
