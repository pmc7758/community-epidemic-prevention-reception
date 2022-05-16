<template>
  <div>
    <van-button id="loginBtn" round v-if="!show" size="large" type="primary" to="/login">请登录后再点播视频</van-button>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-if="show" v-model="loading" :finished="finished" finished-text="没有更多视频了" @load="onLoad">
          <van-image
            v-for="(item, id) in vodList"
            @click="toNa(item.videoSourceId)"
            :key="id"
            width="100%"
            height="100"
            fit="contain"
            radius="5px"
            :src="item.cover"
          />
      </van-list>
    </van-pull-refresh>
    <van-dialog v-model="vodShow" title="标题" show-cancel-button>
      <palyer :vid = "vid"/>
    </van-dialog>
  </div>
</template>

<script>
import * as vodAPI from '@/api/vod'
import { getToken } from '@/utils/token'
import palyer from '../player/_vid.vue'

export default {
  data () {
    return {
      vid: 'd85de79f99fe4aebb865f1d7f4ce877c',
      show: true,
      vodShow: false,
      refreshing: false,
      vodList: [],
      loading: true,
      finished: false,
      pageNo: 1,
      pageSize: 5,
      vod: {
        regionalId: this.$store.getters.regionalId
      }
    }
  },

  components: {
    palyer: palyer
  },

  mounted () {
    if (getToken() !== '' && getToken() !== null) {
      this.getVodListByPage()
    } else {
      this.show = false
    }
  },

  methods: {
    onClickLeft () {
      this.$router.back()
    },

    async getVodListByPage () {
      const {
        data: res
      } = await vodAPI.getVodListByPage(
        this.pageNo,
        this.pageSize,
        this.vod
      )

      // 如果没有返回数据,后端报错, 加载结束 , return
      if (res.records === '') {
        this.finished = true
        return
      }

      const rows = res.records
      // 如果没有返回LIST 或 LIST是空数组,证明没有数据了，可以设置finished为ture
      if (rows == null || rows.length === 0) {
        this.loading = false
        this.finished = true
        return
      }

      this.loading = false
      this.total = res.total // 数据总条数
      // 合并数组
      this.vodList = this.vodList.concat(rows)

      // 如果合并之后的数组长度大于返回的数据总条数 , 数据加载完毕
      if (this.vodList.length >= this.total) {
        this.finished = true
      }
    },

    // 刷新
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.vodList = []
      this.pageNo = 1
      this.total = ''
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.getVodListByPage()
      this.refreshing = false
    },

    onLoad () {
      this.pageNo += 1
      this.getVodListByPage()
    },

    toNa (videoSourceId) {
      this.vid = videoSourceId
      this.vodShow = true
    }

  }
}
</script>

<style>
.close {
  font-size: 20px;
  line-height: inherit;
  top: 10px
}
</style>
