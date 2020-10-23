<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <el-row :gutter="10" style="padding:0 20px; margin-left:0;margin-right:0">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display:flex" @submit.native.prevent>
        <el-form-item label="物料名称 :">
          <el-input v-model="queryInfo.name" placeholder="" clearable @keyup.enter.native="searchDataM" />
        </el-form-item>
        <el-form-item class="function">
          <el-button class="indexButton" icon="el-icon-search" style="float:none" @click="searchDataM">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="padding:0 20px;display: flex; flex-direction:column">
      <el-table ref="table" :data="tableData" border style="height:100%;flex:none" :header-cell-style="{background:'#eef1f6',color:'#606266'}" @selection-change="handleSelectionChange">
        <el-table-column
          label="全选"
          type="selection"
          width="80"
          :selectable="selectInit"
        />
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="物料分类" prop="classify" show-overflow-tooltip />
        <el-table-column label="物料类型" prop="style" show-overflow-tooltip />
        <el-table-column label="物料编号" prop="no" show-overflow-tooltip />
        <el-table-column label="物料名称" prop="name" show-overflow-tooltip />
        <el-table-column label="规格/幅宽" prop="sec" show-overflow-tooltip />
        <el-table-column label="采购总价/元" prop="purchasePrice" show-overflow-tooltip width="120" />
        <el-table-column label="采购总量" prop="purchaseQuantity" show-overflow-tooltip />
        <el-table-column label="采购单位" prop="purchaseUnit" show-overflow-tooltip width="120" />
        <el-table-column label="换算数" prop="changeQuantity" show-overflow-tooltip />
        <el-table-column label="单价/元" prop="price" show-overflow-tooltip />
        <el-table-column label="计量单位" prop="unit" show-overflow-tooltip />
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
    <div class="paddindSpace" style="padding-top:20px; padding-bottom: 0px">
      <el-button round type="primary" @click="saveToServe">确定选择</el-button>
    </div>

  </div>
</template>
<script>
import { loadData, addData, searchData } from '@/api/caigouhetong'
import cardTitile from '@/layout/mixin/cardTitile'
import { toUrlParam } from '@/utils/toUrlParam'
import { combineObject } from '@/utils/combineObject'

export default {
  components: {
    cardTitile
  },
  props: ['param', 'param1', 'param2'],
  data() {
    return {
      queryInfo: {
        name: ''
      },
      titileName: '请选择',
      idList: [],
      totalSize: '',
      initAllData: '',
      pageSetting: {
        current: 1,
        size: 10
      },
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: 'id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
      tableData: [], // 表格数据
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
    this.initData()
  },
  methods: {
    initData() {
      window.console.log(this.param2)
      var url = '/api/MaterialManagement?classify=' + this.param2.classifaction + '&style=' + this.param2.style + '&'
      // var url = '/api/MaterialManagement?'

      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var urlParam = toUrlParam(url, searchInfo)

      loadData(urlParam).then(res => {
        this.totalSize = res.data.count
        this.tableData = res.data.data
        setTimeout(() => {
          this.setSelectRow()
        }, 200)
      })
    },
    searchDataM() {
      this.pageSetting.current = 1
      var url = '/api/MaterialManagement?classify=' + this.param2.classifaction + '&style=' + this.param2.style + '&'
      // var url = '/api/MaterialManagement?'
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)

      var urlParam = toUrlParam(url, searchInfo)
      searchData(urlParam).then(res => {
        this.tableData = res.data.data
        this.totalSize = res.data.count
      })
    },
    saveToServe() {
      var flag = true

      // if (this.multipleSelectionAll.length <= 0) {
      //   this.multipleSelectionAll = this.multipleSelection
      // }
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
      }

      if (this.param2.length === 0) {
        this.$emit('closeSelectDialog', this.multipleSelectionAll)
      } else {
        // this.multipleSelectionAll.concat(this.multipleSelection)

        for (var i = 0; i < this.multipleSelectionAll.length; i++) {
          for (var j = 0; j < this.param2.length; j++) {
            if (this.multipleSelectionAll[i].id === this.param2[j].id) {
              flag = false
            }
          }
        }
        if (!flag) {
          this.$message.error('采购入库详单已被添加')
        } else {
          this.$emit('closeSelectDialog', this.multipleSelectionAll)
        }
      }
    },
    	 selectInit(row, index) {
      var list1 = []
      this.param1.map(item => {
        list1.push(item.id)
      })
      if (list1.indexOf(row.id) >= 0) {
        return false
      } else {
        return true
      }
    },
    // 	 selectInit(row,index){
    //   var list1 = []
    //   this.param2.map(item => {
    //     list1.push(item.id)
    //   })
    //   if(list1.indexOf(row.id) >= 0){
    //     return false
    //   } else {
    //     return true
    //   }
    // },
    backToMain() {
      this.$emit('closeDialog2')
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
      this.changePageCoreRecordData()
      this.pageSetting.current = val
      this.initData()
    },
    handleSizeChange(val) {
      this.changePageCoreRecordData()
      this.pageSetting.size = val
      this.initData()
    },
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const selectAllIds = []
      const that = this
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      this.$refs.table.clearSelection()
      for (var i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true)
        }
      }
    },
    // 得到选中的所有数据
    getAllSelectionData() {
      // 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
      this.changePageCoreRecordData()
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const that = this
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // 总选择里面的key集合
      const selectAllIds = []
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      const selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey])
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row)
        }
      })
      const noSelectIds = []
      // 得到当前页没有选中的id
      this.tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey])
        }
      })
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1)
              break
            }
          }
        }
      })
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
