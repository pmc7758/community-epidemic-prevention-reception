<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" left-arrow title="疫苗信息上传">
        <template #right>
            <van-icon class-prefix="iconfont icon-icon_xinyong_xianxing_jijin-262" name="search" size="20" @click="toHis"/>
        </template>
    </van-nav-bar>
    <van-form ref="vacForm">
      <van-field
        v-model="vaccines.vaccinesName"
        name="疫苗名称"
        label="疫苗名称"
        placeholder="疫苗名称"
        :rules="[{ required: true, message: '疫苗名称不能为空' }]"
      />
      <van-field
        v-model="vaccines.manufacturer"
        name="厂商名称"
        label="厂商名称"
        placeholder="厂商名称"
        :rules="[{ required: true, message: '厂商名称不能为空' }]"
      />
      <van-field
        name="接种剂次"
        label="接种剂次"
        placeholder="接种剂次"
        :rules="[{ required: true, message: '接种剂次不能为空' }]"
      >
        <template #input>
          <van-stepper v-model="vaccines.agentTimes" />
        </template>
      </van-field>
      <van-field
        v-model="vaccines.vaccinationUnit"
        name="接种单位"
        label="接种单位"
        placeholder="接种单位"
        :rules="[{ required: true, message: '接种单位不能为空' }]"
      />
      <van-field
        readonly
        clickable
        :value="vaccines.vaccinationTime"
        name="接种时间"
        label="接种时间"
        placeholder="点击选择接种日期"
        @click="showCalendar = true"
        :rules="[{ required: true, message: '接种时间不能为空' }]"
      />
      <van-calendar v-model="showCalendar" :min-date="minDate" @confirm="onConfirm" />
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
        v-if="controller"
      >
        <template #input>
          <van-checkbox v-model="vaccines.isPromise" checked-color="red" @click="isDisabled">
            上述信息是我本人填写,本人对信息内容的真实性和完整性负责，如果信息有误或缺失,
            本人愿承担遵守防疫管控的各项规定，配合并听从各项措施和要求。
          </van-checkbox>
        </template>
      </van-field>
      <div style="margin: 16px;">
          <van-button v-if="controller" :disabled="disabled" round block type="info" native-type="submit" @click="saveVaccines">提交疫苗接种记录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import * as serviceAPI from '@/api/service'
import * as vaccinesAPI from '@/api/vaccines'

export default {
  data () {
    return {
      vaccines: {
        memberId: this.$store.getters.userId,
        vaccinesName: '新冠疫苗',
        manufacturer: '',
        agentTimes: 1,
        vaccinationUnit: '',
        vaccinationTime: '',
        image: '',
        isPromise: false
      },
      controller: true,
      fileList: [],
      showCalendar: false,
      minDate: new Date(2018, 0, 1),
      disabled: true
    }
  },
  created () {
    if (this.$route.query && this.$route.query.obj) {
      this.controller = false
      this.vaccines = this.$route.query.obj
      var file = {}
      file.url = this.vaccines.image
      this.fileList.push(file)
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onConfirm (date) {
      this.vaccines.vaccinationTime = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.showCalendar = false
    },
    afterRead (file) {
      const fd = new FormData()
      fd.append('file', file.file)
      fd.append('fileType', 'file')
      file.status = 'uploading'
      file.message = '上传中...'
      serviceAPI.uploadFile(fd)
        .then(response => {
          this.vaccines.image = response.data
          var obj = {}
          obj.url = response.data
          var file = []
          file.push(obj)
          this.fileList = file
        })
      file.tatus = 'done'
    },
    saveVaccines () {
      this.$refs.vacForm.validate().then(() => {
        vaccinesAPI.saveVaccines(this.vaccines)
          .then(response => {
            this.$toast.success('提交成功')
          })
      })
    },
    isDisabled () {
      if (this.vaccines.isPromise === true) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    toHis () {
      this.$router.push('/HisVac')
    }
  }
}
</script>

<style>

</style>
