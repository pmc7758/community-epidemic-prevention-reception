<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="核酸检测历史记录">
    </van-nav-bar>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多历史记录了" @load="onLoad">
        <van-cell
          is-link
          v-for="(item, id) in nucleicList"
          @click="toNa(item)"
          :key="id"
          value=" " >
          <template #title>
            <span class="custom-title">{{ item.detectionTime }}</span>
            <van-tag type="danger">{{ item.status === 0 ? '阴性' : '阳性' }}</van-tag>
            <van-tag type="danger">{{ '第' + item.nucleicCount + '剂次' }}</van-tag>
          </template>
          <template #right-icon>
            <van-icon name="close" class="close" @click.stop="deleteNucleic(item.id)" />
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import * as nucleicAPI from '@/api/nucleic'
import { Dialog } from 'vant'

export default {
  data () {
    return {
      refreshing: false,
      nucleicList: [],
      loading: true,
      finished: false,
      pageNo: 1,
      pageSize: 5,
      memberId: this.$store.getters.userId
    }
  },
  mounted () {
    this.getNucleicListByPage()
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getNucleicListByPage () {
      const {
        data: res
      } = await nucleicAPI.getNucleicListByPage(
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
      this.nucleicList = this.nucleicList.concat(rows)

      // 如果合并之后的数组长度大于返回的数据总条数 , 数据加载完毕
      if (this.nucleicList.length >= this.total) {
        this.finished = true
      }
    },

    // 刷新
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.nucleicList = []
      this.pageNo = 1
      this.total = ''
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.getNucleicListByPage()
      this.refreshing = false
    },

    onLoad () {
      this.pageNo += 1
      this.getNucleicListByPage()
    },

    toNa (item) {
      this.$router.push({ path: '/nainfo', query: { obj: item } })
    },

    deleteNucleic (id) {
      Dialog.confirm({
        message: '该操作会永久删除该核酸信息'
      })
        .then(() => {
          nucleicAPI.deleteNucleicTest(id)
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
  top: 10px
}
</style>
