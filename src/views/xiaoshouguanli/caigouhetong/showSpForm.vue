<template>
  <el-card class="formStyle">
    <!-- <cardTitile :param="titileName" :show="true" :direct="'/采购合同'" :route="$route" /> -->

    <div style="padding: 15px">
      <el-tabs type="border-card">
        <el-tab-pane label="采购合同">
          <!-- 检索区 -->
          <el-scrollbar style="height: calc(100vh - 415px);">

            <el-row :gutter="10" style="margin-left:0;margin-right:0;padding-bottom:0">
              <el-form :inline="true" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="100px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="销售合同号:">
                      <el-input v-model="queryInfo.contractNo" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="采购合同号:" prop="contractStyle">
                      <el-input v-model="queryInfo.purchaseNo" placeholder="" disabled />
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="签订日期:" prop="signDate">
                      <el-date-picker
                        v-model="queryInfo.signDate"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        disabled
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="甲方:" prop="contractBody">
                      <el-tooltip :disabled="queryInfo.contractBody.length < fixLimit" effect="dark" :content="queryInfo.contractBody" placement="top">

                        <el-input v-model="queryInfo.contractBody" placeholder="" disabled />
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务部门:" prop="deptName">
                      <el-tooltip :disabled="queryInfo.deptName.length < fixLimit" effect="dark" :content="queryInfo.deptName" placement="top">

                        <el-input v-model="queryInfo.deptName" placeholder="" disabled />
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务员:" prop="employeeName">
                      <el-tooltip :disabled="queryInfo.employeeName.length < fixLimit" effect="dark" :content="queryInfo.employeeName" placement="top">

                        <el-input v-model="queryInfo.employeeName" placeholder="" disabled />
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务负责人:" prop="yeWuPerson_1">
                      <el-tooltip :disabled="queryInfo.yeWuPerson_1.length < fixLimit" effect="dark" :content="queryInfo.yeWuPerson_1" placement="top">

                        <el-input v-model="queryInfo.yeWuPerson_1" placeholder="" disabled />
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>

                  <el-col :span="6">
                    <el-form-item label="电话:" prop="telephone">
                      <el-tooltip :disabled="queryInfo.telephone.length < fixLimit" effect="dark" :content="queryInfo.telephone" placement="top">

                        <el-input v-model="queryInfo.telephone" placeholder="" disabled />
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="地址:" prop="address_1">
                      <el-input v-model="queryInfo.address_1" placeholder="" type="textarea" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="6">
                    <el-form-item label="乙方:" prop="supplierName">
                      <el-tooltip :disabled="queryInfo.supplierName.length < fixLimit" effect="dark" :content="queryInfo.supplierName" placement="top">
                        <el-input v-model="queryInfo.supplierName" placeholder="" disabled />

                      <!-- <el-select v-model="queryInfo.supplierName" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in yiFangList"
                          :key="item.id"
                          :label="item.supplierName"
                          :value="item.supplierName"
                          @click.native="bindPerson(item)"
                        />
                      </el-select>                  -->
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="工厂负责人:">
                      <el-tooltip :disabled="queryInfo.supplierPerson.length < fixLimit" effect="dark" :content="queryInfo.supplierPerson" placement="top">

                        <el-input v-model="queryInfo.supplierPerson" placeholder="" disabled />
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="业务联系人:">
                      <el-tooltip :disabled="queryInfo.yeWuPerson.length < fixLimit" effect="dark" :content="queryInfo.yeWuPerson" placement="top">

                        <el-input v-model="queryInfo.yeWuPerson" placeholder="" disabled />
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="电话:">
                      <el-tooltip :disabled="queryInfo.yeWuTel.length < fixLimit" effect="dark" :content="queryInfo.yeWuTel" placement="top">

                        <el-input v-model="queryInfo.yeWuTel" placeholder="" disabled />
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>

                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="地址:" prop="address">
                      <el-input v-model="queryInfo.address" placeholder="" type="textarea" disabled />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row style="padding-bottom:0">
                  <el-col :span="24" class="fullWidth">
                    <el-form-item label="备注:">
                      <el-input v-model="queryInfo.remark" placeholder="" type="textarea" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
            <!-- 列表区 -->
            <el-row style="padding:0 10px;display: flex; flex-direction:column;padding-bottom:20px">
              <el-table :cell-style="changeCellStyle" :data="queryInfo.listD" border max-height="600px" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod">
                <el-table-column type="index" label="序号" width="100" fixed="left" />
                <el-table-column label="款号" prop="kuanHao" width="150" fixed="left" />
                <el-table-column label="品名" prop="pinName" width="150" />
                <el-table-column label="布编" prop="clothId" width="150" />
                <el-table-column label="颜色" prop="cloor" width="150" />
                <el-table-column label="码数" prop="size" width="150" />
                <el-table-column label="数量" prop="quantity" width="150" />
                <el-table-column label="单位" width="150" prop="unit" />
                <el-table-column label="单价（元/含税）" prop="price" width="150" />
                <el-table-column label="小计金额（元/含税）" prop="totalPrice" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.quantity * scope.row.price }}
                  </template>
                </el-table-column>
                <el-table-column label="合计数量" prop="heJiQuantity" width="150" />
                <el-table-column label="合计金额（元/含税）" prop="totalPrice_2" width="180" />
                <el-table-column label="数量允差" prop="cha" width="150" />
                <el-table-column label="交期" prop="planDate" width="150" />
                <el-table-column label="总数量" prop="totalQuantity" />
                <el-table-column label="总金额（元/含税）" prop="totalPrice_1" width="150" />
              </el-table>
            </el-row>
          </el-scrollbar>

        </el-tab-pane>
        <el-tab-pane label="相关附件">

          <tailfile
            :data="queryInfo.listPE"
            :instid="111"
            :table-data="queryInfo.listPE"
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
import { loadYeWuPerson, loadYwDept, postData, loadKeHuList, loadData, deleteRecord } from '@/api/caigouhetong'
import { combineObject } from '@/utils/combineObject'
import { baseUrl } from '@/api/apiUrl'
import tailfile from '@/layout/mixin/uploadAttachment'

import cardTitile from '@/layout/mixin/cardTitile'

export default {
  name: 'Caigouhetongchakan',

  components: {
    cardTitile,
    tailfile
  },

  data() {
    return {
      initAllData: '',
      queryInfo: '',
      rules: {
        signDate: [
          { required: true, message: '请选择签订日期', trigger: 'change' }
        ],
        supplierName: [
          { required: true, message: '请选择乙方', trigger: 'change' }
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
      keHuList: [],
      yiFangList: [],
      listD: [],
      yeWuDeptList: [],
      yeWuPersonList: [],
      listPE: [],
      titileName: '采购合同(详情)',
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
      fixLimit: 13,
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
      list3: []

    }
  },
  created() {
    this.initData()
    this.initSearchList()
  },
  methods: {
    // 数据初始化
    initData() {
      var urlParam = '/api/Purchase?purchaseNo=' + this.$route.query.purchaseNo
      loadData(urlParam).then(res => {
        this.queryInfo = res.data.data[0]
        this.queryInfo.listD.map((item1, index) => {
          if (this.list3.findIndex(item => item === item1.kuanHao) === -1) {
            this.list3.push(item1.kuanHao)
          }
        })
        const newListD = []
        this.list3.map((item1) => {
          this.queryInfo.listD.map((item, index) => {
            if (item1 === item.kuanHao) {
              newListD.push(item)
            }
          })
        })
        this.queryInfo.listD = newListD
        this.queryInfo.listD = this.mergeTableRow(this.queryInfo.listD, ['kuanHao', 'heJiQuantity', 'totalPrice_2'])
      })
      var param = '/api/Client'
      loadKeHuList(param).then(res => {
        this.keHuList = res.data.data
      })
      var param1 = '/api/Supplier?'
      loadData(param1).then(res => {
        this.yiFangList = res.data.data
      })
    },
    initSearchList() {
      var urlParam = '/ERP/selectDepartment?parentId=82'
      loadYwDept(urlParam).then(res => {
        this.yeWuDeptList = res.data.data
      })
    },
    bindYeWuId(id) {
      this.$set(this.queryInfo, 'employeeId', '')
      this.$set(this.queryInfo, 'deptId', id)
      var urlP = '/ERP/selectEmplyee?symbol=2&department=' + id
      loadYeWuPerson(urlP).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.yeWuPersonList = res.data.data
        }
      })
    },
    bindPerson(data) {
      this.$set(this.queryInfo, 'supplierPerson', data.supplierPerson)
      this.$set(this.queryInfo, 'yeWuPerson', data.yeWuPerson)
      this.$set(this.queryInfo, 'yeWuTel', data.yeWuTel)
      this.$set(this.queryInfo, 'address', data.address)
      this.$set(this.queryInfo, 'yeWuPerson', data.yeWuPerson)
      this.$set(this.queryInfo, 'yeWuPerson', data.yeWuPerson)
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
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
      window.console.log(data)
      var jsonObj = { rowspan: data.length, colspan: 1 }
      var newJsonObj = { rowspan: 0, colspan: 0 }
      this.$set(data[0], 'totalPrice_1-span', jsonObj)
      this.$set(data[0], 'totalQuantity-span', jsonObj)
      for (var i = 1; i < data.length; i++) {
        this.$set(data[i], 'totalPrice_1-span', newJsonObj)
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
          this.queryInfo.listPE.splice(index, 1)
        })
        .catch(_ => {})
    },
    addPhoto() {
      this.dialogAddTableVisible = true
    },
    showPhoto(url) {
      var fileLink = baseUrl + url
      window.open(fileLink, '_blank')
    },
    getFromChild(data) {
      this.queryInfo.listPE.push(data)
    },
    addNew() {
      var listDJson = {
        kuanHao: '',
        pinName: '',
        clientNo: '',
        clothId: '',
        cloor: '',
        size: '',
        quantity: '',
        unit: '',
        price: '',
        cha: '',
        planDate: ''
      }
      this.listD.unshift(listDJson)
    },

    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData(this.pageSetting)
    },
    saveToServe() {
      if (this.queryInfo.signDate === '' || this.queryInfo.supplierName === '') {
        this.$message.error('请添加必填项')
      } else {
        postData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$router.push({ path: '/采购合同' })
          }
        })
      }
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
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === '合计数量' || row.column.label === '总数量' || row.column.label === '合计金额（元/含税）' || row.column.label === '总金额（元/含税）') {
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
.fullWidth /deep/ .el-form-item{
  width: 100%;
}
.fullWidth /deep/ .el-form-item .el-form-item__content{
      width: calc(75% + 200px);
}
.halfWidth /deep/ .el-form-item{
  width: 100%;
}
.halfWidth /deep/ .el-form-item .el-form-item__content{
      width: calc(50% + 200px);
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
