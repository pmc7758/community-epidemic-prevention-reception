<template>
    <div>
        <p class="title">
            <i></i> 疫情地图
        </p>
        <div id="map" class="map"></div>
    </div>
</template>

<script>
import API from '@/api/interface'

export default {
  name: 'Map',
  mounted () {
    // 各省市地图
    API.getProvinceNcov()
      .then(res => {
        // data:[{name:"",valuue:""}]
        // console.log(res)
        // 过滤数据
        // this.$charts.chinaMap("map");
        const allCitys = []// 定义一个容器去接收所有数据
        // 遍历循环
        for (let i = 0; i < (res.retdata || []).length; i++) {
          // 获取数据里的name和vale字段
          const temp = {
            name: res.retdata[i].xArea,
            value: res.retdata[i].curConfirm
          }// 将数据里的name和vale字段放入容器里
          allCitys.push(temp)
        }
        // 渲染数据
        this.$charts.chinaMap('map', allCitys)
      }).catch(error => {
        console.log(error)
      })
  },
  methods: {
    setColor (value) {
      let currentColor = ''
      switch (true) {
        case value === 0:
          currentColor = '#fff'
          break
        case value > 0 && value < 10:
          currentColor = '#FDFDCF'
          break
        case value >= 10 && value < 100:
          currentColor = '#FE9E83'
          break
        case value >= 100 && value < 500:
          currentColor = '#E55A4E'
          break
        case value >= 500 && value < 10000:
          currentColor = '#4F070D'
          break
      }
      return currentColor
    }
  }
}
</script>

<style scoped>
.map{
    width: 375px;
    height: 400px;
}
.title {
    border-top: 0.005rem solid #ebebeb;
    border-bottom: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    height: 0.44rem;
    padding: 0 0.16rem;
    font-weight: 500;
    font-size: 0.30rem;
    line-height: 0.44rem;
    background: #fff;
}
.title::before {
    content: "";
    width: 5px;
    height: 20px;
    background: #4169e2;
    margin-right: 10px;
}
</style>
