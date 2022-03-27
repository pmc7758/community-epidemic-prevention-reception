<template>
  <div>
    <div class="top">
    <van-image
      round
      width="2.5rem"
      height="2.5rem"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    </div>
    <van-grid :column-num="3" square>
      <van-grid-item icon="photo-o" icon-prefix="iconfont my-icon-tiwendan" text="体温行程信息上传" />
      <van-grid-item icon="photo-o" icon-prefix="iconfont my-icon-tiwendan" text="疫苗信息上传" />
      <van-grid-item icon="photo-o" icon-prefix="iconfont my-icon-tiwendan" text="核酸结果上传" />
    </van-grid>
    <van-cell-group>
      <van-cell title="出行码" icon="location-o" is-link icon-prefix="iconfont my-icon-erweima" to='/qrcode'/>
    </van-cell-group>
    <p/>
    <van-cell-group>
      <van-cell title="个人信息" icon="location-o" is-link icon-prefix="iconfont my-icon-wodekehu" to='/info'/>
      <van-cell title="需求单" icon="tuichudenglu" is-link icon-prefix="iconfont my-icon-wodedingdan"/>
    </van-cell-group>
    <p/>
    <van-cell-group>
      <van-cell title="退出登录" icon="tuichudenglu" is-link icon-prefix="iconfont my-icon-tuichudenglu" @click="logout"/>
    </van-cell-group>
  </div>
</template>

<script>
import { getToken, removeToken } from '@/utils/token'

export default {
  data () {
    return {
      realName: '',
      avatar: ''
    }
  },
  methods: {
    getToken () {
      getToken()
    },
    logout () {
      removeToken()
      this.$router.push('/')
    }
  }
}
</script>

<style scope>
.top {
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center
}
</style>
