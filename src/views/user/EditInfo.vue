<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="修改信息"/>
    <van-form>
        <van-field
            v-model="user.realName"
            name="用户名"
            label="用户名"
            placeholder="用户名"
        />
        <van-field
            name="radio"
            label="性别"
            placeholder="性别"
        >
            <template #input>
                <van-radio-group v-model="user.sex" direction="horizontal">
                    <van-radio name="2">男</van-radio>
                    <van-radio name="1">女</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <van-field
            v-model="user.age"
            name="年龄"
            label="年龄"
            placeholder="年龄"
        />
        <van-field
            v-model="user.phone"
            name="电话"
            label="电话"
            placeholder="电话"
        />
        <van-field
            v-model="user.address"
            name="地址"
            label="地址"
            placeholder="居住地址"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" @click="saveUser">保存</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import * as memberAPI from '@/api/member'

export default {
  data () {
    return {
      user: {
        realName: '',
        sex: '',
        age: '',
        phone: '',
        address: ''
      }
    }
  },

  mounted () {
    this.$bus.$on('user', (value) => {
      value.sex = (value.sex === '男') ? '2' : '1'
      this.user = value
    })
  },
  beforeDestroy () {
    this.$bus.$off('user')
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    saveUser () {
      delete this.user.avatar
      console.log(this.user)
      memberAPI.saveOrUpdateMember(this.user, false)
        .then(response => {
          this.$toast.success('成功修改基本信息')
        })
    }
  }
}
</script>

<style>

</style>
