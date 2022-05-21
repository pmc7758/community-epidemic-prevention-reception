<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="社区公告详情"/>
    <van-notice-bar left-icon="volume-o" :scrollable="false" wrapable :text="notice.notice + ' ( 发布于 ' + notice.createTime + ')'" />
    <van-field
        v-model="report.msg"
        rows="5"
        autosize
        label="详情描述"
        type="textarea"
        maxlength="200"
        placeholder="针对风险确认公告，要求相关社员进行风险确认，请根据公告内容输入相关时间段内的详细轨迹描述进行上报登记"
        show-word-limit
    />
    <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click="reportNews">上报登记</van-button>
    </div>
  </div>
</template>

<script>
import * as noticeAPI from '@/api/notice'

export default {
  inject: ['reload'],
  data () {
    return {
      notice: {},
      report: {
        msg: '',
        userId: this.$store.getters.userId
      }
    }
  },
  mounted () {
    const id = this.$route.params.nid
    this.getNoticeByid(id)
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    getNoticeByid (id) {
      noticeAPI.selectNoticeOne(id)
        .then(response => {
          this.notice = response.data
        })
      this.show = false
    },
    reportNews () {
      noticeAPI.report(this.report)
        .then(response => {
          this.$toast.success('上报登记成功')
          this.reload()
        })
    }
  }
}
</script>

<style>

</style>
