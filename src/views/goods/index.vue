<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索货物的名称"
      @search="onSearch"
      @blur="onSearch"
    >
    </van-search>
    <van-list>
      <van-card
        title="商品标题"
        thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        centered
      >
          <template #tags>
            <van-tag plain type="danger">标签</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" icon="plus" round color="#7232dd"></van-button>
          </template>
      </van-card>
            <van-card
        title="商品标题"
        thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        centered
      >
          <template #tags>
            <van-tag plain type="danger">标签</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" icon="plus" round color="#7232dd"></van-button>
          </template>
      </van-card>
    </van-list>
    <van-submit-bar button-text="提交需求" @submit="onSubmit" style="margin-bottom: 60px"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {
      console.log('查找商品')
    },
    onSubmit () {
      console.log('fdaf')
    }
  }
}
</script>

<style scope>
.van-card__title {
  font-size: 0.5rem;
}
.van-card__footer {
  position: relative;
  top:-50px;
}
.van-card {
  padding-bottom: 0px;
  margin-bottom: 0%;
  height: 100px;
}
</style>
