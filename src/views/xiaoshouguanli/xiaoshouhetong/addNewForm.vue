<template>
  <el-card class="formStyle">
    <!-- <cardTitile :param="titileName" :show="true" :direct="'/销售合同'" :route="$route" /> -->
    <div style="display:flex;align-items: center;height:50px">
      <p class="header_title">销售合同（新增）</p>
      <div class="backTo" style="margin-left:auto;height:35px; display:flex; align-item:center;padding-right:16px;padding-top:5px">
        <el-button type="info" plain style="padding: 7px 14px; border:none;background-color:#ECF0F6;color:#8D969F" @click="specialMethod()">返回</el-button>
      </div>
    </div>
    <div style="padding: 0 5px">
      <p class="underLine" />
    </div>
    <el-dialog v-if="dialogSelectTableVisible" :visible.sync="dialogSelectTableVisible" class="specialDialog" :close-on-click-modal="false">
      <selectForm :param="listD" @closeDialog1="closeDialog1" @closeDialog2="closeDialog2" @haveInfo="getInfo" />
    </el-dialog>
    <div style="padding: 0 15px;display:flex;flex:1;flex-direction:column">
      <el-tabs type="border-card">
        <el-tab-pane label="销售合同">
          <!-- 检索区 -->
          <el-scrollbar style="height: calc(100vh - 350px);">

            <el-row :gutter="10" style="margin-left:0;margin-right:0;padding-bottom:0" class="specialSelect">
              <el-form :inline="true" :rules="rules" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="110px" @submit.native.prevent>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="合同类型:" prop="contractStyle">
                      <el-select v-model="queryInfo.contractStyle" placeholder="请选择">
                        <el-option
                          v-for="item in heTongList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="销售合同号:">
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
                      <el-select v-model="queryInfo.clientName" placeholder="请输入" filterable>
                        <el-option
                          v-for="item in keHuList"
                          :key="item.clientNo"
                          :label="item.clientName"
                          :value="item.clientName"
                          @click.native="bindJiaFangInfo(item)"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务负责人:">
                      <el-input v-model="queryInfo.yeWuPerson" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务联系人:">
                      <el-input v-model="queryInfo.linkMan" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="电话:">
                      <el-input v-model="queryInfo.yeWuTel" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="品牌:" prop="brandName">
                      <el-select v-model="queryInfo.brandName" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in brandList"
                          :key="item.id"
                          :label="item.brandName"
                          :value="item.brandName"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="付款方式:" prop="payStyle">
                      <el-select v-model="queryInfo.payStyle" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in payWayList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="结算方式:" prop="settlementStyle">
                      <el-input v-model="queryInfo.settlementStyle" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="客户合同号:" prop="clientContractNo">
                      <el-input v-model="queryInfo.clientContractNo" placeholder="" maxlength="100" clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="地址:" prop="address">
                      <el-input v-model="queryInfo.address" placeholder="" type="textarea" maxlength="100" show-word-limit clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="乙方:" prop="contractBody">
                      <el-select v-model="queryInfo.contractBody" placeholder="请选择">
                        <el-option
                          v-for="item in heTongZhuTiList"
                          :key="item.company"
                          :label="item.company"
                          :value="item.company"
                          @click.native="bindInfo(item)"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务部门:" prop="deptName">
                      <el-select v-model="queryInfo.deptName" placeholder="请选择">
                        <el-option
                          v-for="item in yeWuDeptList"
                          :key="item.deptId"
                          :label="item.deptName"
                          :value="item.deptName"
                          @click.native="bindYeWuId(item.deptId,item.employeeName)"
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
                  <el-col :span="6">
                    <el-form-item label="业务负责人:" prop="yeWuPerson_1">
                      <el-input v-model="queryInfo.yeWuPerson_1" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="电话:" prop="telephone">
                      <el-input v-model="queryInfo.telephone" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" clearable maxlength="100" />

                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="地址:" prop="address_1">
                      <el-input v-model="queryInfo.address_1" placeholder="" type="textarea" maxlength="100" show-word-limit clearable />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row style="height:100%;padding-bottom:0">
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
              <el-row style="display:flex;padding-bottom:12px;jusify-content:flex-end;padding-top:10px">

                <el-col :span="24" style="display:flex;">
                  <el-button type="primary" style="margin-left: auto" class="specialFormat" @click="addNew">新增</el-button>
                </el-col>
              </el-row>
              <el-table :data="listD" :cell-style="changeCellStyle" :span-method="objectSpanMethod" max-height="600px" border style="margin-top:0" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column type="index" label="序号" width="100" fixed="left" />
                <el-table-column label="款号" prop="kuanHao" width="150" fixed="left" />
                <el-table-column label="品名" prop="pinName" width="150" />
                <el-table-column label="布编" prop="clothId" width="150" />
                <el-table-column label="颜色" prop="cloor" width="150" />
                <el-table-column label="码数" prop="size" width="150" />
                <el-table-column label="数量" prop="quantity" width="150">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.quantity" placeholder="" type="number" on-keypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" @mousewheel.native.prevent @change="quantityChange(scope.$index, scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="150" prop="unit" />
                <el-table-column label="单价（元/含税）" prop="price" width="150">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price" placeholder="" type="number" @mousewheel.native.prevent @change="priceChange(scope.$index, scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column label="小计金额（元/含税）" prop="totalPrice" width="200">
                  <template slot-scope="scope">
                    {{ (scope.row.quantity * scope.row.price).toFixed(2) }}
                  </template>
                </el-table-column>

                <el-table-column label="合计数量" prop="heJiQuantity" width="200" />
                <el-table-column label="合计金额（元/含税）" prop="totalPrice_2" width="200" />

                <el-table-column label="数量允差" prop="cha" width="150">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.cha" placeholder="" type="number" @mousewheel.native.prevent @change="copyCha(scope.$index, scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column label="交期" prop="planDate" width="230">
                  <template slot-scope="scope">
                    <el-date-picker
                      v-model="scope.row.planDate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      @blur="copyDate(scope.$index, scope.row)"
                    />                 </template>
                </el-table-column>

                <el-table-column label="总数量" prop="totalQuantity" width="200" />
                <el-table-column label="总金额（元/含税）" prop="totalPrice_1" width="200" />

                <el-table-column label="操作" width="200" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="text" style="color:#FAAB15" @click="deleteData(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
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
      <div style="align-items: flex-end; padding-bottom: 15px; display:flex; justify-content:center;flex:1">
        <el-button class="specialConfirmBtn" @click="saveToServe">确认保存</el-button>
        <el-button class="specialContinueBtn" style="margin-left:68px" @click="addMore">继续新增</el-button>

      </div>
    </div>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { loadYeWuPerson, loadYwDept, addData, loadKeHuList, loadData, searchData, deleteRecord } from '@/api/xiaoshouhetong'
import { payWayList, transferWayList, booleanList } from '@/utils/listVar'
import selectForm from '@/views/xiaoshouguanli/xiaoshouhetong/selectForm'

import { baseUrl } from '@/api/apiUrl'
import tailfile from '@/layout/mixin/uploadAttachment'
import { getGuid } from '@/utils/getGuid'

import cardTitile from '@/layout/mixin/cardTitile'

export default {
  name: 'Xiaoshouhetongxinzeng',
  components: {
    cardTitile,
    selectForm,
    tailfile
  },

  data() {
    return {
      initAllData: '',
      queryInfo: {
        contractStyle: '',
        contractNo: '',
        signDate: this.getNowTime(),
        clientName: '',
        yeWuPerson: '',
        linkMan: '',
        yeWuTel: '',
        brandName: '',
        payStyle: '',
        settlementStyle: '',
        clientContractNo: '',
        address: '',
        contractBody: '',
        deptName: '',
        employeeName: '',
        yeWuPerson_1: '',
        telephone: '',
        address_1: ''
      },
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
      heTongList: [
        { value: '委外生产' },
        { value: '自生产' }
      ],
      heTongZhuTiList: '',
      keHuList: [],
      listD: [],
      yeWuDeptList: [],
      yeWuPersonList: [],
      listCE: [],
      titileName: '销售合同（新增）',
      value: '',
      dialogAddTableVisible: false,
      dialogEditTableVisible: false,
      dialogSelectTableVisible: false,
      queryInfoOrigin: '',
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
        value: 'A'
      }, {
        value: 'B'
      }, {
        value: 'C'
      }, {
        value: 'D'
      }, {
        value: 'E'
      }],
      value1: '',
      brandList: []

    }
  },
  created() {
    // this.initData()
    this.initSearchList()
  },
  methods: {
    // 数据初始化
    // initData() {
    //   var param = '/api/Client'
    //   loadKeHuList(param).then(res => {
    //     this.keHuList = res.data.data
    //   })
    // },
    initSearchList() {
      var urlParam = '/ERP/selectDepartment?parentId=82'
      loadYwDept(urlParam).then(res => {
        this.yeWuDeptList = res.data.data
        // this.$set(this.queryInfo,'yeWuPerson_1',res.data.data.employeeName)
      })
      var param1 = '/api/Contract/getCompany?select=*&where=where 1=1'
      loadData(param1).then(res => {
        this.heTongZhuTiList = res.data.data
      })
    },
    bindInfo(data) {
      // this.$set(this.queryInfo, 'telephone', data.telphone)
      this.$set(this.queryInfo, 'address_1', data.address)
    },
    copyCha(index, data) {
      this.listD.map((item, index) => {
        if (item.kuanHao === data.kuanHao) {
          this.$set(this.listD[index], 'cha', data.cha)
        }
      })
    },
    copyDate(index, data) {
      this.listD.map((item, index) => {
        if (item.kuanHao === data.kuanHao) {
          this.$set(this.listD[index], 'planDate', data.planDate)
        }
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
    changeNumber() {
      const str = '' + this.inputNumber
      if (str.indexOf('.') != -1) {
        const arr = str.split('')
        arr.splice(arr.length - 1)
        const str2 = arr.join('')
        this.inputNumber = +str2
      }
    },
    bindYeWuId(id, name) {
      this.$set(this.queryInfo, 'yeWuPerson_1', name)

      this.clearJiaFang()

      this.$set(this.queryInfo, 'employeeId', '')
      this.$set(this.queryInfo, 'employeeName', '')
      this.$set(this.queryInfo, 'deptId', id)
      this.keHuList = []
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
      this.clearJiaFang()

      this.$set(this.queryInfo, 'employeeId', data.employeeId)
      this.$set(this.queryInfo, 'telephone', data.telephone)
      var param = '/api/Client?state=否&employeeName=' + data.employeeName
      loadData(param).then(res => {
        this.keHuList = res.data.data
      })
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    clearJiaFang() {
      this.$set(this.queryInfo, 'clientName', '')
      this.$set(this.queryInfo, 'yeWuPerson', '')
      this.$set(this.queryInfo, 'linkMan', '')
      this.$set(this.queryInfo, 'yeWuTel', '')
      this.$set(this.queryInfo, 'brandName', '')
      this.$set(this.queryInfo, 'address', '')
      this.$set(this.queryInfo, 'telephone', '')
      this.brandList = []
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
            var newVal = parseInt(item.heJiQuantity) - parseInt(data.quantity)
            var newVal1 = parseFloat(item.totalPrice_2) - parseInt(data.quantity) * parseFloat(data.price)
            _self.$set(_self.temList[index], 'heJiQuantity', newVal)
            _self.$set(_self.temList[index], 'totalPrice_2', newVal1.toFixed(2))
          }
          var newVal2 = parseFloat(item.totalQuantity) - parseInt(data.quantity)
          _self.$set(_self.temList[index], 'totalQuantity', newVal2)
          var newVal3 = parseFloat(item.totalPrice_1) - parseInt(data.quantity) * parseFloat(data.price)
          _self.$set(_self.temList[index], 'totalPrice_1', newVal3.toFixed(2))
        })

        _self.temList.map((item, index) => {
          _self.$delete(_self.temList[index], 'kuanHao-span')
          _self.$delete(_self.temList[index], 'heJiQuantity-span')
          _self.$delete(_self.temList[index], 'totalQuantity-span')
          _self.$delete(_self.temList[index], 'totalPrice_2-span')
          _self.$delete(_self.temList[index], 'totalPrice_1-span')

          _self.listD = _self.mergeTableRow(_self.temList, ['kuanHao', 'heJiQuantity', 'totalPrice_2'])
        })
      }
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
      this.dialogSelectTableVisible = true
    },
    getInfo(data) {
      data.map(item => {
        var target = 0
        this.listD.map(item1 => {
          if (item1.kuanHao === item.kuanHao) {
            target = item1.cha
          }
        })
        var samePrice = 0.00
        this.listD.map(item1 => {
          if (item1.kuanHao === item.kuanHao) {
            samePrice = item1.price
          }
        })
        var listDJson = {
          id: item.id,
          kuanHao: item.kuanHao,
          pinName: item.pinName,
          clothId: item.clothId,
          cloor: item.cloor,
          size: item.size,
          quantity: 0,
          unit: item.unit,
          price: samePrice,
          cha: target,
          planDate: this.getNowTime(),
          heJiQuantity: 0,
          totalPrice_2: 0.00,
          totalPrice: 0.00,
          totalPrice_1: 0.00,
          totalQuantity: 0.00
        }

        if (this.listD.length !== 0) {
          this.listD.map((item1, index) => {
            if (item1.kuanHao === listDJson.kuanHao) {
              this.$set(listDJson, 'totalPrice_2', item1.totalPrice_2)
              this.$set(listDJson, 'heJiQuantity', item1.heJiQuantity)
            }
            this.$set(listDJson, 'totalPrice_1', item1.totalPrice_1)
            this.$set(listDJson, 'totalQuantity', item1.totalQuantity)
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
        this.listD = this.mergeTableRow(this.listD, ['kuanHao', 'heJiQuantity', 'totalPrice_2'])
      })
    },
    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData(this.pageSetting)
    },
    preSave() {
      // if (this.listD.length !== 0) {
      //   this.$set(this.queryInfo, 'kuanHao', this.listD[0].kuanHao)
      //   this.$set(this.queryInfo, 'pinName', this.listD[0].pinName)
      //   this.$set(this.queryInfo, 'clothId', this.listD[0].clothId)
      //   this.$set(this.queryInfo, 'cloor', this.listD[0].cloor)
      //   this.$set(this.queryInfo, 'size', this.listD[0].size)
      //   this.$set(this.queryInfo, 'quantity', this.listD[0].quantity)
      //   this.$set(this.queryInfo, 'unit', this.listD[0].unit)
      //   this.$set(this.queryInfo, 'price', this.listD[0].price)
      //   this.$set(this.queryInfo, 'cha', this.listD[0].cha)
      //   this.$set(this.queryInfo, 'planDate', this.listD[0].planDate)
      // }
      this.listD.map((item, index) => {
        this.$set(this.listD[index], 'totalPrice', item.price * item.quantity)
      })
      this.$set(this.queryInfo, 'userId', '10001')
      this.$set(this.queryInfo, 'userName', '邓科')
      this.$set(this.queryInfo, 'listD', this.listD)
      this.$set(this.queryInfo, 'listCE', this.listCE)
    },
    saveToServe() {
      console.log(this.queryInfo)
      if (this.queryInfo.contractStyle === '' || this.queryInfo.signDate === '' || this.queryInfo.clientName === '' || this.queryInfo.brandName === '' || this.queryInfo.payStyle === '' || this.queryInfo.settlementStyle === '' || this.queryInfo.clientContractNo === '' || this.queryInfo.address === '' || this.queryInfo.contractBody === '' || this.queryInfo.deptName === '' || this.queryInfo.employeeName === '' || this.queryInfo.yeWuPerson_1 === '' || this.queryInfo.telephone === '' || this.queryInfo.address_1 === '') {
        this.$message.error('请添加必填项')
      } else if (this.listD.length === 0) {
        this.$message.error('请添加销售合同详情')
      } else {
        this.preSave()
        var flag = false
        this.queryInfo.listD.map(item => {
          if (item.quantity === '' || item.price === '' || item.cha === '') {
            flag = true
          }
        })
        if (flag) {
          this.$message.error('销售合同详情存在未填写数据')
        } else {
          addData(this.queryInfo).then(res => {
            if (res.data.code !== 1) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success(res.data.tipInfo)
              var contractNo = res.data.msg
              this.$store.dispatch('toolbar/delView', this.$route)
              this.$router.push({ path: '/销售合同/销售合同修改', query: { contractNo: contractNo }})
            }
          })
        }
      }
    },

    addMore() {
      if (this.queryInfo.contractStyle === '' || this.queryInfo.signDate === '' || this.queryInfo.clientName === '' || this.queryInfo.brandName === '' || this.queryInfo.payStyle === '' || this.queryInfo.settlementStyle === '' || this.queryInfo.clientContractNo === '' || this.queryInfo.address === '' || this.queryInfo.contractBody === '' || this.queryInfo.deptName === '' || this.queryInfo.employeeName === '' || this.queryInfo.yeWuPerson_1 === '' || this.queryInfo.telephone === '' || this.queryInfo.address_1 === '') {
        this.$message.error('请添加必填项')
      } else if (this.listD.length === 0) {
        this.$message.error('请添加销售合同详情')
      } else {
        this.preSave()
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.msg)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$store.dispatch('toolbar/delView', this.$route)
            this.$router.push({ path: '/销售合同/销售合同新增', query: { guid: getGuid() }})
          }
        })
      }
    },
    closeDialog1() {
      this.dialogSelectTableVisible = false
      this.initData()
    },
    closeDialog2() {
      this.dialogSelectTableVisible = false
    },
    OriginData() {
      this.queryInfoOrigin = {
        contractStyle: '',
        contractNo: '',
        signDate: this.getNowTime(),
        clientName: '',
        yeWuPerson: '',
        linkMan: '',
        yeWuTel: '',
        brandName: '',
        payStyle: '',
        settlementStyle: '',
        clientContractNo: '',
        address: '',
        contractBody: '',
        deptName: '',
        employeeName: '',
        yeWuPerson_1: '',
        telephone: '',
        address_1: ''
      }
    },
    specialMethod() {
      this.OriginData()
      if (this.listD.length === 0 && this.listCE.length === 0 && JSON.stringify(this.queryInfo) == JSON.stringify(this.queryInfoOrigin)) {
        this.passFlag = true
      }
      if (!this.passFlag) {
      //   alert('true')
        var _self = this
        this.$utils.isout(function() {
          _self.$store.dispatch('toolbar/delView', _self.$route)
          _self.$router.push('/销售合同')
        })
      } else {
        this.$store.dispatch('toolbar/delView', this.$route)
        this.$router.push('/销售合同')// 返回上一层
      }
    },
    closeDialog() {
      this.dialogAddTableVisible = false
    },
    bindJiaFangInfo(data) {
      this.$set(this.queryInfo, 'yeWuPerson', data.bussinessMan)
      this.$set(this.queryInfo, 'linkMan', data.linkMan)
      this.$set(this.queryInfo, 'yeWuTel', data.linkTel)
      this.$set(this.queryInfo, 'address', data.address)
      this.$set(this.queryInfo, 'clientId', data.clientNo)
      this.brandList = data.listB
    },
    successFile(data) {
      this.listSE = data
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
      this.$set(data[0], 'totalPrice_1-span', jsonObj)
      for (var i = 1; i < data.length; i++) {
        this.$set(data[i], 'totalQuantity-span', newJsonObj)
        this.$set(data[i], 'totalPrice_1-span', newJsonObj)
      }
      return data
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const span = column['property'] + '-span'
      if (row[span]) {
        return row[span]
      }
    },
    quantityChange(index, data) {
      this.$set(this.listD[index], 'totalPrice', this.listD[index].price * this.listD[index].quantity)
      // this.listD[index].totalPrice = this.listD[index].price * this.listD[index].applyQuantity
      var totalKuanHaoNum = 0
      var totalKuanHaoAmount = 0
      var total = 0
      var amount = 0
      if (data.quantity < 0 || data.quantity === '') {
        this.$set(this.listD[index], 'quantity', 0)
      } else {
        this.$set(this.listD[index], 'quantity', data.quantity)
      }
      this.listD.map(item => {
        if (item.kuanHao === this.listD[index].kuanHao) {
          totalKuanHaoNum = totalKuanHaoNum + parseInt(item.quantity)
          totalKuanHaoAmount = totalKuanHaoAmount + parseInt(item.quantity) * parseFloat(item.price)
        }
        total += parseInt(item.quantity)
        amount = amount + parseFloat(item.price) * parseInt(item.quantity)
      })
      this.listD.map((item, index1) => {
        if (item.kuanHao === this.listD[index].kuanHao) {
          this.$set(this.listD[index1], 'heJiQuantity', totalKuanHaoNum)
          this.$set(this.listD[index1], 'totalPrice_2', totalKuanHaoAmount.toFixed(2))
        }
        this.$set(this.listD[index1], 'totalQuantity', total)
        this.$set(this.listD[index1], 'totalPrice_1', amount.toFixed(2))
      })
    },
    priceChange(index, data) {
      this.listD.map((item, index) => {
        if (item.kuanHao === data.kuanHao) {
          this.$set(this.listD[index], 'price', data.price)
        }
      })
      this.$set(this.listD[index], 'totalPrice', this.listD[index].price * this.listD[index].quantity)
      // this.listD[index].totalPrice = this.listD[index].price * this.listD[index].applyQuantity
      var totalKuanHaoAmount = 0
      var amount = 0
      if (data.price < 0 || data.price === '') {
        this.$set(this.listD[index], 'price', 0)
      } else {
        this.$set(this.listD[index], 'price', data.price)
      }
      this.listD.map(item => {
        if (item.kuanHao === this.listD[index].kuanHao) {
          totalKuanHaoAmount = totalKuanHaoAmount + parseInt(item.quantity) * parseFloat(item.price)
        }
        amount = amount + parseFloat(item.price) * parseInt(item.quantity)
      })
      this.listD.map((item, index1) => {
        if (item.kuanHao === this.listD[index].kuanHao) {
          this.$set(this.listD[index1], 'totalPrice_2', totalKuanHaoAmount.toFixed(2))
        }
        this.$set(this.listD[index1], 'totalPrice_1', amount.toFixed(2))
      })
    },
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === '合计金额（元/含税）' || row.column.label === '总金额（元/含税）' || row.column.label === '合计数量' || row.column.label === '总数量') {
        return 'background: #F9F9FB' // 修改的样式
      } else {
        return ''
      }
    }

  }
}
</script>

<style scoped>
.el-dialog{
  flex-direction: column !important;
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
  height: 68px;
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
