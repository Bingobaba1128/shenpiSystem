<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <div class="content">
      <el-form :rules="rules" :model="queryInfo" label-width="321px" @submit.native.prevent>
        <el-form-item label="物料分类" prop="classify">
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
import { postData } from '@/api/wuliaofenlei'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },
  props: ['param'],

  data() {
    return {
      queryInfo: {
        classify: this.param.classify,
        operator: '邓科',
        id: this.param.id
      },
      titileName: '物料分类（修改）',

      rules: {
        classify: [
          { required: true, message: '请填写物料分类', trigger: 'blur' }
        ]
        // style: [
        //   { required: true, message: '请填写物料类型', trigger: 'blur' }
        // ]
      }
    }
  },

  methods: {
    saveToServe() {
      if (this.queryInfo.classify === '') {
        this.$message.error('请填写物料分类')
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

</style>
