<template>
  <el-card>
    <cardTitile :param="titileName" />
    <!-- 检索区 -->
    <el-row :gutter="10" style="padding:0 16px; margin-left:0;margin-right:0;padding-bottom:0">
      <el-col>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" @submit.native.prevent>
          <el-row>
            <el-col span="4.5">
              <el-form-item label="加工厂名称 :">
                <el-input v-model.trim="queryInfo.supplierName" placeholder="" clearable maxlength="100" @keyup.enter.native="searchDataM" />
              </el-form-item>
            </el-col>
            <el-col span="4" class="function" style="display:flex;margin-right:auto">
              <el-button class="indexButton" icon="el-icon-search" @click="searchDataM">查询</el-button>
            </el-col>
            <el-col span="8" style="float:right;display:flex;justify-content: flex-end" class="function">
              <el-button class="indexButton" @click="addNewRecord">新增</el-button>
              <el-button class="orangeBtnClass" @click="deleteItemList">批量删除</el-button>
            </el-col>
          </el-row>
        </el-form>
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
        height="100%"
        style="margin-top:16px"
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
        />
        <el-table-column type="index" label="序号" width="80" fixed="left" />
        <el-table-column label="加工厂名称" prop="supplierName" width="150" show-overflow-tooltip />
        <!-- <template slot-scope="scope">
        <el-tooltip effect="dack" :content="scope.row.supplierName" placement="top-start">
          <p>{{scope.row.supplierName}}</p>
        </el-tooltip>
          </template>
        </el-table-column> -->
        <el-table-column label="税号" prop="taxAccount" width="150" show-overflow-tooltip />
        <el-table-column label="开户行" prop="kaiHuBank" width="150" show-overflow-tooltip />
        <el-table-column label="银行账号" prop="bankAccount" width="150" show-overflow-tooltip />
        <el-table-column label="工厂负责人" prop="supplierPerson" width="150" show-overflow-tooltip />
        <el-table-column label="电话" prop="telephone" width="150" show-overflow-tooltip />
        <el-table-column label="地址" prop="address" width="250" show-overflow-tooltip />
        <el-table-column label="是否停用" prop="state" width="150" show-overflow-tooltip />
        <el-table-column label="添加日期" prop="updateTime" width="200" show-overflow-tooltip />

        <el-table-column label="操作" fixed="right" class="specialList" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="showDataM(scope.row)">查看</el-button>
            <el-button type="text" :disabled="scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回' " @click="editDataM(scope.row)">修改</el-button>
            <el-button v-if="scope.row.approveState === '待提交' || scope.row.approveState === '取消' || scope.row.approveState === '驳回'" type="text" @click="uploadApprove(scope.row)">提交</el-button>
            <el-button v-if="scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回' " type="text" :disabled="scope.row.approveState === '作废'" @click="cancelApprove(scope.row)">取消</el-button>
            <el-button type="text" :style="{color:((scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回')? none:'#FAAB15')}" :disabled="(scope.row.approveState !== '待提交' && scope.row.approveState !== '取消' && scope.row.approveState !== '驳回')" @click="deleteData(scope.row.id)">删除</el-button>
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
import { baseUrl } from '@/api/apiUrl'

import { loadData, searchData, deleteRecord, uploadData, passData } from '@/api/jiagongchangdangan'
import { combineObject } from '@/utils/combineObject'

import cardTitile from '@/layout/mixin/cardTitile'

export default {
  name: 'Jiagongchangdangan',

  components: {
    cardTitile
  },

  data() {
    return {
      listLoading: true,
      initAllData: '',
      queryInfo: {
        supplierName: ''
      },
      titileName: '加工厂档案',
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
      deleteList: []
    }
  },

  created() {
    this.initData(this.pageSetting)
  },

  methods: {
    // 数据初始化
    initData(pageSetting) {
      var url = '/api/Supplier?'
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var urlParam = toUrlParam(url, searchInfo)
      this.listLoading = true
      loadData(urlParam).then(res => {
        this.listLoading = false
        this.totalSize = res.data.count
        this.initAllData = res.data.data
      })
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },

    addNewRecord() {
      this.$router.push({ path: '/加工厂档案/加工厂档案新增', query: { guid: getGuid() }})
    },
    editDataM(data) {
      this.$router.push({ path: '/加工厂档案/加工厂档案修改', query: { supplierName: data.supplierName }})
    },
    showDataM(data) {
      this.$router.push({ path: '/加工厂档案/加工厂档案详情', query: { supplierName: data.supplierName }})
    },
    deleteData(id) {
      var deleteItemSingle = {
        id: ''
      }
      this.$set(deleteItemSingle, 'id', id)
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
    uploadApprove(data) {
      var jsonData = [{
        approveStyle: '6',
        faQiPerson: '邓科',
        faQiPersonId: '10001',
        style: '加工厂',
        style_1: '1',
        pkNo: data.supplierName,
        url: baseUrl + '/#/加工厂档案/加工厂档案审批?supplierName=' + data.supplierName

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
        pkNo: data.supplierName,
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
    searchDataM() {
      this.pageSetting.current = 1
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var url = '/api/Supplier?'
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
          id: ''
        }
        this.$set(deleteItemSingle, 'id', item.id)
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
              window.console.log(_self.pageSetting.current)
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
    }
  }
}
</script>

<style scoped>
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
@media only screen and (max-width: 1450px) {
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
