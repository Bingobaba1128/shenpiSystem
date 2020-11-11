<template>
  <el-card>
    <cardTitile :param="titileName" />
    <!-- 检索区 -->
    <el-row :gutter="10" style="padding:0 16px; margin-left:0;margin-right:0;padding-bottom:0" class="specialSelect">
      <el-col :lg="21" style="leftPart">
        <el-form ref="queryInfo" :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px" @submit.native.prevent>
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
                <el-select v-model="queryInfo.deptName" placeholder="全部" clearable @clear="clearData" @change="searchDataM">
                  <el-option
                    v-for="item in yeWuDeptList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptName"
                    @click.native="bindYeWuId(item.deptId)"
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
              <el-form-item label="客户合同号 :">
                <el-input v-model.trim="queryInfo.clientContractNo" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="客户名称 :">
                <el-input v-model.trim="queryInfo.clientName" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="款号 :">
                <el-input v-model.trim="queryInfo.kuanNo" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>

      <el-col :lg="3" class="rightPart">
        <el-row style="padding-bottom: 16px" class="function">
          <el-button class="indexButton" style="margin-left:0px" icon="el-icon-search" @click="searchDataM">查询</el-button>
          <el-button class="indexButton" style="margin-left:16px" @click="addNewRecord">新增</el-button>
        </el-row>
        <el-row class="function">
          <el-button class="orangeBtnClass" style="margin-left:0px" icon="el-icon-refresh" @click="refreshSearch">重置</el-button>
          <el-button class="orangeBtnClass" style="margin-left:16px" @click="deleteItemList">批量删除</el-button>
        </el-row>
      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-row style="padding:0 20px;display: flex; flex-direction:column;height:700px">
      <el-table
        v-loading="listLoading"
        :data="initAllData"
        :cell-style="{padding:'0px'}"
        border
        height="100%"
        :max-height="$tableHeight"
        element-loading-text="努力加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255, 255, 0.9)"
        empty-text=" "
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="全选"
          type="selection"
          width="80"
          fixed="left"
        />
        <el-table-column type="index" label="序号" fixed="left" width="80" />
        <el-table-column label="签订日期" prop="signDate" width="150" show-overflow-tooltip />
        <el-table-column label="销售合同号" prop="contractNo" width="150" show-overflow-tooltip />
        <el-table-column label="客户合同号" prop="clientContractNo" width="150" show-overflow-tooltip />
        <el-table-column label="客户名称" prop="clientName" width="280" show-overflow-tooltip />
        <el-table-column label="款号" width="150" prop="kuanNo" show-overflow-tooltip />
        <!-- <template slot-scope="scope">
            <p v-for="(item) in scope.row.kuanNo" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column> -->
        <el-table-column label="品名" prop="pinNo" width="150" show-overflow-tooltip />
        <!-- <template slot-scope="scope">
            <p v-for="(item) in scope.row.pinNo" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column> -->
        <el-table-column label="业务部门" prop="deptName" width="120" show-overflow-tooltip />
        <el-table-column label="业务员" prop="employeeName" width="120" show-overflow-tooltip />
        <el-table-column label="审批状态" prop="approveState" show-overflow-tooltip />

        <el-table-column label="操作" fixed="right" width="250">
          <template slot-scope="scope">
            <el-button type="text" @click="showDataM(scope.row)">查看</el-button>
            <!-- <el-button type="text" @click="showDataMSp(scope.row)">审批查看</el-button> -->
            <el-button type="text" :disabled="scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回' " @click="editDataM(scope.row)">修改</el-button>
            <el-button v-if="scope.row.approveState === '待提交' || scope.row.approveState === '取消' || scope.row.approveState === '驳回'" type="text" @click="uploadApprove(scope.row)">提交</el-button>
            <el-button v-if="scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回' " type="text" :disabled="scope.row.approveState === '作废'" @click="cancelApprove(scope.row)">取消</el-button>               <el-button type="text" disabled @click="editDataM(scope.row)">下载</el-button>
            <el-button type="text" :style="{color:((scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回')? none:'#FAAB15')}" :disabled="(scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回')" @click="deleteData(scope.row.contractNo)">删除</el-button>
          </template>
        </el-table-column>

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
import { toUrlParam } from '@/utils/toUrlParam'
import { getGuid } from '@/utils/getGuid'

import { loadData, searchData, deleteRecord, loadYwDept, loadYeWuPerson, uploadData, passData } from '@/api/xiaoshouhetong'
import { combineObject } from '@/utils/combineObject'

import cardTitile from '@/layout/mixin/cardTitile'

export default {
  name: 'Xiaoshouhetong',

  components: {
    cardTitile
  },

  data() {
    return {
      initAllData: '',
      listLoading: true,
      queryInfo: {
        employeeName: '',
        clientName: '',
        clientContractNo: '',
        kuanNo: '',
        signDate: this.getInitDate(),
        deptName: ''
      },
      titileName: '销售合同',
      value: '',
      editData: '',
      totalSize: '',
      pageSetting: {
        current: 1,
        size: 10
      },
      current: 1,
      token: '',
      deleteItem: [],
      specialPageSetting: {
        current: '',
        size: 10
      },
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
    this.initData(this.pageSetting)
    this.initSearchList()
  },

  methods: {
    // 数据初始化
    initData(pageSetting) {
      var url = '/api/Contract?address_1=1&'
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var urlParam = toUrlParam(url, searchInfo)
      this.listLoading = true
      loadData(urlParam).then(res => {
        this.listLoading = false
        this.totalSize = res.data.count
        this.initAllData = res.data.data
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
    bindYeWuPerson(id) {
      this.$set(this.queryInfo, 'employeeId', id)
    },
    addNewRecord() {
      this.$router.push({ path: '/销售合同/销售合同新增', query: { guid: getGuid() }})
    },
    editDataM(data) {
      this.$router.push({ path: '/销售合同/销售合同修改', query: { contractNo: data.contractNo }})
    },
    showDataM(data) {
      this.$router.push({ path: '/销售合同/销售合同详情', query: { contractNo: data.contractNo }})
    },
    showDataMSp(data) {
      this.$router.push({ path: '/销售合同/销售合同审批详情', query: { contractNo: data.contractNo }})
    },
    uploadApprove(data) {
      var jsonData = [{
        approveStyle: '7',
        faQiPerson: '邓科',
        faQiPersonId: '10001',
        style: '销售合同',
        style_1: '1',
        pkNo: data.contractNo,
        url: baseUrl + '/#/销售合同/销售合同审批?contractNo=' + data.contractNo

      }]
      uploadData(jsonData).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.$message.success('审批提交成功')
          this.initData()
        }
      })
    },
    cancelApprove(data) {
      var jsonData = {
        employeeName: '邓科',
        employeeId: '10001',
        state: '4',
        pkNo: data.contractNo,
        reason: ''
      }
      passData(jsonData).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.$message.success('取消成功')
          this.initData()
        }
      })
    },
    deleteData(no) {
      var deleteItemSingle = {
        contractNo: ''
      }
      this.$set(deleteItemSingle, 'contractNo', no)
      this.deleteItem.push(deleteItemSingle)
      var _self = this
      this.$utils.isdel(function() {
        deleteRecord(_self.deleteItem).then(res => {
          if (res.data.code !== 1) {
            _self.$message.error(res.data.tipInfo)
          } else {
            _self.$message.success(res.data.tipInfo)
            if (res.data.data == null) {
              _self.$set(_self.specialPageSetting, 'current', _self.pageSetting.current - 1)
              _self.initData(_self.specialPageSetting)
            } else {
              _self.initData(_self.pageSetting)
            }
          }
        })
      })
    },
    refreshSearch() {
      this.$set(this.queryInfo, 'employeeName', '')
      this.$set(this.queryInfo, 'clientName', '')
      this.$set(this.queryInfo, 'clientContractNo', '')
      this.$set(this.queryInfo, 'kuanNo', '')
      this.$set(this.queryInfo, 'signDate', this.getInitDate())
      this.$set(this.queryInfo, 'deptName', '')
      this.initData(this.pageSetting)
    },
    getInitDate() {
      var list = []
      list.push(this.getPreMonthTime())
      list.push(this.getNowTime())
      return list
    },
    searchDataM() {
      this.pageSetting.current = 1
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var url = '/api/Contract?address_1=1&'
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
      this.multipleSelection.map(item => {
        var deleteItemSingle = {
          contractNo: ''
        }
        this.$set(deleteItemSingle, 'contractNo', item.contractNo)
        this.deleteList.push(deleteItemSingle)
      })
      var _self = this
      this.$utils.isdel(function() {
        deleteRecord(_self.deleteList).then(res => {
          if (res.data.code !== 1) {
            _self.$message.error(res.data.tipInfo)
          } else {
            _self.$message.success(res.data.tipInfo)
            //   this.initData()
            if (res.data.data == null) {
              _self.$set(_self.specialPageSetting, 'current', _self.pageSetting.current - 1)
              _self.initData(_self.specialPageSetting)
            } else {
              _self.initData(_self.pageSetting)
            }
          }
        })
      })
    },
    getNowTime() {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
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
.el-table {
    margin-top: 0;
}
 .el-table .cell{
  display: flex !important
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
@media only screen and (max-width: 1580px) {
/deep/  .el-form-item__content {
      width: 160px;
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
/* @media only screen and (max-width: 1240px) {
  /deep/ .rightPart .el-button {
    padding: 12px 14px;
  }
} */
</style>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
.orangeBtnClass{
  color:white;
  background-color: #{$btnOrange};
}

</style>
