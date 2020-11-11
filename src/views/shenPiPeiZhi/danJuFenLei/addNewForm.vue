<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <div class="content">
      <el-form :rules="rules" :model="queryInfo" label-width="321px" @submit.native.prevent>
        <el-form-item label="系统名称" prop="systemName">
          <el-select v-model="queryInfo.systemName" placeholder="请选择" clearable filterable>
            <el-option
              v-for="item in fenLeiList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
              @click.native="bindId(item.id)"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
        <el-form-item label="单据名称" prop="name">
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
import { addData, loadData } from '@/api/shenPiPeiZhi'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },

  data() {
    return {
      queryInfo: {
        parentId: '',
        flag: 2,
        recordMan: '邓科',
        systemName: '',
        name: ''
      },
      titileName: '单据分类（新增）',
      fenLeiList: [],
      rules: {
        name: [
          { required: true, message: '请填写系统名称', trigger: 'blur' }
        ],
        systemName: [
          { required: true, message: '请填写单据名称', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.initBaseData()
  },
  methods: {
    initBaseData() {
      var urlParam = '/api/ApproveSystem?flag=1'
      loadData(urlParam).then(res => {
        this.fenLeiList = res.data.data
      })
    },
    saveToServe() {
      if (this.queryInfo.parentId === '') {
        this.$message.error('请选择系统名称')
      } else if (this.queryInfo.name === '') {
        this.$message.error('请填写单据名称')
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
      if (this.queryInfo.parentId === '') {
        this.$message.error('请选择系统名称')
      } else if (this.queryInfo.name === '') {
        this.$message.error('请填写单据名称')
      } else {
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.queryInfo = {
              parentId: '',
              flag: 2,
              recordMan: '邓科',
              systemName: '',
              name: ''
            }
          }
        })
      }
    },
    backToMain() {
      this.$emit('closeDialog2')
    },
    bindId(id) {
      this.queryInfo.parentId = id
    }
  }
}
</script>

<style scoped>

</style>
