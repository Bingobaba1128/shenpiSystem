<template>
  <el-card class="formStyle">
    <div style="display:flex;align-items: center;height:50px">
      <p class="header_title">销售出库（修改）</p>
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

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务员 :" prop="employeeName">
                      <el-input v-model="queryInfo.employeeName" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="发货申请单号 :" prop="applyNo">
                      <el-input v-model="queryInfo.applyNo" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="采购合同号 :" prop="purchaseNo">
                      <el-input v-model="queryInfo.purchaseNo" placeholder="" disabled />
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

              <el-table :data="listD1" border max-height="600px" style="margin-top: 0px;" :cell-style="changeCellStyle" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod" class="deepbcg">
                <el-table-column type="index" label="序号" width="100" />
                <el-table-column label="款号" prop="kuanHao" width="100" />
                <el-table-column label="发货日期" prop="applyDate" width="100" />
                <el-table-column label="品名" prop="pinName" width="250" />
                <el-table-column label="布编" prop="clothId" width="150" />
                <el-table-column label="颜色" prop="cloor" width="100" />
                <el-table-column label="码数" prop="size" width="100" />
                <el-table-column label="单位" width="150" prop="unit" />
                <el-table-column label="发货数量" prop="applyQuantity" width="150" />
                <el-table-column label="合计数量" prop="heJiQuantity" width="150">
                  <template slot-scope="scope" style="background:red">
                    {{ scope.row.heJiQuantity }}
                  </template>
                </el-table-column>
                <el-table-column label="总数量" prop="totalQuantity" style="background:#F9FAFB" />
              <!-- <el-table-column label="操作" fixed="right" width="250">
                <template slot-scope="scope">
                  <el-button type="text" style="color:#FAAB15" @click="deleteListData(scope.$index)">删除</el-button>
                </template>
              </el-table-column> -->
              </el-table>
            </el-row>
            <el-row style="padding:0 10px;display: flex; flex-direction:column;padding-bottom:20px;padding-top:24px">
              <el-row style="display:flex;padding-bottom:12px">
                <el-col :span="4">
                  <p style="margin:0;font-size:16px;font-weight: 400;color:#656565">出库明细 :</p>
                </el-col>
              </el-row>
              <el-table ref="multipleTable1" :data="listDOrigin" border max-height="600px" :cell-style="changeCellStyle" style="margin-top:0" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod" @selection-change="handleSelectionChange">
                <el-table-column
                  label="全选"
                  type="selection"
                  width="80"
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
                <el-table-column label="合计数量" prop="heJiQuantity" class="testing" />
                <el-table-column label="总数量" prop="totalQuantity" style="background:#F9FAFB" />
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
        <el-button class="specialConfirmBtn" @click="saveToServe"> 保存</el-button>
        <el-button class="specialContinueBtn" style="margin-left:68px" @click="specialMethod">退出</el-button>
        <!-- <el-button round type="info" style="margin-left:68px" @click="toggleSelection(newList)">选择</el-button> -->
      </div>
    </div>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadYeWuPerson, loadYwDept, addData, postData, loadKeHuList, loadData, deleteRecord } from '@/api/xiaoshouchuku'
import { combineObject } from '@/utils/combineObject'
import { transferWayList } from '@/utils/listVar'

import { baseUrl } from '@/api/apiUrl'
import selectForm from '@/views/cangkuguanli/caigouruku/selectForm'
import cardTitile from '@/layout/mixin/cardTitile'
import tailfile from '@/layout/mixin/uploadAttachment'

export default {
  name: 'Xiaoshouchukuxiugai',

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
      transferWayList: transferWayList,
      listCE: [],
      listDPart: [],
      titileName: '销售出库（修改）',
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
      list4: [],
      newList: [],
      queryInfoOrigin: '',
      passFlag: false,
      listDOriginOrigin: '',
      listCEOrigin: '',
      listD1: ''

    }
  },
  created() {
    this.initData()
    this.initSearchList()
  },
  // mounted() {
  //   this.toggleSelection(this.newList)
  // },
  methods: {
    // 数据初始化
    initData() {
      var urlParam2 = '/api/Apply?applyNo=' + this.$route.query.applyNo
      loadData(urlParam2).then(res => {
        this.listD1 = res.data.data[0].listD
        this.listD1 = this.mergeTableRow(this.listD1, ['kuanHao', 'heJiQuantity', 'totalQuantity'])
      })

      var urlParam = '/api/ChuKu?chuKuNo=' + this.$route.query.chuKuNo + '&xiangQ=1'
      loadData(urlParam).then(res => {
        this.queryInfo = res.data.data[0]
        if (this.queryInfo.address1 !== null) {
          this.$set(this.queryInfo, 'address', this.queryInfo.address1)
        }
        if (this.queryInfo.transportStyle1 !== null) {
          this.$set(this.queryInfo, 'transportStyle', this.queryInfo.transportStyle1)
        }
        this.queryInfoOrigin = JSON.parse(JSON.stringify(this.queryInfo))

        this.listD = res.data.data[0].listD
        this.multipleSelection = this.listD
        this.listCE = res.data.data[0].listCE
        this.listCEOrigin = JSON.parse(JSON.stringify(this.listCE))

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

      var urlParam1 = '/api/ChuKu/getApplyByNo?contractNo=' + this.$route.query.contractNo
      // var urlParam1 = '/api/ChuKu/getApplyByNo?contractNo=XSHT202009-082'

      loadData(urlParam1).then(res => {
        var param = ''
        // this.listDOrigin = res.data.data
        param = res.data.data
        this.newList = []
        window.console.log(res.data.data, 'test')
        param.map(item => {
          this.listD.forEach(val => {
            if (item.newId === val.newId) {
              this.newList.push(item)
            }
          })
        })
        window.console.log(this.newList, 'newlist')
        // this.toggleSelectionSpecial()
        // this.toggleSelection(this.newList)
        window.console.log(res.data.data)
        param.map((item1, index) => {
          if (this.list4.findIndex(item => item === item1.kuanHao) === -1) {
            this.list4.push(item1.kuanHao)
          }
        })
        const newListD = []
        this.list4.map((item1) => {
          param.map((item, index) => {
            if (item1 === item.kuanHao) {
              newListD.push(item)
            }
          })
        })
        param = newListD
        this.listDOrigin = JSON.parse(JSON.stringify(param))

        this.toggleSelectionSpecial()

        this.listDOrigin = this.mergeTableRow(this.listDOrigin, ['kuanHao', 'heJiQuantity'])
        // this.listDOrigin.map((i, index) => {
        //   this.$set(this.listDOrigin[index], 'selectQuantity', 0)
        // })
        this.listDOriginOrigin = JSON.parse(JSON.stringify(this.listDOrigin))
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
    specialMethod() {
      window.console.log(this.listDOrigin)
      window.console.log(this.listDOriginOrigin)
      window.console.log(JSON.stringify(this.queryInfo) == JSON.stringify(this.queryInfoOrigin))
      window.console.log(JSON.stringify(this.listCEOrigin) === JSON.stringify(this.listCE))
      window.console.log(JSON.stringify(this.listDOriginOrigin) === JSON.stringify(this.listDOrigin))

      if (JSON.stringify(this.listCEOrigin) === JSON.stringify(this.listCE) && JSON.stringify(this.listDOriginOrigin) === JSON.stringify(this.listDOrigin) && JSON.stringify(this.queryInfo) == JSON.stringify(this.queryInfoOrigin)) {
        this.passFlag = true
      }
      if (!this.passFlag) {
        var _self = this
        this.$utils.isout(function() {
          _self.exitToHome()
        })
      } else {
        this.exitToHome()
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
    toggleSelectionSpecial() {
      window.console.log(this.multipleSelection, 'multiSelect')
      window.console.log(this.listDOrigin, 'listD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

      this.$nextTick(() => {
        this.multipleSelection.forEach(row => {
  	this.$refs.multipleTable1.toggleRowSelection(this.listDOrigin.find(item => {
            // alert('ois me')
            return row.newId == item.newId
          }), true)
        })
      })
      this.multipleSelection.map(item => {
        this.listDOrigin.map((item1, index) => {
          if (item.newId === item1.newId) {
            this.$set(this.listDOrigin[index], 'contractQuantity', item.applyQuantity)
          }
        })
      })
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
        // var selectAmountKuanHao = 0
        // this.multipleSelection.map(item => {
        //   if (item.kuanHao === id) {
        //     selectAmountKuanHao += parseInt(item.contractQuantity)
        //   }
        // })
        this.listDOrigin.map((item, index) => {
          this.$set(this.listDOrigin[index], 'flag', 0)
        })
        this.listDOrigin.map((item, index) => {
          this.multipleSelection.map(item1 => {
            if (item.newId === item1.newId) {
              this.$set(this.listDOrigin[index], 'flag', 1)
            }
          })
        })
        // this.listDOrigin.map((item, index) => {
        //   if (item.flag !== 1) {
        //     this.$set(this.listDOrigin[index], 'selectQuantity', 0)
        //   }
        // })
        // this.multipleSelection.map((item, index) => {
        //   if (item.kuanHao === id) {
        //     this.$set(this.multipleSelection[index], 'selectQuantity', selectAmountKuanHao)
        //   }
        // })
        // window.console.log(this.multipleSelection, 'change')
      })
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
        postData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.msg)
          } else {
            this.$message.success(res.data.tipInfo)
            // this.$router.replace({ path: '/销售出库/销售出库修改', query: { chuKuNo: data.chuKuNo, contractNo: data.contractNo, applyNo: data.applyNo }})
          }
        })
      }
    },
    handlerInput(contractQuantity, index1) {
      if (contractQuantity < 0 || contractQuantity === '') {
        this.$set(this.listDOrigin[index1], 'contractQuantity', 0)
      } else {
        if (parseInt(contractQuantity) > parseInt(this.listDOrigin[index1].ruKuQuantity)) {
          this.$set(this.listDOrigin[index1], 'contractQuantity', this.listDOrigin[index1].ruKuQuantity)
        } else {
          this.$set(this.listDOrigin[index1], 'contractQuantity', contractQuantity)
        }
      }
      this.handleSelectionChange(this.multipleSelection)
    },
    backTo() {
      this.$router.push({ path: '/销售出库' })
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
    exitToHome() {
      this.$store.dispatch('toolbar/delView', this.$route)
      this.$router.push({ path: '/销售出库' })
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
