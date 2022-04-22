<template>
  <div class="case-num">
      <div class="container">
          <div class="title">
              <span>截至 {{ formatData(caseNumData.modifyTime) }} 全国数据统计</span>
          </div>
      </div>
      <div class="content">
        <van-grid :column-num="3" square>
            <van-grid-item >
                <div class="create-count">
                    <b>
                        较昨日
                        <em style="color:rgb(247,76,49)">{{ dataIncrDecr(caseNumData.currentConfirmedIncr) }}</em>
                    </b>
                </div>
                <strong style="color:rgb(247,76,49)">{{ caseNumData.currentConfirmedCount }}</strong>
                <span>现存确诊</span>
            </van-grid-item>
            <van-grid-item >
              <div class="create-count">
                  <b>
                      较昨日
                      <em style="color:rgb(247,130,7)">{{ dataIncrDecr(caseNumData.suspectedIncr) }}</em>
                  </b>
              </div>
              <strong style="color:rgb(247,130,7)">{{ caseNumData.suspectedCount }}</strong>
              <span>境外输入</span>
            </van-grid-item>
            <van-grid-item >
              <div class="create-count">
                  <b>
                      较昨日
                      <em style="color:rgb(162,90,78)">{{ dataIncrDecr(caseNumData.seriousIncr) }}</em>
                  </b>
              </div>
              <strong style="color:rgb(162,90,78)">{{ caseNumData.seriousCount }}</strong>
              <span>现存无症</span>
            </van-grid-item>
            <van-grid-item >
              <div class="create-count">
                  <b>
                      较昨日
                      <em style="color:rgb(174, 33, 44)">+{{ caseNumData.confirmedIncr }}</em>
                  </b>
              </div>
              <strong style="color:rgb(174, 33, 44)">{{ caseNumData.confirmedCount }}</strong>
              <span>累计确诊</span>
            </van-grid-item>
            <van-grid-item >
              <div class="create-count">
                  <b>
                      较昨日
                      <em style="color:rgb(93, 112, 146)">+{{ caseNumData.deadIncr }}</em>
                  </b>
              </div>
              <strong style="color:rgb(93, 112, 146)">{{ caseNumData.deadCount }}</strong>
              <span>累计死亡</span>
            </van-grid-item>
            <van-grid-item >
              <div class="create-count">
                  <b>
                      较昨日
                      <em style="color:rgb(40, 183, 163)">+{{ caseNumData.curedIncr }}</em>
                  </b>
              </div>
              <strong style="color:rgb(40, 183, 163)">{{ caseNumData.curedCount }}</strong>
              <span>累计治愈</span>
            </van-grid-item>
        </van-grid>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CaseNum',
  props: {
    caseNumData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    // 格式化时间戳
    formatData (time) {
      var date = new Date(time)
      var YY = date.getFullYear() + '-'
      var MM = ((date.getMonth()) + 1 < 10 ? '0' + ((date.getMonth()) + 1) : (date.getMonth()) + 1) + '-'
      var DD = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '   '
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var mm = date.getMinutes() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return YY + MM + DD + hh + mm
    },
    dataIncrDecr (data) {
      if (data > 0 && data !== 0) {
        return '+' + data
      } else if (data < 0 && data !== 0) {
        return data
      } else {
        return data
      }
    }
  }
}
</script>

<style scoped>

.case-num {
    padding: 0.30rem;
    background: #fff;
}

.container {
    margin: -0.16rem 0 0;
    font-size: 0.30rem;
}

.content {
    font-size: 0.40rem;
}

</style>
