<template>
  <el-card class="formStyle">
    <!-- <cardTitile :param="titileName" :show="true" :direct="'/销售出库'" :route="$route" /> -->
    <div style="padding: 15px">
      <el-tabs type="border-card">
        <el-tab-pane label="销售出库">
          <!-- 检索区 -->
          <el-scrollbar style="height: calc(100vh - 415px);">

            <el-row :gutter="10" style="margin-left:0;margin-right:0;padding-bottom:0" class="specialSelect">
              <el-form :inline="true" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="115px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="出库日期 :" prop="chuKuDate">
                      <el-date-picker
                        v-model="queryInfo.chuKuDate"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        disabled
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="出库单号 :">
                      <el-input v-model="queryInfo.chuKuNo" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="业务部门 :" prop="deptName">
                      <el-tooltip :disabled="queryInfo.deptName.length < fixLimit" effect="dark" :content="queryInfo.deptName" placement="top">

                        <el-input v-model="queryInfo.deptName" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务员 :" prop="employeeName">
                      <el-tooltip :disabled="queryInfo.employeeName.length < fixLimit" effect="dark" :content="queryInfo.employeeName" placement="top">

                        <el-input v-model="queryInfo.employeeName" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="发货申请单号 :" prop="applyNo">
                      <el-tooltip :disabled="queryInfo.applyNo.length < fixLimit" effect="dark" :content="queryInfo.applyNo" placement="top">

                        <el-input v-model="queryInfo.applyNo" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="采购合同号 :" prop="purchaseNo">
                      <el-tooltip :disabled="queryInfo.purchaseNo.length < fixLimit" effect="dark" :content="queryInfo.purchaseNo" placement="top">

                        <el-input v-model="queryInfo.purchaseNo" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>

                  <el-col :span="6">
                    <el-form-item label="客户名称 :" prop="clientName">
                      <el-tooltip :disabled="queryInfo.clientName.length < fixLimit" effect="dark" :content="queryInfo.clientName" placement="top">

                        <el-input v-model="queryInfo.clientName" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="联系人 :" prop="linkMan">
                      <el-tooltip :disabled="queryInfo.linkMan.length < fixLimit" effect="dark" :content="queryInfo.linkMan" placement="top">

                        <el-input v-model="queryInfo.linkMan" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="联系人电话 :" prop="linkTel">
                      <el-tooltip :disabled="queryInfo.linkTel.length < fixLimit" effect="dark" :content="queryInfo.linkTel" placement="top">

                        <el-input v-model="queryInfo.linkTel" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="客户合同号 :" prop="clientContractNo">
                      <el-tooltip :disabled="queryInfo.clientContractNo.length < fixLimit" effect="dark" :content="queryInfo.clientContractNo" placement="top">

                        <el-input v-model="queryInfo.clientContractNo" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="运输方式 :" prop="transportStyle1">
                      <el-tooltip :disabled="queryInfo.transportStyle1.length < fixLimit" effect="dark" :content="queryInfo.transportStyle1" placement="top">

                        <el-input v-model="queryInfo.transportStyle1" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="收货地址 :" prop="address">
                      <el-tooltip :disabled="queryInfo.address.length < 50" effect="dark" :content="queryInfo.address" placement="top">

                        <el-input v-model="queryInfo.address" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="fullWidth">
                    <el-form-item label="备注 :">
                      <el-input v-model="queryInfo.remark" type="textarea" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
            <!-- 列表区 -->

            <el-row style="padding:0 10px;display: flex; flex-direction:column;padding-bottom:20px">
              <el-row style="display:flex;padding-bottom:12px">
                <el-col :span="4">
                  <p style="margin:0;font-size:16px;font-weight: 400;color:#656565">出库明细 :</p>
                </el-col>
              </el-row>
              <el-table :cell-style="changeCellStyle" :data="listD" border max-height="600px" style="margin-top: 0px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod">
                <el-table-column type="index" label="序号" width="100" />
                <el-table-column label="款号" prop="kuanHao" width="100" />
                <el-table-column label="入库日期" prop="signDate" width="100" />
                <el-table-column label="品名" prop="pinName" width="250" />
                <el-table-column label="布编" prop="clothId" width="150" />
                <el-table-column label="颜色" prop="color" width="100" />
                <el-table-column label="码数" prop="size" width="100" />
                <el-table-column label="单位" width="150" prop="unit" />
                <!-- <el-table-column label="库存数量" prop="ruKuQuantity" width="150" /> -->
                <el-table-column label="发货数量" prop="applyQuantity" width="150" />
                <!-- <el-table-column label="此款号勾选累计数量" prop="selectQuantity" width="250" /> -->
                <el-table-column label="合计数量" prop="heJiQuantity" width="150" />
                <el-table-column label="总数量" prop="totalQuantity" />

              <!-- <el-table-column label="操作" fixed="right" width="250">
                <template slot-scope="scope">
                  <el-button type="text" style="color:#FAAB15" @click="deleteListData(scope.$index)">删除</el-button>
                </template>
              </el-table-column> -->
              </el-table>
            </el-row>
          </el-scrollbar>

        </el-tab-pane>
        <el-tab-pane label="相关附件">
          <tailfile
            :data="listCE"
            :instid="111"
            :table-data="listCE"
            limit="1"
            title="相关附件"
            @successFile="successFile"
          />
        </el-tab-pane>
      </el-tabs>
    </div>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadYeWuPerson, loadYwDept, addData, postData, loadKeHuList, loadData, deleteRecord } from '@/api/xiaoshouchuku'
import { combineObject } from '@/utils/combineObject'
import { baseUrl } from '@/api/apiUrl'
import selectForm from '@/views/cangkuguanli/caigouruku/selectForm'
import cardTitile from '@/layout/mixin/cardTitile'
import tailfile from '@/layout/mixin/uploadAttachment'

export default {
  name: 'Xiaoshouchukuchakan',

  components: {
    cardTitile,
    tailfile,
    selectForm
  },

  data() {
    return {
      initAllData: '',
      queryInfoO: '',
      queryInfo: '',
      rules: {
        ruKuDate: [
          { required: true, message: '请填写入库日期', trigger: 'change' }
        ],
        deptName: [
          { required: true, message: '请选择业务部门', trigger: 'change' }
        ],
        employeeName: [
          { required: true, message: '请选择业务员', trigger: 'change' }
        ],
        purchaseNo: [
          { required: true, message: '请填写采购合同', trigger: 'change' }
        ],
        contractNo: [
          { required: true, message: '请填写销售合同号', trigger: 'change' }
        ],
        supplierName: [
          { required: true, message: '请填写加工厂名称', trigger: 'change' }
        ],
        clientName: [
          { required: true, message: '请填写客户名称', trigger: 'change' }
        ],
        clientContractNo: [
          { required: true, message: '请填写客户合同号', trigger: 'change' }
        ],
        xiangQ: [
          { required: true, message: '请填写箱数', trigger: 'change' }
        ]
      },
      list1: [{
        safety: '',
        creditGuarantee: '',
        returnofunds: '',
        quantity: '',
        unit: '',
        clientLevel: '',
        clientStyle: '',
        boardinglimit: '',
        zhongXinBaoYuDu: '',
        days: ''
      }],
      fixLimit: 13,
      keHuList: [],
      yiFangList: [],
      listD: [],
      listDOrigin: [],
      selectOriginList: [],
      listDFirst: [],
      yeWuDeptList: [],
      yeWuPersonList: [],
      caiGouHeTongList: [],
      xiaoShouHeTongInfo: [],
      listCE: [],
      listDPart: [],
      titileName: '销售出库(详情)',
      value: '',
      dialogAddTableVisible: false,
      dialogSelectTableVisible: false,
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
      multipleSelection: [],
      options: [{
        value: '选项1',
        label: 'A'
      }, {
        value: '选项2',
        label: 'B'
      }, {
        value: '选项3',
        label: 'C'
      }, {
        value: '选项4',
        label: 'D'
      }, {
        value: '选项5',
        label: 'E'
      }],
      value1: '',
      total: 0,
      hejiAmount: 0,
      list2: [],
      amount: 0,
      list3: [],
      list4: []

    }
  },
  created() {
    this.initData()
    this.initSearchList()
  },
  methods: {
    // 数据初始化
    initData() {
      var urlParam = '/api/ChuKu?chuKuNo=' + this.$route.query.chuKuNo + '&xiangQ=1'
      loadData(urlParam).then(res => {
        this.queryInfo = res.data.data[0]
        if (this.queryInfo.address1 !== null) {
          this.$set(this.queryInfo, 'address', this.queryInfo.address1)
        }
        this.listCE = res.data.data[0].listCE
        this.listD = res.data.data[0].listD
        this.listD.map((item1, index) => {
          if (this.list3.findIndex(item => item === item1.kuanHao) === -1) {
            this.list3.push(item1.kuanHao)
          }
        })
        const newListD = []
        this.list3.map((item1) => {
          this.listD.map((item, index) => {
            if (item1 === item.kuanHao) {
              newListD.push(item)
            }
          })
        })
        this.listD = newListD
        //         this.listD = this.groupBy(this.listD, function(item) {
        //   return item.kuanHao
        // })
        this.listD = this.mergeTableRow(this.listD, ['kuanHao', 'heJiQuantity'])
      })

      var urlParam1 = '/api/ChuKu/getApplyByNo?contractNo=' + this.$route.query.contractNo
      loadData(urlParam1).then(res => {
        this.listDOrigin = res.data.data
        this.listDOrigin.map((item1, index) => {
          if (this.list4.findIndex(item => item === item1.kuanHao) === -1) {
            this.list4.push(item1.kuanHao)
          }
        })
        const newListD = []
        this.list4.map((item1) => {
          this.listDOrigin.map((item, index) => {
            if (item1 === item.kuanHao) {
              newListD.push(item)
            }
          })
        })
        this.listDOrigin = newListD
        this.listDOrigin = this.mergeTableRow(this.listDOrigin, ['kuanHao', 'heJiQuantity'])
      })
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    addNew() {
      if (this.queryInfo.contractNo === '') {
        this.$message.error('请选择合同号')
      } else {
        this.dialogSelectTableVisible = true
      }
    },
    addToMainList() {
      window.console.log('dada')
      window.console.log(this.multipleSelection)
      window.console.log(this.listD)
      this.total = 0
      this.hejiAmount = 0
      this.list2 = []
      this.multipleSelection.map((item, index) => {
        this.$set(this.multipleSelection[index], 'applyQuantity', item.ruKuQuantity)
      })
      this.listD = this.listD.concat(JSON.parse(JSON.stringify(this.multipleSelection)))
      this.listD.map((item1, index) => {
        this.$set(this.listD[index], 'totalQuantity', 0)
        this.$set(this.listD[index], 'heJiQuantity', 0)
        if (this.list2.findIndex(item => item === item1.kuanHao) === -1) {
          this.list2.push(item1.kuanHao)
        }
      })
      window.console.log(this.listD)

      // // goup by kuanhao 排序
      const newListD1 = []
      this.list2.map((item1) => {
        this.listD.map((item, index) => {
          if (item1 === item.kuanHao) {
            newListD1.push(item)
          }
        })
      })
      this.listD = newListD1

      this.list2.map((item1) => {
        this.amount = 0
        this.listD.map((item, index) => {
          if (item1 === item.kuanHao) {
            this.amount += parseInt(item.applyQuantity)
          }
        })
        this.listD.map((item, index) => {
          if (item1 === item.kuanHao) {
            this.$set(this.listD[index], 'heJiQuantity', this.amount)
          }
        })
      })
      window.console.log(this.listD)

      this.listD.map(item => {
        this.total += parseInt(item.applyQuantity)
      })

      this.listD.map((item, index) => {
        this.$delete(this.listD[index], 'heJiQuantity-span')
        this.$delete(this.listD[index], 'kuanHao-span')
        this.$delete(this.listD[index], 'totalQuantity-span')
        this.$set(this.listD[index], 'applyQuantity', item.applyQuantity)
        this.$set(this.listD[index], 'totalQuantity', this.total)
      })
      this.listD = this.mergeTableRow(this.listD, ['kuanHao', 'heJiQuantity'])
    },
    mergeTableRow(data, merge) {
      if (!merge || merge.length === 0) {
        return data
      }
      merge.forEach((m) => {
        const mList = {}
        // 循环每一组
        data = data.map((v, index) => {
          if (mList[v['kuanHao']]) {
            mList[v['kuanHao']]++
            data[index - mList[v['kuanHao']] + 1][m + '-span'].rowspan++
            v[m + '-span'] = {
              rowspan: 0,
              colspan: 0
            }
          } else {
            mList[v['kuanHao']] = 1
            // v是提取出来的每组
            v[m + '-span'] = {
              rowspan: 1,
              colspan: 1
            }
          }
          return v
        })
      })
      var jsonObj = { rowspan: data.length, colspan: 1 }
      var newJsonObj = { rowspan: 0, colspan: 0 }
      this.$set(data[0], 'totalQuantity-span', jsonObj)
      for (var i = 1; i < data.length; i++) {
        this.$set(data[i], 'totalQuantity-span', newJsonObj)
      }
      return data
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const span = column['property'] + '-span'
      if (row[span]) {
        return row[span]
      }
    },
    bindYeWuPerson(data) {
      this.$set(this.queryInfo, 'employeeId', data.employeeId)
      var urlParam = '/api/Purchase?employeeId=' + data.employeeId
      loadData(urlParam).then(res => {
        this.caiGouHeTongList = res.data.data
      })
    },
    deleteData(index) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.listD.splice(index, 1)
        })
        .catch(_ => {})
    },
    deleteFileData(index) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.listCE.splice(index, 1)
        })
        .catch(_ => {})
    },
    deleteListData(index) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.listD.splice(index, 1)
        })
        .catch(_ => {})
    },
    groupBy: function(array, f) {
      var groups = {}
      array.forEach(function(o) {
        var group = JSON.stringify(f(o))
        groups[group] = groups[group] || []
        groups[group].push(o)
      })
      return Object.keys(groups).map(function(group) {
        return groups[group]
      })
    },
    addPhoto() {
      this.dialogAddTableVisible = true
    },
    showPhoto(url) {
      var fileLink = baseUrl + url
      window.open(fileLink, '_blank')
    },
    getFromChild(data) {
      this.listCE.push(data)
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
    bindHeTong(data) {
      var urlParam = '/api/Purchase?purchaseNo=' + data.purchaseNo
      loadData(urlParam).then(res => {
        this.xiaoShouHeTongInfo = res.data.data
      })
    },

    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData(this.pageSetting)
    },
    preSave() {
      this.$set(this.queryInfo, 'userId', '10001')
      this.$set(this.queryInfo, 'userName', '邓科')
      this.$set(this.queryInfo, 'listD', this.listD)
      this.$set(this.queryInfo, 'listCE', this.listCE)
    },
    saveToServe() {
      // if (this.queryInfo.signDate === '' || this.queryInfo.supplierName === '') {
      //   this.$message.error('请添加必填项')
      // } else {
      this.preSave()
      postData(this.queryInfo).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.$message.success(res.data.tipInfo)
          this.$router.push({ path: '/销售出库' })
          // this.$emit('closeDialog')
        }
      })
      // }
    },
    closeDialoga() {
      this.dialogSelectTableVisible = false
    },

    closeDialog() {
      this.dialogAddTableVisible = false
      // this.initData(this.pageSetting)
    },
    bindJiaFangInfo(data) {
      this.$set(this.queryInfo, 'yeWuPerson', data.yeWuPerson)
      this.$set(this.queryInfo, 'linkMan', data.linkMan)
      this.$set(this.queryInfo, 'yeWuTel', data.yeWuTel)
    },
    successFile(data) {
      this.listCE = data
    },
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === '合计数量' || row.column.label === '总数量') {
        return 'background: #F9F9FB' // 修改的样式
      } else {
        return ''
      }
    }

  }
}
</script>

<style scoped>
/deep/ .el-tabs__content{
  padding: 20px !important;
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

 /deep/ .el-form-item__content {
    display: inline-block;
    vertical-align: top;
    width: 200px;
}
/deep/ .el-input.is-disabled .el-input__inner{
  color: black
}
/deep/ .el-row{
  padding-bottom: 25px
}

.el-select {
  width:100%;
}

#pane-1 {
  display: flex;
  flex-direction: column;
}
@media only screen and (max-width: 1280px) {
   /deep/ .el-form--inline .el-form-item__content {
      width: 180px;
  }
  .rightPart {
    width: 19%;
  }
  .leftPart {
    width: 81%;
  }
  .text2Special /deep/ .el-form-item {
      /* width: calc(50% + 272px) */
      display: flex;
      flex-direction: column;
  }
  .text2Special /deep/ .el-form-item .el-form-item__content{
      width: calc(100% - 120px)
  }
  .text3Special /deep/ .el-form-item {
      width: calc(50% +306px)
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
