<template>
  <el-card class="formStyle">
    <!-- <cardTitile :param="titileName" :show="true" :direct="'/客户档案'" :route="$route" /> -->

    <div style="padding: 15px">
      <el-tabs type="border-card">
        <el-tab-pane label="客户档案">
          <!-- 检索区 -->
          <el-scrollbar style="height: calc(100vh - 155px);">

            <el-row :gutter="10" style="margin-left:0;margin-right:0" class="specialSelect">
              <el-form :inline="true" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="150px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="客户编号:" label-width="90px">
                      <!-- <el-tooltip :disabled="queryInfo.clientNo.length < fixLimit" effect="dark" :content="queryInfo.clientNo" placement="top"> -->
                      <el-input v-model="queryInfo.clientNo" placeholder="" disabled />
                      <!-- </el-tooltip> -->

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="财务编码:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.treasureNo.length < fixLimit" effect="dark" :content="queryInfo.treasureNo" placement="top">

                        <el-input ref="words" v-model="queryInfo.treasureNo" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="财务负责人:">
                      <el-tooltip :disabled="queryInfo.treasurePerson.length < fixLimit" effect="dark" :content="queryInfo.treasurePerson" placement="top">

                        <el-input ref="words" v-model="queryInfo.treasurePerson" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="停用:">
                      <el-input v-model="queryInfo.state" placeholder="" disabled />

                      <!-- <el-select v-model="queryInfo.state" placeholder="请选择" clearable disabled>
                        <el-option
                          v-for="item in booleanList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="客户名称:" prop="clientName" label-width="90px">
                      <el-tooltip :disabled="queryInfo.clientName.length < 50" effect="dark" :content="queryInfo.clientName" placement="top">

                        <el-input v-model="queryInfo.clientName" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="从属企业:">
                      <el-input v-model="queryInfo.congShuClient" placeholder="" disabled />

                      <!-- <el-select v-model="queryInfo.congShuClient" clearable disabled>
                        <el-option
                          v-for="item in qiyeList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="开票地址:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.kaiPiaoAddress.length < 50" effect="dark" :content="queryInfo.kaiPiaoAddress" placement="top">

                        <el-input v-model="queryInfo.kaiPiaoAddress" placeholder="" maxlength="100" show-word-limit clearable disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="统一社会信用代码:">
                      <el-tooltip :disabled="queryInfo.yingYeNo.length < fixLimit" effect="dark" :content="queryInfo.yingYeNo" placement="top">
                        <el-input ref="words" v-model="queryInfo.yingYeNo" placeholder="" onkeyup="value=value.replace(/[^\w+$]/ig,'')" maxlength="25" disabled @mouseleave.native="closeTooltip" />
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="电话:">
                      <el-tooltip :disabled="queryInfo.phone.length < fixLimit" effect="dark" :content="queryInfo.phone" placement="top">
                        <el-input v-model="queryInfo.phone" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" maxlength="25" disabled />

                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>

                  <el-col :span="6">
                    <el-form-item label="账号:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.bankAccount.length < fixLimit" effect="dark" :content="queryInfo.bankAccount" placement="top">

                        <el-input ref="words" v-model="queryInfo.bankAccount" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="6">
                    <el-form-item label="账号:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.kaiHuBank.length < fixLimit" effect="dark" :content="queryInfo.kaiHuBank" placement="top">

                        <el-input ref="words" v-model="queryInfo.kaiHuBank" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col> -->
                  <el-col :span="6">
                    <el-form-item label="开户行:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.kaiHuBank.length < fixLimit" effect="dark" :content="queryInfo.kaiHuBank" placement="top">

                        <el-input ref="words" v-model="queryInfo.kaiHuBank" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="联系人:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.linkMan.length < fixLimit" effect="dark" :content="queryInfo.linkMan" placement="top">

                        <el-input ref="words" v-model="queryInfo.linkMan" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="联系电话:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.linkTel.length < fixLimit" effect="dark" :content="queryInfo.linkTel" placement="top">

                        <el-input ref="words" v-model="queryInfo.linkTel" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="送货联系人:" label-width="150px">
                      <el-tooltip :disabled="queryInfo.deliveryMan.length < fixLimit" effect="dark" :content="queryInfo.deliveryMan" placement="top">

                        <el-input ref="words" v-model="queryInfo.deliveryMan" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="送货联系电话:">
                      <el-tooltip :disabled="queryInfo.deliveryTel.length < fixLimit" effect="dark" :content="queryInfo.deliveryTel" placement="top">

                        <el-input ref="words" v-model="queryInfo.deliveryTel" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="职务:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.duty.length < fixLimit" effect="dark" :content="queryInfo.duty" placement="top">

                        <el-input ref="words" v-model="queryInfo.duty" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="企业经理:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.bussinessMan.length < fixLimit" effect="dark" :content="queryInfo.bussinessMan" placement="top">

                        <el-input ref="words" v-model="queryInfo.bussinessMan" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="企业电话:">
                      <el-tooltip :disabled="queryInfo.bussinessTel.length < fixLimit" effect="dark" :content="queryInfo.bussinessTel" placement="top">

                        <el-input ref="words" v-model="queryInfo.bussinessTel" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="交货地点:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.deliverAddress.length < 50" effect="dark" :content="queryInfo.deliverAddress" placement="top">

                        <el-input v-model="queryInfo.deliverAddress" placeholder="" maxlength="100" show-word-limit clearable disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="省市:" prop="queryInfo.province">

                      <el-input v-model="queryInfo.province" placeholder="" maxlength="100" show-word-limit clearable disabled />

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="地址:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.address.length < 50" effect="dark" :content="queryInfo.address" placement="top">
                        <el-input v-model="queryInfo.address" type="textarea" placeholder="请输入内容" maxlength="100" show-word-limit clearable disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="寄版运费支付方式:">
                      <el-input v-model="queryInfo.postFeeStyle" placeholder="" disabled />

                      <!-- <el-select v-model="queryInfo.postFeeStyle" placeholder="全部" clearable disabled>
                        <el-option
                          v-for="item in postWayList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row style="height:100%">
                  <el-col :span="24" class="fullSpecialWidth">
                    <el-form-item label="规模及产能简述:" label-width="90px">
                      <el-input v-model="queryInfo.secChanNeng" placeholder="请输入内容" type="textarea" maxlength="100" show-word-limit clearable disabled />

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="规模:" label-width="90px">
                      <el-input v-model="queryInfo.sec" placeholder="" disabled />

                      <!-- <el-select v-model="queryInfo.sec" placeholder="请选择" clearable disabled>
                        <el-option
                          v-for="item in guiMoList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="产能:" label-width="90px">
                      <el-input v-model="queryInfo.chanNeng" placeholder="" disabled />

                      <!-- <el-select v-model="queryInfo.chanNeng" placeholder="请选择" clearable disabled>
                        <el-option
                          v-for="item in chanNengList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="厂房:">
                      <el-tooltip :disabled="queryInfo.changFang.length < fixLimit" effect="dark" :content="queryInfo.changFang" placement="top">

                        <el-input ref="words" v-model="queryInfo.changFang" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="自购:" label-width="90px">
                      <el-input v-model="queryInfo.ziGou" placeholder="" disabled />

                      <!-- <el-select v-model="queryInfo.ziGou" placeholder="请选择" clearable disabled>
                        <el-option
                          v-for="item in booleanList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="生产品牌:" label-width="90px">
                      <el-tooltip :disabled="queryInfo.brand.length < fixLimit" effect="dark" :content="queryInfo.brand" placement="top">

                        <el-input ref="words" v-model="queryInfo.brand" placeholder="" disabled />
                      </el-tooltip>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="渠道:">
                      <el-input v-model="queryInfo.quDao" placeholder="" disabled />

                      <!-- <el-select v-model="queryInfo.quDao" placeholder="请选择" clearable disabled>
                        <el-option
                          v-for="item in quDaoList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="height:100%">
                  <el-col :span="24" class="fullSpecialWidth">
                    <el-form-item label="备注:" label-width="90px">
                      <el-input v-model="queryInfo.remark" placeholder="" type="textarea" maxlength="250" show-word-limit disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
            <!-- 列表区 -->

            <el-row style="display: flex; flex-direction:column;height:80%;padding-top:24px;padding:0px 20px">
              <el-row style="display:flex">
                <el-col :span="4">
                  <p style="font-size:16px;font-weight: 400;color:#656565;margin:0">客户评价级别:</p>
                </el-col>

              </el-row>
              <el-table :data="list1" border style="height:100%;margin-top:12px" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column label="安全" prop="safety" />
                <el-table-column label="信誉保障" prop="creditGuarantee" />
                <el-table-column label="资金回笼时间" prop="returnofunds" />
                <el-table-column label="数量" prop="quantity" />
                <el-table-column label="价钱" prop="unit" />
                <el-table-column label="客户级别" prop="clientLevel" />
                <el-table-column label="客户类别" prop="clientStyle" />
                <el-table-column label=" 寄版上限" prop="boardinglimit" />
                <el-table-column label="中信保批复额度" prop="zhongXinBaoYuDu" />
                <el-table-column label="天数" prop="days" />
              </el-table>
            </el-row>

            <el-row style="margin-top:20px;padding:0 20px;display: flex; flex-direction:column;height:80%">
              <el-row style="display:flex;padding-top: 24px">
                <el-col :span="4" style="position:relative">
                  <p style="font-size:16px;font-weight: 400;color:#656565;position:absolute;bottom:0;margin:0">业务跟进:</p>
                </el-col>
              </el-row>
              <el-table :data="listE" border style="height:100%;margin-top:12px" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column type="index" label="序号" width="100" />
                <el-table-column label="业务部门" prop="deptName" />
                <el-table-column label="业务员" prop="employeeName" />
                <el-table-column label="欠款天数" prop="qianDays" />
                <el-table-column label="欠款额度" prop="qianEDu" />
                <el-table-column label="欠款备注" prop="qianRemark" />
                <el-table-column label=" 寄版限制" prop="boardLimit" />
              </el-table>
            </el-row>
            <el-row style="padding:0 20px;display: flex; flex-direction:column;height:80%;margin-top:20px;padding-bottom:20px">
              <el-row style="display:flex;padding-top: 24px">
                <el-col :span="4">
                  <p style="font-size:16px;font-weight: 400;color:#656565;position:absolute;bottom:0;margin:0">品牌信息:</p>
                </el-col>
              </el-row>
              <el-table :data="listB" border style="margin-top:12px" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column label="品牌" prop="brandName" />
              </el-table>
            </el-row>
          </el-scrollbar>

        </el-tab-pane>
        <el-tab-pane label="相关附件">
          <tailfile
            :data="listEC"
            :instid="111"
            :table-data="listEC"
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
import { postData, loadData, searchData, deleteRecord, loadYeWuPerson, loadYwDept } from '@/api/kehudangan'
import { combineObject } from '@/utils/combineObject'
import addPhotoForm from '@/views/danganguanli/kehudangan/addPhotoForm'
import { baseUrl } from '@/api/apiUrl'
import { payWayList, booleanList, qiyeList, provinceList, dizhiList, postWayList } from '@/utils/listVar'
import tailfile from '@/layout/mixin/uploadAttachment'

import cardTitile from '@/layout/mixin/cardTitile'

export default {
  name: 'Kehudanganchakan',

  components: {
    cardTitile,
    addPhotoForm,
    tailfile
  },
  data() {
    return {
      disabledTooltip: true,

      initAllData: '',
      queryInfo: '',
      rules: {
        clientNo: [
          { required: true, message: '请填写客户编号', trigger: 'blur' }
        ],
        clientName: [
          { required: true, message: '请填写客户名称', trigger: 'blur' }
        ]
      },
      list1: [],
      listE: [],
      listB: [],
      payWayList: payWayList,
      booleanList: booleanList,
      qiyeList: qiyeList,
      provinceList: provinceList,
      dizhiList: dizhiList,
      postWayList: postWayList,
      fixLimit: 13,
      listEC: [],
      titileName: '客户档案(详情)',
      value: '',
      dialogAddTableVisible: false,
      dialogEditTableVisible: false,
      editData: '',
      totalSize: '',
      yeWuPerson: '',
      yeWuDeptList: '',
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
      value1: ''

    }
  },
  created() {
    this.initData()
    this.initSearchList()
  },

  methods: {
    // 数据初始化
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    initData() {
      var urlParam = '/api/Client?clientNo=' + this.$route.query.clientNo
      loadData(urlParam).then(res => {
        this.queryInfo = res.data.data[0]
        this.list1 = res.data.data
        this.listE = res.data.data[0].listE
        this.listB = res.data.data[0].listB
        this.listEC = res.data.data[0].listEC
      })
    },
    bindYeWuPerson(id) {
      this.$set(this.queryInfo, 'employeeId', id)
    },
    bindYeWuId(id) {
      this.yeWuPerson = []
      this.queryInfo.employeeName = ''
      var urlP = '/ERP/selectEmplyee?symbol=2&department=' + id
      loadYeWuPerson(urlP).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.yeWuPerson = res.data.data
        }
      })
    },
    initSearchList() {
      var urlParam = '/ERP/selectDepartment?parentId=82'
      loadYwDept(urlParam).then(res => {
        this.yeWuDeptList = res.data.data
      })
    },
    bindValue(val) {
      this.$set(this.queryInfo, 'fuLiaoLeiXingId', val)
    },
    deleteData(id) {
      this.$set(this.deleteItem, 'fuLiaoJiChuId', id)
      this.$confirm('确认删除？')
        .then(_ => {
          deleteRecord(this.deleteItem).then(res => {
            if (res.data.code !== 1) {
              this.$message.error(res.data.tipInfo)
            } else {
              this.$message.success(res.data.tipInfo)
              //   this.initData()
              if (res.data.data == null) {
                window.console.log(this.pageSetting.current)
                this.$set(this.specialPageSetting, 'current', this.pageSetting.current - 1)
                this.initData(this.specialPageSetting)
              } else {
                this.initData(this.pageSetting)
              }
            }
          })
        })
        .catch(_ => {})
    },
    showTooltip() {
      const lifeW = this.$refs.words
      this.disabledTooltip = lifeW.value.length < 12
    },
    closeTooltip() {
      this.disabledTooltip = true
    },
    deleteYeWuData(index) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.listE.splice(index, 1)
        })
        .catch(_ => {})
    },
    deleteBrandData(index) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.listB.splice(index, 1)
        })
        .catch(_ => {})
    },
    deleteFileData(index) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.listEC.splice(index, 1)
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
      this.listEC.push(data)
    },
    addNewYeWu() {
      var listEJson = {
        deptId: '',
        employeeId: '',
        qianDays: '',
        qianEDu: '',
        qianRemark: '',
        boardLimit: ''
      }
      this.listE.unshift(listEJson)
    },
    addBrand() {
      var listBJson = {
        brandNo: '',
        brandName: ''
      }
      this.listB.unshift(listBJson)
    },
    searchData() {
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)
      var url = '/api/fuliaojichu?'
      var urlParam = toUrlParam(url, searchInfo)
      searchData(urlParam).then(res => {
        this.initAllData = res.data.data
      })
    },
    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData(this.pageSetting)
    },
    preSave() {
      this.$set(this.queryInfo, 'safety', this.list1[0].safety)
      this.$set(this.queryInfo, 'creditGuarantee', this.list1[0].creditGuarantee)
      this.$set(this.queryInfo, 'returnofunds', this.list1[0].returnofunds)
      this.$set(this.queryInfo, 'quantity', this.list1[0].quantity)
      this.$set(this.queryInfo, 'unit', this.list1[0].unit)
      this.$set(this.queryInfo, 'clientLevel', this.list1[0].clientLevel)
      this.$set(this.queryInfo, 'clientStyle', this.list1[0].clientStyle)
      this.$set(this.queryInfo, 'boardinglimit', this.list1[0].boardinglimit)
      this.$set(this.queryInfo, 'zhongXinBaoYuDu', this.list1[0].zhongXinBaoYuDu)
      this.$set(this.queryInfo, 'days', this.list1[0].days)
      this.$set(this.queryInfo, 'listE', this.listE)
      this.$set(this.queryInfo, 'listB', this.listB)
      this.$set(this.queryInfo, 'listEC', this.listEC)
    },
    saveToServe() {
      if (this.queryInfo.clientNo === '' || this.queryInfo.clientName === '') {
        this.$message.error('请添加必填项')
      } else {
        this.preSave()
        postData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$router.push({ path: '/客户档案' })
          }
        })
      }
    },
    closeDialog() {
      this.dialogAddTableVisible = false
      // this.initData(this.pageSetting)
    },
    addMore() {
      if (this.queryInfo.clientName === '') {
        this.$message.error('请添加必填项')
      } else {
        this.preSave()
        postData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.resite()
          }
        })
      }
    },
    resite() {
      this.queryInfo = {
        clientNo: '',
        treasureNo: '',
        treasurePerson: '',
        clientName: '',
        congShuClient: '北江纺织',
        yingYeNo: '',
        shuiWuNo: '',
        fax: '',
        kaiPiaoAddress: '',
        naShuiRenNo: '',
        phone: '',
        bankAccount: '',
        linkMan: '',
        deliveryMan: '',
        duty: '',
        deliveryTel: '',
        bussinessMan: '',
        bussinessTel: '',
        province: '',
        postFeeStyle: '',
        state: '否',
        address: '',
        secChanNeng: '',
        sec: '',
        chanNeng: '',
        changFang: '',
        ziGou: '',
        brand: '',
        quDao: '',
        remark: '',
        kaiHuBank: '',
        deliverAddress: '',
        linkTel: ''
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
.specialSelect .el-row {
    margin-bottom: 15px !important;
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
