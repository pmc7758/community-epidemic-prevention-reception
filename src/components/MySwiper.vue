<template>
  <div class="chart">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <van-image  width="10rem" height="7rem" fit="contain" v-lazy="image" :src="image"/>
        <!-- <img v-lazy="image"/> -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'
import api from '@/api/interface'

export default {
  data () {
    return {
      images: []
    }
  },
  mounted () {
    api.getSwiperImg()
      .then((res) => {
        // console.log(res)
        if (res.status === 200) {
          for (var i = 0; i < (res.result || []).length; i++) { this.images.push(res.result[i].image) }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
