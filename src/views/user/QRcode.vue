<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="出行码"/>
    <van-row align="center">
        <van-col span="3"></van-col>
        <van-col id="qrimg" span="18" >
            <vue-qr :colorDark="colorDark" :colorLight="colorLight" :text="text" :size="240"></vue-qr>
        </van-col>
        <van-col span="3"></van-col>
    </van-row>
    <van-notice-bar left-icon="volume-o" scrollable :text="news" />
    <van-grid clickable :column-num="3">
        <van-grid-item icon="home-o" icon-prefix="my m-icon-hesuan" text="核酸结果" to="/HisNa" />
        <van-grid-item icon="home-o" icon-prefix="my m-icon-yimiaodazhen" text="疫苗信息" to="/HisVac" />
        <van-grid-item icon="search" icon-prefix="my m-icon-A" text="出行信息" to="/HisTrip" />
    </van-grid>
  </div>
</template>

<script>
import VueQr from 'vue-qr'

export default {
  data () {
    return {
      news: '米袋虽空——樱花开哉！',
      colorDark: '#4DF56F',
      colorLight: '#fff',
      text: 'https://www.baidu.com'
    }
  },
  components: { VueQr },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.van-row {
    margin-top: 70px;
    margin-bottom: 50px;
}
#qrimg {
  display: flex;
  justify-content: center
}
</style>
