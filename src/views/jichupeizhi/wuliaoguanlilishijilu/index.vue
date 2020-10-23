<template>
  <el-card>
    <cardTitile :param="titileName" />
    <!-- 检索区 -->
    <el-row :gutter="10" style="padding:0 20px; margin-left:0;margin-right:0">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="物料编号:">
          <el-input v-model="queryInfo.unitName" placeholder="" />
        </el-form-item>
        <el-form-item label="物料名称:">
          <el-input v-model="queryInfo.unitName" placeholder="" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

    </el-row>

    <!-- 列表区 -->
    <el-row style="padding:0 20px;display: flex; flex-direction:column;height:80%">
      <el-table :data="initAllData" border style="height:100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column label="物料分类" prop="supplierName" />
        <el-table-column label="物料类型" prop="excipientsType" />
        <el-table-column label="物料编号" prop="excipientsType" />
        <el-table-column label="物料名称" prop="excipientsType" />
        <el-table-column label="规格/幅宽" prop="excipientsType" />
        <el-table-column label="采购价格/元" prop="excipientsType" />
        <el-table-column label="采购数量" prop="excipientsType" />
        <el-table-column label="采购单位" prop="excipientsType" />
        <el-table-column label="换算数" prop="excipientsType" />
        <el-table-column label="单价/元" prop="excipientsType" />
        <el-table-column label="单位" prop="excipientsType" />
        <el-table-column label="创建人" prop="excipientsType" />
        <el-table-column label="创建时间" prop="excipientsType" />
      </el-table>
      <el-row style="height: 60px;display:flex;background-color:#F6F8FC">
        <el-pagination
          style="align-self:center;margin-left:auto;margin-right:10px"
          background
          layout="prev, pager, next,sizes,jumper"
          :total="totalSize*10"
          :current-page="pageSetting.PageIndex"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-row>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadData, loadFuLiaoLeiXingData, searchData, deleteRecord } from '@/api/fuliaojichudangan'
import { combineObject } from '@/utils/combineObject'

import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },

  data() {
    return {
      initAllData: '',
      queryInfo: {
        fuLiaoLeiXingId: null,
        fuLiaoName: ''
      },
      titileName: '物料管理历史记录',
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
        supplierId: ''
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
    this.initData(this.pageSetting)
    this.loadFuLiaoList()
  },

  methods: {

    loadFuLiaoList() {
      loadFuLiaoLeiXingData().then(res => {
        this.fuLiaoList = res.data.data
        window.console.log(this.fuLiaoList)
      })
    },
    // 数据初始化
    initData(pageSetting) {
      var url = '/api/fuliaojichu?'
      var urlParam = toUrlParam(url, pageSetting)
      loadData(urlParam).then(res => {
        this.totalSize = res.data.count
        this.initAllData = res.data.data
      })
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    bindValue(val) {
      this.$set(this.queryInfo, 'fuLiaoLeiXingId', val)
    },
    deleteData(id) {
      this.$set(this.deleteItem, 'fuLiaoJiChuId', id)
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
    editDataM(data) {
      this.editParam = data
      this.dialogEditTableVisible = true
    },
    searchData() {
      window.console.log(this.queryInfo)
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var url = '/api/fuliaojichu?'
      var urlParam = toUrlParam(url, searchInfo)
      searchData(urlParam).then(res => {
        this.initAllData = res.data.data
      })
    },
    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData(this.pageSetting)
    }
  }
}
</script>

<style scoped>

.app-main {
  background-color: #F6F8FC
}

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
