<template>

  <el-card class="formStyle">
    <div style="display:flex;align-items: center;height:50px">
      <p class="header_title">发货申请（新增）</p>
      <div class="backTo" style="margin-left:auto;height:35px; display:flex; align-item:center;padding-right:16px;padding-top:5px">
        <el-button type="info" plain style="padding: 7px 14px; border:none;background-color:#ECF0F6;color:#8D969F" @click="specialMethod()">返回</el-button>
      </div>
    </div>
    <div style="padding: 0 5px">
      <p class="underLine" />
    </div>
    <el-dialog v-if="dialogSelectTableVisible" v-dialogDrag :visible.sync="dialogSelectTableVisible" class="specialDialog" :close-on-click-modal="false">
      <selectHeTongForm :param="caiGouHeTongList" @closeSelectDialog="closeSelectDialog" @haveContractNo="getContractNo" />
    </el-dialog>

    <div style="padding: 0 15px;display:flex;flex:1;flex-direction:column">
      <el-tabs type="border-card">
        <el-tab-pane label="发货申请">
          <!-- 检索区 -->
          <el-dialog v-if="dialogAddTableVisible" :visible.sync="dialogAddTableVisible" class="specialDialog" :close-on-click-modal="false">
            <selectForm :param="queryInfo.purchaseNo" :param1="listD" @closeDialog2="closeDialog2" @closeDialog="closeDialog" />
          </el-dialog>
          <el-scrollbar style="height: calc(100vh - 350px);">

            <el-row :gutter="10" style="margin-left:0;margin-right:0;padding-bottom:0">
              <el-form :inline="true" :rules="rules" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="110px" @submit.native.prevent>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="申请日期:" prop="signDate">
                      <el-date-picker
                        v-model="queryInfo.signDate"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        disabled
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="发货申请单号:" prop="applyNo">
                      <el-input v-model="queryInfo.applyNo" placeholder="" disabled />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="业务部门:" prop="deptName">
                      <el-select v-model="queryInfo.deptName" placeholder="请选择">
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
                      <el-select v-model="queryInfo.employeeName" placeholder="请选择">
                        <el-option
                          v-for="item in yeWuPersonList"
                          :key="item.employeeId"
                          :label="item.employeeName"
                          :value="item.employeeName"
                          @click.native="bindYeWuPerson(item)"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" class="specialIcon">
                    <el-form-item label="采购合同号:" prop="purchaseNo">
                      <el-input v-model="queryInfo.purchaseNo" placeholder="" suffix-icon="el-icon-position" @click.native="handleClick" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="销售合同号:" prop="contractNo">
                      <el-input v-model="queryInfo.contractNo" placeholder="" disabled />

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
                    <el-form-item label="客户名称:" prop="clientName">
                      <el-input v-model="queryInfo.clientName" placeholder="" disabled />

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="联系人:">
                      <el-input v-model="queryInfo.linkMan" placeholder="" disabled />
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="联系人电话:">
                      <el-input v-model="queryInfo.linkTel" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="客户合同号:">
                      <el-input v-model="queryInfo.clientContractNo" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="运输方式:">
                      <el-input v-model="queryInfo.transportStyle" placeholder="" clearable maxlength="100" />

                      <!-- <el-select v-model="queryInfo.transportStyle" placeholder="请选择">
                        <el-option
                          v-for="item in transferWayList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="品牌:" prop="brandName">
                      <el-input v-model="queryInfo.brandName" placeholder="" disabled />

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="付款方式:" prop="payStyle">
                      <el-input v-model="queryInfo.payStyle" placeholder="" disabled />

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="结算方式:" prop="settlementStyle">
                      <el-input v-model="queryInfo.settlementStyle" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="是否开票:" prop="kaiPiao">
                      <el-select v-model="queryInfo.kaiPiao" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in booleanList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>                  </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="收货地址:" prop="address">
                      <el-input v-model="queryInfo.address" placeholder="" type="textarea" maxlength="100" show-word-limit clearable />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="6">
                    <el-form-item label="面料合同号:" prop="mianLiaoContractNo">
                      <el-input v-model="queryInfo.mianLiaoContractNo" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="面料业务员:" prop="mianLiaoYeWuPerson">
                      <el-input v-model="queryInfo.mianLiaoYeWuPerson" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>                <el-col :span="6">
                    <el-form-item label="面料总用量:" prop="mianLiaoYongLiang">
                      <el-input v-model="queryInfo.mianLiaoYongLiang" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24" class="fullWidth">
                    <el-form-item label="备注:">
                      <el-input v-model="queryInfo.remark" placeholder="" type="textarea" maxlength="250" show-word-limit clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
            <!-- 列表区 -->

            <el-row style="padding:0 10px;display: flex; flex-direction:column;padding-bottom:20px">
              <el-row style="display:flex;jusify-content:flex-end;padding-bottom:12px">

                <el-col :span="24" style="display:flex;">
                  <el-button type="primary" style="margin-left: auto" class="specialFormat" @click="addNew">新增</el-button>
                </el-col>
              </el-row>
              <el-table :span-method="objectSpanMethod" :cell-style="changeCellStyle" :data="listD" border max-height="600px" style="margin-top:0" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column type="index" label="序号" width="100" fixed="left" />
                <el-table-column label="款号" prop="kuanHao" width="150" fixed="left" />

                <el-table-column label="码数" prop="size" width="150" />

                <el-table-column label="发货日期" prop="applyDate" width="250">
                  <template slot-scope="scope">
                    <el-date-picker
                      v-model="scope.row.applyDate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    />                  </template>
                </el-table-column>
                <el-table-column label="品名" prop="pinName" width="150" />
                <el-table-column label="布编" prop="clothId" width="150" />
                <el-table-column label="颜色" prop="cloor" width="150" />

                <el-table-column label="单位" width="150" prop="unit" />
                <el-table-column label="合同数量" prop="quantity" width="150" />
                <el-table-column label="发货数量" prop="applyQuantity" width="150">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.applyQuantity" placeholder="" type="number" on-keypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" @mousewheel.native.prevent @change="saveTotal(scope.$index, scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column label="合同结余" prop="yuLiang" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.quantity - scope.row.applyQuantity }}
                  </template>
                </el-table-column>
                <el-table-column label="单价（元/含税）" prop="price" width="180" />
                <el-table-column label="小计金额（元/含税）" prop="totalPrice" width="180">
                  <template slot-scope="scope">
                    {{ (scope.row.applyQuantity * scope.row.price).toFixed(2) }}
                  </template>
                </el-table-column>

                <el-table-column label="合计数量" prop="heJiQuantity" />
                <el-table-column label="合计金额（元/含税）" prop="totalPrice_1" width="180" />
                <el-table-column label="总数量" prop="totalQuantity" />
                <el-table-column label="总金额（元/含税）" prop="totalPrice_2" width="180" />

                <el-table-column label="操作" fixed="right" width="150">
                  <template slot-scope="scope">
                    <el-button type="text" style="color:#FAAB15" @click="deleteData(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-scrollbar>

        </el-tab-pane>
      </el-tabs>
      <div style="align-items: flex-end; padding-bottom: 15px; display:flex; justify-content:center;flex:1">
        <el-button class="specialConfirmBtn" @click="saveToServe"> 确认保存</el-button>
        <el-button class="specialContinueBtn" style="margin-left:68px" @click="addMore">继续新增</el-button>
      </div>
    </div>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadYeWuPerson, loadYwDept, addData, loadKeHuList, searchData, deleteRecord } from '@/api/fahuoshenqing'
import { combineObject } from '@/utils/combineObject'
import { baseUrl } from '@/api/apiUrl'
import { payWayList, transferWayList, booleanList } from '@/utils/listVar'
import selectForm from '@/views/xiaoshouguanli/fahuoshenqing/selectForm'
import selectHeTongForm from '@/views/xiaoshouguanli/fahuoshenqing/selectHeTongForm'
import { getGuid } from '@/utils/getGuid'

import cardTitile from '@/layout/mixin/cardTitile'
import { loadData } from '@/api/caigouhetong'

export default {
  name: 'Fahuoshenqingxinzeng',

  components: {
    cardTitile,
    selectForm,
    selectHeTongForm
  },

  data() {
    return {
      initAllData: '',
      queryInfo: {
        signDate: this.getNowTime(),
        applyNo: '',
        deptName: '',
        employeeName: '',
        purchaseNo: '',
        contractNo: '',
        clientName: '',
        linkMan: '',
        linkTel: '',
        clientContractNo: '',
        transportStyle: '',
        brandName: '',
        payStyle: '',
        settlementStyle: '',
        kaiPiao: '',
        address: '',
        mianLiaoContractNo: '',
        mianLiaoYeWuPerson: '',
        mianLiaoYongLiang: '',
        remark: ''
      },
      rules: {
        signDate: [
          { required: true, message: '请选择申请日期', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '请选择业务部门', trigger: 'blur' }
        ],
        employeeName: [
          { required: true, message: '请选择业务员', trigger: 'blur' }
        ],
        purchaseNo: [
          { required: true, message: '请填写采购合同号', trigger: 'change' }
        ],
        contractNo: [
          { required: true, message: '请填写销售合同号', trigger: 'blur' }
        ],
        clientName: [
          { required: true, message: '请填写客户名称', trigger: 'blur' }
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
        kaiPiao: [
          { required: true, message: '请填写结算方式', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写收货地址', trigger: 'blur' }
        ],
        mianLiaoContractNo: [
          { required: true, message: '请填写面料合同号', trigger: 'blur' }
        ],
        mianLiaoYeWuPerson: [
          { required: true, message: '请填写面料业务员', trigger: 'blur' }
        ],
        mianLiaoYongLiang: [
          { required: true, message: '请填写面料总用量', trigger: 'blur' }
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
      // 加载list
      payWayList: payWayList,
      transferWayList: transferWayList,
      booleanList: booleanList,
      listDPart: [],
      keHuList: [],
      listD: [],
      yeWuDeptList: [],
      yeWuPersonList: [],
      caiGouHeTongList: [],
      xiaoShouHeTongInfo: [],
      kanHaoList: [],
      sizeList: [],
      titileName: '发货申请（新增）',
      value: '',
      dialogAddTableVisible: false,
      dialogEditTableVisible: false,
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
        label: 'A'
      }, {
        label: 'B'
      }, {
        label: 'C'
      }, {
        label: 'D'
      }, {
        label: 'E'
      }],
      value1: '',
      queryInfoOrigin: ''

    }
  },
  created() {
    this.initData()
    this.initSearchList()
  },
  methods: {
    // 数据初始化
    initData() {
      var param = '/api/Client'
      loadKeHuList(param).then(res => {
        this.keHuList = res.data.data
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
    bindYeWuPerson(data) {
      this.$set(this.queryInfo, 'employeeId', data.employeeId)
      var urlParam = '/api/Purchase?address=1&employeeId=' + data.employeeId
      loadData(urlParam).then(res => {
        this.caiGouHeTongList = res.data.data
      })
    },
    getNowTime() {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      return defaultDate
    },
    bindHeTong(data) {
      var urlParam = '/api/Purchase?purchaseNo=' + data.purchaseNo
      loadData(urlParam).then(res => {
        this.xiaoShouHeTongInfo = res.data.data
      })
    },
    bindXiaoShouHeTong(data) {
      this.$set(this.queryInfo, 'contractNo', data.contractNo)

      window.console.log(this.queryInfo)
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    saveTotal(index, data) {
      this.listD[index].yuLiang = this.listD[index].quantity - this.listD[index].applyQuantity
      this.listD[index].totalPrice = this.listD[index].price * this.listD[index].applyQuantity
      var totalKuanHaoNum = 0
      var totalKuanHaoAmount = 0
      var total = 0
      var amount = 0
      if (data.applyQuantity < 0 || data.applyQuantity === '') {
        this.$set(this.listD[index], 'applyQuantity', 0)
        this.$set(this.listD[index], 'yuLiang', data.quantity)
      } else {
        if (data.applyQuantity > data.quantity) {
          this.$set(this.listD[index], 'applyQuantity', data.quantity)
          this.$set(this.listD[index], 'yuLiang', 0)
        } else {
          this.$set(this.listD[index], 'applyQuantity', data.applyQuantity)
          this.$set(this.listD[index], 'yuLiang', data.quantity - data.applyQuantity)
        }
      }
      // this.$set(this.listD[index], 'applyQuantity', data.applyQuantity)
      this.listD.map(item => {
        if (item.kuanHao === this.listD[index].kuanHao) {
          totalKuanHaoNum = totalKuanHaoNum + parseInt(item.applyQuantity)
          totalKuanHaoAmount = totalKuanHaoAmount + parseInt(item.applyQuantity) * parseFloat(item.price)
        }
        total += parseInt(item.applyQuantity)
        amount = amount + parseFloat(item.price) * parseInt(item.applyQuantity)
      })
      this.listD.map((item, index1) => {
        if (item.kuanHao === this.listD[index].kuanHao) {
          this.$set(this.listD[index1], 'heJiQuantity', totalKuanHaoNum)
          this.$set(this.listD[index1], 'totalPrice_1', totalKuanHaoAmount.toFixed(2))
        }
        this.$set(this.listD[index1], 'totalQuantity', total)
        this.$set(this.listD[index1], 'totalPrice_2', amount.toFixed(2))
      })
    },
    closeDialoga() {
      this.dialogAddTableVisible = false
    },
    getDetail(data, index) {
      this.$set(this.listD[index], 'id', data.id)

      this.$set(this.listD[index], 'pinName', data.pinName)
      this.$set(this.listD[index], 'clothId', data.clothId)
      this.$set(this.listD[index], 'cloor', data.cloor)
      this.$set(this.listD[index], 'unit', data.unit)
      this.$set(this.listD[index], 'quantity', data.quantity)
      this.$set(this.listD[index], 'price', data.price)
    },
    deleteData(index1, data) {
      if (this.listD.length === 1) {
        this.listD = []
      } else {
        var objString = JSON.stringify(this.listD)
        this.temList = JSON.parse(objString)
        var _self = this
        _self.temList.splice(index1, 1)

        _self.temList.map((item, index) => {
          if (item.kuanHao === data.kuanHao) {
            var newVal = parseInt(item.heJiQuantity) - parseInt(data.applyQuantity)
            var newVal1 = parseFloat(item.totalPrice_1) - parseInt(data.applyQuantity) * parseFloat(data.price)
            _self.$set(_self.temList[index], 'heJiQuantity', newVal)
            _self.$set(_self.temList[index], 'totalPrice_1', newVal1.toFixed(2))
          }
          var newVal2 = parseInt(item.totalQuantity) - parseInt(data.applyQuantity)
          _self.$set(_self.temList[index], 'totalQuantity', newVal2)
          var newVal3 = parseFloat(item.totalPrice_2) - parseInt(data.applyQuantity) * parseFloat(data.price)
          _self.$set(_self.temList[index], 'totalPrice_2', newVal3.toFixed(2))
        })

        _self.temList.map((item, index) => {
          _self.$delete(_self.temList[index], 'kuanHao-span')
          _self.$delete(_self.temList[index], 'heJiQuantity-span')
          _self.$delete(_self.temList[index], 'totalQuantity-span')
          _self.$delete(_self.temList[index], 'totalPrice_2-span')
          _self.$delete(_self.temList[index], 'totalPrice_1-span')
        })

        _self.listD = _self.mergeTableRow(_self.temList, ['kuanHao', 'heJiQuantity', 'totalPrice_1'])
      }
    },
    handleClick() {
      this.dialogSelectTableVisible = true
    },
    addPhoto() {
      this.dialogAddTableVisible = true
    },
    showPhoto(url) {
      var fileLink = baseUrl + url
      window.open(fileLink, '_blank')
    },
    getContractNo(data) {
      this.listD = []
      this.queryInfo.purchaseNo = data.purchaseNo
      this.queryInfo.contractNo = data.contractNo
      var urlParam = '/api/Contract?contractNo=' + this.queryInfo.contractNo
      loadData(urlParam).then(res => {
        var xiaoShouData = res.data.data[0]
        this.$set(this.queryInfo, 'clientName', xiaoShouData.clientName)
        this.$set(this.queryInfo, 'linkMan', xiaoShouData.contractNo)
        this.$set(this.queryInfo, 'clientContractNo', xiaoShouData.clientContractNo)
        this.$set(this.queryInfo, 'linkMan', xiaoShouData.linkMan)
        this.$set(this.queryInfo, 'linkTel', xiaoShouData.yeWuTel)
        this.$set(this.queryInfo, 'payStyle', xiaoShouData.payStyle)
        this.$set(this.queryInfo, 'settlementStyle', xiaoShouData.settlementStyle)
        this.$set(this.queryInfo, 'brandName', xiaoShouData.brandName)
        this.$set(this.queryInfo, 'address', xiaoShouData.address)
        this.listDPart = xiaoShouData.listD
        this.$set(this.queryInfo, 'listD', this.listDPart)
      //         var param1 = '/api/Purchase/getDetailsList?size=1&current=2&contractNo=' + this.queryInfo.purchaseNo
      // loadData(param1).then(res => {
      //   this.listDPart = res.data.data
      //   this.listDPart.map((item,index) => {
      //     // this.$set(this.listDPart, 'applyDate', '')
      //     this.$set(this.listDPart[index], 'applyQuantity', item.ruKuQuantity)
      //     // this.$set(this.listDPart, 'yuLiang', '')
      //     // this.$set(this.listDPart, 'totalPrice', 0)
      //     // this.$set(this.listDPart, 'heJiQuantity', 0)
      //     // this.$set(this.listDPart, 'totalPrice_1', 0)
      //     // this.$set(this.listDPart, 'totalPrice_2', 0)
      //     // this.$set(this.listDPart, 'totalQuantity', 0)
      //   })
      //   this.$set(this.queryInfo, 'listD', this.listDPart)
      //   window.console.log(this.queryInfo.listD,'listD')
      // })
      })
    },
    closeDialog(selectedList) {
      this.dialogAddTableVisible = false
      window.console.log(this.listDPart)
      var kuanHaoList = []
      selectedList.map(item => {
        if (kuanHaoList.indexOf(item.kuanHao) < 0) {
          kuanHaoList.push(item.kuanHao)
        }
      })
      selectedList.map(item => {
        var listDJson = {
          id: item.id,
          kuanHao: item.kuanHao,
          pinName: item.pinName,
          applyDate: this.getNowTime(),
          clothId: item.clothId,
          cloor: item.cloor,
          size: item.size,
          unit: item.unit,
          quantity: parseInt(item.quantity),
          price: item.price,
          totalPrice: 0,
          yuLiang: '',
          heJiQuantity: 0,
          totalPrice_1: 0,
          totalPrice_2: 0,
          applyQuantity: parseInt(item.quantity),
          totalQuantity: 0
        }
        if (this.listD.length !== 0) {
          this.listD.map((item, index) => {
            if (item.kuanHao === listDJson.kuanHao) {
              this.$set(listDJson, 'totalPrice_1', item.totalPrice_1)
              this.$set(listDJson, 'heJiQuantity', item.heJiQuantity)
            }
          })
        }

        this.listD.unshift(listDJson)
        this.listD = this.groupBy(this.listD, function(item) {
          return item.kuanHao
        })
        var newlist = []
        this.listD.map(items => {
          items.map(item => {
            newlist.push(item)
          })
        })
        this.listD = newlist
        this.listD = this.mergeTableRow(this.listD, ['kuanHao', 'heJiQuantity', 'totalPrice_1'])
        // var totalQuantity = 0
        // var totalPrice_2 = 0
        window.console.log(kuanHaoList)
        window.console.log(this.listD, 'listD')
        // this.listD.map((item,index) => {
        //   this.$set(this.listD[index], '')
        // })
        kuanHaoList.map(kuanHao => {
          var heJiQuantity = 0
          var totalPrice_1 = 0
          this.listD.map((item, index) => {
            if (item.kuanHao === kuanHao) {
              heJiQuantity += parseInt(item.applyQuantity)
              totalPrice_1 += parseInt(item.applyQuantity) * parseFloat(item.price)
            }
            // totalQuantity += parseInt(item.applyQuantity)
            // totalPrice_2 += parseInt(item.applyQuantity) * parseInt(item.price)
          })
          this.listD.map((item, index) => {
            if (item.kuanHao === kuanHao) {
              this.$set(this.listD[index], 'heJiQuantity', heJiQuantity)
              this.$set(this.listD[index], 'totalPrice_1', totalPrice_1.toFixed(2))
            }
          })
        })
        var totalQuantity = 0
        var totalPrice_2 = 0
        this.listD.map((item, index) => {
          totalQuantity += item.applyQuantity
          totalPrice_2 += parseInt(item.applyQuantity) * parseFloat(item.price)
        })
        this.listD.map((item, index) => {
          this.$set(this.listD[index], 'totalQuantity', totalQuantity)
          this.$set(this.listD[index], 'totalPrice_2', totalPrice_2.toFixed(2))
        })
      })
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
      this.$set(data[0], 'totalPrice_2-span', jsonObj)
      for (var i = 1; i < data.length; i++) {
        this.$set(data[i], 'totalQuantity-span', newJsonObj)
        this.$set(data[i], 'totalPrice_2-span', newJsonObj)
      }
      return data
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const span = column['property'] + '-span'
      if (row[span]) {
        return row[span]
      }
    },
    addNew() {
      if (this.queryInfo.contractNo === '' || this.queryInfo.contractNo === null) {
        this.$message.error('请先选择销售合同')
      } else {
        this.dialogAddTableVisible = true
      }
    },

    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData(this.pageSetting)
    },
    preSave() {
      this.$set(this.queryInfo, 'userId', '10001')
      this.$set(this.queryInfo, 'userName', '邓科')
      this.$set(this.queryInfo, 'listD', this.listD)
    },
    saveToServe() {
      if (this.queryInfo.signDate === '' || this.queryInfo.deptName === '' || this.queryInfo.employeeName === '' || this.queryInfo.purchaseNo === '' || this.queryInfo.contractNo === '' || this.queryInfo.clientName === '' || this.queryInfo.brandName === '' || this.queryInfo.payStyle === '' || this.queryInfo.settlementStyle === '' || this.queryInfo.kaiPiao === '' || this.queryInfo.address === '' || this.queryInfo.mianLiaoContractNo === '' || this.queryInfo.mianLiaoYeWuPerson === '' || this.queryInfo.mianLiaoYongLiang === '') {
        this.$message.error('请添加必填项')
      } else if (this.listD.length === 0) {
        this.$message.error('请添加发货申请详情')
      } else {
        this.preSave()
        var flag = false
        this.queryInfo.listD.map(item => {
          if (item.applyQuantity === '') {
            flag = true
            this.$message.error('存在未添加数量的合同详情)')
          }
        })
        if (!flag) {
          addData(this.queryInfo).then(res => {
            if (res.data.code !== 1) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success(res.data.tipInfo)
              var id = res.data.msg
              this.$store.dispatch('toolbar/delView', this.$route)
              this.$router.push({ path: '/发货申请/发货申请修改', query: { applyNo: id }})
            }
          })
        }
      }
    },
    addMore() {
      if (this.queryInfo.signDate === '' || this.queryInfo.deptName === '' || this.queryInfo.employeeName === '' || this.queryInfo.purchaseNo === '' || this.queryInfo.contractNo === '' || this.queryInfo.clientName === '' || this.queryInfo.brandName === '' || this.queryInfo.payStyle === '' || this.queryInfo.settlementStyle === '' || this.queryInfo.kaiPiao === '' || this.queryInfo.address === '' || this.queryInfo.mianLiaoContractNo === '' || this.queryInfo.mianLiaoYeWuPerson === '' || this.queryInfo.mianLiaoYongLiang === '') {
        this.$message.error('请添加必填项')
      } else if (this.listD.length === 0) {
        this.$message.error('请添加发货申请详情')
      } else {
        this.preSave()
        var flag = false
        this.queryInfo.listD.map(item => {
          if (item.applyQuantity === '') {
            flag = true
            this.$message.error('存在未添加数量的合同详情')
          }
        })
        if (!flag) {
          addData(this.queryInfo).then(res => {
            if (res.data.code !== 1) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success(res.data.tipInfo)
              this.$store.dispatch('toolbar/delView', this.$route)
              this.$router.push({ path: '/发货申请/发货申请新增', query: { guid: getGuid() }})
            }
          })
        }
      }
    },
    OriginData() {
      this.queryInfoOrigin = {
        signDate: this.getNowTime(),
        applyNo: '',
        deptName: '',
        employeeName: '',
        purchaseNo: '',
        contractNo: '',
        clientName: '',
        linkMan: '',
        linkTel: '',
        clientContractNo: '',
        transportStyle: '',
        brandName: '',
        payStyle: '',
        settlementStyle: '',
        kaiPiao: '',
        address: '',
        mianLiaoContractNo: '',
        mianLiaoYeWuPerson: '',
        mianLiaoYongLiang: '',
        remark: ''
      }
    },
    specialMethod() {
      this.OriginData()
      if (this.listD.length === 0 && JSON.stringify(this.queryInfo) == JSON.stringify(this.queryInfoOrigin)) {
        this.passFlag = true
      }
      if (!this.passFlag) {
      //   alert('true')
        var _self = this
        this.$utils.isout(function() {
          _self.$store.dispatch('toolbar/delView', _self.$route)
          _self.$router.push('/发货申请')
        })
      } else {
        this.$store.dispatch('toolbar/delView', this.$route)
        this.$router.push('/发货申请')// 返回上一层
      }
    },
    bindJiaFangInfo(data) {
      this.$set(this.queryInfo, 'yeWuPerson', data.yeWuPerson)
      this.$set(this.queryInfo, 'linkMan', data.linkMan)
      this.$set(this.queryInfo, 'yeWuTel', data.yeWuTel)
    },
    closeDialog2() {
      this.dialogAddTableVisible = false
    },
    closeSelectDialog() {
      this.dialogSelectTableVisible = false
    },
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === '合计数量' || row.column.label === '合计金额（元/含税）' || row.column.label === '总数量' || row.column.label === '总金额（元/含税）') {
        return 'background: #F9F9FB' // 修改的样式
      } else {
        return ''
      }
    }

  }
}
</script>

<style scoped>
.el-row{
  padding-bottom:16px
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

/deep/ .el-row{
  padding-bottom: 25px
}
.halfWidth /deep/ .el-form-item{
  width: 100%;
}
.halfWidth /deep/ .el-form-item .el-form-item__content{
      width: calc(50% + 200px);
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
