<template>
  <div>
    <van-notice-bar left-icon="volume-o" scrollable :text="notice.notice + ' ( 发布于 ' + notice.createTime + ')' + ' ( ' + formType(notice.type) + ')'" @click="to(notice.id, notice.type)" />
    <div class="top">
      <van-image
        round
        width="2.5rem"
        height="2.5rem"
        fit="cover"
        :src="avatar"
      />
      <van-icon name="chat-o" @click="toChat"/>
    </div>
    <van-grid :column-num="3" square icon-size="20px">
      <van-grid-item icon="photo-o" icon-prefix="my m-icon-A" text="体温行程信息上传" to='/trip'/>
      <van-grid-item icon="photo-o" icon-prefix="my m-icon-yimiaodazhen" text="疫苗信息上传" to='/vaccines'/>
      <van-grid-item icon="photo-o" icon-prefix="my m-icon-hesuan" text="核酸结果上传" to='/nainfo'/>
    </van-grid>
    <van-cell-group>
      <van-cell title="出行码" icon="location-o" is-link icon-prefix="iconfont my-icon-erweima" to='/qrcode'/>
      <van-cell title="社区返程申请" icon="location-o" is-link icon-prefix="iconfont icon-qianyishenqing" to='/apply'/>
    </van-cell-group>
    <p/>
    <van-cell-group>
      <van-cell title="个人信息" icon="location-o" is-link icon-prefix="iconfont my-icon-wodekehu" to='/info'/>
      <van-cell title="社区公告" icon="tuichudenglu" is-link icon-prefix="iconfont icon--gonggaoguanli" to='/notice'/>
      <van-cell title="需求单" icon="tuichudenglu" is-link icon-prefix="iconfont my-icon-wodedingdan" to="/order" />
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
import * as noticeAPI from '@/api/notice'

export default {
  data () {
    return {
      notice: {}
    }
  },
  mounted () {
    noticeAPI.getNoticeByTime(this.regionalId)
      .then(response => {
        this.notice = response.data
      })
  },
  computed: {
    ...mapGetters([
      'avatar',
      'regionalId'
    ])
  },
  methods: {
    logout () {
      removeToken()
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    toChat () {
      this.$router.push('/chat')
    },
    to (id, type) {
      if (type === '2') {
        this.$router.push({ name: 'details', params: { nid: id } })
      }
    },
    formType (value) {
      if (value === '1') {
        return '通知公告'
      }
      return '风险确认公告'
    }
  }
}
</script>

<style scope>
.top {
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center
}
</style>
