<template>
  <div>
    <div class="top">
    <van-image
      round
      width="2.5rem"
      height="2.5rem"
      :src="avatar"
    />
    </div>
    <van-grid :column-num="3" square icon-size="20px">
      <van-grid-item icon="photo-o" icon-prefix="my m-icon-A" text="体温行程信息上传" to='/trip'/>
      <van-grid-item icon="photo-o" icon-prefix="my m-icon-yimiaodazhen" text="疫苗信息上传" to='/vaccines'/>
      <van-grid-item icon="photo-o" icon-prefix="my m-icon-hesuan" text="核酸结果上传" to='/nainfo'/>
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
import { removeToken } from '@/utils/token'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
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
