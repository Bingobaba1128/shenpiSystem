<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" />
    <div class="paddindSpace">
      <el-form :label-position="left" :rules="rules" :model="data" label-width="80px" class="demo-ruleForm">

        <el-form-item label="物料名称" prop="excipientsType">
          <el-input v-model.trim="data.excipientsType" placeholder="最多输入十个字" />
        </el-form-item>
        <el-form-item label="物料类别" prop="excipientsType">
          <el-select v-model="data.excipientsType" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="计量单位" prop="excipientsType">
          <el-select v-model="data.excipientsType" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="颜色" prop="excipientsType">
          <el-select v-model="data.excipientsType" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="paddindSpace" style="padding-top:30px; padding-bottom: 30px">
      <el-button round type="primary" @click="saveToServe"> 确认保存</el-button>
      <el-button round type="primary" plain>继续新增</el-button>

    </div>

  </div>
</template>
<script>
import { saveNewForm } from '@/api/fuliaofenlei'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },
  data() {
    return {
      data: {
        excipientsType: ''
      },
      titileName: '单位管理',

      rules: {
        excipientsType: [
          { required: true, message: '请填写计量单位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    saveToServe() {
      if (this.data.excipientsType === '') {
        this.$message.error('请填写计量单位')
      } else {
        saveNewForm(this.data).then(res => {
          window.console.log(res)
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$emit('closeDialog')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.el-form-item {
  padding-bottom: 20px;
}
.paddindSpace{
  padding-top: 20px;
  display: flex;
    justify-content: center;
}
</style>
