<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <div class="content">
      <el-form :rules="rules" :model="queryInfo" label-width="321px" @submit.native.prevent>
        <el-form-item label="系统分类" prop="name">
          <el-input v-model.trim="queryInfo.name" placeholder="请输入" maxlength="100" clearable />
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
import { addData } from '@/api/shenPiPeiZhi'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },

  data() {
    return {
      queryInfo: {
        name: '',
        flag: 1,
        operator: '邓科',
        parentId: '0'
      },
      titileName: '系统分类（新增）',

      rules: {
        name: [
          { required: true, message: '请填写系统名称', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    saveToServe() {
      if (this.queryInfo.name === '') {
        this.$message.error('请填写系统名称')
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
      if (this.queryInfo.name === '') {
        this.$message.error('请填写系统名称')
      } else {
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.queryInfo = {
                      name: '',
        flag: 1,
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
