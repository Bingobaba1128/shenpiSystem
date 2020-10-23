<template>
  <el-card>
    <cardTitile :param="titileName" :show="false" />
    <!-- 检索区 -->
    <el-row :gutter="10" style="padding:0 16px; margin-left:0;margin-right:0;padding-bottom:0" class="specialSelect">
      <el-col :lg="21" style="leftPart">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" @submit.native.prevent>
          <el-row class="special">
            <el-col :span="6">
              <el-form-item label="签订日期 :">
                <el-date-picker
                  v-model="queryInfo.signDate"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="searchDataM"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务部门 :">
                <el-select v-model="queryInfo.deptName" placeholder="全部" clearable @clear="clearData">
                  <el-option
                    v-for="item in yeWuDeptList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptName"
                    @click.native="bindYeWuId(item.deptId)"
                    @change="searchDataM"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务员 :">
                <el-select v-model="queryInfo.employeeName" placeholder="全部" clearable @change="searchDataM">
                  <el-option
                    v-for="item in yeWuPerson"
                    :key="item.employeeId"
                    :label="item.employeeName"
                    :value="item.employeeName"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户名称 :">
                <el-input v-model.trim="queryInfo.clientName" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" @submit.native.prevent />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-bottom:0">
            <el-col :span="6">
              <el-form-item label="客户合同号 :">
                <el-input v-model.trim="queryInfo.clientContractNo" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" @submit.native.prevent />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="采购合同号 :">
                <el-input v-model.trim="queryInfo.purchaseNo" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" @submit.native.prevent />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="款号 :">
                <el-input v-model.trim="queryInfo.kuanHao" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" @submit.native.prevent />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单状态 :">
                <el-select v-model="queryInfo.state" placeholder="全部" clearable @change="searchDataM">
                  <el-option
                    v-for="item in stateList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  />
                </el-select>              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </el-col>

      <el-col :lg="3" class="rightPart">
        <el-row style="padding-bottom: 20px" class="function">
          <el-button class="indexButton" icon="el-icon-search" style="margin-left:0px" @click="searchDataM">查询</el-button>

          <el-button class="orangeBtnClass" icon="el-icon-refresh" style="margin-left:16px" @click="refreshSearch">重置</el-button>

        </el-row>

      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-dialog v-if="dialogAddTableVisible" :visible.sync="dialogAddTableVisible">
      <selectForm @closeDialog="closeDialog" />
    </el-dialog>

    <el-row style="padding:0 20px;display: flex; flex-direction:column;height:700px">
      <el-row style="padding-bottom:0">
        <div style="display:flex">
          <p class="special1" style="color:#FDCF7A">即将到期</p>
          <p class="special2" style="color:#E17F2E; margin-left:10px">已经超期</p>
        </div>
      </el-row>
      <el-table
        v-loading="listLoading"
        element-loading-text="努力加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255, 255, 0.9)"
        empty-text=" "
        :max-height="$tableHeight"
        :row-class-name="tableRowClassName"
        :data="initAllData"
        border
        height="100%"
        style="margin-top:0"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="80" fixed="left" />
        <el-table-column label="签订日期" prop="signDate" width="120" show-overflow-tooltip />
        <el-table-column label="业务部门" prop="deptName" width="120" show-overflow-tooltip />
        <el-table-column label="业务员" prop="employeeName" width="120" show-overflow-tooltip />
        <el-table-column label="客户名称" prop="clientName" width="280" show-overflow-tooltip />
        <el-table-column label="品牌" prop="pinName" width="150" show-overflow-tooltip />
        <el-table-column label="客户合同号" prop="clientContractNo" width="150" show-overflow-tooltip />
        <el-table-column label="销售合同号" prop="contractNo" width="150" show-overflow-tooltip />
        <el-table-column label="款号" prop="kuanHao" width="150" show-overflow-tooltip />
        <el-table-column label="单位" prop="unit" width="100" show-overflow-tooltip />
        <el-table-column label="合计数量" prop="contractQuantity" width="120" show-overflow-tooltip />
        <el-table-column label="销售合同交期" prop="contractDate" width="120" show-overflow-tooltip />
        <el-table-column label="采购合同交期" prop="purchaseDate" width="120" show-overflow-tooltip />
        <el-table-column label="采购合同号" prop="purchaseNo" width="150" show-overflow-tooltip />
        <el-table-column label="采购入库日期" prop="ruKuDate" width="120" show-overflow-tooltip />
        <el-table-column label="采购入库数量" prop="ruKuQuantity" width="120" show-overflow-tooltip />
        <el-table-column label="发货申请日期" prop="applyDate" width="120" show-overflow-tooltip />
        <el-table-column label="发货申请数量" prop="applyQuantity" width="120" show-overflow-tooltip />
        <el-table-column label="销售出库日期" prop="chuKuDate" width="120" show-overflow-tooltip />
        <el-table-column label="销售出库数量" prop="chuKuQuantity" width="120" show-overflow-tooltip />

      </el-table>
      <el-row style="height: 60px;display:flex;background-color:#F6F8FC;margin-bottom: 12px;padding-bottom:0">
        <el-pagination
          style="align-self:center;margin-left:auto;margin-right:10px"
          background
          layout="prev, pager, next,sizes,slot"
          :total="totalSize"
          :current-page="pageSetting.current"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
          <span class="pageFYWZ">
            跳至
            <el-input v-model.number="current" class="pageFYInput" type="number" @mousewheel.native.prevent @change="pageCurrentChange" />
            页
          </span>
          <el-link :underline="false" class="pageGo" @click="pageGo">GO</el-link>
        </el-pagination>
      </el-row>
    </el-row>

  </el-card>
</template>

<script>
import { baseUrl } from '@/api/apiUrl'
import { payWayList, booleanList, qiyeList, provinceList, dizhiList } from '@/utils/listVar'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadData, searchData, deleteRecord, loadYwDept, loadYeWuPerson } from '@/api/caigouhetong'
import { combineObject } from '@/utils/combineObject'

import selectForm from '@/views/xiaoshouguanli/caigouhetong/selectForm'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  name: 'Dahuogendanjindubiao',

  components: {
    cardTitile,
    selectForm
  },

  data() {
    return {
      initAllData: '',
      listLoading: true,
      payWayList: payWayList,
      booleanList: booleanList,
      qiyeList: qiyeList,
      provinceList: provinceList,
      dizhiList: dizhiList,
      queryInfo: {
        signDate: this.getInitDate(),
        deptName: '',
        employeeName: '',
        clientName: '',
        clientContractNo: '',
        purchaseNo: '',
        kuanHao: '',
        state: ''
      },
      titileName: '大货跟单进度表',
      value: '',
      editData: '',
      totalSize: '',
      dialogAddTableVisible: false,
      pageSetting: {
        current: 1,
        size: 10
      },
      token: '',
      deleteItem: [],
      specialPageSetting: {
        current: '',
        size: 10
      },
      current: 1,
      stateList: [
        { value: '正常' },
        { value: '即将到期' },
        { value: '已经超期' }
      ],
      editParam: '',
      fuLiaoList: '',
      multipleSelection: [],
      deleteList: [],
      yeWuDeptList: [],
      yeWuPerson: [],
      deptId: ''
    }
  },

  created() {
    this.initData()
    this.initSearchList()
  },

  methods: {
    // 数据初始化
    initData(pageSetting) {
      var url = '/api/ClothZhuiZong/show?'
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var urlParam = toUrlParam(url, searchInfo)
      loadData(urlParam).then(res => {
        window.console.log(res)
      })
      var url1 = '/api/ClothZhuiZong?'
      var searchInfo1 = combineObject(this.queryInfo, this.pageSetting)

      var urlParam1 = toUrlParam(url1, searchInfo1)
      this.listLoading = true
      loadData(urlParam1).then(res => {
        this.totalSize = res.data.count
        this.initAllData = res.data.data
        this.listLoading = false
      })
    },
    initSearchList() {
      var urlParam = '/ERP/selectDepartment?parentId=82'
      loadYwDept(urlParam).then(res => {
        this.yeWuDeptList = res.data.data
      })
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state === '已经超期') {
        return 'error-row'
      } else if (row.state === '即将到期') {
        return 'warning-row'
      }
      return ''
    },
    bindYeWuId(id) {
      this.yeWuPerson = []
      this.queryInfo.employeeName = ''
      var urlP = '/ERP/selectEmplyee?symbol=2&department=' + id
      loadYeWuPerson(urlP).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.yeWuPerson = res.data.data
        }
      })
    },
    addNewRecord() {
      this.dialogAddTableVisible = true

      // this.$router.push({ path: '/采购合同新增' })
    },
    editDataM(data) {
      this.$router.push({ path: '/采购合同修改', query: { purchaseNo: data.purchaseNo }})
    },
    showDataM(data) {
      this.$router.push({ path: '/采购合同详情', query: { purchaseNo: data.purchaseNo }})
    },
    closeDialog() {
      this.dialogAddTableVisible = false
      this.initData(this.pageSetting)
    },
    deleteData(no) {
      var deleteItemSingle = {
        purchaseNo: ''
      }
      this.deleteItem = []
      this.$set(deleteItemSingle, 'purchaseNo', no)
      this.deleteItem.push(deleteItemSingle)
      this.$confirm('确认删除？')
        .then(_ => {
          deleteRecord(this.deleteItem).then(res => {
            if (res.data.code !== 1) {
              this.$message.error(res.data.tipInfo)
            } else {
              this.$message.success(res.data.tipInfo)
              //   this.initData()
              if (res.data.data == null) {
                window.console.log(this.pageSetting.current)
                this.$set(this.specialPageSetting, 'current', this.pageSetting.current - 1)
                this.initData(this.specialPageSetting)
              } else {
                this.initData(this.pageSetting)
              }
            }
          })
        })
        .catch(_ => {})
    },
    getInitDate() {
      var list = []
      list.push(this.getPreMonthTime())
      list.push(this.getNowTime())
      return list
    },
    getNowTime() {
      var now = new Date()
      var year = now.getFullYear()// 得到年份
      var month = now.getMonth()// 得到月份
      var date = now.getDate()// 得到日期
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      console.log(defaultDate)
      return defaultDate
    },
    getPreMonthTime() {
      var now = new Date()

      now.setMonth(now.getMonth() - 1)
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      return defaultDate
    },

    refreshSearch() {
      this.$set(this.queryInfo, 'signDate', this.getInitDate())
      this.$set(this.queryInfo, 'deptName', '')
      this.$set(this.queryInfo, 'employeeName', '')
      this.$set(this.queryInfo, 'clientName', '')
      this.$set(this.queryInfo, 'clientContractNo', '')
      this.$set(this.queryInfo, 'purchaseNo', '')
      this.$set(this.queryInfo, 'kuanHao', '')
      this.$set(this.queryInfo, 'state', '')
      this.initData(this.pageSetting)
    },
    bindYeWuPerson(id) {
      this.$set(this.queryInfo, 'employeeId', id)
    },
    searchDataM() {
      this.pageSetting.current = 1
      window.console.log(this.queryInfo)
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var url = '/api/ClothZhuiZong?'
      var urlParam = toUrlParam(url, searchInfo)
      this.listLoading = true
      searchData(urlParam).then(res => {
        this.listLoading = false
        this.initAllData = res.data.data
        this.totalSize = res.data.count
      })
    },
    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData(this.pageSetting)
    },
    handleSizeChange(val) {
      this.pageSetting.size = val
      this.initData(this.pageSetting)
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
    deleteItemList() {
      window.console.log(this.multipleSelection)
      this.multipleSelection.map(item => {
        var deleteItemSingle = {
          purchaseNo: ''
        }
        this.$set(deleteItemSingle, 'purchaseNo', item.purchaseNo)
        this.deleteList.push(deleteItemSingle)
      })
      this.$confirm('确认删除？')
        .then(_ => {
          deleteRecord(this.deleteList).then(res => {
            if (res.data.code !== 1) {
              this.$message.error(res.data.tipInfo)
            } else {
              this.$message.success(res.data.tipInfo)
              //   this.initData()
              if (res.data.data == null) {
                window.console.log(this.pageSetting.current)
                this.$set(this.specialPageSetting, 'current', this.pageSetting.current - 1)
                this.initData(this.specialPageSetting)
              } else {
                this.initData(this.pageSetting)
              }
            }
          })
        })
        .catch(_ => {})
    },
    pageCurrentChange() {
      if (this.current < 1) {
        this.current = 1
      }
      if (this.current > (this.totalSize / this.pageSetting.size)) {
        this.current = Math.ceil(this.totalSize / this.pageSetting.size)
      }
    },
    pageGo() {
      this.pageSetting.current = this.current
      this.initData()
    },
    clearData() {
      this.$set(this.queryInfo, 'employeeName', '')
      this.yeWuPerson = []
      this.searchDataM()
    }

  }
}
</script>

<style scoped>
.el-row {
    padding-bottom: 16px ;
}
/deep/ .el-form-item__content {
    display: inline-block;
    vertical-align: top;
width: 200px;
}

/deep/  .el-input__inner{
  width: 100%;
}

/deep/ .el-select{
  width: 100%;
}

  /deep/ .el-form-item__label{
    width: 90px;
  }
/deep/ .special1::before{
        content:'';
            font-size: 12px;
        width:6px;
        height:6px;
        background-color:  #FDCF7A;
        border: 1px solid #FDCF7A;
            padding-right: 16px;
            margin-right: 5px;
}

/deep/ .special2::before{
        content:'';
            font-size: 12px;
        width:6px;
        height:6px;
        background-color:  #E17F2E;
        border: 1px solid #E17F2E;
                    margin-right: 5px;

            padding-right: 16px;
}

@media only screen and (max-width: 1770px) {
/deep/  .el-form-item__content {
      width: 160px;
  }
  /deep/ .el-form--inline .el-form-item{
    width:100%
  }
  /deep/ .el-form-item__label{
    width: 80px;
    font-size: 10px;
  }
/deep/ .rightPart {
    width: 19%;
  }
/deep/ .leftPart {
    width: 81%;
  }
  /deep/ .rightPart .el-button {
    padding: 12px 14px;
  }
}
@media only screen and (max-width: 1500px) {
/deep/  .el-form-item__content {
      width: 115px;
}
/deep/ .el-form--inline .el-form-item{
    width:100%
}
/deep/ .el-form-item__label{
    width: 80px;
    font-size: 10px;
}
/deep/ .rightPart {
    width: 19%;
}
/deep/ .leftPart {
    width: 81%;
}
/deep/ .rightPart .el-button {
    padding: 12px 14px;
}
}

</style>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
.orangeBtnClass{
  color:white;
  background-color: #{$btnOrange};
}

</style>
