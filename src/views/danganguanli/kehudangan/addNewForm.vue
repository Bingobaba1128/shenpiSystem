<template>
  <el-card class="formStyle">
    <!-- <cardTitile :param="titileName" :show="true" :direct="'/客户档案'" :route="$route" /> -->
    <div style="display:flex;align-items: center;height:50px">
      <p class="header_title">客户档案（新增）</p>
      <div class="backTo" style="margin-left:auto;height:35px; display:flex; align-item:center;padding-right:16px;padding-top:5px">
        <el-button type="info" plain style="padding: 7px 14px; border:none;background-color:#ECF0F6;color:#8D969F" @click="specialMethod()">返回</el-button>
      </div>
    </div>
    <div style="padding: 0 5px">
      <p class="underLine" />
    </div>
    <div style="padding: 0 15px;height:100%">
      <el-tabs type="border-card" class="tabs-fixed-top">
        <el-tab-pane label="客户档案">
          <!-- 检索区 -->
          <el-scrollbar style="height: calc(100vh - 350px);">
            <el-row :gutter="10" style="margin-left:0;margin-right:0" class="specialSelect">
              <el-form :inline="true" :rules="rules" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="150px" @submit.native.prevent>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="客户编号:" label-width="90px">
                      <el-input v-model="queryInfo.clientNo" placeholder="" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="财务编码:" label-width="90px">
                      <el-input v-model="queryInfo.treasureNo" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="财务负责人:">
                      <el-input v-model="queryInfo.treasurePerson" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="停用:">
                      <el-select v-model="queryInfo.state" placeholder="请选择">
                        <el-option
                          v-for="item in booleanList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="客户名称:" prop="clientName" label-width="90px">
                      <el-input v-model="queryInfo.clientName" placeholder="" clearable maxlength="100" @blur="handlerSearch" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="从属企业:">
                      <el-select v-model="queryInfo.congShuClient" clearable>
                        <el-option
                          v-for="item in qiyeList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="开票地址:" label-width="90px">
                      <el-input v-model="queryInfo.kaiPiaoAddress" placeholder="" maxlength="100" show-word-limit clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="统一社会信用代码:">
                      <el-input v-model="queryInfo.yingYeNo" placeholder="" onkeyup="value=value.replace(/[^\w+$]/ig,'')" maxlength="100" clearable />
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="电话:">
                      <el-input v-model="queryInfo.phone" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <!-- <el-col :span="6">
                    <el-form-item label="传真:" label-width="80px">
                      <el-input v-model="queryInfo.fax" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" />
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="6">
                    <el-form-item label="账号:" label-width="90px">
                      <el-input v-model="queryInfo.bankAccount" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <!-- wuziduan -->
                  <el-col :span="6">
                    <el-form-item label="开户行:" label-width="90px">
                      <el-input v-model="queryInfo.kaiHuBank" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <!-- 无 -->
                  <el-col :span="6">
                    <el-form-item label="联系人:" label-width="90px">

                      <!-- <el-tooltip effect="dark" :content="queryInfo.linkMan" placement="top"> -->
                      <el-input v-model="queryInfo.linkMan" placeholder="" clearable maxlength="100" />
                      <!-- </el-tooltip> -->
                    </el-form-item>
                  </el-col>
                  <!-- 无 -->
                  <el-col :span="6">
                    <el-form-item label="联系电话:" label-width="90px">
                      <el-input v-model="queryInfo.linkTel" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="送货联系人:" label-width="150px">
                      <el-input v-model="queryInfo.deliveryMan" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="送货联系电话:">
                      <el-input v-model="queryInfo.deliveryTel" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="职务:" label-width="90px">

                      <el-input ref="lifeComNameStr" v-model="queryInfo.duty" placeholder="" clearable maxlength="100" />

                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="企业经理:" label-width="90px">
                      <el-input v-model="queryInfo.bussinessMan" placeholder="" clearable maxlength="100" />

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="企业电话:">
                      <el-input v-model="queryInfo.bussinessTel" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" maxlength="100" />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="交货地点:" label-width="90px">
                      <el-input v-model="queryInfo.deliverAddress" placeholder="" maxlength="100" show-word-limit clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="省市:" prop="queryInfo.province">
                      <el-cascader
                        v-model="queryInfo.province"
                        placeholder=""
                        :options="provinceAreaList"
                        :props="{ expandTrigger: 'hover' }"
                        filterable

                        clearable
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="地址:" label-width="90px">
                      <el-input v-model="queryInfo.address" type="textarea" placeholder="请输入内容" maxlength="100" show-word-limit clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="寄版运费支付方式:">
                      <el-select v-model="queryInfo.postFeeStyle" placeholder="全部" clearable>
                        <el-option
                          v-for="item in postWayList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row style="height:100%">
                  <el-col :span="24" class="fullSpecialWidth">
                    <el-form-item label="规模及产能简述:" label-width="90px">
                      <el-input v-model="queryInfo.secChanNeng" placeholder="请输入内容" type="textarea" maxlength="100" show-word-limit clearable />

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="规模:" label-width="90px">
                      <el-select v-model="queryInfo.sec" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in guiMoList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="产能:" label-width="90px">
                      <el-select v-model="queryInfo.chanNeng" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in chanNengList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="厂房:">
                      <el-input v-model="queryInfo.changFang" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="自购:" label-width="90px">
                      <el-select v-model="queryInfo.ziGou" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in booleanList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="生产品牌:" label-width="90px">
                      <el-input v-model="queryInfo.brand" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="渠道:">
                      <el-select v-model="queryInfo.quDao" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in quDaoList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="height:100%">
                  <el-col :span="24" class="fullSpecialWidth">
                    <el-form-item label="备注:" label-width="90px">
                      <el-input v-model="queryInfo.remark" placeholder="" type="textarea" maxlength="250" show-word-limit clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
            <!-- 列表区 -->
            <el-row style="display: flex; flex-direction:column;height:80%;padding:0px 20px">
              <el-row style="display:flex;">
                <el-col :span="4">
                  <p style="font-size:16px;font-weight: 400;color:#656565">客户评价级别:</p>
                </el-col>
              </el-row>
              <el-table :data="list1" border style="height:100%;margin-top:0px" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column label="安全">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.safety" placeholder="请选择">
                      <el-option
                        v-for="item in anQuanList"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="信誉保障" prop="creditGuarantee">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.creditGuarantee" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="资金回笼时间" prop="returnofunds">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.returnofunds" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="数量" prop="quantity">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.quantity" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="价钱" prop="unit">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.unit" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="客户级别" prop="clientLevel">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.clientLevel" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="客户类别" prop="clientStyle">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.clientStyle" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label=" 寄版上限" prop="boardinglimit">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.boardinglimit" placeholder="" clearable />
                  </template>
                </el-table-column>
                <el-table-column label="中信保批复额度" prop="zhongXinBaoYuDu">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.zhongXinBaoYuDu" placeholder="" clearable />
                  </template>
                </el-table-column>
                <el-table-column label="天数" prop="days">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.days" placeholder="" type="number" @mousewheel.native.prevent />
                  </template>
                </el-table-column>
              </el-table>
            </el-row>

            <el-row style="padding:0 20px;display: flex; flex-direction:column">
              <el-row style="display:flex;padding-top: 24px">
                <el-col :span="4" style="position:relative">
                  <p style="font-size:16px;font-weight: 400;color:#656565;position:absolute;bottom:0;margin:0">业务跟进:</p>
                </el-col>
                <el-col :span="20" style="display:flex">
                  <el-button type="primary" style="margin-left:auto" class="specialFormat" @click="addNewYeWu">新增</el-button>
                </el-col>
              </el-row>
              <el-table :data="listE" border max-height="374px" style="margin-top:12px" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column type="index" label="序号" width="100" />
                <el-table-column label="业务部门" prop="deptName">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.deptName" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in yeWuDeptList"
                        :key="item.deptId"
                        :label="item.deptName"
                        :value="item.deptName"
                        @click.native="bindYeWuId(item.deptId,scope.$index)"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="业务员" prop="employeeId">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.employeeName" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in scope.row.yeWuPerson"
                        :key="item.employeeId"
                        :label="item.employeeName"
                        :value="item.employeeName"
                        @click.native="bindYeWuPerson(item.employeeId,scope.$index)"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="欠款天数" prop="qianDays">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.qianDays" type="number" placeholder="" clearable />
                  </template>
                </el-table-column>
                <el-table-column label="欠款额度" prop="qianEDu">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.qianEDu" placeholder="" clearable />
                  </template>
                </el-table-column>
                <el-table-column label="欠款备注" prop="qianRemark">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.qianRemark" placeholder="" clearable />
                  </template>
                </el-table-column>
                <el-table-column label=" 寄版限制" prop="boardinglimit">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.boardLimit" placeholder="" clearable />
                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="250">
                  <template slot-scope="scope">
                    <el-button type="text" style="color:#FAAB15" @click="deleteYeWuData(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row style="padding:0 20px;display: flex; flex-direction:column;margin-bottom: 20px;">
              <el-row style="display:flex;padding-top: 24px">
                <el-col :span="4" style="position:relative">
                  <p style="font-size:16px;font-weight: 400;color:#656565;position:absolute;bottom:0;margin:0">品牌信息:</p>
                </el-col>
                <el-col :span="20" style="display:flex">
                  <el-button type="primary" style="margin-left:auto" class="specialFormat" @click="addBrand">新增</el-button>
                </el-col>
              </el-row>
              <el-table :data="listB" border max-height="374px" style="margin-top:12px" :header-cell-style="{background:'#eef1f6',color:'#606266'}" class="special1">
                <el-table-column label="品牌" prop="brandName">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.brandName" placeholder="填写品牌信息" clearable maxlength="100" show-word-limit />

                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="250">
                  <template slot-scope="scope">
                    <el-button type="text" style="color:#FAAB15" @click="deleteBrandData(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="相关附件">
          <tailfile
            :data="listEC"
            :instid="111"
            :table-data="listEC"
            actpoint="edit"
            limit="1"
            title="相关附件"
            @successFile="successFile"
          />

        </el-tab-pane>

      </el-tabs>

      <div style="padding-top:15px; display:flex; justify-content:center">
        <el-button class="specialConfirmBtn" @click="saveToServe"> 确认保存</el-button>
        <el-button class="specialContinueBtn" style="margin-left:68px" @click="addMore">继续新增</el-button>
      </div>
    </div>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { addData, loadData, loadYwDept, loadYeWuPerson, searchData, deleteRecord } from '@/api/kehudangan'
import { payWayList, booleanList, qiyeList, provinceList, dizhiList, guiMoList, postWayList } from '@/utils/listVar'
import { getGuid } from '@/utils/getGuid'

import { combineObject } from '@/utils/combineObject'
import addPhotoForm from '@/views/danganguanli/kehudangan/addPhotoForm'
import { baseUrl } from '@/api/apiUrl'

import cardTitile from '@/layout/mixin/cardTitile'
import tailfile from '@/layout/mixin/uploadAttachment'
import { quDaoList, chanNengList, anQuanList, keHuLeiBieList } from '@/utils/listVar'

export default {
  name: 'Kehudanganxinzeng',

  components: {
    cardTitile,
    addPhotoForm,
    tailfile
  },

  data() {
    return {
      initAllData: '',
      payWayList: payWayList,
      booleanList: booleanList,
      passFlag: false,
      quDaoList: quDaoList,
      chanNengList: chanNengList,
      anQuanList: anQuanList,
      keHuLeiBieList: keHuLeiBieList,
      qiyeList: qiyeList,
      provinceList: provinceList,
      dizhiList: dizhiList,
      guiMoList: guiMoList,
      postWayList: postWayList,
      list1Origin: '',
      queryInfoOrigin: '',
      queryInfo: {
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
        province: [],
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
      },
      disabledTooltip: true,
      rules: {

        clientName: [
          { required: true, message: '请填写客户名称', trigger: 'blur' }
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
      listE: [],
      listB: [],
      yeWuDeptList: [],
      yeWuPerson: [],
      listEC: [],
      titileName: '客户档案（新增）',
      value: '',
      dialogAddTableVisible: false,
      dialogEditTableVisible: false,
      editData: '',
      totalSize: '',
      pageSetting: {
        current: 1,
        size: 10
      },
      specialFlag: true,
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
        value: 'A',
        label: 'A'
      }, {
        value: 'B',
        label: 'B'
      }, {
        value: 'C',
        label: 'C'
      }, {
        value: 'D',
        label: 'D'
      }, {
        value: 'E',
        label: 'E'
      }],
      value1: '',
      provinceAreaList: ''

    }
  },
  created() {
    this.initSearchList()
  },
  methods: {

    // 数据初始化
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    // backToMain() {
    //   alert('pppp')
    // },
    bindValue(val) {
      this.$set(this.queryInfo, 'fuLiaoLeiXingId', val)
    },
    deleteData(id) {
      this.$set(this.deleteItem, 'fuLiaoJiChuId', id)
      var _self = this
      this.$utils.isdel(function() {
        deleteRecord(_self.deleteItem).then(res => {
          if (res.data.code !== 1) {
            _self.$message.error(res.data.tipInfo)
          } else {
            _self.$message.success(res.data.tipInfo)
            if (res.data.data == null) {
              _self.$set(_self.specialPageSetting, 'current', _self.pageSetting.current - 1)
              _self.initData(_self.specialPageSetting)
            } else {
              _self.initData(_self.pageSetting)
            }
          }
        })
      })
    },
    handlerSearch() {
      var param = '/api/Client/chaZhongByClientName?clientName=' + this.queryInfo.clientName
      loadData(param).then(res => {
        if (res.data.data === true) {
          this.$message.error('客户名称已存在')
        }
      })
    },
    bindYeWuPerson(id, index) {
      this.$set(this.listE[index], 'employeeId', id)
    },
    bindYeWuId(id, index) {
      this.yeWuPerson = []
      this.$set(this.listE[index], 'deptId', id)
      this.$set(this.listE[index], 'employeeName', '')

      this.queryInfo.employeeName = ''
      var urlP = '/ERP/selectEmplyee?symbol=2&department=' + id
      loadYeWuPerson(urlP).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.$set(this.listE[index], 'yeWuPerson', res.data.data)
        }
      })
    },
    initSearchList() {
      var param1 = '/api/Province'
      loadData(param1).then(res => {
        window.console.log(res.data)
        this.provinceAreaList = res.data
      })
      var urlParam = '/ERP/selectDepartment?parentId=82'
      loadYwDept(urlParam).then(res => {
        this.yeWuDeptList = res.data.data
      })
    },
    deleteYeWuData(index) {
      this.listE.splice(index, 1)
    },
    deleteBrandData(index) {
      this.listB.splice(index, 1)
    },
    deleteFileData(index) {
      var _self = this
      this.$utils.isdel(function() {
        _self.listEC.splice(index, 1)
      })
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
    successFile(data) {
      this.listEC = data
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

      // this.$set(this.queryInfo, 'province', JSON.stringify(this.queryInfo.province))
      this.$set(this.queryInfo, 'listE', this.listE)
      this.$set(this.queryInfo, 'listB', this.listB)
      this.$set(this.queryInfo, 'listEC', this.listEC)
    },
    saveToServe() {
      var flag = true
      if (this.queryInfo.clientName === '') {
        flag = false
        this.$message.error('请添加必填项')
      }
      if (this.listE.length > 0) {
        this.listE.map(item => {
          if (item.deptId === '' || item.employeeId === '') {
            flag = false
            this.$message.error('请添加业务跟进业务信息')
          }
        })
      }
      if (this.listB.length > 0) {
        this.listB.map(item => {
          if (item.brandName === '') {
            flag = false
            this.$message.error('请添加品牌信息')
          }
        })
      }
      if (flag === true) {
        this.preSave()
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            var id = res.data.msg
            // window.close()
            this.$store.dispatch('toolbar/delView', this.$route)
            this.$router.push({ path: '/客户档案/客户档案修改', query: { clientNo: id }})
          }
        })
      }
    },
    addMore() {
      var flag = true
      if (this.queryInfo.clientName === '') {
        flag = false
        this.$message.error('请添加必填项')
      }
      if (this.listE.length > 0) {
        this.listE.map(item => {
          if (item.deptId === '' || item.employeeId === '') {
            flag = false
            this.$message.error('请添加业务跟进业务信息')
          }
        })
      }
      if (this.listB.length > 0) {
        this.listB.map(item => {
          if (item.brandName === '') {
            flag = false
            this.$message.error('请添加品牌信息')
          }
        })
      }
      if (flag === true) {
        this.preSave()
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            // 手动删除
            this.$store.dispatch('toolbar/delView', this.$route)
            this.$router.push({ path: '/客户档案/客户档案新增', query: { guid: getGuid() }})
          }
        })
      }
    },
    specialMethod() {
      // if(!this.specialFlag){
      //   this.$store.dispatch('toolbar/delView', this.$route)
      //   this.$router.push('/客户档案')// 返回上一层
      // } else {
      this.OriginData()
      if (this.listE.length === 0 && this.listB.length === 0 && this.listEC.length === 0 && JSON.stringify(this.queryInfo) === JSON.stringify(this.queryInfoOrigin) && JSON.stringify(this.list1) === JSON.stringify(this.list1Origin)) {
        this.passFlag = true
      }
      if (!this.passFlag) {
      //   alert('true')
        var _self = this
        this.$utils.isout(function() {
          _self.$store.dispatch('toolbar/delView', _self.$route)

          _self.$router.push('/客户档案')
        })
      } else {
        this.$store.dispatch('toolbar/delView', this.$route)
        this.$router.push('/客户档案')// 返回上一层
      }
      // }
    },
    showTooltip() {
      const lifeW = this.$refs.lifeComNameStr
      this.disabledTooltip = lifeW.value.length < 20
    },
    OriginData() {
      this.queryInfoOrigin = {
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
        province: [],
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
      },
      this.list1Origin = [{
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
      this.listE = []
      this.listB = []
      this.listEC = []
    },

    closeDialog() {
      this.dialogAddTableVisible = false
      // this.initData(this.pageSetting)
    }

  }
}
</script>

<style scoped>
.app-main .el-card {
  margin: 16px !important;
}
.special1 .el-input /deep/ .el-input__count .el-input__count-inner{
line-height: 0 !important;
}
.el-card__body {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.specialSelect .el-row {
  margin-bottom: 16px !important;
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
