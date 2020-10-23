<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <div class="content">
      <el-form :rules="rules" :model="queryInfo" label-width="321px">
        <el-form-item label="物料分类" prop="classify">
          <el-select v-model="queryInfo.classify" placeholder="请选择" filterable>
            <el-option
              v-for="item in fenLeiList"
              :key="item.classify"
              :label="item.classify"
              :value="item.classify"
              @click.native="searchLeiXing(item.classify)"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :rules="rules" :model="queryInfo" label-width="321px">
        <el-form-item label="物料类型" prop="style">
          <el-select v-model="queryInfo.style" placeholder="请选择" filterable>
            <el-option
              v-for="item in LeiXingList"
              :key="item.style"
              :label="item.style"
              :value="item.style"
              @click.native="bindId(item.id)"
            />
          </el-select>
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
import { addData, loadData } from '@/api/wuliaoguanli'
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
        styleId: '',
        state: '否',
        operator: '邓科'
      },
      titileName: '新增物料',
      fenLeiList: [],
      LeiXingList: [],
      rules: {
        classify: [
          { required: true, message: '请填写物料分类', trigger: 'blur' }
        ],
        style: [
          { required: true, message: '请填写物料类型', trigger: 'blur' }
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
    searchLeiXing(val) {
      this.queryInfo.style = ''
      var urlParam = '/api/MaterialStyle?size=-1&classify=' + val
      loadData(urlParam).then(res => {
        this.LeiXingList = res.data.data
      })
    },
    saveToServe() {
      if (this.queryInfo.classify === '' || this.queryInfo.style === '') {
        this.$message.error('请选择必填项')
      } else {
        this.$emit('closeDialogWithParam', this.queryInfo)
      }
    },
    addMore() {
      if (this.queryInfo.classify === '' || this.queryInfo.style === '') {
        this.$message.error('请选择必填项')
      } else {
        this.$emit('passParam', this.queryInfo)

        this.queryInfo = {
          style: '',
          classify: '',
          styleId: '',
          state: '否',
          operator: '邓科'
        }
      }
    },
    backToMain() {
      this.$emit('closeDialog2')
    },
    bindId(id) {
      this.queryInfo.styleId = id
    }
  }
}
</script>

<style scoped>

</style>
