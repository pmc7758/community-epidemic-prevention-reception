<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="密码更改"/>
    <van-form>
        <van-field
            v-model="oldPwd"
            name="旧密码"
            label="旧密码"
            placeholder="填入旧密码"
        />
        <van-field
            v-model="newPwd"
            name="新密码"
            label="新密码"
            placeholder="填入新密码"
        />
        <van-field
            v-model="confirmPwd"
            name="确认密码"
            label="确认密码"
            placeholder="确认密码"
        >
        </van-field>
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" @click="changePwd">确认更改</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      oldPwd: '',
      newPwd: '',
      confirmPwd: ''
    }
  },
  methods: {
    changePwd () {

    },
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
