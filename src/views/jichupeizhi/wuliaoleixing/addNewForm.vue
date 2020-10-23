<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <div class="content">
      <el-form :rules="rules" :model="queryInfo" label-width="321px">
        <el-form-item label="物料分类" prop="classify">
          <el-select v-model="queryInfo.classify" placeholder="请选择" clearable filterable>
            <el-option
              v-for="item in fenLeiList"
              :key="item.classify"
              :label="item.classify"
              :value="item.classify"
              @click.native="bindId(item.id)"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
        <el-form-item label="物料类型" prop="style">
          <el-input v-model.trim="queryInfo.style" placeholder="请输入" maxlength="100" clearable />
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
import { addData, loadData } from '@/api/wuliaoleixing'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },

  data() {
    return {
      queryInfo: {
        style: '',
        classify: '',
        operator: '邓科',
        classifyId: ''
      },
      titileName: '物料类型（新增）',
      fenLeiList: [],
      rules: {
        style: [
          { required: true, message: '请填写物料类型', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请填写物料分类', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.initBaseData()
  },
  methods: {
    initBaseData() {
      var urlParam = '/api/MaterialClassifaction?size=-1'
      loadData(urlParam).then(res => {
        this.fenLeiList = res.data.data
      })
    },
    saveToServe() {
      if (this.queryInfo.classify === '') {
        this.$message.error('请选择物料分类')
      } else if (this.queryInfo.style === '') {
        this.$message.error('请填写物料类型')
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
      if (this.queryInfo.classify === '') {
        this.$message.error('请选择物料分类')
      } else if (this.queryInfo.style === '') {
        this.$message.error('请填写物料类型')
      } else {
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.queryInfo = {
              style: '',
              classify: '',
              operator: '邓科'
            }
          }
        })
      }
    },
    backToMain() {
      this.$emit('closeDialog2')
    },
    bindId(id) {
      this.queryInfo.classifyId = id
    }
  }
}
</script>

<style scoped>

</style>
