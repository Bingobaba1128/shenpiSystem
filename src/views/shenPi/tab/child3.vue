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
              <el-form-item label="审批日期 :">
                <el-date-picker
                  v-model="queryInfo.approveTime"
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
          </el-row>
          <el-row style="padding-bottom:0">
            <el-col :span="6">
              <el-form-item label="单据状态 :">
                <el-select v-model="queryInfo.stateName" placeholder="全部" clearable @clear="searchSpecialDataM">
                  <el-option
                    v-for="item in stateList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    @click.native="stateChange(item.id)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="系统单号 :">
                <el-input v-model.trim="queryInfo.pkNo" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" @submit.native.prevent @clear="clearPkNo"/>
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

        <el-table-column label="申请日期" prop="faQiTime" show-overflow-tooltip />
        <el-table-column label="审批日期" prop="approveTime" show-overflow-tooltip />

        <el-table-column label="审批单号" prop="approveNo" show-overflow-tooltip />
        <el-table-column label="系统分类" prop="systemName" show-overflow-tooltip />
        <el-table-column label="单据分类" prop="classifyName" show-overflow-tooltip />
        <el-table-column label="系统单号" prop="realPkNo" show-overflow-tooltip />
        <el-table-column label="标题" prop="biaoTi" show-overflow-tooltip />
        <el-table-column label="单据状态" prop="stateName" show-overflow-tooltip />
        <!-- <el-table-column label="驳回原因" prop="remark" show-overflow-tooltip /> -->
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
import { loadData, searchData } from '@/api/shenPi'
import { toUrlParam } from '@/utils/toUrlParam'
import { combineObject } from '@/utils/combineObject'

export default {
  name: 'Child1',
  data() {
    return {
      approveContentlist: [],
      initAllData: '',
      name: sessionStorage.getItem('employeeName'),
      id: sessionStorage.getItem('employeeId'),
      queryInfo: {
        faQiTime: this.getInitDate(),
        approveTime: this.getInitDate(),
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
        approveState: '',
        employeeId: sessionStorage.getItem('employeeId'),
        pkNo: ''

      },
      pageSetting: {
        current: 1,
        size: 10
      },
      totalSize: '',
      current: 1,
      danJuList: [],
      systemList: [],
      stateList: [
        { name: '待审批', id: '0' },
        { name: '待撤单', id: '3' },
        { name: '审批通过', id: '1' },
        { name: '驳回', id: '2' },
        { name: '撤单通过', id: '5' },
        { name: '撤单驳回', id: '6' },
        { name: '作废', id: '7' }
      ]
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      var url = '/api/Approve?state=-2&'
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
              this.$set(result[index], 'stateName', '待审批')
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
      var url = '/api/Approve?state=-2&'
      var urlParam = toUrlParam(url, searchInfo)
      this.listLoading = true
      searchData(urlParam).then(res => {
        var result = res.data.data
        result.map((item, index) => {
          switch (item.approveState) {
            case '0':
              this.$set(result[index], 'stateName', '待审批')
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
      this.$router.push({ path: '/审批管理/审批详情', query: { employeeId: data.employeeId, queryInfo: this.queryInfo, employeeName: data.employeeName, flagSpecial: 1, approveNo: data.approveNo, url: data.url, currentTab: 'child3', status: false }})
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

    refreshSearch() {
      this.$set(this.queryInfo, 'faQiTime', this.getInitDate())
      this.$set(this.queryInfo, 'approveTime', this.getInitDate())

      this.$set(this.queryInfo, 'faQiPerson', '')
      // this.$set(this.queryInfo, 'employeeName', '')
      this.$set(this.queryInfo, 'systemName', '')
      this.$set(this.queryInfo, 'classifyName', '')
      this.$set(this.queryInfo, 'stateName', '')
      this.$set(this.queryInfo, 'approveState', '')
      this.$set(this.queryInfo, 'search', '')
      this.$set(this.queryInfo, 'faQiPersonId', '')
      // this.$set(this.queryInfo, 'employeeId', '')
      this.$set(this.queryInfo, 'systemId', '')
      this.$set(this.queryInfo, 'classifyId', '')
      this.$set(this.queryInfo, 'pkNo', '')
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
      this.$set(this.queryInfo, 'approveState', '')
      this.searchDataM()
    },
    stateChange(id) {
      this.$set(this.queryInfo, 'approveState', id)
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
