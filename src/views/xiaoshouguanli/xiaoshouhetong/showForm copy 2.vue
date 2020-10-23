<template>
  <el-card class="formStyle">
    <cardTitile :param="titileName" :show="true" :direct="'/销售合同'" :route="$route" />
    <div style="padding: 0 15px">
      <el-tabs type="border-card">
        <el-tab-pane label="销售合同">
          <!-- 检索区 -->
          <el-scrollbar style="height: calc(100vh - 350px);">

            <el-row :gutter="10" style="margin-left:0;margin-right:0;padding-bottom:0">
              <el-form :inline="true" :rules="rules" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="110px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="合同类型:" prop="contractStyle">
                      <el-input v-model="queryInfo.contractStyle" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="销售合同号:" prop="contractNo">
                      <el-input v-model="queryInfo.contractNo" placeholder="" disabled />
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
                    <el-form-item label="甲方:" prop="clientName">
                      <el-select v-model="queryInfo.clientName" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in keHuList"
                          :key="item.clientNo"
                          :label="item.clientName"
                          :value="item.clientNo"
                          @click.native="bindJiaFangInfo(item)"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务负责人:">
                      <el-input v-model="queryInfo.yeWuPerson" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务联系人:">
                      <el-input v-model="queryInfo.linkMan" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="电话:">
                      <el-input v-model="queryInfo.yeWuTel" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="品牌:" prop="brandName">
                      <el-select v-model="queryInfo.brandName" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="付款方式:" prop="payStyle">
                      <el-select v-model="queryInfo.payStyle" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="结算方式:" prop="settlementStyle">
                      <el-input v-model="queryInfo.settlementStyle" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="客户合同号:" prop="clientContractNo">
                      <el-input v-model="queryInfo.clientContractNo" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="地址:" prop="address">
                      <el-input v-model="queryInfo.address" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="6">
                    <el-form-item label="乙方:" prop="contractBody">
                      <el-input v-model="queryInfo.contractBody" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务部门:" prop="deptName">
                      <el-select v-model="queryInfo.deptName" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in yeWuDeptList"
                          :key="item.deptId"
                          :label="item.deptName"
                          :value="item.deptId"
                          @click.native="bindYeWuId(item.deptId)"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务员:" prop="employeeName">
                      <el-select v-model="queryInfo.employeeName" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in yeWuPersonList"
                          :key="item.employeeId"
                          :label="item.employeeName"
                          :value="item.employeeId"
                          @click.native="bindYeWuPerson(item.employeeId)"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务负责人:" prop="yeWuPerson_1">
                      <el-select v-model="queryInfo.yeWuPerson_1" placeholder="" disabled>
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="电话:" prop="telephone">
                      <el-input v-model="queryInfo.telephone" placeholder="" disabled />

                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="地址:" prop="address_1">
                      <el-input v-model="queryInfo.address_1" placeholder="" disabled />
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

            <el-row style="padding:0 10px;display: flex; flex-direction:column;min-height:400px;padding-bottom:20px">
              <el-table :data="listD" border height="100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod">
                <el-table-column type="index" label="序号" width="100" />
                <el-table-column label="款号" prop="kuanHao" width="150" />
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
                <el-table-column label="合计数量" prop="heJiQuantity" />
                <el-table-column label="合计金额（元/含税）" prop="totalPrice_2" width="180" />
                <el-table-column label="数量允差" prop="cha" width="150" />
                <el-table-column label="交期" prop="planDate" width="150" />
                <el-table-column label="总数量" prop="totalQuantity" />
                <el-table-column label="总金额（元/含税）" prop="totalPrice_1" width="180" />
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
import { loadYeWuPerson, loadYwDept, postData, loadKeHuList, loadData, searchData, deleteRecord } from '@/api/xiaoshouhetong'
import { combineObject } from '@/utils/combineObject'
import addPhotoForm from '@/views/xiaoshouguanli/xiaoshouhetong/addPhotoForm'
import { baseUrl } from '@/api/apiUrl'
import tailfile from '@/layout/mixin/uploadAttachment'

import cardTitile from '@/layout/mixin/cardTitile'

export default {
  name: 'Xiaoshouhetongchakan',

  components: {
    cardTitile,
    addPhotoForm,
    tailfile
  },

  data() {
    return {
      initAllData: '',
      queryInfo: '',
      rules: {
        contractStyle: [
          { required: true, message: '请填写合同类型', trigger: 'blur' }
        ],
        contractNo: [
          { required: true, message: '请填写销售合同号', trigger: 'blur' }
        ],
        signDate: [
          { required: true, message: '请填写签订日期', trigger: 'blur' }
        ],
        clientName: [
          { required: true, message: '请填写客户名称', trigger: 'blur' }
        ],
        yeWuPerson: [
          { required: true, message: '请填写业务负责人', trigger: 'blur' }
        ],
        linkMan: [
          { required: true, message: '请填写业务联系人', trigger: 'blur' }
        ],
        yeWuTel: [
          { required: true, message: '请填写电话', trigger: 'blur' }
        ],
        brandName: [
          { required: true, message: '请填写品牌', trigger: 'blur' }
        ],
        payStyle: [
          { required: true, message: '请填写付款方式', trigger: 'blur' }
        ],
        settlementStyle: [
          { required: true, message: '请填写结算方式', trigger: 'blur' }
        ],
        clientContractNo: [
          { required: true, message: '请填写客户合同号', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写地址', trigger: 'blur' }
        ],
        contractBody: [
          { required: true, message: '请填写乙方名称', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '请填写业务部门', trigger: 'blur' }
        ],
        employeeName: [
          { required: true, message: '请填写业务员', trigger: 'blur' }
        ],
        yeWuPerson_1: [
          { required: true, message: '请填写业务负责人', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请填写电话', trigger: 'blur' }
        ],
        address_1: [
          { required: true, message: '请填写地址', trigger: 'blur' }
        ]
      },

      keHuList: [],
      listD: [],
      yeWuDeptList: [],
      yeWuPersonList: [],
      listCE: [],
      titileName: '销售合同(详情)',
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
  },
  methods: {
    // 数据初始化

    initData() {
      var urlParam = '/api/Contract?contractNo=' + this.$route.query.contractNo
      loadData(urlParam).then(res => {
        this.queryInfo = res.data.data[0]
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
        this.listD = this.mergeTableRow(this.listD, ['kuanHao', 'heJiQuantity', 'totalPrice_2'])

        this.listCE = res.data.data[0].listCE
      })
      var param = '/api/Client'
      loadKeHuList(param).then(res => {
        this.keHuList = res.data.data
      })
      var urlParam1 = '/ERP/selectDepartment?parentId=82'
      loadYwDept(urlParam1).then(res => {
        this.yeWuDeptList = res.data.data
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
    bindYeWuId(id) {
      this.$set(this.queryInfo, 'employeeName', '')
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
    bindYeWuPerson(id) {
      this.$set(this.queryInfo, 'employeeId', id)
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
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
    preSave() {
      this.$set(this.queryInfo, 'kuanHao', this.listD[0].kuanHao)
      this.$set(this.queryInfo, 'pinName', this.listD[0].pinName)
      this.$set(this.queryInfo, 'clientNo', this.listD[0].clientNo)
      this.$set(this.queryInfo, 'clothId', this.listD[0].clothId)
      this.$set(this.queryInfo, 'cloor', this.listD[0].cloor)
      this.$set(this.queryInfo, 'size', this.listD[0].size)
      this.$set(this.queryInfo, 'quantity', this.listD[0].quantity)
      this.$set(this.queryInfo, 'unit', this.listD[0].unit)
      this.$set(this.queryInfo, 'price', this.listD[0].price)
      this.$set(this.queryInfo, 'cha', this.listD[0].cha)
      this.$set(this.queryInfo, 'planDate', this.listD[0].planDate)
      this.$set(this.queryInfo, 'userId', '10001')
      this.$set(this.queryInfo, 'userName', '邓科')
      this.$set(this.queryInfo, 'listD', this.listD)
      this.$set(this.queryInfo, 'listCE', this.listCE)
    },
    saveToServe() {
      if (this.queryInfo.contractStyle === '' || this.queryInfo.signDate === '' || this.queryInfo.clientName === '' || this.queryInfo.brandName === '' || this.queryInfo.payStyle === '' || this.queryInfo.settlementStyle === '' || this.queryInfo.clientContractNo === '' || this.queryInfo.address === '' || this.queryInfo.contractBody === '' || this.queryInfo.deptName === '' || this.queryInfo.employeeName === '' || this.queryInfo.yeWuPerson_1 === '' || this.queryInfo.telephone === '' || this.queryInfo.address_1 === '') {
        this.$message.error('请添加必填项')
      } else if (this.listD.length === 0) {
        this.$message.error('请添加销售合同详情')
      } else {
        this.preSave()
        postData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$router.push({ path: '/销售合同' })
          // this.$emit('closeDialog')
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
    successFile(data) {
      this.listCE = data
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
/* .text2Special /deep/ .el-form-item {
    width: calc(50% + 306px)
}
.text3Special /deep/ .el-form-item {
    width: calc(50% + 306px)
}
.text2Special /deep/ .el-form-item .el-form-item__content{
      width: calc(100% - 90px)
}
.text3Special /deep/ .el-form-item .el-form-item__content{
      width: calc(100% - 90px)
}
.text3Special /deep/ .el-form-item .el-input__inner{
  height: 100px;
} */
.el-select {
  width:100%;
}
.fullWidth /deep/ .el-form-item{
  width: 100%;
}
.fullWidth /deep/ .el-form-item .el-form-item__content{
      width: calc(75% +200px);
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
