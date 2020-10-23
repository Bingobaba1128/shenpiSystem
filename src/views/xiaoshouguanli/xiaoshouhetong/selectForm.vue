<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <el-row :gutter="10" style="padding:0 20px; margin-left:0;margin-right:0">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display:flex" @submit.native.prevent>
        <el-form-item label="款号:">
          <el-input v-model="queryInfo.kuanHao" placeholder="" clearable @keyup.enter.native="searchDataM1" />
        </el-form-item>
        <el-form-item class="function">
          <el-button class="indexButton" icon="el-icon-search" style="float:none" @click="searchDataM1">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="padding:0 20px;display: flex; flex-direction:column">
      <el-table
        ref="table11"
        v-loading="listLoading"
        element-loading-text="努力加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255, 255, 0.9)"
        empty-text=" "
        :data="tableData"
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
          :selectable="selectInit"
        />
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column label="布编" prop="clothId" />
        <el-table-column label="款号" prop="kuanHao" />
        <el-table-column label="品名" prop="pinName" />
        <el-table-column label="码数" prop="size" />
        <el-table-column label="颜色" prop="cloor" />
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
      <el-button round style="background-color:#5C8CFA;color:#fff" @click="saveToServe">保存</el-button>
      <el-button style="margin-left:46px" type="info" round @click="backToMain">退出</el-button>
    </div>

  </div>
</template>
<script>
import { loadData, searchData } from '@/api/caigouhetong'
import cardTitile from '@/layout/mixin/cardTitile'
import { toUrlParam } from '@/utils/toUrlParam'
import { combineObject } from '@/utils/combineObject'

export default {
  components: {
    cardTitile
  },
  props: ['param'],

  data() {
    return {
      queryInfo: {
        kuanHao: ''
      },
      selectedList: [],
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      currentSelection: [],
      idKey: 'id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
      tableData: [], // 表格数据
      titileName: '请选择',
      totalSize: '',
      pageSetting: {
        current: 1,
        size: 10
      },
      listLoading: true,
      flag: false

    }
  },

  created() {
    this.initData(this.pageSetting)
  },
  methods: {
    initData() {
      this.listLoading = true
      var url = '/api/Contract/getKuanHao?'
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)

      var urlParam = toUrlParam(url, searchInfo)
      loadData(urlParam).then(res => {
        this.listLoading = false
        this.totalSize = res.data.count
        this.tableData = res.data.data
        setTimeout(() => {
          this.setSelectRow()
        }, 200)
      })
    },
    // query(){
    //   var url = '/api/Contract/getKuanHao?'
    //   var searchInfo = combineObject(this.queryInfo, this.pageSetting)
    //   var urlParam = toUrlParam(url, searchInfo)
    //   loadData(urlParam).then(async res => {
    //     if(response){
    //       this.totalSize = await res.data.count
    //       this.tableData = await res.data.data
    //       this.setSelectRow()
    //     }

    //     setTimeout(() => {
    //       this.setSelectRow()
    //     }, 200)
    //   })
    // },
    searchDataM1() {
      // this.totalSize = 0
      // this.pageSetting.size = 10
      this.pageSetting.current = 1
      var url = '/api/Contract/getKuanHao?'
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var urlParam = toUrlParam(url, searchInfo)
      searchData(urlParam).then(res => {
        this.tableData = res.data.data
        this.totalSize = res.data.count
      })
    },
    selectInit(row, index) {
      var list1 = []
      this.param.map(item => {
        list1.push(item.id)
      })
      if (list1.indexOf(row.id) >= 0) {
        return false
      } else {
        return true
      }
    },
    saveToServe() {
      this.saveCurrent()

      var flag = false
      window.console.log(this.multipleSelection, 'curren page selected ')
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
      }
      window.console.log(this.multipleSelectionAll, 'selecteteall')
      window.console.log(this.param, 'param')
      this.multipleSelectionAll.map(selectItem => {
        this.param.map(item => {
          if (selectItem.id === item.id) {
            flag = true
          }
        })
      })
      if (flag) {
        window.console.log(this.multipleSelectionAll)
        window.console.log(this.param)
        this.$message.error('存在已被添加款号信息')
      } else {
        this.$emit('haveInfo', this.multipleSelectionAll)
        this.$emit('closeDialog1')
      }
    },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.table.toggleRowSelection(row)
    //     })
    //   } else {
    //     this.$refs.table.clearSelection()
    //   }
    // },
    startLoading() { // 使用Element loading-start 方法
      loading = Loading.service({
        lock: true,
        text: '努力加载中...……',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    handleSelectionChange(val) {
      this.currentSelection = []
      this.multipleSelection = val
      // this.changePageCoreRecordData()
      window.console.log(val, 'currentSelect')
      this.multipleSelection.map(item => {
        var flag = true
        this.multipleSelectionAll.map(item1 => {
          if (item.id === item1.id) {
            flag = false
          }
        })
        if (flag) {
          this.currentSelection.push(item)
        }
      })
    },
    saveCurrent() {
      this.currentSelection.map(item => {
        var flag1 = true
        this.multipleSelectionAll.map(item1 => {
          if (item.id === item1.id) {
            flag1 = false
          }
        })
        if (flag1) {
          this.multipleSelectionAll.push(item)
        }
      })
    },
    async handleCurrentChange(val) {
      this.saveCurrent()

      this.changePageCoreRecordData()

      this.pageSetting.current = val

      this.initData()
    },
    async handleSizeChange(val) {
      this.saveCurrent()
      this.changePageCoreRecordData()

      this.pageSetting.size = val

      this.initData()
    },
    backToMain() {
      this.$emit('closeDialog2')
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
      this.$refs.table11.clearSelection()
      for (var i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table11.toggleRowSelection(this.tableData[i], true)
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
.el-dialog{
  flex-direction: column !important;
}
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
