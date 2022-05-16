<template>
  <div>
    <van-search
      ref="search-goods"
      v-model="goodsQuery.tradeName"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索货物的名称"
      @search="onSearch"
      @blur="onSearch"
    >
    </van-search>
    <van-button id="loginBtn" round v-if="!show" size="large" type="primary" to="/login">请登录后再查看仓库</van-button>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-if="show" v-model="loading" :finished="finished" finished-text="没有更多货物了" @load="onLoad">
        <van-card
          v-for="(item, id) in goodsList" :key="id"
          :title="item.tradeName + '(' + '每件' + item.quantityUnit + ')'"
          :thumb="item.picture"
          centered >

            <template #tags>
              <van-tag plain type="danger">库存:{{ item.stock + "件" }}</van-tag>
              <van-tag plain type="danger">已选:{{ item.selected + "件" }}</van-tag>
            </template>

            <template #footer>
              <van-button @click="plus(item)" size="mini" icon="plus" round color="#7232dd"></van-button>
              <van-button @click="minus(item)" size="mini" icon="minus" round color="#7232dd"></van-button>
            </template>

        </van-card>
      </van-list>
    </van-pull-refresh>
    <van-submit-bar button-text="提交需求" @submit="onSubmit"/>
  </div>
</template>

<script>
import { getToken } from '@/utils/token'
import * as goodsAPI from '@/api/goods.js'

export default {
  inject: ['reload'],
  data () {
    return {
      userId: this.$store.getters.userId,
      refreshing: false,
      show: true,
      goodsList: [],
      loading: true,
      finished: false,
      pageNo: 1,
      pageSize: 5,
      total: '',
      goodsQuery: {
        regionalId: this.$store.getters.regionalId,
        tradeName: ''
      },
      buyCar: {}
    }
  },
  mounted () {
    if (getToken() !== '' && getToken() !== null) {
      this.getGoodsList()
    } else {
      this.show = false
    }
  },
  methods: {
    // 加1减一
    plus (item) {
      item.selected += 1
      this.buyCar[item.id] = item.selected
    },
    minus (item) {
      // 当为零购物车临时状态修改
      if (item.selected === 0) {

      } else {
        item.selected -= 1
        this.buyCar[item.id] = item.selected
        if (item.selected === 0) {
          delete this.buyCar[item.id]
        }
      }
    },
    // 搜索
    onSearch () {
      this.goodsList = []
      this.pageNo = 1
      this.total = ''
      this.loading = true
      this.finished = false
      this.getGoodsList()
    },

    // 提交需求的货物
    onSubmit () {
      goodsAPI.submitOrder(this.userId, this.buyCar)
        .then(response => {
          this.$toast.success('提交成功')
        })
      this.reload()
    },

    // 刷新
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.goodsList = []
      this.pageNo = 1
      this.total = ''
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.getGoodsList()
      this.refreshing = false
    },

    async getGoodsList () {
      const {
        data: res
      } = await goodsAPI.getGoodsListByPage(
        this.pageNo,
        this.pageSize,
        this.goodsQuery
      )

      // 如果没有返回数据,后端报错, 加载结束 , return
      if (res.records === '') {
        this.finished = true
        return
      }

      let rows = res.records
      // 如果没有返回LIST 或 LIST是空数组,证明没有数据了，可以设置finished为ture
      if (rows == null || rows.length === 0) {
        this.loading = false
        this.finished = true
        return
      }

      // 添加一个已选属性
      const newrows = []
      rows.map((item, index) => {
        newrows.push(Object.assign(item, { selected: 0 }))
      })
      rows = newrows

      this.loading = false
      this.total = res.total // 数据总条数
      // 合并数组
      this.goodsList = this.goodsList.concat(rows)

      // 如果合并之后的数组长度大于返回的数据总条数 , 数据加载完毕
      if (this.goodsList.length >= this.total) {
        this.finished = true
      }
    },

    onLoad () {
      this.pageNo += 1
      this.getGoodsList()
    }
  }
}
</script>

<style scope>
.van-card__title {
  font-size: 0.4rem;
  display:table-cell;
  vertical-align: middle;
  height: 30px;
}
/* 购买按钮+样式 */
.van-card__footer {
  position: relative;
  top:-50px;
}
.van-submit-bar {
  margin-bottom: 50px;
}
.van-card {
  padding-bottom: 0px;
  margin-bottom: 0%;
  height: 100px;
}
.van-tag {
  margin-top: 5px;
  margin-right: 3px;
}
#loginBtn {
  margin-top: 200px;
}
</style>
