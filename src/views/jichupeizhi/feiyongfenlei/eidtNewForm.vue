<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />

    <div class="content">
      <el-form :rules="rules" :model="queryInfo" label-width="321px" @submit.native.prevent>
        <el-form-item label="费用分类" prop="classify">
          <el-input v-model.trim="queryInfo.classify" placeholder="请输入" maxlength="100" clearable />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button class="jiChuConfirmBtn" @click="saveToServe">保存</el-button>
    </div>
  </div>
</template>
<script>
import { postData } from '@/api/feiyongfenlei'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },
  props: ['param'],
  data() {
    return {
      titileName: '费用分类(修改)',
      queryInfo: {
        classify: this.param.classify,
        operator: '邓科',
        id: this.param.id
      },
      rules: {
        classify: [
          { required: true, message: '请填写费用分类', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    saveToServe() {
      if (this.queryInfo.classify === '') {
        this.$message.error('请填写费用分类')
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
