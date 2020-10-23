<template>
  <el-card class="formStyle">
    <div style="display:flex;align-items: center;height:50px">
      <p class="header_title">销售出库（新增）</p>
      <div class="backTo" style="margin-left:auto;height:35px; display:flex; align-item:center;padding-right:16px;padding-top:5px">
        <el-button type="info" plain style="padding: 7px 14px; border:none;background-color:#ECF0F6;color:#8D969F" @click="specialMethod()">返回</el-button>
      </div>
    </div>
    <div style="padding: 0 5px">
      <p class="underLine" />
    </div>
    <div style="padding: 0 15px;display:flex;flex:1;flex-direction:column">
      <el-tabs type="border-card">
        <el-tab-pane label="销售出库">
          <!-- 检索区 -->
          <el-dialog v-if="dialogSelectTableVisible" :visible.sync="dialogSelectTableVisible" class="specialDialog">
            <selectForm :param="queryInfo.contractNo" :param2="listD" @closeSelectDialog="closeSelectDialog" @closeDialoga="closeDialoga" />
          </el-dialog>
          <el-scrollbar style="height: calc(100vh - 350px);">

            <el-row :gutter="10" style="margin-left:0;margin-right:0;padding-bottom:0" class="specialSelect">
              <el-form :inline="true" :rules="rules" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="115px" @submit.native.prevent>
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
                      <el-input v-model="queryInfo.deptName" placeholder="" disabled />
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
                    <el-form-item label="业务员 :" prop="employeeName">
                      <el-input v-model="queryInfo.employeeName" placeholder="" disabled />
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
                    <el-form-item label="发货申请单号 :" prop="applyNo">
                      <el-input v-model="queryInfo.applyNo" placeholder="" disabled />
                      <!-- <el-select v-model="queryInfo.applyNo" placeholder="请选择" disabled>
                        <el-option
                          v-for="item in caiGouHeTongList"

                          :key="item.purchaseNo"
                          :label="item.purchaseNo"
                          :value="item.purchaseNo"
                          @click.native="bindHeTong(item)"
                        />
                      </el-select>                   -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="采购合同号 :" prop="purchaseNo">
                      <el-input v-model="queryInfo.purchaseNo" placeholder="" disabled />
                      <!-- <el-select v-model="queryInfo.purchaseNo" placeholder="请选择" disabled>
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
                    <el-form-item label="客户名称 :" prop="clientName">
                      <el-input v-model="queryInfo.clientName" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="联系人 :" prop="linkMan">
                      <el-input v-model="queryInfo.linkMan" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="联系人电话 :" prop="linkTel">
                      <el-input v-model="queryInfo.linkTel" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="客户合同号 :" prop="clientContractNo">
                      <el-input v-model="queryInfo.clientContractNo" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="运输方式 :" prop="transportStyle">
                      <el-input v-model="queryInfo.transportStyle" placeholder="" clearable maxlength="100" />

                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="收货地址 :" prop="address">
                      <el-input v-model="queryInfo.address" placeholder="" type="textarea" maxlength="100" show-word-limit clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="fullWidth">
                    <el-form-item label="备注 :">
                      <el-input v-model="queryInfo.remark" placeholder="" type="textarea" maxlength="250" show-word-limit clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
            <!-- 列表区 -->

            <el-row style="padding:0 10px;display: flex; flex-direction:column">
              <el-table :data="originListD" border max-height="600px" style="margin-top: 0px;" :cell-style="changeCellStyle" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod">
                <el-table-column type="index" label="序号" width="100" />
                <el-table-column label="款号" prop="kuanHao" width="250" />
                <el-table-column label="发货日期" prop="applyDate" width="250" />
                <el-table-column label="品名" prop="pinName" width="250" />
                <el-table-column label="布编" prop="clothId" width="150" />
                <el-table-column label="颜色" prop="cloor" width="150" />
                <el-table-column label="码数" prop="size" width="150" />
                <el-table-column label="单位" width="150" prop="unit" />
                <el-table-column label="发货数量" prop="applyQuantity" width="150" />
                <el-table-column label="合计数量" prop="heJiQuantity" width="150" />
                <el-table-column label="总数量" prop="totalQuantity" />
              </el-table>
            </el-row>
            <el-row style="padding:0 10px;display: flex; flex-direction:column;padding-bottom:20px;padding-top:24px">
              <el-row style="display:flex;padding-bottom:12px">
                <el-col :span="4">
                  <p style="margin:0;font-size:16px;font-weight: 400;color:#656565">出库明细 :</p>
                </el-col>
              </el-row>
              <el-table ref="multipleTable1" :data="listDOrigin" :cell-style="changeCellStyle" border max-height="600px" style="margin-top:0" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod" @selection-change="handleSelectionChange">
                <el-table-column
                  label="全选"
                  type="selection"
                  width="80"
                  @click.native="selectEvent"
                />
                <el-table-column type="index" label="序号" width="100" />
                <el-table-column label="款号" prop="kuanHao" width="100" />
                <el-table-column label="入库日期" prop="signDate" width="100" />
                <el-table-column label="入库单号" prop="ruKuNo" width="100" />
                <el-table-column label="品名" prop="pinName" width="230" />
                <el-table-column label="布编" prop="clothId" width="150" />
                <el-table-column label="颜色" prop="color" width="100" />
                <el-table-column label="码数" prop="size" width="100" />
                <el-table-column label="单位" width="150" prop="unit" />
                <el-table-column label="库存数量" prop="ruKuQuantity" width="150" />
                <el-table-column label="发货数量" prop="contractQuantity" width="150">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.contractQuantity" placeholder="" type="number" on-keypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" @mousewheel.native.prevent @change="handlerInput(scope.row.contractQuantity, scope.$index)" />
                  </template>
                </el-table-column>
                <!-- <el-table-column label="此款号勾选累计数量" prop="selectQuantity" width="250" /> -->
                <el-table-column label="合计数量" prop="heJiQuantity" />
                <el-table-column label="总数量" prop="totalQuantity" />
              </el-table>
            </el-row>
          </el-scrollbar>

        </el-tab-pane>
        <el-tab-pane label="相关附件">

          <tailfile
            :data="listCE"
            :instid="111"
            :table-data="listCE"
            actpoint="edit"
            limit="1"
            title="相关附件"
            @successFile="successFile"
          />
        </el-tab-pane>
      </el-tabs>
      <div style="align-items: flex-end; padding-bottom: 13px; display:flex; justify-content:center;flex:1">
        <el-button class="specialConfirmBtn" @click="saveToServe">确认保存</el-button>
        <el-button class="specialContinueBtn"style="margin-left:68px" @click="specialMethod">退出</el-button>
      </div>
    </div>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadYeWuPerson, loadYwDept, addData, loadKeHuList, loadData, deleteRecord } from '@/api/xiaoshouchuku'
import { combineObject } from '@/utils/combineObject'
import { getGuid } from '@/utils/getGuid'
import { transferWayList } from '@/utils/listVar'

import { baseUrl } from '@/api/apiUrl'
import selectForm from '@/views/cangkuguanli/caigouruku/selectForm'
import cardTitile from '@/layout/mixin/cardTitile'
import tailfile from '@/layout/mixin/uploadAttachment'

export default {
  name: 'Xiaoshouchukuxinzeng',

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
        ],
        linkMan: [
          { required: true, message: '请填写联系人', trigger: 'change' }
        ],
        linkTel: [
          { required: true, message: '请填写联系电话', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请填写收货地址', trigger: 'change' }
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
      listDOrigin: [],
      selectOriginList: [],
      listDFirst: [],
      yeWuDeptList: [],
      yeWuPersonList: [],
      caiGouHeTongList: [],
      xiaoShouHeTongInfo: [],
      listCE: [],
      listDPart: [],
      transferWayList: transferWayList,
      titileName: '销售出库（新增）',
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
      originListD: [],
      queryInfoOrigin: '',
      listDOriginOrigin: ''

    }
  },
  created() {
    this.initData()
    this.initSearchList()
  },
  methods: {
    // 数据初始化
    initData() {
      var urlParam = '/api/ChuKu/getApplyByNo?contractNo=' + this.$route.query.contractNo
      // var urlParam = '/api/ChuKu/getApplyByNo?contractNo=XSHT202009-082'
      loadData(urlParam).then(res => {
        this.listDFirst = res.datadata
        this.listDOrigin = res.data.data
        this.listDOrigin.map((item1, index) => {
          if (this.list3.findIndex(item => item === item1.kuanHao) === -1) {
            this.list3.push(item1.kuanHao)
          }
        })
        const newListD = []
        this.list3.map((item1) => {
          this.listDOrigin.map((item, index) => {
            if (item1 === item.kuanHao) {
              newListD.push(item)
            }
          })
        })
        this.listDOrigin = newListD
        this.listDOrigin = this.mergeTableRow(this.listDOrigin, ['kuanHao', 'heJiQuantity'])
        this.listDOriginOrigin = JSON.parse(JSON.stringify(this.listDOrigin))

        window.console.log(this.listDOrigin)
      })

      var urlParam1 = '/api/ChuKu?applyNo=' + this.$route.query.applyNo
      loadData(urlParam1).then(res => {
        this.queryInfo = res.data.data[0]
        this.$set(this.queryInfo, 'chuKuDate', this.getNowTime())
        this.queryInfoOrigin = JSON.parse(JSON.stringify(this.queryInfo))
      })
      //       var param1 = '/api/Contract?contractNo=' + this.$route.query.contractNo
      // loadData(param1).then(res => {
      //   this.$set(this.queryInfo, 'address', res.data.data[0].address)
      // })
      var urlParam2 = '/api/Apply?applyNo=' + this.$route.query.applyNo
      loadData(urlParam2).then(res => {
        this.originListD = res.data.data[0].listD
        this.originListD = this.mergeTableRow(this.originListD, ['kuanHao', 'heJiQuantity', 'totalQuantity'])
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
    specialMethod() {
      if (this.listCE.length === 0 && JSON.stringify(this.listDOriginOrigin) === JSON.stringify(this.listDOrigin) && JSON.stringify(this.queryInfo) == JSON.stringify(this.queryInfoOrigin)) {
        this.passFlag = true
      }
      if (!this.passFlag) {
      //   alert('true')
        var _self = this
        this.$utils.isout(function() {
          _self.exitToHome()
        })
      } else {
        this.exitToHome()
      }
    },
    initSearchList() {
      var urlParam = '/ERP/selectDepartment?parentId=82'
      loadYwDept(urlParam).then(res => {
        this.yeWuDeptList = res.data.data
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
      console.log(defaultDate)
      return defaultDate
    },

    bindYeWuId(id) {
      this.$set(this.queryInfo, 'deptId', id)
      this.$set(this.queryInfo, 'employeeName', '')
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
      // this.$set(this.queryInfo, 'address', data.address)
      this.$set(this.queryInfo, 'yeWuPerson', data.yeWuPerson)
      this.$set(this.queryInfo, 'yeWuPerson', data.yeWuPerson)
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    addMore() {
      if (this.queryInfo.signDate === '' || this.queryInfo.supplierName === '') {
        this.$message.error('请添加必填项')
      } else {
        this.preSave()
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            //             this.$store.dispatch('toolbar/delView', this.$route)
            // this.$router.push({ path: '/销售出库新增', query: { guid: getGuid() }})
          }
        })
      }
    },
    // resite() {
    //   this.queryInfo = {
    //     ruKuDate: '',
    //     deptName: '',
    //     employeeName: '',
    //     purchaseNo: '',
    //     contractNo: '',
    //     supplierName: '',
    //     clientName: '',
    //     clientContractNo: '',
    //     xiangQ: '',
    //     remark: ''
    //   }
    //   this.listD = []
    //   this.listRE = []
    //   this.listDPart = []
    //   this.yeWuDeptList = []
    //   this.yeWuPersonList = []
    //   this.caiGouHeTongList = []
    //   this.xiaoShouHeTongInfo = []
    // },
    handlerInput(contractQuantity, index1) {
      if (contractQuantity < 0 || contractQuantity === '') {
        this.$set(this.listDOrigin[index1], 'contractQuantity', 0)
      } else {
        if (parseInt(contractQuantity) > this.listDOrigin[index1].ruKuQuantity) {
          this.$set(this.listDOrigin[index1], 'contractQuantity', this.listDOrigin[index1].ruKuQuantity)
        } else {
          this.$set(this.listDOrigin[index1], 'contractQuantity', contractQuantity)
        }
      }
      this.handleSelectionChange(this.multipleSelection)
    },
    addNew() {
      if (this.queryInfo.contractNo === '') {
        this.$message.error('请选择合同号')
      } else {
        this.dialogSelectTableVisible = true
      }
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
    bindYeWuPerson(data) {
      this.$set(this.queryInfo, 'employeeId', data.employeeId)
      var urlParam = '/api/Purchase?employeeId=' + data.employeeId
      loadData(urlParam).then(res => {
        this.caiGouHeTongList = res.data.data
        window.console.log(this.caiGouHeTongList)
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
          this.$refs.multipleTable1.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable1.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val

      var kuanHaoList = []
      this.multipleSelection.map((item1, index) => {
        if (kuanHaoList.findIndex(item => item === item1.kuanHao) === -1) {
          kuanHaoList.push(item1.kuanHao)
        }
      })
      kuanHaoList.map(id => {
        var selectAmountKuanHao = 0
        this.multipleSelection.map(item => {
          if (item.kuanHao === id) {
            selectAmountKuanHao += parseInt(item.contractQuantity)
          }
        })
        this.listDOrigin.map((item, index) => {
          this.$set(this.listDOrigin[index], 'flag', 0)
        })
        this.listDOrigin.map((item, index) => {
          this.multipleSelection.map(item1 => {
            if (item.id === item1.id) {
              this.$set(this.listDOrigin[index], 'flag', 1)
            }
          })
        })
        this.listDOrigin.map((item, index) => {
          if (item.flag !== 1) {
            this.$set(this.listDOrigin[index], 'selectQuantity', 0)
          }
        })
        this.multipleSelection.map((item, index) => {
          if (item.kuanHao === id) {
            this.$set(this.multipleSelection[index], 'selectQuantity', selectAmountKuanHao)
          }
        })
        window.console.log(this.listDOrigin)
      })
    },
    bindHeTong(data) {
      window.console.log(data)
      var urlParam = '/api/Purchase?purchaseNo=' + data.purchaseNo
      loadData(urlParam).then(res => {
        this.xiaoShouHeTongInfo = res.data.data
      })
    },
    exitToHome() {
                     	            this.$store.dispatch('toolbar/delView', this.$route)

      this.$router.push({ path: '/销售出库' })
    },
    // bindXiaoShouHeTong(data) {
    //   this.$set(this.queryInfo, 'contractNo', data.contractNo)
    //   var urlParam = '/api/Contract?contractNo=' + data.contractNo
    //   loadData(urlParam).then(res => {
    //     var xiaoShouData = res.data.data[0]
    //     this.$set(this.queryInfo, 'clientName', xiaoShouData.clientName)
    //     this.$set(this.queryInfo, 'linkMan', xiaoShouData.contractNo)
    //     this.$set(this.queryInfo, 'clientContractNo', xiaoShouData.clientContractNo)
    //     this.$set(this.queryInfo, 'linkMan', xiaoShouData.linkMan)
    //     this.$set(this.queryInfo, 'linkTel', xiaoShouData.telephone)
    //     this.$set(this.queryInfo, 'payStyle', xiaoShouData.payStyle)
    //     this.$set(this.queryInfo, 'settlementStyle', xiaoShouData.settlementStyle)
    //     this.$set(this.queryInfo, 'brandName', xiaoShouData.brandName)
    //     this.listDPart = xiaoShouData.listD
    //     // this.listD = xiaoShouData.listD

    //     window.console.log(this.listDPart)
    //     // this.$set(this.queryInfo, 'listD', this.listDPart)
    //   })
    //   window.console.log(this.queryInfo)
    // },
    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData(this.pageSetting)
    },
    preSave() {
      this.$set(this.queryInfo, 'userId', '10001')
      this.$set(this.queryInfo, 'userName', '邓科')
      this.multipleSelection.map((item, index) => {
        this.$set(this.multipleSelection[index], 'applyQuantity', item.contractQuantity)
        this.$set(this.multipleSelection[index], 'newId', item.ruKuNo + '_' + item.id)
      })
      this.$set(this.queryInfo, 'listD', this.multipleSelection)
      this.$set(this.queryInfo, 'listCE', this.listCE)
    },
    saveToServe() {
      if (this.queryInfo.deptName === '' || this.queryInfo.employeeName === '' || this.queryInfo.purchaseNo === '' || this.queryInfo.clientName === '' || this.queryInfo.linkMan === '' || this.queryInfo.linkTel === '' || this.queryInfo.address === '' || this.queryInfo.clientContractNo === '') {
        this.$message.error('请添加必填项')
      } else {
        this.preSave()
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.msg)
          } else {
            this.$message.success(res.data.tipInfo)
            var id = res.data.msg

            this.$store.dispatch('toolbar/delView', this.$route)
            this.$router.push({ path: '/销售出库/销售出库修改', query: { chuKuNo: id, contractNo: this.queryInfo.contractNo, applyNo: this.queryInfo.applyNo }})

          // this.$router.push({ path: '/销售出库' })
          // this.$emit('closeDialog')
          }
        })
      }
    },
    closeDialoga() {
      this.dialogSelectTableVisible = false
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
              contractQuantity: 0,
              color: item.cloor
            }
            this.listD.unshift(listDJson)
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
