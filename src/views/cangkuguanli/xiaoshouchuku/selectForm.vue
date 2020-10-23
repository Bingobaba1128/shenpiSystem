<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :close="true" />
    <!-- <el-row :gutter="10" style="padding:0 20px; margin-left:0;margin-right:0">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display:flex">
        <el-form-item label="销售合同:">
          <el-input v-model="queryInfo.contractNo" placeholder="" clearable />
        </el-form-item>
        <el-form-item class="function">
          <el-button type="primary" style="float:none" icon="el-icon-search" @click="searchDataM">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row> -->
    <el-row style="padding:0 20px;display: flex; flex-direction:column">
      <el-table :data="initAllData" border style="height:100%;flex:none" :header-cell-style="{background:'#eef1f6',color:'#606266'}" @selection-change="handleSelectionChange">
        <el-table-column
          label="全选"
          type="selection"
          width="80"
        />
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column label="编号" prop="id" />

        <el-table-column label="款号" prop="kuanHao" />
        <el-table-column label="码数" prop="size" />
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

export default {
  components: {
    cardTitile
  },
  props: ['param', 'param2'],
  data() {
    return {
      queryInfo: {
        contractNo: ''
      },
      titileName: '请选择',
      idList: [],
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
      var urlParam = '/api/Contract?contractNo=' + this.param
      loadData(urlParam).then(res => {
        this.totalSize = res.data.count
        this.initAllData = res.data.data[0].listD
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
      var flag = true
      window.console.log(this.multipleSelection[0].id)
      window.console.log(this.param2)

      for (var i = 0; i < this.multipleSelection.length; i++) {
        for (var j = 0; j < this.param2.length; j++) {
          if (this.multipleSelection[i].id === this.param2[j].id) {
            flag = false
          }
        }
      }
      if (!flag) {
        this.$message.error('发货申请详单已被添加')
      } else {
        this.multipleSelection.map(item => {
          this.idList.push(item.id)
        })
        this.$emit('closeSelectDialog', this.idList)
      }
    },
    backToMain() {
      this.$emit('closeDialoga')
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
