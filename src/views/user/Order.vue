<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="货物需求订单"/>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多货物了" @load="onLoad">
        <van-card
          v-for="(item, id) in orderList" :key="id"
          :title="item.tradeName + item.status "
          :thumb="item.picture"
          centered >

            <template #tags>
              <van-tag plain type="danger">数量：{{ item.quantity }}</van-tag>
              <van-tag plain type="danger">{{ item.createTime }}</van-tag>
            </template>

            <template #footer>
              <van-button @click="deleteOrder(item.id)" size="mini" icon="cross" round color="#7232dd"></van-button>
            </template>
        </van-card>
      </van-list>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import * as goodsAPI from '@/api/goods'

export default {
  data () {
    return {
      orderList: [],
      loading: true,
      finished: false,
      pageNo: 1,
      pageSize: 5,
      orderQuery: {
        memberId: this.$store.getters.userId
      }
    }
  },
  mounted () {
    this.getOrderListByPage()
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },

    async getOrderListByPage () {
      const {
        data: res
      } = await goodsAPI.getOrderListByPage(
        this.pageNo,
        this.pageSize,
        this.orderQuery
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
      this.orderList = this.orderList.concat(rows)

      // 如果合并之后的数组长度大于返回的数据总条数 , 数据加载完毕
      if (this.orderList.length >= this.total) {
        this.finished = true
      }
    },

    onLoad () {
      this.pageNo += 1
      this.getOrderListByPage()
    },

    deleteOrder (id) {
      Dialog.confirm({
        message: '该操作会永久删除该需求单信息'
      })
        .then(() => {
          goodsAPI.deleteOrder(id)
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

</style>
