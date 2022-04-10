<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="体温行程信息上传">
        <template #right>
            <van-icon class-prefix="iconfont icon-icon_xinyong_xianxing_jijin-262" name="search" size="20" />
        </template>
    </van-nav-bar>
    <van-form>
      <van-field
          v-model="trip.temperature"
          name="体温"
          label="体温"
          placeholder="社员体温数值"
          :rules="[{ required: true, message: '体温不能为空' }]"
      />
      <van-field
          v-model="trip.area"
          name="地方"
          label="目前所在地"
          placeholder="目前所在的地方"
          :rules="[{ required: true, message: '目前所在地不能为空' }]"
      />
      <van-field
          v-model="trip.destination"
          name="目的地"
          label="目的地"
          placeholder="要前往的地方"
          :rules="[{ required: true, message: '目的地不能为空' }]"
      />

      <van-field
          name="checkbox"
          label=""
      >
        <template #input>
          <van-checkbox v-model="trip.isFallIll">
            十四日内没有发热、乏力、干咳、气促等新冠症状
          </van-checkbox>
        </template>
      </van-field>

      <van-field
          name="checkbox"
          label=""
      >
        <template #input>
          <van-checkbox v-model="trip.isDiagnosis">
            十四日内没被诊断为新冠肺炎、疑似患者或密切接触者
          </van-checkbox>
        </template>
      </van-field>

      <van-field
          name="checkbox"
          label=""
      >
        <template #input>
          <van-checkbox v-model="trip.isSafeArea">
            十四日内一直在低风险地区
          </van-checkbox>
        </template>
      </van-field>
      <!-- 承诺 -->
      <van-field
          name="承诺保证"
          label=""
      >
        <template #input>
          <van-checkbox v-model="trip.isPromise" checked-color="red" @click="isDisabled">
            上述信息是我本人填写,本人对信息内容的真实性和完整性负责，如果信息有误或缺失,
            本人愿承担遵守防疫管控的各项规定，配合并听从各项措施和要求。
          </van-checkbox>
        </template>
      </van-field>
      <div style="margin: 16px;">
          <van-button :disabled="disabled" round block type="info" native-type="submit" @click="saveTrip">提交体温行程记录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import * as tripAPI from '@/api/trip'

export default {
  data () {
    return {
      disabled: true,
      trip: {
        memberId: this.$store.getters.userId,
        temperature: '',
        area: '',
        destination: '',
        isPromise: false, // 承诺保证
        isDiagnosis: true,
        isFallIll: true,
        isSafeArea: true
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    saveTrip () {
      tripAPI.saveTrip(this.trip)
        .then(response => {
          this.$toast.success('提交成功')
        })
    },
    isDisabled () {
      if (this.trip.isPromise === true) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  }
}
</script>

<style scoped>
.van-checkbox__label {
  text-align: justify;
}
</style>
