<template>
  <el-card class="formStyle">
    <!-- <cardTitile :param="titileName" :show="true" :direct="'/采购入库'" :route="$route" /> -->

    <div style="padding:15px">
      <el-tabs type="border-card">
        <el-tab-pane label="采购入库">
          <!-- 检索区 -->
          <el-dialog v-if="dialogSelectTableVisible" :visible.sync="dialogSelectTableVisible" class="specialDialog">
            <selectForm :param="queryInfo.contractNo" :param2="listD" @closeSelectDialog="closeSelectDialog" />
          </el-dialog>
          <el-scrollbar style="height: calc(100vh - 415px);">
            <el-row :gutter="10" style="margin-left:0;margin-right:0;padding-bottom:0" class="specialSelect">
              <el-form :inline="true" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="110px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="入库日期 :" prop="ruKuDate">
                      <el-date-picker
                        v-model="queryInfo.ruKuDate"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        disabled
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="入库单号 :">
                      <el-input v-model="queryInfo.ruKuNo" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="业务部门 :" prop="deptName">
                      <el-tooltip :disabled="queryInfo.deptName.length < fixLimit" effect="dark" :content="queryInfo.deptName" placement="top">

                        <el-input v-model="queryInfo.deptName" placeholder="" disabled />
                      </el-tooltip>

                      <!--
                      <el-select v-model="queryInfo.deptName" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in yeWuDeptList"
                          :key="item.deptId"
                          :label="item.deptName"
                          :value="item.deptName"
                          @click.native="bindYeWuId(item.deptId)"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务员 :" prop="employeeName">
                      <el-tooltip :disabled="queryInfo.employeeName.length < fixLimit" effect="dark" :content="queryInfo.employeeName" placement="top">

                        <el-input v-model="queryInfo.employeeName" placeholder="" disabled />
                      </el-tooltip>

                      <!-- <el-select v-model="queryInfo.employeeName" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in yeWuPersonList"
                          :key="item.employeeId"
                          :label="item.employeeName"
                          :value="item.employeeName"
                          @click.native="bindYeWuPerson(item)"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="采购合同号 :" prop="purchaseNo">
                      <el-tooltip :disabled="queryInfo.purchaseNo.length < fixLimit" effect="dark" :content="queryInfo.purchaseNo" placement="top">

                        <el-input v-model="queryInfo.purchaseNo" placeholder="" disabled />
                      </el-tooltip>

                      <!-- <el-select v-model="queryInfo.purchaseNo" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in caiGouHeTongList"
                          :key="item.purchaseNo"
                          :label="item.purchaseNo"
                          :value="item.purchaseNo"
                          @click.native="bindHeTong(item)"
                        />
                      </el-select>                  -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="销售合同号 :" prop="contractNo">
                      <el-tooltip :disabled="queryInfo.contractNo.length < fixLimit" effect="dark" :content="queryInfo.contractNo" placement="top">

                        <el-input v-model="queryInfo.contractNo" placeholder="" disabled />
                      </el-tooltip>

                      <!-- <el-select v-model="queryInfo.contractNo" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in xiaoShouHeTongInfo"
                          :key="item.purchaseNo"
                          :label="item.purchaseNo"
                          :value="item.purchaseNo"
                          @click.native="bindXiaoShouHeTong(item)"
                        />
                      </el-select>                    -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="加工厂名称 :" prop="supplierName">
                      <el-tooltip :disabled="queryInfo.supplierName.length < fixLimit" effect="dark" :content="queryInfo.supplierName" placement="top">

                        <el-input v-model="queryInfo.supplierName" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="客户名称 :" prop="clientName">
                      <el-tooltip :disabled="queryInfo.clientName.length < fixLimit" effect="dark" :content="queryInfo.clientName" placement="top">

                        <el-input v-model="queryInfo.clientName" placeholder="" disabled />
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
                  <el-col :span="6">
                    <el-form-item label="箱数 :" prop="xiangQ">
                      <el-tooltip :disabled="queryInfo.xiangQ.length < fixLimit" effect="dark" :content="queryInfo.xiangQ" placement="top">

                        <el-input v-model="queryInfo.xiangQ" placeholder="" type="number" disabled @mousewheel.native.prevent />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="padding-bottom:10px">
                  <el-col :span="24" class="fullWidth">
                    <el-form-item label="备注 :">
                      <el-input v-model="queryInfo.remark" type="textarea" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
            <!-- 列表区 -->

            <el-row style="padding:0px 10px;display: flex; flex-direction:column;padding-bottom:20px">
              <el-table :data="listD" :cell-style="changeCellStyle" border max-height="600px" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod">
                <el-table-column type="index" label="序号" width="100" />
                <el-table-column label="款号" prop="kuanHao" width="100" />
                <el-table-column label="品名" prop="pinName" width="250" />
                <el-table-column label="布编" prop="clothId" width="150" />
                <el-table-column label="颜色" prop="color" width="100" />
                <el-table-column label="码数" prop="size" width="100" />
                <el-table-column label="单位" width="150" prop="unit" />
                <el-table-column label="合同数量" prop="contractQuantity" width="150" />
                <el-table-column label="入库数量" prop="ruKuQuantity" width="150" />
                <el-table-column label="合计入库数量" prop="heJiQuantity" width="150" />
                <el-table-column label="入库总数量" prop="totalQuantity" />
              </el-table>
            </el-row>
          </el-scrollbar>

        </el-tab-pane>
        <el-tab-pane label="相关附件">
          <tailfile
            :data="listRE"
            :instid="111"
            :table-data="listRE"
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
import { loadYeWuPerson, loadYwDept, addData, loadKeHuList, loadData, deleteRecord, postData } from '@/api/caigouruku'
import { combineObject } from '@/utils/combineObject'
import { baseUrl } from '@/api/apiUrl'
import selectForm from '@/views/cangkuguanli/caigouruku/selectForm'
import cardTitile from '@/layout/mixin/cardTitile'
import tailfile from '@/layout/mixin/uploadAttachment'

export default {
  name: 'Caigourukuchakan',

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
      fixLimit: 13,
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
      keHuList: [],
      yiFangList: [],
      listD: [],
      yeWuDeptList: [],
      yeWuPersonList: [],
      caiGouHeTongList: [],
      xiaoShouHeTongInfo: [],
      listRE: [],
      listDPart: [],
      titileName: '采购入库(详情)',
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
      var urlParam = '/api/RuKu?ruKuNo=' + this.$route.query.ruKuNo
      loadData(urlParam).then(res => {
        this.queryInfo = res.data.data[0]
        this.listRE = res.data.data[0].listRE
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
        this.listD = this.mergeTableRow(this.listD, ['kuanHao', 'heJiQuantity'])
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
    addNew() {
      var urlParam2 = '/api/Contract?contractNo=' + this.queryInfo.contractNo
      loadData(urlParam2).then(res => {
        var xiaoShouData = res.data.data[0]
        this.listDPart = xiaoShouData.listD
        this.listDPart.map(item => {
          this.$set(this.listDPart, 'applyDate', '')
          this.$set(this.listDPart, 'applyQuantity', '')
          this.$set(this.listDPart, 'yuLiang', '')
          this.$set(this.listDPart, 'totalPrice', '')
        })
      })
      if (this.queryInfo.contractNo === '') {
        this.$message.error('请选择合同号')
      } else {
        this.dialogSelectTableVisible = true
      }
    },
    bindYeWuPerson(data) {
      this.$set(this.queryInfo, 'employeeId', data.employeeId)
      var urlParam = '/api/Purchase?employeeId=' + data.employeeId
      loadData(urlParam).then(res => {
        this.caiGouHeTongList = res.data.data
      })
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
          this.listRE.splice(index, 1)
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
      this.listRE.push(data)
    },
    bindHeTong(data) {
      var urlParam = '/api/Purchase?purchaseNo=' + data.purchaseNo
      loadData(urlParam).then(res => {
        this.xiaoShouHeTongInfo = res.data.data
      })
    },
    bindXiaoShouHeTong(data) {
      this.$set(this.queryInfo, 'contractNo', data.contractNo)
      var urlParam = '/api/Contract?contractNo=' + data.contractNo
      loadData(urlParam).then(res => {
        var xiaoShouData = res.data.data[0]
        this.listDPart = xiaoShouData.listD
        this.listDPart.map(item => {
          this.$set(this.listDPart, 'applyDate', '')
          this.$set(this.listDPart, 'applyQuantity', '')
          this.$set(this.listDPart, 'yuLiang', '')
          this.$set(this.listDPart, 'totalPrice', '')
        })
        this.$set(this.queryInfo, 'listD', this.listDPart)
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
      this.$set(this.queryInfo, 'listRE', this.listRE)
    },
    saveToServe() {
      if (this.queryInfo.signDate === '' || this.queryInfo.supplierName === '') {
        this.$message.error('请添加必填项')
      } else {
        this.preSave()
        postData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$router.push({ path: '/采购入库' })
          // this.$emit('closeDialog')
          }
        })
      }
    },
    closeSelectDialog(idList) {
      this.dialogSelectTableVisible = false
      this.listDPart.map(item => {
        idList.map(id => {
          if (item.id === id) {
            var listDJson = {
              id: item.id,
              kuanHao: item.kuanHao,
              pinName: item.pinName,
              applyDate: '',
              clothId: item.clothId,
              cloor: item.cloor,
              size: item.size,
              unit: item.unit,
              quantity: item.quantity,
              applyQuantity: '',
              price: item.price,
              totalPrice: '',
              yuLiang: '',
              ruKuQuantity: '',
              contractQuantity: item.quantity,
              color: item.cloor
            }
            this.listD.unshift(listDJson)
            window.console.log('sassa')
            window.console.log(this.listD)
          }
        })
      })
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
      this.listRE = data
    },
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === '合计入库数量' || row.column.label === '入库总数量') {
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
