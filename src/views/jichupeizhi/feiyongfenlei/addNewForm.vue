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
      <el-button class="jiChuConfirmBtn" @click="saveToServe"> 确认保存</el-button>
      <el-button class="jiChuContinueBtn" style="margin-left:68px" @click="addMore">继续新增</el-button>
    </div>

  </div>
</template>
<script>
import { addData } from '@/api/feiyongfenlei'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },

  data() {
    return {
      queryInfo: {
        classify: '',
        operator: '邓科'
      },
      titileName: '费用分类（新增）',

      rules: {
        classify: [
          { required: true, message: '请填写费用分类', trigger: 'blur' }
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
        this.$message.error('请填写费用分类')
      } else {
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$emit('closeDialog')
          }
        })
      }
    },
    addMore() {
      window.console.log(this.queryInfo)
      if (this.queryInfo.classify === '') {
        this.$message.error('请填写费用分类')
      } else {
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.queryInfo = {
              classify: '',
              operator: '邓科'
            }
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
