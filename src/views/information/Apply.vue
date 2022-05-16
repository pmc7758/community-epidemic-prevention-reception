<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="社区返程申请">
        <template #right>
            <van-icon class-prefix="iconfont icon-icon_xinyong_xianxing_jijin-262" name="search" size="20" @click="toHis"/>
        </template>
    </van-nav-bar>
    <van-form ref="ApplyForm">
      <van-field
        v-model="apply.location"
        name="当前所在地"
        label="当前所在地"
        placeholder="省市+街道+门牌号"
        :rules="[{ required: true, message: '当前所在地不能为空' }]"
      />
      <van-field
        v-model="apply.vehicle"
        name="返程交通工具"
        label="返程交通工具"
        placeholder="返程交通工具"
        :rules="[{ required: true, message: '返程交通工具不能为空' }]"
      />
      <van-field
        v-model="apply.trainNumber"
        name="车次编号"
        label="车次编号"
        placeholder="车次编号"
        :rules="[{ required: true, message: '车次编号不能为空' }]"
      />
      <van-field
        readonly
        clickable
        :value="apply.arrivalTime"
        name="预计到达日期"
        label="预计到达日期"
        placeholder="点击选择预计到达日期"
        @click="showCalendar = true"
        :rules="[{ required: true, message: '预计到达日期不能为空' }]"
      />
      <van-calendar v-model="showCalendar" :min-date="minDate" @confirm="onConfirm" />
      <!-- 凭证文件行程卡上传 -->
      <van-field
        name="uploader"
        label="行程卡"
        :rules="[{ required: true, message: '行程卡不能为空' }]"
      >
        <template #input>
          <van-uploader v-model="fileListA" :after-read="afterReadA" :max-count="1" />
        </template>
      </van-field>
      <!-- 凭证文件核酸检测结果上传 -->
      <van-field
        name="uploader"
        label="48小时核酸检测结果"
        :rules="[{ required: true, message: '核酸检测结果截图不能为空' }]"
      >
        <template #input>
          <van-uploader v-model="fileListB" :after-read="afterReadB" :max-count="1" />
        </template>
      </van-field>
      <!-- 凭证文件健康码上传 -->
      <van-field
        name="uploader"
        label="健康码"
        :rules="[{ required: true, message: '健康码截图不能为空' }]"
      >
        <template #input>
          <van-uploader v-model="fileListC" :after-read="afterReadC" :max-count="1" />
        </template>
      </van-field>
      <van-field
          name="checkbox"
          label=""
      >
        <template #input>
          <van-checkbox v-model="apply.stayRisk">
            行程中没有在中高风险地区停留
          </van-checkbox>
        </template>
      </van-field>
      <!-- 承诺 -->
      <van-field
        name="承诺保证"
        label=""
        v-if="controller"
      >
        <template #input>
          <van-checkbox v-model="apply.isPromise" checked-color="red" @click="isDisabled">
            上述信息是我本人填写,本人对信息内容的真实性和完整性负责，如果信息有误或缺失,
            本人愿承担遵守防疫管控的各项规定，配合并听从各项措施和要求。
          </van-checkbox>
        </template>
      </van-field>
      <div style="margin: 16px;">
          <van-button v-if="controller" :disabled="disabled" round block type="info" native-type="submit" @click="saveApply">提交社区返程申请</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import * as serviceAPI from '@/api/service'
import * as applyAPI from '@/api/apply'

export default {
  inject: ['reload'],
  data () {
    return {
      apply: {
        memberId: this.$store.getters.userId,
        location: '',
        vehicle: '',
        trainNumber: '',
        arrivalTime: '',
        travelCard: '',
        nucleicTest: '',
        healthCode: '',
        stayRisk: true,
        isPromise: false
      },
      controller: true,
      fileListA: [],
      fileListB: [],
      fileListC: [],
      minDate: new Date(2018, 0, 1),
      showCalendar: false,
      disabled: true
    }
  },

  created () {
    if (this.$route.query && this.$route.query.obj) {
      this.controller = false
      this.apply = this.$route.query.obj
      var fileA = {}
      fileA.url = this.apply.travelCard
      this.fileListA.push(fileA)

      var fileB = {}
      fileB.url = this.apply.nucleicTest
      this.fileListB.push(fileB)

      var fileC = {}
      fileC.url = this.apply.healthCode
      this.fileListC.push(fileC)
    }
  },

  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onConfirm (date) {
      this.apply.arrivalTime = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.showCalendar = false
    },
    afterReadA (file) {
      const fd = new FormData()
      fd.append('file', file.file)
      fd.append('fileType', 'file')
      file.status = 'uploading'
      file.message = '上传中...'
      serviceAPI.uploadFile(fd)
        .then(response => {
          this.apply.travelCard = response.data
          var obj = {}
          obj.url = response.data
          var file = []
          file.push(obj)
          this.fileListA = file
        })
      file.tatus = 'done'
    },
    afterReadB (file) {
      const fd = new FormData()
      fd.append('file', file.file)
      fd.append('fileType', 'file')
      file.status = 'uploading'
      file.message = '上传中...'
      serviceAPI.uploadFile(fd)
        .then(response => {
          this.apply.nucleicTest = response.data
          var obj = {}
          obj.url = response.data
          var file = []
          file.push(obj)
          this.fileListB = file
        })
      file.tatus = 'done'
    },
    afterReadC (file) {
      const fd = new FormData()
      fd.append('file', file.file)
      fd.append('fileType', 'file')
      file.status = 'uploading'
      file.message = '上传中...'
      serviceAPI.uploadFile(fd)
        .then(response => {
          this.apply.healthCode = response.data
          var obj = {}
          obj.url = response.data
          var file = []
          file.push(obj)
          this.fileListC = file
        })
      file.tatus = 'done'
    },
    saveApply () {
      this.$refs.ApplyForm.validate().then(() => {
        applyAPI.saveApply(this.apply)
          .then(response => {
            this.$toast.success('提交成功')
            this.reload()
          })
      })
    },
    isDisabled () {
      if (this.apply.isPromise === true) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    toHis () {
      this.$router.push('/HisApply')
    }
  }
}
</script>

<style>

</style>
