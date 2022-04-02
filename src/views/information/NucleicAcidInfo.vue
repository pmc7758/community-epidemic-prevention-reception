<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="核酸结果上传">
        <template #right>
            <van-icon class-prefix="iconfont icon-icon_xinyong_xianxing_jijin-262" name="search" size="20" />
        </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/layout/user')
    }
  }
}
</script>

<style>

</style>
