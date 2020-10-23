<template>
  <el-card class="formStyle">
    <cardTitile :param="titileName" :show="true" />

    <div style="padding: 0 15px">
      <el-tabs type="border-card">
        <el-tab-pane label="销售合同">
          <!-- 检索区 -->
          <el-row :gutter="10" style="padding:0 20px; margin-left:0;margin-right:0">
            <el-form :inline="true" :rules="rules" :model="queryInfo" label-position="left" class="demo-form-inline" label-width="130px">
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
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="甲方:" prop="contractBody">
                    <el-select v-model="queryInfo.contractBody" placeholder="请选择" disabled>
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
                  <el-form-item label="业务部门:" prop="deptName">
                    <el-select v-model="queryInfo.deptName" placeholder="请选择" disabled>
                      <el-option
                        v-for="item in yeWuDeptList"
                        :key="item.deptId"
                        :label="item.deptName"
                        :value="item.deptName"
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
                        :value="item.employeeName"
                        @click.native="bindYeWuPerson(item.employeeId)"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="业务负责人:" prop="yeWuPerson_1">
                    <el-select v-model="queryInfo.yeWuPerson_1" placeholder="请选择" disabled>
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

              <el-row>
                <el-col :span="6">
                  <el-form-item label="乙方:" prop="supplierName">
                    <el-select v-model="queryInfo.supplierName" placeholder="请选择">
                      <el-option
                        v-for="item in yiFangList"
                        :key="item.id"
                        :label="item.supplierName"
                        :value="item.supplierName"
                        @click.native="bindPerson(item)"
                      />
                    </el-select>                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="业务负责人:">
                    <el-input v-model="queryInfo.supplierPerson" placeholder="" disabled />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="业务联系人:">
                    <el-input v-model="queryInfo.yeWuPerson" placeholder="" disabled />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电话:">
                    <el-input v-model="queryInfo.yeWuTel" placeholder="" disabled />
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
                <el-col :span="24" class="fullWidth">
                  <el-form-item label="备注:">
                    <el-input v-model="queryInfo.remark" placeholder="" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
          <!-- 列表区 -->

          <el-row style="padding:0 10px;display: flex; flex-direction:column;height:80%">
            <el-table :data="queryInfo.listD" border style="height:100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
              <el-table-column type="index" label="序号" width="100" />
              <el-table-column label="款号" prop="kuanHao" width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.kuanHao" placeholder="" disabled />
                </template>
              </el-table-column>
              <el-table-column label="品名" prop="pinName" width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.pinName" placeholder="" disabled />
                </template>
              </el-table-column>
              <el-table-column label="布编" prop="clothId" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.clothId" placeholder="" disabled />
                </template>
              </el-table-column>
              <el-table-column label="颜色" prop="cloor" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.cloor" placeholder="" disabled />
                </template>
              </el-table-column>
              <el-table-column label="码数" prop="size" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.size" placeholder="" disabled />
                </template>
              </el-table-column>
              <el-table-column label="数量" prop="quantity" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.quantity" placeholder="" disabled />
                </template>
              </el-table-column>

              <el-table-column label="单位" width="150">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.unit" placeholder="请选择" disabled>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="单价（元/含税）" prop="price" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" placeholder="" type="number" @mousewheel.native.prevent />
                </template>
              </el-table-column>
              <el-table-column label="小计金额（元/含税）" prop="totalPrice" width="150">
                <template slot-scope="scope">
                  {{ scope.row.quantity * scope.row.price }}
                </template>
              </el-table-column>
              <!-- <el-table-column label="合计数量" prop="excipientsType" />
              <el-table-column label="合计金额（元/含税）" prop="excipientsType" /> -->
              <el-table-column label="数量允差" prop="cha" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.cha" placeholder="" disabled />
                </template>
              </el-table-column>
              <el-table-column label="交期" prop="planDate" width="300">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.planDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    disabled
                  />                 </template>
              </el-table-column>
              <!-- <el-table-column label="总数量" prop="excipientsType" />
              <el-table-column label="总金额（元/含税）" prop="excipientsType" /> -->

            </el-table>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="相关附件">
          <el-dialog v-if="dialogAddTableVisible" :visible.sync="dialogAddTableVisible">
            <addPhotoForm @photoUrl="getFromChild" @closeDialog="closeDialog" />
          </el-dialog>
          <div>
            <el-button type="primary" style="float:right" @click="addPhoto">新增</el-button>
          </div>
          <el-table :data="queryInfo.listPE" border style="height:100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column type="index" label="序号" width="100" />
            <el-table-column label="文件名称（文件格式支持 .pdf .jpg .jpeg .png）" prop="enclosureName" />
            <el-table-column label="操作" fixed="right" width="250">
              <template slot-scope="scope">
                <el-button type="text" @click="showPhoto(scope.row.enclosureAddress)">查看</el-button>
                <el-button type="text" style="color:#FAAB15" @click="deleteFileData(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div style="padding-top:30px; padding-bottom: 30px; display:flex; justify-content:center">
        <el-button round type="primary" @click="saveToServe"> 确认保存</el-button>
      </div>
    </div>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadYeWuPerson, loadYwDept, postData, loadKeHuList, loadData, deleteRecord } from '@/api/caigouhetong'
import { combineObject } from '@/utils/combineObject'
import addPhotoForm from '@/views/xiaoshouguanli/xiaoshouhetong/addPhotoForm'
import { baseUrl } from '@/api/apiUrl'

import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile,
    addPhotoForm
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
      titileName: '采购合同（修改）',
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
      value1: ''

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
    width: 215px;
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
      width: calc(75% + 215px);
}
.halfWidth /deep/ .el-form-item{
  width: 100%;
}
.halfWidth /deep/ .el-form-item .el-form-item__content{
      width: calc(50% + 215px);
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
