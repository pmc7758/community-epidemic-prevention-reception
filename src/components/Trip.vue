<template>
  <div class="spring">
      <h3 class="title">疫情期间出行防疫政策</h3>
      <Cascader label="出发城市" :options="options" @onValue="getFromCity" />
      <Cascader label="到达城市" :options="options" @onValue="getToCity"  />
      <van-button type="primary" block @click="getPolicy()">查看政策</van-button>
  </div>
</template>

<script>
import Cascader from './Cascader.vue'
import api from '@/api/interface'

export default {
  data () {
    return {
      options: [],
      curCityValue: '10065',
      toCityValue: '10028',
      policy: []
    }
  },
  components: {
    Cascader
  },
  mounted () {
    api.getCitys({
      key: '171e165a7d991c5f6ecd5194c54778ef'
    }).then(res => {
      // 获取相对应的数据
      // console.log(res.data);
      var currentAll = []
      for (var i = 0; i < (res.result || []).length; i++) {
        var arr = []
        for (var j = 0; j < (res.result[i].citys || []).length; j++) {
          var temp2 = {
            text: res.result[i].citys[j].city,
            value: res.result[i].citys[j].city_id
          }
          arr.push(temp2)
        }
        var temp1 = {
          text: res.result[i].province,
          value: res.result[i].province_id,
          children: arr
        }
        currentAll.push(temp1)
      }
      this.options = currentAll
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    getFromCity (fromCity) {
      console.log(fromCity)
      this.curCityValue = fromCity.value
    },
    getToCity (toCity) {
      console.log(toCity)
      this.toCityValue = toCity.value
    },
    getPolicy () {
      api.getCitysPolicy({ from: this.curCityValue, to: this.toCityValue, key: '171e165a7d991c5f6ecd5194c54778ef' })
        .then(res => {
          console.log(res)
          this.policy = res
          this.$emit('func', this.policy)
        })
    }
  }
}
</script>

<style scoped>
.spring {
  width: 100%;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
}

.spring .title {
  font-size: 0.16rem;
  margin: 0 0 0.08rem 0.16rem;
}
</style>
