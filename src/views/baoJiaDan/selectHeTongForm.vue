<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <el-row style="padding:0 20px;display: flex; flex-direction:column">
      <el-table :data="param" border style="height:100%;flex:none" :header-cell-style="{background:'#eef1f6',color:'#606266'}" @selection-change="handleSelectionChange">
        <el-table-column
          label="全选"
          type="selection"
          width="80"
        />
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column label="采购合同号" prop="purchaseNo" show-overflow-tooltip />
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
import { Loading } from 'element-ui'
let loading

export default {
  components: {
    cardTitile
  },
  props: ['param'],

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
      }

    }
  },

  methods: {
    saveToServe() {
      if (this.multipleSelection.length === 0 || this.multipleSelection.length > 1) {
        this.$message.error('请选择一条合同号')
      } else {
        this.$emit('haveContractNo', this.multipleSelection[0])
        this.$emit('closeSelectHeTongDialog')
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
      this.$emit('closeSelectHeTongDialog')
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
