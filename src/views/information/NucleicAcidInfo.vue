<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="核酸结果上传">
        <template #right>
            <van-icon class-prefix="iconfont icon-icon_xinyong_xianxing_jijin-262" name="search" size="20" />
        </template>
    </van-nav-bar>
    <van-form>
      <van-field
        name="感染状态"
        label="感染状态"
        :rules="[{ required: true, message: '感染状态不能为空' }]"
      >
        <template #input>
          <van-radio-group @change="changeStatus" v-model="nucleicAcid.status" direction="horizontal">
            <van-radio name="0">阴性</van-radio>
            <van-radio name="1">阳性</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="checkboxGroup" label="毒株类型">
        <template #input>
          <van-radio-group v-model="nucleicAcid.nucleicType" direction="horizontal" :disabled="typeDisabled">
            <van-radio name="1" shape="square">阿尔法毒株</van-radio>
            <van-radio name="2" shape="square">贝塔毒株</van-radio>
            <van-radio name="3" shape="square">伽马变异株</van-radio>
            <van-radio name="4" shape="square">德尔塔毒株</van-radio>
            <van-radio name="5" shape="square">奥密克戎毒株</van-radio>
            <van-radio name="6" shape="square">混合型毒株</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        name="检测剂次"
        label="检测剂次"
        placeholder="检测剂次"
        :rules="[{ required: true, message: '检测剂次不能为空' }]"
      >
        <template #input>
          <van-stepper v-model="nucleicAcid.nucleicCount" />
        </template>
      </van-field>
      <!-- 检测时间输入框 -->
      <van-field
        readonly
        clickable
        name="检测时间"
        :value="nucleicAcid.detectionTime"
        label="检测时间"
        placeholder="点击选择检测时间"
        @click="showPicker = true"
        :rules="[{ required: true, message: '检测时间不能为空' }]"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          title="选择检测年月日时分"
          type="datetime"
          :min-date="minDate"
          :columns-order="['year', 'month', 'day', 'hour', 'minute']"
          :formatter="formatter"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <!-- 凭证文件上传 -->
      <van-field
        name="uploader"
        label="凭证图"
        :rules="[{ required: true, message: '凭证图不能为空' }]"
      >
        <template #input>
          <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" />
        </template>
      </van-field>
      <!-- 承诺 -->
      <van-field
        name="承诺保证"
        label=""
      >
        <template #input>
          <van-checkbox v-model="isPromise" checked-color="red" @click="isDisabled">
            上述信息是我本人填写,本人对信息内容的真实性和完整性负责，如果信息有误或缺失,
            本人愿承担遵守防疫管控的各项规定，配合并听从各项措施和要求。
          </van-checkbox>
        </template>
      </van-field>
      <div style="margin: 16px;">
          <van-button :disabled="disabled" round block type="info" native-type="submit" @click="saveNucleic">提交体温行程记录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import * as serviceAPI from '@/api/service'
import * as nucleicAPI from '@/api/nucleic'

export default {
  data () {
    return {
      nucleicAcid: {
        memberId: this.$store.getters.userId,
        status: '0',
        nucleicCount: 1,
        detectionTime: '',
        nucleicType: '0',
        voucher: ''
      },
      minDate: new Date(2018, 0, 1),
      fileList: [],
      disabled: true,
      isPromise: false,
      showPicker: false,
      typeDisabled: true
    }
  },
  methods: {
    changeStatus () {
      if (this.nucleicAcid.status === '1') {
        this.typeDisabled = false
      } else {
        this.typeDisabled = true
        this.nucleicAcid.nucleicType = '0'
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    onConfirm (time) {
      this.nucleicAcid.detectionTime = this.formatTime(new Date(time))
      this.showPicker = false
    },
    isDisabled () {
      if (this.isPromise === true) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    saveNucleic () {
      nucleicAPI.saveNucleic(this.nucleicAcid)
        .then(response => {
          this.$toast.success('提交成功')
        })
    },
    afterRead (file) {
      const fd = new FormData()
      fd.append('file', file.file)
      fd.append('fileType', 'file')
      file.status = 'uploading'
      file.message = '上传中...'
      serviceAPI.uploadFile(fd)
        .then(response => {
          this.nucleicAcid.voucher = response.data
          var obj = {}
          obj.url = response.data
          var file = []
          file.push(obj)
          this.fileList = file
        })
      file.tatus = 'done'
    },
    formatter (type, val) {
      if (type === 'year') {
        return val + '年'
      }
      if (type === 'month') {
        return val + '月'
      }
      if (type === 'day') {
        return val + '日'
      }
      if (type === 'hour') {
        return val + '时'
      }
      if (type === 'minute') {
        return val + '分'
      }
      return val
    },
    formatTime (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  }
}
</script>

<style scoped>
.van-radio {
  margin-top: 5px;
}
</style>
