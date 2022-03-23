<template>
 <div>
     <!-- 二级路由页面 -->
    <div class="home_container">
        <router-view/>
    </div>
    <!-- 底部导航 -->
    <div>
        <van-tabbar v-model="active" route>
            <van-tabbar-item to="/layout/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/layout/vod" icon="video-o">视频</van-tabbar-item>
            <van-tabbar-item to="/layout/goods" icon="cart-o">仓库</van-tabbar-item>
            <van-tabbar-item to="/layout/user" icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
 </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>
.home_container {
    padding-bottom: 50px;
}
.van-tabbar {
    border-top: 1px solid #f8f8f8;
}
</style>
