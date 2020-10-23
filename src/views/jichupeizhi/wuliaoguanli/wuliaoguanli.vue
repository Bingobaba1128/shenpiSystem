<template>
  <el-card style="higherDialog">
    <cardTitile :param="titileName" />
    <!-- 检索区 -->
    <el-row :gutter="10" style="padding:0 16px; margin-left:0;margin-right:0;padding-bottom:0" class="jiChuPeiZhiClass">
      <el-col style=";padding-left:0;padding-right:0">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" @submit.native.prevent>
          <el-row>
            <el-col span="4.5">
              <el-form-item label="物料编号 :" label-width="90px">
                <el-input v-model.trim="queryInfo.no" placeholder="" clearable maxlength="100" @keyup.enter.native="searchData" />
              </el-form-item>
              <el-form-item label="物料名称:">
                <el-input v-model.trim="queryInfo.name" placeholder="" clearable maxlength="100" @keyup.enter.native="searchData" />
              </el-form-item>
            </el-col>
            <el-col span="4" class="function" style="display:flex;margin-right:auto">
              <el-button class="indexButton" icon="el-icon-search" @click="searchData">查询</el-button>
            </el-col>
            <el-col span="8" style="float:right;display:flex;justify-content: flex-end" class="function">
              <el-button class="indexButton" @click="addNewRecord">新增</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <!-- 列表区 -->
    <div class="higherDialog">
      <el-dialog v-if="dialogAddTableVisible" :visible.sync="dialogAddTableVisible" :close-on-click-modal="false">
        <addNewForm @closeDialog="closeDialog" @closeDialog2="closeDialog2" />
      </el-dialog>

      <el-dialog v-if="dialogEditTableVisible" :visible.sync="dialogEditTableVisible" :close-on-click-modal="false">
        <editForm :key="editParam.id" :param="editParam" @closeDialog="closeDialog" @closeDialog2="closeDialog2" />
      </el-dialog>
    </div>
    <el-row style="padding:0 16px;display: flex; flex-direction:column;height:700px">
      <el-table
        v-loading="listLoading"
        :data="initAllData"
        border
        height="100%"
        element-loading-text="努力加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255, 255, 0.9)"
        empty-text=" "
        :max-height="$tableHeight"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="80" fixed="left" />
        <el-table-column label="物料分类" prop="classify" width="120" show-overflow-tooltip />
        <el-table-column label="物料类型" prop="style" width="120" show-overflow-tooltip />
        <el-table-column label="物料编号" prop="no" width="120" show-overflow-tooltip />
        <el-table-column label="物料名称" prop="name" width="120" show-overflow-tooltip />
        <el-table-column label="规格/幅宽" prop="sec" width="120" show-overflow-tooltip />
        <el-table-column label="采购总价(元/含税)" prop="purchasePrice" width="150" show-overflow-tooltip />
        <el-table-column label="采购总量" prop="purchaseQuantity" width="120" show-overflow-tooltip />
        <el-table-column label="采购单位" prop="purchaseUnit" width="120" show-overflow-tooltip />
        <el-table-column label="换算数" prop="changeQuantity" width="120" show-overflow-tooltip />
        <el-table-column label="单价(元/含税)" prop="price" width="120" show-overflow-tooltip />
        <el-table-column label="单位" prop="unit" width="120" show-overflow-tooltip />
        <el-table-column label="创建人" prop="operator" width="120" show-overflow-tooltip />
        <el-table-column label="创建时间" prop="operateDate" width="150" show-overflow-tooltip />

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
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadData, loadFuLiaoLeiXingData, searchData, deleteRecord } from '@/api/wuliaoguanli'
import { combineObject } from '@/utils/combineObject'

import addNewForm from '@/views/jichupeizhi/wuliaoguanli/addNewForm'
import editForm from '@/views/jichupeizhi/wuliaoguanli/eidtNewForm'
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
        name: '',
        no: ''
      },
      		listLoading: true,
      current: 1,
      titileName: '物料管理',
      value: '',
      dialogAddTableVisible: false,
      dialogEditTableVisible: false,
      editData: '',
      totalSize: '',
      pageSetting: {
        current: 1,
        size: 10
      },
      token: '',
      deleteItem: {
        id: '',
        styleId: ''
      },
      specialPageSetting: {
        current: '',
        size: 10
      },
      editParam: '',
      fuLiaoList: '',
      multipleSelection: []

    }
  },

  created() {
    this.initData()
    this.loadFuLiaoList()
  },

  methods: {

    loadFuLiaoList() {
      loadFuLiaoLeiXingData().then(res => {
        this.fuLiaoList = res.data.data
      })
    },
    // 数据初始化
    initData() {
      var url = '/api/MaterialManagement?'
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var urlParam = toUrlParam(url, searchInfo)
      this.listLoading = true
      loadData(urlParam).then(res => {
        this.listLoading = false
        this.totalSize = res.data.count
        this.initAllData = res.data.data
      })
    },
    addNewRecord() {
      this.dialogAddTableVisible = true
    },
    closeDialog() {
      this.dialogAddTableVisible = false
      this.dialogEditTableVisible = false

      this.initData(this.pageSetting)
    },
    deleteData(id, styleId) {
      this.$set(this.deleteItem, 'id', id)
      this.$set(this.deleteItem, 'styleId', styleId)

      var _self = this
      this.$utils.isdel(function() {
        deleteRecord(_self.deleteItem).then(res => {
          if (res.data.code !== 1) {
            _self.$message.error(res.data.tipInfo)
          } else {
            _self.$message.success(res.data.tipInfo)
            _self.initData()
          }
        })
      })
    },
    editDataM(data) {
      this.editParam = data
      this.dialogEditTableVisible = true
    },
    searchData() {
      this.pageSetting.current = 1
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var url = '/api/MaterialManagement?'
      var urlParam = toUrlParam(url, searchInfo)
      this.listLoading = true
      searchData(urlParam).then(res => {
        this.listLoading = false
        this.totalSize = res.data.count
        this.initAllData = res.data.data
      })
    },
    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData()
    },
    handleSizeChange(val) {
      this.pageSetting.size = val
      this.initData()
    },
    closeDialog2() {
      this.dialogAddTableVisible = false
      this.dialogEditTableVisible = false
      this.initData()
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
.higherDialog /deep/ .el-dialog__body{
flex: 1;
}
.higherDialog /deep/ .el-dialog__wrapper .el-dialog {
    height: 388px !important;
    flex-direction: column;
}
.app-main .el-card {
  margin: 16px !important;
}

/* .dialogClass .footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 18px;
    padding-top: 15px;
    border-top: 1px solid #f3f3f3
}
.dialogClass .content{
  position: relative;
  height: 40px;
  padding: 0 20px;
} */
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
