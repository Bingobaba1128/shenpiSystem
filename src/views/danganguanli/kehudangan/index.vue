<template>
  <el-card>
    <cardTitile :param="titileName" />
    <!-- 检索区 -->
    <el-row :gutter="10" style="padding:0 16px; margin-left:0;margin-right:0;padding-bottom:0" class="specialSelect">
      <el-col :lg="21" style="leftPart">

        <el-form :inline="true" class="searchQueryClass" label-width="90px" @submit.native.prevent>
          <el-row class="special">

            <el-col :span="6">
              <el-form-item label="客户名称 :">
                <el-input v-model.trim="queryInfo.clientName" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="欠款备注 :">
                <el-input v-model.trim="queryInfo.remark" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务区域 :">
                <el-select v-model="queryInfo.area" placeholder="营销中心" clearable disabled @change="searchDataM">
                  <el-option
                    v-for="item in areaList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                    disabled
                  />
                </el-select>
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
          </el-row>
          <el-row>

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
              <el-form-item label="业务日期 :">
                <el-date-picker
                  v-model="queryInfo.lastDoTime"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="searchDataM"
                />
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
        border
        :cell-style="{padding:'0px'}"
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        :max-height="$tableHeight"
        height="100%"
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
        />
        <el-table-column type="index" label="序号" width="80" fixed="left" />
        <el-table-column label="省市" prop="province" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <p>{{ scope.row.province.map(i => i).join(' - ') }}</p>
          </template>
        </el-table-column>
        <el-table-column label="客户编号" prop="clientNo" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="display:block;cursor:pointer;width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" :data-clipboard-text="scope.row.clientNo" @click="copy(scope.row.clientNo)">{{ scope.row.clientNo }}</span>
          </template>
          <!-- <template slot-scope="scope">
            <span style="display:block;cursor:pointer;width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" :data-clipboard-text="scope.row.clientNo" @click="copy">{{scope.row.clientNo}}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="客户名称" prop="clientName" width="280" show-overflow-tooltip />
        <el-table-column label="客户等级" prop="clientLevel" width="150" show-overflow-tooltip />
        <el-table-column label="联系人" prop="linkMan" width="150" show-overflow-tooltip />
        <el-table-column label="财务负责人" prop="treasurePerson" width="150" show-overflow-tooltip />
        <el-table-column label="联系电话" prop="linkTel" width="150" show-overflow-tooltip />
        <el-table-column label="寄版限（码）" prop="boardinglimit" width="150" show-overflow-tooltip />
        <el-table-column label="最新修改日期" prop="lastDoTime" width="150" show-overflow-tooltip />

        <el-table-column label="操作" fixed="right" class="specialList" width="280">
          <template slot-scope="scope">
            <el-button type="text" @click="showDataM(scope.row)">查看</el-button>
            <el-button type="text" :disabled="scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回' " @click="editDataM(scope.row)">修改</el-button>
            <el-button v-if="scope.row.approveState === '待提交' || scope.row.approveState === '取消' || scope.row.approveState === '驳回'" type="text" @click="uploadApprove(scope.row)">提交</el-button>
            <el-button v-if="scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回' " type="text" :disabled="scope.row.approveState === '作废'" @click="cancelApprove(scope.row)">取消</el-button>
            <el-button type="text" :style="{color:((scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回')? none:'#FAAB15')}" :disabled="(scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回')" @click="deleteData(scope.row.clientNo)">删除</el-button>
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
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { getGuid } from '@/utils/getGuid'
import { loadData, searchData, deleteRecord, loadYwDept, loadYeWuPerson, uploadData, passData } from '@/api/kehudangan'
import { combineObject } from '@/utils/combineObject'
import { areaList } from '@/utils/listVar'
import cardTitile from '@/layout/mixin/cardTitile'
import { baseUrl } from '@/api/apiUrl'

export default {
  name: 'Kehudangan',
  components: {
    cardTitile
  },

  data() {
    return {
      initAllData: '',
      areaList: areaList,
      listLoading: true,
      queryInfo: {
        clientName: '',
        remark: '',
        employeeName: '',
        deptName: '',
        lastDoTime: this.getInitDate(),
        area: ''
      },
      current: 1,
      titileName: '客户档案',
      value: '',
      editData: '',
      totalSize: '',
      pageSetting: {
        current: 1,
        size: 10
      },
      token: '',
      deleteItem: [],
      yeWuDeptList: [],
      yeWuPerson: [],
      specialPageSetting: {
        current: 1,
        size: 10
      },
      editParam: '',
      fuLiaoList: '',
      multipleSelection: [],
      deleteList: []
    }
  },

  created() {
    this.initData(this.pageSetting)
    this.initSearchList()
  },

  methods: {
    copy(data) {
      this.$copyText(data).then(e => {
        this.$message1('复制成功')
      }, e => {
        this.$message1('复制失败')
      })
    },
    // 数据初始化
    initData(pageSetting) {
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var url = '/api/Client?'
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
    bindYeWuId(id) {
      this.yeWuPerson = []
      // this.queryInfo.employeeName = ''
      this.$set(this.queryInfo, 'employeeName', '')
      var urlP = '/ERP/selectEmplyee?symbol=2&department=' + id
      loadYeWuPerson(urlP).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.yeWuPerson = res.data.data
        }
      })
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    addNewRecord() {
      this.$router.push({ path: '客户档案/客户档案新增', query: { guid: getGuid() }})
      //       var guid = getGuid()
      // this.$router.push({ path: '/客户档案新增' })
    },
    editDataM(data) {
      this.$router.push({ path: '客户档案/客户档案修改', query: { clientNo: data.clientNo }})
    },
    uploadApprove(data) {
      var jsonData = [{
        approveStyle: '5',
        faQiPerson: '邓科',
        faQiPersonId: '10001',
        style: '客户合同',
        style_1: '1',
        pkNo: data.clientNo,
        url: baseUrl + '/#/客户档案/客户档案审批?clientNo=' + data.clientNo

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
        pkNo: data.clientNo,
        reason: ''
      }
      passData(jsonData).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.$message.success('审批取消成功')
          this.initData()
        }
      })
    },
    showDataM(data) {
      this.$router.push({ path: '客户档案/客户档案详情', query: { clientNo: data.clientNo }})
    },
    deleteData(no) {
      var deleteItemSingle = {
        clientNo: ''
      }
      this.$set(deleteItemSingle, 'clientNo', no)
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
      this.$set(this.queryInfo, 'clientName', '')
      this.$set(this.queryInfo, 'remark', '')
      this.$set(this.queryInfo, 'employeeName', '')
      this.$set(this.queryInfo, 'deptName', '')
      this.$set(this.queryInfo, 'lastDoTime', this.getInitDate())
      this.$set(this.queryInfo, 'area', '')
      this.initData(this.pageSetting)
    },
    searchDataM() {
      this.pageSetting.current = 1

      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var url = '/api/Client?'
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
          clientNo: ''
        }
        this.$set(deleteItemSingle, 'clientNo', item.clientNo)
        this.deleteList.push(deleteItemSingle)
      })

      var _self = this
      this.$utils.isdel(function() {
        deleteRecord(_self.deleteList).then(res => {
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
    tableHeaderColor({ row, rowIndex }) {
      return 'font-family:Microsoft YaHei;color:#000000;font-weight:400;font-size:16px;text-align:center'
    },
    tableRowStyle({ row, rowIndex }) {
      return 'padding:0;height:49px;background-color:pink;font-size:14px;'
    },
    getInitDate() {
      var list = []
      list.push(this.getPreMonthTime())
      list.push(this.getNowTime())
      return list
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

@media only screen and (max-width: 1600px) {
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
</style>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
.orangeBtnClass{
  color:white;
  background-color: #{$btnOrange};
}

</style>
