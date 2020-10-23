<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :close="true" />
    <div class="addNewForm">
      <el-form :label-position="left" :rules="rules" :model="queryInfo">
        <el-form-item label="文件名称" prop="enclosureName">
          <el-input v-model.trim="queryInfo.enclosureName" placeholder="请输入文件名称" />
        </el-form-item>
        <el-form-item label="文件上传" prop="enclosureAddress" class="uploadStyle">
          <el-upload
            ref="upload"
            class="upload-demo"
            name="file"
            multiple
            :limit="1"
            action="http://192.168.5.103:8081/api/uploadSalesContracts"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :on-progress="uploadFileProcess"
            :on-success="(response,file,value) => handleSuccess(response,file)"
            :file-list="fileList"
            :auto-upload="true"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>        </el-form-item>
        <progress
          v-if="showProgress"
          :progressStatus="progressStatus"
          @finishProgress="closeProgress"
        />

      </el-form>
    </div>
    <div style="padding: 0 5px;position:absolute;width:100%;bottom:65px">
      <p class="underLine" />
    </div>
    <div class="dialog-footer">
      <el-button round type="primary" @click="saveToServe"> 确认保存</el-button>
      <el-button round style="border:1px solid #4975E1;color:#5B8BF9;margin-left:68px" @click="addMore">继续新增</el-button>    </div>

  </div>
</template>
<script>
import cardTitile from '@/layout/mixin/cardTitile'
import progress from '@/layout/mixin/progress'
export default {
  components: {
    cardTitile,
    progress
  },

  data() {
    return {
      queryInfo: {
        enclosureName: '',
        enclosureAddress: ''
      },
      showProgress: '',
      progressStatus: '',
      titileName: '相关附件（新增）',
      fileList: [],
      flag: false,
      rules: {
        enclosureName: [
          { required: true, message: '请填写文件名称', trigger: 'blur' }
        ],
        enclosureAddress: [
          { required: true, message: '请上传文件', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    saveToServe() {
      if (!this.flag) {
        this.$message.error('请等待文件上传完毕')
      } else if (this.queryInfo.enclosureName === '' || this.queryInfo.enclosureAddress === '') {
        this.$message.error('请添加必填项')
      } else {
        this.$message.success('添加成功')

        window.console.log(this.queryInfo)
        this.$emit('photoUrl', this.queryInfo)
        this.$emit('closeDialog')
      }
    },
    addMore() {
      if (!this.flag) {
        this.$message.error('请等待文件上传完毕')
      } else if (this.queryInfo.enclosureName === '' || this.queryInfo.enclosureAddress === '') {
        this.$message.error('请添加必填项')
      } else {
        this.$emit('photoUrl', this.queryInfo)
        this.$message.success('添加成功')
        this.fileList = []
        this.queryInfo = {
          enclosureName: '',
          enclosureAddress: ''
        }
      }
    },
    backToMain() {
      this.$emit('closeDialog')
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess(response, file) {
      this.queryInfo.enclosureAddress = response.data[0].url
      this.flag = true
    }
    // 文件上传过程中的函数(在这里获取进度条的进度)
    // uploadFileProcess(event, file, fileList) {
    //   this.flag = false

    // },
    //     closeProgress (val) {
    //     this.showProgress = val
    //     this.progressStatus = val
    // },
    // save () {
    //     this.showProgress = true
    //     setTimeout(() => {
    //         this.progressStatus = true
    //     }, 3000)
    // },
  }
}
</script>

<style scoped>
.uploadStyle {
  height:80px !important;
}
.uploadStyle /deep/ .el-form-item__label{
  line-height:4.5 !important;
}
.uploadStyle /deep/ .el-form-item__content{
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
