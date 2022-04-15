<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="社区公告"/>
    <van-notice-bar class="notice-list"
        left-icon="volume-o"
        v-for="item in noticeList"
        wrapable
        :scrollable="false"
        :key="item.id"
        :text="item.notice + ' ( 发布于 ' + item.createTime + ')'"
    >
    </van-notice-bar>
  </div>
</template>

<script>
import * as noticeAPI from '@/api/notice'

export default {
  data () {
    return {
      regionalId: this.$store.getters.regionalId,
      noticeList: ''
    }
  },
  mounted () {
    noticeAPI.getNoticeList(this.regionalId)
      .then(response => {
        this.noticeList = response.data
      })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.notice-list {
    margin-bottom: 8px;
}
</style>
