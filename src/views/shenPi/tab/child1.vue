<template>
  <div class="child1">
    <el-row :gutter="10" style="padding:0 16px; margin-left:0;margin-right:0;padding-bottom:0" class="specialSelect">
      <el-col :lg="21" style="leftPart">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" @submit.native.prevent>
          <el-row class="special">

            <el-col :span="6">
              <el-form-item label="申请日期 :">
                <el-date-picker
                  v-model="queryInfo.faQiTime"
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
                <el-select v-model="queryInfo.deptName" placeholder="全部" clearable @clear="clearDeptSearchDataM">
                  <el-option
                    v-for="item in deptList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptName"
                    @click.native="bindDeptId(item.deptId)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请人 :">
                <el-select v-model="queryInfo.faQiPerson" placeholder="全部" clearable @clear="clearPersonData">
                  <el-option
                    v-for="item in personList"
                    :key="item.employeeId"
                    :label="item.employeeName"
                    :value="item.employeeName"
                    @click.native="bindYeWuId(item.employeeId)"
                    @change="searchDataM"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="系统分类 :">

                <el-select v-model="queryInfo.systemName" placeholder="全部" clearable @clear="searchDataM">
                  <el-option
                    v-for="item in systemList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                    @click.native="bindSystemId(item.id)"
                  />
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row style="padding-bottom:0">
            <el-col :span="6">
              <el-form-item label="单据分类 :">
                <el-select v-model="queryInfo.classifyName" :disabled="queryInfo.systemId === ''" placeholder="全部" clearable @clear="searchDataM">
                  <el-option
                    v-for="item in danJuList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                    @click.native="bindDanJuId(item.id)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="单据状态 :">
                <el-select v-model="queryInfo.stateName" placeholder="全部" clearable @clear="searchSpecialDataM">
                  <el-option
                    v-for="item in stateList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    @click.native="stateChange(item.name)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="系统单号 :">
                <el-input v-model.trim="queryInfo.pkNo" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" @submit.native.prevent  @clear="clearPkNo"/>
              </el-form-item>
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
    <el-row style="padding:0 20px;display: flex; flex-direction:column;height:700px;margin-top:16px">

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
        <el-table-column label="审批单号" prop="approveNo" show-overflow-tooltip />
        <el-table-column label="系统分类" prop="systemName" show-overflow-tooltip />
        <el-table-column label="单据分类" prop="classifyName" show-overflow-tooltip />
        <el-table-column label="系统单号" prop="realPkNo" show-overflow-tooltip />
        <el-table-column label="标题" prop="biaoTi" show-overflow-tooltip />
        <el-table-column label="申请人" prop="faQiPerson" show-overflow-tooltip />
        <el-table-column label="申请日期" prop="faQiTime" show-overflow-tooltip />
        <el-table-column label="单据状态" prop="stateName" show-overflow-tooltip />
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="showDataM(scope.row)">查看</el-button>
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
  </div>
</template>

<script>
import { loadData, searchData, loadDept, loadPerson } from '@/api/shenPi'
import { toUrlParam } from '@/utils/toUrlParam'
import { combineObject } from '@/utils/combineObject'

export default {
  name: 'Child1',
  data() {
    return {
      approveContentlist: [],
      initAllData: '',
      queryInfo: {
        faQiTime: this.getInitDate(),
        faQiPerson: '',
        systemName: '',
        classifyName: '',
        stateName: '',
        search: '',
        faQiPersonId: '',
        systemId: '',
        classifyId: '',
        style_1: '',
        style: '',
        employeeId: sessionStorage.getItem('employeeId'),
        deptName: '',
        deptId: '',
        pkNo: ''

      },
      name: sessionStorage.getItem('employeeName'),
      id: sessionStorage.getItem('employeeId'),
      pageSetting: {
        current: 1,
        size: 10
      },
      totalSize: '',
      current: 1,
      danJuList: [],
      systemList: [],
      personList: [],
      deptList: '',
      stateList: [
        { name: '待审批', id: '1' },
        { name: '待撤单', id: '2' }

      ]
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      var param1 = '/ERP/selectAllDepartment'
      loadDept(param1).then(res => {
        this.deptList = res.data.data
      })

      var url = '/api/Approve?state=0&approveState=0&'
      if (JSON.parse(sessionStorage.getItem('tabParam'))) {
        this.queryInfo = JSON.parse(sessionStorage.getItem('tabParam'))
      }
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)

      var urlParam = toUrlParam(url, searchInfo)
      this.listLoading = true

      loadData(urlParam).then(res => {
        var result = res.data.data
        result.map((item, index) => {
          switch (item.approveState) {
            case '0':
              if (item.style === '撤单') {
                this.$set(result[index], 'stateName', '待撤单')
              } else {
                this.$set(result[index], 'stateName', '待审批')
              }
              break
            case '1':
              this.$set(result[index], 'stateName', '审批通过')
              break
            case '2':
              this.$set(result[index], 'stateName', '驳回')
              break
            case '3':
              this.$set(result[index], 'stateName', '待撤单')
              break
            case '4':
              this.$set(result[index], 'stateName', '取消')
              break
            case '5':
              this.$set(result[index], 'stateName', '撤单通过')
              break
            case '6':
              this.$set(result[index], 'stateName', '撤单驳回')
              break
            case '7':
              this.$set(result[index], 'stateName', '作废')
              break
          }
        })
        this.initAllData = result
        this.listLoading = false
        this.totalSize = res.data.count

        window.console.log(res)
      })

      var param2 = '/api/ApproveSystem/?size=-1&flag=1'
      loadData(param2).then(res => {
        this.systemList = res.data.data
      })
    },
    bindDeptId(id) {
      this.queryInfo.deptId = id
      var url = '/ERP/selectEmplyee2?symbol=2&duty=' + id
      loadPerson(url).then(res => {
        this.personList = res.data.data
      })
      this.searchDataM()
    },
    bindYeWuId(id) {
      this.queryInfo.faQiPersonId = id
      this.searchDataM()
    },
    clearDeptSearchDataM() {
      this.personList = ''
      this.queryInfo.faQiPerson = ''
      this.queryInfo.faQiPersonId = ''
      this.queryInfo.deptId = ''
      this.searchDataM()
    },
    clearPersonData() {
      this.queryInfo.faQiPerson = ''
      this.queryInfo.faQiPersonId = ''
      this.searchDataM()
    },
        clearPkNo(){
      this.$set(this.queryInfo, 'pkNo', '')
      this.searchDataM()
    },
    searchDataM() {
      if (this.queryInfo.systemName === '') {
        this.$set(this.queryInfo, 'systemId', '')
        this.danJuList = []
        this.$set(this.queryInfo, 'classifyName', '')
        this.$set(this.queryInfo, 'classifyId', '')

        window.console.log(this.danJuList)
      }
      if (this.queryInfo.classifyName === '') {
        this.$set(this.queryInfo, 'classifyId', '')
      }
      window.console.log(this.queryInfo, 'test')
      this.pageSetting.current = 1
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var url = '/api/Approve?state=0&approveState=0&'
      var urlParam = toUrlParam(url, searchInfo)
      this.listLoading = true
      searchData(urlParam).then(res => {
        var result = res.data.data
        result.map((item, index) => {
          switch (item.approveState) {
            case '0':
              if (item.style === '撤单') {
                this.$set(result[index], 'stateName', '待撤单')
              } else {
                this.$set(result[index], 'stateName', '待审批')
              }
              break
            case '1':
              this.$set(result[index], 'stateName', '审批通过')
              break
            case '2':
              this.$set(result[index], 'stateName', '驳回')
              break
            case '3':
              this.$set(result[index], 'stateName', '待撤单')
              break
            case '4':
              this.$set(result[index], 'stateName', '取消')
              break
            case '5':
              this.$set(result[index], 'stateName', '撤单通过')
              break
            case '6':
              this.$set(result[index], 'stateName', '撤单驳回')
              break
            case '7':
              this.$set(result[index], 'stateName', '作废')
              break
          }
        })
        this.initAllData = result
        this.listLoading = false
        this.totalSize = res.data.count
      })
    },
    showDataM(data) {
      if (data.style === '撤单') {
        // var rightpart = data.url.split('?')[1]
        // rightpart = rightpart.split('=')
        if (data.approveState == '0') {
          window.console.log('approve state 0')
          this.$router.push({ path: '/审批管理/审批详情', query: { employeeId: data.employeeId, queryInfo: this.queryInfo, employeeName: data.employeeName, pkNo: data.pkNo, url: data.url, specialFlag: 1, show: true, status: false }})
        } else {
                    window.console.log('approve state !=0')

          this.$router.push({ path: '/审批管理/审批详情', query: { employeeId: data.employeeId, queryInfo: this.queryInfo, employeeName: data.employeeName, pkNo: data.pkNo, url: data.url, specialFlag: 0, status: false }})
        }
      } else {
        this.$router.push({ path: '/审批管理/审批详情', query: { employeeId: data.employeeId, queryInfo: this.queryInfo, employeeName: data.employeeName, pkNo: data.pkNo, url: data.url, specialFlag: 0, show: true, status: false }})
      }
    },
    bindDanJuId(id) {
      this.$set(this.queryInfo, 'classifyId', id)
      this.searchDataM()
    },
    bindSystemId(id) {
      this.$set(this.queryInfo, 'systemId', id)
      this.$set(this.queryInfo, 'classifyName', '')
      this.$set(this.queryInfo, 'classifyId', '')
      window.console.log(this.queryInfo)
      var param1 = '/api/ApproveSystem/?size=-1&flag=2&parentId=' + id
      loadData(param1).then(res => {
        this.danJuList = res.data.data
      })
      this.searchDataM()
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
      this.$set(this.queryInfo, 'faQiTime', this.getInitDate())
      this.$set(this.queryInfo, 'faQiPerson', '')
      // this.$set(this.queryInfo, 'employeeName', '')
      this.$set(this.queryInfo, 'systemName', '')
      this.$set(this.queryInfo, 'classifyName', '')
      this.$set(this.queryInfo, 'stateName', '')
      this.$set(this.queryInfo, 'search', '')
      this.$set(this.queryInfo, 'faQiPersonId', '')
      // this.$set(this.queryInfo, 'employeeId', '')
      this.$set(this.queryInfo, 'systemId', '')
      this.$set(this.queryInfo, 'classifyId', '')
      this.$set(this.queryInfo, 'deptId', '')
      this.$set(this.queryInfo, 'deptName', '')
      this.$set(this.queryInfo, 'pkNo', '')
      this.deptList = ''
      this.personList = ''

      this.initData()
    },
    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData()
    },
    handleSizeChange(val) {
      this.pageSetting.size = val
      this.initData()
    },
    pageGo() {
      this.pageSetting.current = this.current
      this.initData()
    },
    searchSpecialDataM() {
      this.$set(this.queryInfo, 'stateN', '-4')
      this.$set(this.queryInfo, 'style_1', '')
      this.$set(this.queryInfo, 'style', '')
      this.searchDataM()
    },
    stateChange(name) {
      if (name === '待审批') {
        this.$set(this.queryInfo, 'style_1', '待审批')
        this.$set(this.queryInfo, 'style', '')
        window.console.log(this.queryInfo)
        this.searchDataM()
      }
      if (name === '待撤单') {
        this.$set(this.queryInfo, 'style_1', '')

        this.$set(this.queryInfo, 'style', '撤单')
        this.searchDataM()
      }
      //   if(this.queryInfo.stateName === ''){
      //   this.$set(this.queryInfo,'style','')
      //       this.$set(this.queryInfo,'style_1','')
      //       this.$set(this.queryInfo,'stateName','')

      //       this.searchDataM()
      // }
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
