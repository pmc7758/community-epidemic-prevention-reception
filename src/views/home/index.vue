<template>
  <div class="home">
    <Header/>
    <CaseNum :caseNumData="caseNumData"/>
    <Map/>
    <MySwiper/>
    <Trip @func="showPolicy"/>
    <van-popup position="bottom" closeable round v-model="show">
      <van-notice-bar
        wrapable
        :scrollable="false"
        :text="policy"
      />
    </van-popup>
  </div>
</template>

<script>
import Map from '@/components/Map'
import API from '@/api/interface'
import Header from '@/components/Header'
import CaseNum from '@/components/CaseNum'
import MySwiper from '@/components/MySwiper'
import Trip from '@/components/Trip.vue'

export default {
  components: { Header, CaseNum, Map, MySwiper, Trip },
  data () {
    return {
      show: false,
      caseNumData: {},
      newsData: [],
      policy: ''
    }
  },
  created () {
    API.getDataInfo({
      key: 'd7c335f2e7856ec48c1962a99fcc6f98'
    }).then(res => {
      this.newsData = res.newslist[0].news
      this.caseNumData = {
        modifyTime: res.newslist[0].desc.modifyTime, // 更新时间戳
        currentConfirmedCount: res.newslist[0].desc.currentConfirmedCount, // 现存确诊人数
        suspectedCount: res.newslist[0].desc.suspectedCount, // 新增境外人数
        seriousCount: res.newslist[0].desc.seriousCount, // 现存无症状人数
        confirmedCount: res.newslist[0].desc.confirmedCount, // 累计确诊人数
        deadCount: res.newslist[0].desc.deadCount, // 死亡人数
        curedCount: res.newslist[0].desc.curedCount, // 累计治愈人数
        currentConfirmedIncr: res.newslist[0].desc.currentConfirmedIncr, // 相比昨天现存确诊人数
        suspectedIncr: res.newslist[0].desc.suspectedIncr, // 新增境外
        seriousIncr: res.newslist[0].desc.seriousIncr,
        confirmedIncr: res.newslist[0].desc.confirmedIncr, // 相比昨天累计确诊人数
        deadIncr: res.newslist[0].desc.deadIncr, // 相比昨天新增死亡人数
        curedIncr: res.newslist[0].desc.curedIncr // 相比昨天新增治愈人数
      }
    })
  },
  methods: {
    showPolicy (res) {
      this.policy = res.result.from_info.low_in_desc
      this.show = true
    }
  }

}
</script>

<style>

</style>
