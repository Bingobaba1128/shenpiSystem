<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <div class="content">
      <el-form :rules="rules" :model="queryInfo" label-width="321px" @submit.native.prevent>
        <el-form-item label="费用分类" prop="classify">
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
        <el-form-item label="费用类型" prop="style">
          <el-input v-model.trim="queryInfo.style" placeholder="请输入" maxlength="100" clearable />
        </el-form-item>
      </el-form>

    </div>
    <div class="footer">
      <el-button class="jiChuConfirmBtn" @click="saveToServe">保存</el-button>
    </div>

  </div>
</template>
<script>
import { postData, loadData } from '@/api/feiyongleixing'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },
  props: ['param'],
  data() {
    return {
      queryInfo: {
        style: this.param.style,
        classify: this.param.classify,
        operator: '邓科',
        classifyId: this.param.classifyId,
        id: this.param.id
      },
      titileName: '费用类型（修改）',
      fenLeiList: [],
      rules: {
        style: [
          { required: true, message: '请填写费用分类', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请填写费用类型', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.initBaseData()
  },
  methods: {
    initBaseData() {
      var urlParam = '/api/FeeManagement/getDistinctClassification?size=-1'
      loadData(urlParam).then(res => {
        this.fenLeiList = res.data.data
      })
    },
    saveToServe() {
      if (this.queryInfo.classify === '') {
        this.$message.error('请填写费用分类')
      } else if (this.queryInfo.style === '') {
        this.$message.error('请填写费用类型')
      } else {
        if (this.queryInfo.style === this.param.style && this.queryInfo.classify === this.param.classify) {
          this.$message.success('保存成功')
          this.$emit('closeDialog')
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
      }
    },
    addMore() {
      window.console.log(this.queryInfo)
      if (this.queryInfo.unit === '') {
        this.$message.error('请填写单位名称')
      } else {
        postData(this.queryInfo).then(res => {
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
