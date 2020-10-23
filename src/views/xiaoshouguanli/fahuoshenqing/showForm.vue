<template>
  <el-card class="formStyle">
    <cardTitile :param="titileName" :show="true" :direct="'/发货申请'" :route="$route" />

    <div style="padding: 0 15px">
      <el-tabs type="border-card">
        <el-tab-pane label="发货申请">
          <!-- 检索区 -->
          <el-dialog v-if="dialogAddTableVisible" :visible.sync="dialogAddTableVisible">
            <selectForm :param="queryInfo.contractNo" :param1="listD" @closeDialog="closeDialog" />
          </el-dialog>
          <el-scrollbar style="height: calc(100vh - 350px);">

            <el-row :gutter="10" style="margin-left:0;margin-right:0" class="special">
              <el-form :inline="true" :rules="rules" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="110px">
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
                      <el-tooltip :disabled="queryInfo.deptName.length < fixLimit" effect="dark" :content="queryInfo.deptName" placement="top">

                        <el-input v-model="queryInfo.deptName" placeholder="" disabled />
                      </el-tooltip>

                      <!-- <el-select v-model="queryInfo.deptName" placeholder="请选择" disabled>
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
                    <el-form-item label="业务员:" prop="employeeName">
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
                    <el-form-item label="采购合同号:" prop="purchaseNo">
                      <el-input v-model="queryInfo.purchaseNo" placeholder="" disabled />

                      <!-- <el-select v-model="queryInfo.purchaseNo" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in caiGouHeTongList"
                          :key="item.purchaseNo"
                          :label="item.purchaseNo"
                          :value="item.purchaseNo"
                          @click.native="bindHeTong(item)"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="销售合同号:" prop="contractNo">
                      <el-input v-model="queryInfo.contractNo" placeholder="" disabled />
                      <!--
                      <el-select v-model="queryInfo.contractNo" placeholder="请选择" disabled>
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
                      <el-tooltip :disabled="queryInfo.clientName.length < fixLimit" effect="dark" :content="queryInfo.clientName" placement="top">

                        <el-input v-model="queryInfo.clientName" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="联系人:">
                      <el-tooltip :disabled="queryInfo.linkMan.length < fixLimit" effect="dark" :content="queryInfo.linkMan" placement="top">

                        <el-input v-model="queryInfo.linkMan" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="联系人电话:">
                      <el-tooltip :disabled="queryInfo.linkTel.length < fixLimit" effect="dark" :content="queryInfo.linkTel" placement="top">

                        <el-input v-model="queryInfo.linkTel" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="客户合同号:">
                      <el-tooltip :disabled="queryInfo.clientContractNo.length < fixLimit" effect="dark" :content="queryInfo.clientContractNo" placement="top">

                        <el-input v-model="queryInfo.clientContractNo" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="运输方式:">
                      <el-tooltip :disabled="queryInfo.transportStyle.length < fixLimit" effect="dark" :content="queryInfo.transportStyle" placement="top">

                        <el-input v-model="queryInfo.transportStyle" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="品牌:" prop="brandName">
                      <el-tooltip :disabled="queryInfo.brandName.length < fixLimit" effect="dark" :content="queryInfo.brandName" placement="top">

                        <el-input v-model="queryInfo.brandName" placeholder="" disabled />
                      </el-tooltip>

                      <!-- <el-select v-model="queryInfo.brandName" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in options"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="付款方式:" prop="payStyle">
                      <el-tooltip :disabled="queryInfo.payStyle.length < fixLimit" effect="dark" :content="queryInfo.payStyle" placement="top">

                        <el-input v-model="queryInfo.payStyle" placeholder="" disabled />
                      </el-tooltip>

                      <!-- <el-select v-model="queryInfo.payStyle" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in payWayList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="结算方式:" prop="settlementStyle">
                      <el-tooltip :disabled="queryInfo.settlementStyle.length < fixLimit" effect="dark" :content="queryInfo.settlementStyle" placement="top">

                        <el-input v-model="queryInfo.settlementStyle" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="是否开票:" prop="kaiPiao">
                      <el-input v-model="queryInfo.kaiPiao" placeholder="" disabled />

                      <!-- <el-select v-model="queryInfo.kaiPiao" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in booleanList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>                   -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="收货地址:" prop="address">
                      <el-tooltip :disabled="queryInfo.address.length < 50" effect="dark" :content="queryInfo.address" placement="top">

                        <el-input v-model="queryInfo.address" placeholder="" disabled type="textarea" />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="6">
                    <el-form-item label="面料合同号:" prop="mianLiaoContractNo">
                      <el-tooltip :disabled="queryInfo.mianLiaoContractNo.length < fixLimit" effect="dark" :content="queryInfo.mianLiaoContractNo" placement="top">

                        <el-input v-model="queryInfo.mianLiaoContractNo" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="面料业务员:" prop="mianLiaoYeWuPerson">
                      <el-tooltip :disabled="queryInfo.mianLiaoYeWuPerson.length < fixLimit" effect="dark" :content="queryInfo.mianLiaoYeWuPerson" placement="top">

                        <el-input v-model="queryInfo.mianLiaoYeWuPerson" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>                <el-col :span="6">

                    <el-form-item label="面料总用量:" prop="mianLiaoYongLiang">
                      <el-tooltip :disabled="queryInfo.mianLiaoYongLiang.length < fixLimit" effect="dark" :content="queryInfo.mianLiaoYongLiang" placement="top">

                        <el-input v-model="queryInfo.mianLiaoYongLiang" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24" class="fullWidth">
                    <el-form-item label="备注:">
                      <el-tooltip :disabled="queryInfo.remark.length < fixLimit" effect="dark" :content="queryInfo.remark" placement="top">

                        <el-input v-model="queryInfo.remark" placeholder="" disabled type="textarea" />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
            <!-- 列表区 -->
            <el-row style="padding:0 10px;display: flex; flex-direction:column  ;padding-bottom:20px">

              <el-table :cell-style="changeCellStyle" :data="listD" border max-height="600px" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod">
                <el-table-column type="index" label="序号" width="100" fixed="left" />
                <el-table-column label="款号" prop="kuanHao" width="150" fixed="left" />

                <el-table-column label="码数" prop="size" width="150" />

                <el-table-column label="发货日期" prop="applyDate" width="150" />
                <el-table-column label="品名" prop="pinName" width="150" />
                <el-table-column label="布编" prop="clothId" width="150" />
                <el-table-column label="颜色" prop="cloor" width="150" />

                <el-table-column label="单位" width="150" prop="unit" />
                <el-table-column label="合同数量" prop="quantity" width="150" />
                <el-table-column label="发货数量" prop="applyQuantity" width="150" />
                <el-table-column label="合同结余" prop="yuLiang" width="150" />
                <el-table-column label="单价（元/含税）" prop="price" width="180" />
                <el-table-column label="小计金额（元/含税）" prop="totalPrice" width="180" />
                <el-table-column label="合计数量" prop="heJiQuantity" />
                <el-table-column label="合计金额（元/含税）" prop="totalPrice_1" width="180" />

                <el-table-column label="总数量" prop="totalQuantity" />
                <el-table-column label="总金额（元/含税）" prop="totalPrice_2" width="180" />

              </el-table>
            </el-row>
          </el-scrollbar>

        </el-tab-pane>
      </el-tabs>

    </div>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadYeWuPerson, loadYwDept, postData, loadKeHuList, searchData, deleteRecord } from '@/api/fahuoshenqing'
import { combineObject } from '@/utils/combineObject'
import { baseUrl } from '@/api/apiUrl'
import { payWayList, transferWayList, booleanList } from '@/utils/listVar'
import selectForm from '@/views/xiaoshouguanli/fahuoshenqing/selectForm'

import cardTitile from '@/layout/mixin/cardTitile'
import { loadData } from '@/api/caigouhetong'

export default {
  name: 'Fahuoshenqingchakan',

  components: {
    cardTitile,
    selectForm
  },

  data() {
    return {
      initAllData: '',
      queryInfo: '',
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
          { required: true, message: '请填写采购合同号', trigger: 'blur' }
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
      fixLimit: 13,
      keHuList: [],
      listD: [],
      yeWuDeptList: [],
      yeWuPersonList: [],
      caiGouHeTongList: [],
      xiaoShouHeTongInfo: [],
      kanHaoList: [],
      sizeList: [],
      titileName: '发货申请(详情)',
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
      listDPart: [],
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
      var urlParam = '/api/Apply?applyNo=' + this.$route.query.applyNo
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
        this.listD = this.mergeTableRow(this.listD, ['kuanHao', 'heJiQuantity', 'totalPrice_1'])
        window.console.log(this.listD)
      })
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
      this.$set(data[0], 'totalPrice_2-span', jsonObj)
      this.$set(data[0], 'totalQuantity-span', jsonObj)
      for (var i = 1; i < data.length; i++) {
        this.$set(data[i], 'totalPrice_2-span', newJsonObj)
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
      var urlParam = '/api/Purchase?employeeId=' + data.employeeId
      loadData(urlParam).then(res => {
        this.caiGouHeTongList = res.data.data
        window.console.log(this.caiGouHeTongList)
      })
    },
    bindHeTong(data) {
      window.console.log(data)
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
        this.$set(this.queryInfo, 'clientName', xiaoShouData.clientName)
        this.$set(this.queryInfo, 'linkMan', xiaoShouData.contractNo)
        this.$set(this.queryInfo, 'clientContractNo', xiaoShouData.clientContractNo)
        this.$set(this.queryInfo, 'linkMan', xiaoShouData.linkMan)
        this.$set(this.queryInfo, 'linkTel', xiaoShouData.telephone)
        this.listDPart = xiaoShouData.listD
        this.listDPart.map(item => {
          this.$set(this.listDPart, 'applyDate', '')
          this.$set(this.listDPart, 'applyQuantity', '')
          this.$set(this.listDPart, 'yuLiang', '')
          this.$set(this.listDPart, 'totalPrice', '')
        })
        this.$set(this.queryInfo, 'listD', this.listDPart)
      })
      window.console.log(this.queryInfo)
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    saveTotal(index) {
      this.listD[index].yuLiang = this.listD[index].quantity - this.listD[index].applyQuantity
      this.listD[index].totalPrice = this.listD[index].quantity * this.listD[index].applyQuantity
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
    deleteData(index) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.listD.splice(index, 1)
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

    closeDialog(id) {
      this.dialogAddTableVisible = false
      window.console.log(this.listDPart)
      this.listDPart.map(item => {
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
            yuLiang: ''

          }
          this.listD.unshift(listDJson)
        }
      })
    },
    addNew() {
      this.dialogAddTableVisible = true
      var urlParam1 = '/api/Contract?contractNo=' + this.queryInfo.contractNo
      loadData(urlParam1).then(res => {
        this.listDPart = res.data.data[0].listD
        this.listDPart.map(item => {
          this.$set(this.listDPart, 'applyDate', '')
          this.$set(this.listDPart, 'applyQuantity', '')
          this.$set(this.listDPart, 'yuLiang', '')
          this.$set(this.listDPart, 'totalPrice', '')
        })
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
    },
    saveToServe() {
      if (this.queryInfo.signDate === '' || this.queryInfo.deptName === '' || this.queryInfo.employeeName === '' || this.queryInfo.purchaseNo === '' || this.queryInfo.contractNo === '' || this.queryInfo.clientName === '' || this.queryInfo.brandName === '' || this.queryInfo.payStyle === '' || this.queryInfo.settlementStyle === '' || this.queryInfo.kaiPiao === '' || this.queryInfo.address === '' || this.queryInfo.mianLiaoContractNo === '' || this.queryInfo.mianLiaoYeWuPerson === '' || this.queryInfo.mianLiaoYongLiang === '') {
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
            this.$router.push({ path: '/发货申请' })
          }
        })
      }
    },

    bindJiaFangInfo(data) {
      this.$set(this.queryInfo, 'yeWuPerson', data.yeWuPerson)
      this.$set(this.queryInfo, 'linkMan', data.linkMan)
      this.$set(this.queryInfo, 'yeWuTel', data.yeWuTel)
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
/deep/.special .el-row{
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
