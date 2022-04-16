<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="体温行程历史记录">
    </van-nav-bar>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多历史记录了" @load="onLoad">
        <van-cell
          is-link
          v-for="(item, id) in tripList"
          @click="toNa(item)"
          :key="id"
          value=" " >
          <template #title>
            <span class="custom-title">{{ item.createTime }}</span>
            <van-tag type="danger">所在地:{{ item.area }}</van-tag>
            <van-tag type="danger">目的地:{{ item.destination }}</van-tag>
            <van-tag type="danger">{{ item.temperature }} ℃</van-tag>
          </template>
          <template #right-icon>
            <van-icon name="close" class="close" @click.stop="deleteTrip(item.id)" />
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import * as tripAPI from '@/api/trip'
import { Dialog } from 'vant'

export default {
  data () {
    return {
      refreshing: false,
      tripList: [],
      loading: true,
      finished: false,
      pageNo: 1,
      pageSize: 5,
      memberId: this.$store.getters.userId
    }
  },
  mounted () {
    this.getTripListByPage()
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getTripListByPage () {
      const {
        data: res
      } = await tripAPI.getTripListByPage(
        this.pageNo,
        this.pageSize,
        this.memberId
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
      this.tripList = this.tripList.concat(rows)

      // 如果合并之后的数组长度大于返回的数据总条数 , 数据加载完毕
      if (this.tripList.length >= this.total) {
        this.finished = true
      }
    },

    // 刷新
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.tripList = []
      this.pageNo = 1
      this.total = ''
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.getTripListByPage()
      this.refreshing = false
    },

    onLoad () {
      this.pageNo += 1
      this.getTripListByPage()
    },

    toNa (item) {
      this.$router.push({ path: '/trip', query: { obj: item } })
    },

    deleteTrip (id) {
      Dialog.confirm({
        message: '该操作会永久删除该核酸信息'
      })
        .then(() => {
          tripAPI.deleteTrip(id)
          this.$toast.success('成功删除')
          this.$router.go(0)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style>
.close {
  font-size: 20px;
  line-height: inherit;
  top: 20px
}
</style>
