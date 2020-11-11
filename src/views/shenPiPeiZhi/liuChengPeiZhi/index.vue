<template>
  <el-card>
    <cardTitile :param="titileName" />
    <!-- 检索区 -->
    <el-row :gutter="10" style="padding:0 16px; margin-left:0;margin-right:0;padding-bottom:0" class="jiChuPeiZhiClass">
      <el-col style=";padding-left:0;padding-right:0">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" @submit.native.prevent>
          <el-row>
            <el-col span="4.5">
              <el-form-item label="系统名称 :" label-width="90px">
                <el-select v-model="queryInfo.parentName" placeholder="全部" clearable filterable @clear="clearData1">
                  <el-option
                    v-for="item in fenLeiList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    @click.native="bindSyetemId(item)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="4.5">
              <el-form-item label="单据名称 :" label-width="90px">
                <el-select v-model="queryInfo.name" placeholder="全部" clearable filterable @clear="clearData2">
                  <el-option
                    v-for="item in nameList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    @click.native="bindModuleId(item.id)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="4.5">
              <el-form-item label="类型 :" label-width="90px">
                <el-select v-model="queryInfo.flagName" placeholder="全部" clearable filterable @change="searchData" @clear="clearData3">
                  <el-option
                    v-for="item in stateList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    @click.native="bindFlag(item.value)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="4" class="function" style="display:flex;margin-right:auto">
              <el-button class="indexButton" icon="el-icon-search" @click="searchData">查询</el-button>
            </el-col>
            <el-col span="4" style="float:right;display:flex;justify-content: flex-end" class="function">
              <el-button class="indexButton" @click="addNewRecord">新增</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <!-- 列表区 -->
    <el-dialog v-if="dialogAddTableVisible" :visible.sync="dialogAddTableVisible" :close-on-click-modal="false">
      <addNewForm @closeDialog="closeDialog" @closeDialog2="closeDialog2" />
    </el-dialog>

    <el-dialog v-if="dialogEditTableVisible" :visible.sync="dialogEditTableVisible" :close-on-click-modal="false">
      <editForm :key="editParam.id" :param="editParam" @closeDialog="closeDialog" @closeDialog2="closeDialog2" />
    </el-dialog>
    <el-row style="padding:0 16px;display: flex; flex-direction:column;height:700px">
      <el-table
        v-loading="listLoading"
        :data="initAllData"
        border
        height="100%"
        :max-height="$tableHeight"
        element-loading-text="努力加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255, 255, 0.9)"
        empty-text="请先添加筛选条件"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="100" fixed="left" />
        <el-table-column label="系统名称" prop="systemName" show-overflow-tooltip />
        <el-table-column label="单据名称" prop="approveStyleName" show-overflow-tooltip />
        <el-table-column label="类型" prop="flag" show-overflow-tooltip>
          <template slot-scope="scope">

            <span>{{ formatStatus(scope.row.flag) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批顺序" prop="orderNo" show-overflow-tooltip />

        <el-table-column label="备注" prop="remark" show-overflow-tooltip />
        <el-table-column label="审批人" prop="employeeName" show-overflow-tooltip />

        <el-table-column label="操作" fixed="right" width="250">
          <template slot-scope="scope">
            <el-button type="text" @click="editDataM(scope.row)">修改</el-button>
            <el-button type="text" style="color:#FAAB15" @click="deleteData(scope.row.id,scope.row.styleId)">删除</el-button>
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
import { toUrlParam } from '@/utils/toUrlParam'
import { loadData, searchData, deleteRecordConfig } from '@/api/shenPiPeiZhi'
import { combineObject } from '@/utils/combineObject'

import addNewForm from '@/views/shenPiPeiZhi/liuChengPeiZhi/addNewForm'
import editForm from '@/views/shenPiPeiZhi/liuChengPeiZhi/eidtNewForm'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile,
    addNewForm,
    editForm
  },

  data() {
    return {
      initAllData: '',
      queryInfo: {
        systemId: '',
        name: '',
        systemName: '',
        flag: '',
        classifyId: ''

      },
      titileName: '审批流程配置',
      value: '',
      dialogAddTableVisible: false,
      dialogEditTableVisible: false,
      editData: '',
      totalSize: '',
      pageSetting: {
        current: 1,
        size: 10
      },
      stateList: [
        { name: '审批', value: 0 },
        { name: '撤单', value: 1 },
        { name: '抄送', value: 2 }
      ],

      token: '',
      deleteItem: {
        id: '',
      },
      specialPageSetting: {
        current: '',
        size: 10
      },
      current: 1,
      editParam: '',
      fenLeiList: '',
      multipleSelection: [],
      listLoading: true,
      nameList: []

    }
  },

  created() {
    this.initData()
    this.loadBaseList()
  },

  methods: {

    loadBaseList() {
      var url1 = '/api/ApproveSystem?flag=1'
      loadData(url1).then(res => {
        this.fenLeiList = res.data.data
      })
    },
    // 数据初始化
    initData() {
      this.listLoading = false
      this.initAllData = []
      // var url = '/api/FeeManagement?'
      // var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      // var urlParam = toUrlParam(url, searchInfo)
      // this.listLoading = true
      // loadData(urlParam).then(res => {
      //   this.listLoading = false
      //   this.totalSize = res.data.count
      //   this.initAllData = res.data.data
      // })
    },
    addNewRecord() {
      this.dialogAddTableVisible = true
    },
    closeDialog() {
      this.dialogAddTableVisible = false
      this.dialogEditTableVisible = false

      this.searchData()
    },
    clearData1() {
      this.$set(this.queryInfo, 'systemId', '')
      this.$set(this.queryInfo, 'name', '')
      this.$set(this.queryInfo, 'classifyId', '')
      this.nameList = []
      this.searchData()
    },
    clearData2() {
      this.$set(this.queryInfo, 'classifyId', '')
      this.searchData()
    },
    clearData3() {
      this.$set(this.queryInfo, 'flag', '')
      this.searchData()
    },
    formatStatus(state) {
      switch (state) {
        case '0':
          return '审批'
          break
        case '1':
          return '撤单'
          break
        case '2':
          return '抄送'
          break
      }
    },
    bindFlag(flag) {
      this.$set(this.queryInfo, 'flag', flag)
      this.searchData()
    },
    bindSyetemId(data) {
      this.$set(this.queryInfo, 'systemId', data.id)
      this.$set(this.queryInfo, 'classifyId', '')
      this.$set(this.queryInfo, 'name', '')
      var url1 = '/api/ApproveSystem?flag=2&parentId=' + data.id
      loadData(url1).then(res => {
        this.nameList = res.data.data
      })
      this.searchData()
    },
    bindModuleId(id) {
      this.$set(this.queryInfo, 'classifyId', id)
      this.searchData()
    },
    deleteData(id, styleId) {
      this.$set(this.deleteItem, 'id', id)

      var _self = this
      this.$utils.isdel(function() {
        deleteRecordConfig(_self.deleteItem).then(res => {
          if (res.data.code !== 1) {
            _self.$message.error(res.data.tipInfo)
          } else {
            _self.$message.success(res.data.tipInfo)
            _self.searchData()
          }
        })
      })
    },
    editDataM(data) {
      this.editParam = data
      this.dialogEditTableVisible = true
    },
    searchData() {
      if (this.queryInfo.systemId === '' && this.queryInfo.classifyId === '' && this.queryInfo.flag === '') {
        this.initAllData = []
      } else {
        this.pageSetting.current = 1
        var searchInfo = combineObject(this.queryInfo, this.pageSetting)
        var url = '/api/ApproveConfig?'
        var urlParam = toUrlParam(url, searchInfo)
        this.listLoading = true
        searchData(urlParam).then(res => {
          this.listLoading = false
          this.totalSize = res.data.count
          this.initAllData = res.data.data
        })
      }
    },
        searchData1() {
      if (this.queryInfo.systemId === '' && this.queryInfo.classifyId === '' && this.queryInfo.flag === '') {
        this.initAllData = []
      } else {
        var searchInfo = combineObject(this.queryInfo, this.pageSetting)
        var url = '/api/ApproveConfig?'
        var urlParam = toUrlParam(url, searchInfo)
        this.listLoading = true
        searchData(urlParam).then(res => {
          this.listLoading = false
          this.totalSize = res.data.count
          this.initAllData = res.data.data
        })
      }
    },
    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.searchData1()
    },
    handleSizeChange(val) {
      this.pageSetting.size = val
      this.searchData()
    },
    closeDialog2() {
      this.dialogAddTableVisible = false
      this.dialogEditTableVisible = false
      this.searchData()
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
      this.searchData()
    }
  }
}
</script>

<style scoped>

.app-main .el-card {
  margin: 16px !important;
}

.el-card__body {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header_title::before {
  content:'';
    font-size: 15px;
    border-left:4px solid #4A76E2;
    padding-right: 16px;
}

.underLine {
    padding-right: 20px;
    border-bottom:0.2px solid #F3F3F3;
    padding-left: 20px;
}

.el-form-item {
  margin-bottom: 0;
}
.el-table__header-wrapper{
  background-color:#DCE1F0 ;
}
</style>
