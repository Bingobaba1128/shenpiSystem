<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" />
    <el-row :gutter="10" style="padding:0 20px; margin-left:0;margin-right:0">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="销售合同:">
          <el-input v-model="queryInfo.contractNo" placeholder="" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchDataM">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="padding:0 20px;display: flex; flex-direction:column;height:80%">
      <el-table :data="initAllData" border style="height:100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}" @selection-change="handleSelectionChange">
        <el-table-column
          label="全选"
          type="selection"
          width="80"
        />
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column label="销售合同号" prop="contractNo" />
        <el-table-column label="客户名称" prop="clientName" />
        <el-table-column label="款号">
          <template slot-scope="scope">
            <div v-if="scope.row.listD.length !== 0">
              <p v-for="(item) in scope.row.listD" :key="item.id" style="margin:0px">
                {{ item.kuanHao }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="业务员" prop="employeeName" />
      </el-table>
      <el-row style="height: 60px;display:flex;background-color:#F6F8FC">
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
    <div class="paddindSpace" style="padding-top:30px; padding-bottom: 30px">
      <el-button round type="primary" @click="saveToServe">确定选择</el-button>
    </div>

  </div>
</template>
<script>
import { loadData, addData, searchData } from '@/api/caigouhetong'
import cardTitile from '@/layout/mixin/cardTitile'
import { toUrlParam } from '@/utils/toUrlParam'
import { combineObject } from '@/utils/combineObject'
import { Loading } from 'element-ui'
let loading

export default {
  components: {
    cardTitile
  },

  data() {
    return {
      queryInfo: {
        contractNo: ''
      },
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
      this.startLoading()

      var url = '/api/Contract?'
      var urlParam = toUrlParam(url, pageSetting)
      loadData(urlParam).then(res => {
        loading.close()

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
        this.$router.push({ path: '/采购合同新增', query: { contractNo: this.multipleSelection[0].contractNo }})
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
