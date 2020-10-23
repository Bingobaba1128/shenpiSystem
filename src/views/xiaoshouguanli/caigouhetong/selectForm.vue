<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <el-row :gutter="10" style="padding:0 20px; margin-left:0;margin-right:0">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display:flex" @submit.native.prevent>
        <el-form-item label="销售合同:">
          <el-input v-model="queryInfo.contractNo" placeholder="" clearable @keyup.enter.native="searchDataM" />
        </el-form-item>
        <el-form-item class="function">
          <el-button type="primary" icon="el-icon-search" style="float:none" @click="searchDataM">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="padding:0 20px;display: flex; flex-direction:column">
      <el-table
        v-loading="listLoading"
        element-loading-text="努力加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255, 255, 0.9)"
        :data="initAllData"
        empty-text=" "
        border
        height="100%"
        style="flex:none"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="全选"
          type="selection"
          width="80"
        />
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="销售合同号" prop="contractNo" show-overflow-tooltip />
        <el-table-column label="客户" prop="clientName" show-overflow-tooltip />
        <el-table-column label="款号" prop="kuanNo" show-overflow-tooltip />
        <!-- <template slot-scope="scope">
            <p v-for="(item) in scope.row.kuanNo" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column> -->

        <el-table-column label="业务员" prop="employeeName" />
        <el-table-column label="签订日期" prop="signDate" />
      </el-table>
      <el-row style="height: 60px;display:flex;background-color:#F6F8FC;padding-top:20px">
        <el-pagination
          style="align-self:center;margin-left:auto;margin-right:10px"
          background
          layout="prev, pager, next,sizes,jumper"
          :total="totalSize"
          :current-page="pageSetting.current"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </el-row>
    <div class="paddindSpace" style="padding-top:20px; padding-bottom: 20px">
      <el-button round type="primary" @click="saveToServe">保存</el-button>
      <el-button style="margin-left:46px" type="info" round @click="backToMain">退出</el-button>
    </div>

  </div>
</template>
<script>
import { loadData, searchData } from '@/api/caigouhetong'
import cardTitile from '@/layout/mixin/cardTitile'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  components: {
    cardTitile
  },

  data() {
    return {
      queryInfo: {
        contractNo: ''
      },
      listLoading: true,
      titileName: '请选择',
      totalSize: '',
      initAllData: '',
      pageSetting: {
        current: 1,
        size: 10
      },
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
    this.initData(this.pageSetting)
  },
  methods: {
    initData(pageSetting) {
      this.listLoading = true
      var url = '/api/Contract?address_1=1&'
      var urlParam = toUrlParam(url, pageSetting)
      loadData(urlParam).then(res => {
        this.listLoading = false
        this.totalSize = res.data.count
        this.initAllData = res.data.data
      })
    },

    searchDataM() {
      this.pageSetting.size = 10
      this.pageSetting.current = 1
      var url = '/api/Contract?'
      var urlParam = toUrlParam(url, this.queryInfo)
      searchData(urlParam).then(res => {
        this.initAllData = res.data.data
        this.totalSize = res.data.count
      })
    },
    saveToServe() {
      if (this.multipleSelection.length === 0 || this.multipleSelection.length > 1) {
        this.$message.error('请选择一条合同号')
      } else {
        this.$emit('haveContractNo', this.multipleSelection[0].contractNo)
        this.$emit('closeDialog1')
        // this.$router.push({ path: '/采购合同新增', query: { contractNo: this.multipleSelection[0].contractNo }})
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    startLoading() { // 使用Element loading-start 方法
      loading = Loading.service({
        lock: true,
        text: '努力加载中...……',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData(this.pageSetting)
    },
    handleSizeChange(val) {
      this.pageSetting.size = val
      this.initData(this.pageSetting)
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
