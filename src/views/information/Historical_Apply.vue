<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="返程申请历史记录">
    </van-nav-bar>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多历史记录了" @load="onLoad">
        <van-cell
          is-link
          v-for="(item, id) in applyList"
          @click="toNa(item)"
          :key="id"
          value=" " >
          <template #title>
            <span class="custom-title">{{ item.createTime }}</span>
            <van-tag type="danger">{{ analysisData(item.status) }}</van-tag>
          </template>
          <template #right-icon>
            <van-icon name="close" class="close" @click.stop="deleteApply(item.id)" />
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import * as applyAPI from '@/api/apply'
import { Dialog } from 'vant'

export default {
  inject: ['reload'],
  data () {
    return {
      refreshing: false,
      applyList: [],
      loading: true,
      finished: false,
      pageNo: 1,
      pageSize: 5,
      memberId: this.$store.getters.userId
    }
  },

  mounted () {
    this.getApplyListByPage()
  },

  methods: {
    onClickLeft () {
      this.$router.back()
    },

    async getApplyListByPage () {
      const {
        data: res
      } = await applyAPI.getApplyListByPage(
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
      this.applyList = this.applyList.concat(rows)

      // 如果合并之后的数组长度大于返回的数据总条数 , 数据加载完毕
      if (this.applyList.length >= this.total) {
        this.finished = true
      }
    },

    // 刷新
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.applyList = []
      this.pageNo = 1
      this.total = ''
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.getApplyListByPage()
      this.refreshing = false
    },

    analysisData (value) {
      if (value === '0') {
        return '未审核'
      }
      if (value === '1') {
        return '申请通过'
      }
      if (value === '2') {
        return '申请不通过'
      }
    },

    onLoad () {
      this.pageNo += 1
      this.getApplyListByPage()
    },

    toNa (item) {
      this.$router.push({ path: '/apply', query: { obj: item } })
    },

    deleteApply (id) {
      Dialog.confirm({
        message: '该操作会永久删除该社区返程申请信息'
      })
        .then(() => {
          applyAPI.deleteApply(id)
            .then(() => {
              this.$toast.success('成功删除')
              this.reload()
            })
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
  top: 10px
}
</style>
