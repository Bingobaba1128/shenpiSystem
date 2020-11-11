<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <div class="content">
      <el-form :rules="rules" :model="queryInfo" label-width="321px" @submit.native.prevent>
        <el-form-item label="费用分类" prop="classify">
          <el-select v-model="queryInfo.classify" placeholder="请选择" filterable clearable>
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
      <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
        <el-form-item label="费用类型" prop="style">
          <el-select v-model="queryInfo.style" placeholder="请选择" filterable clearable>
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
      <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none">
        <el-form-item label="费用名称" prop="name">
          <el-input v-model.trim="queryInfo.name" placeholder="请输入" maxlength="100" clearable />
        </el-form-item>
      </el-form>
      <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none">
        <el-form-item label="单价(元/含税)" prop="price">
          <el-input v-model.trim="queryInfo.price" placeholder="请输入" maxlength="100" clearable />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button class="jiChuConfirmBtn" @click="saveToServe">保存</el-button>
    </div>

  </div>
</template>
<script>
import { postData, loadData } from '@/api/feiyongguanli'
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
        name: this.param.name,
        price: this.param.price,
        styleId: this.param.styleId,
        operator: '邓科',
        id: this.param.id
      },
      titileName: '费用管理（修改）',
      fenLeiList: [],
      LeiXingList: [],
      rules: {
        classify: [
          { required: true, message: '请填写费用分类', trigger: 'blur' }
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
      var urlParam = '/api/FeeManagement/getDistinctClassification?size=-1'
      loadData(urlParam).then(res => {
        this.fenLeiList = res.data.data
      })
      var urlParam1 = '/api/FeeStyle?size=-1&classify=' + this.param.classify
      loadData(urlParam1).then(res => {
        this.LeiXingList = res.data.data
      })
    },
    searchLeiXing(val) {
      this.queryInfo.style = ''
      var urlParam = '/api/FeeStyle?classify=' + val
      loadData(urlParam).then(res => {
        this.LeiXingList = res.data.data
      })
    },
    saveToServe() {
      if (this.queryInfo.classify === '' || this.queryInfo.style === '') {
        this.$message.error('请填写必填项')
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
    },
    bindId(id) {
      this.queryInfo.styleId = id
    }
  }
}
</script>

<style scoped>

</style>
