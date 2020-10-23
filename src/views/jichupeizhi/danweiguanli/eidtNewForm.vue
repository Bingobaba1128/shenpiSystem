<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />

    <div class="content">
      <el-form :rules="rules" :model="queryInfo" label-width="321px" @submit.native.prevent>
        <el-form-item label="单位" prop="unit">
          <el-input v-model.trim="queryInfo.unit" placeholder="请输入" maxlength="100" clearable />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button class="jiChuConfirmBtn" @click="saveToServe">保存</el-button>
    </div>
  </div>
</template>
<script>
import { postData } from '@/api/danweiguanli'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },
  props: ['param'],
  data() {
    return {
      titileName: '单位管理(修改)',
      queryInfo: {
        unit: this.param.unit,
        operator: '邓科',
        id: this.param.id
      },
      rules: {
        unit: [
          { required: true, message: '请填写单位名称', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    saveToServe() {
      if (this.queryInfo.unit === '') {
        this.$message.error('请填写单位名称')
      } else {
        postData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$emit('closeDialog')
          }
        })
      }
    },
    backToMain() {
      this.$emit('closeDialog2')
    }
  }
}
</script>

<style scoped>
.paddindSpace{
  padding-top: 20px;
  display: flex;
  justify-content: center;
}

.paddindSpace .el-form  .el-form-item{
  margin-top: 20px;
  padding-bottom: 20px ;
}
</style>
