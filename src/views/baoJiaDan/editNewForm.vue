<template>
  <el-card class="formStyle">
    <div style="display:flex;align-items: center;height:50px">
      <p class="header_title">报价单（修改）</p>
      <div class="backTo" style="margin-left:auto;height:35px; display:flex; align-item:center;padding-right:16px;padding-top:5px">
        <el-button type="info" plain style="padding: 7px 14px; border:none;background-color:#ECF0F6;color:#8D969F" @click="specialMethod()">返回</el-button>
      </div>
    </div>
    <div style="padding: 0 5px">
      <p class="underLine" />
    </div>

    <div style="padding: 0 15px">
      <el-tabs type="border-card">
        <el-tab-pane label="报价单信息">
          <!-- 检索区 -->
          <el-dialog v-if="dialogSelectWuLiaoInfoVisible" :visible.sync="dialogSelectWuLiaoInfoVisible" class="specialDialog" :close-on-click-modal="false">
            <selectForm :param1="queryInfo.listM" :param2="useForSelect" @closeSelectDialog="closeSelectDialog" @closeDialog2="closeDialog2" />
          </el-dialog>
          <el-dialog v-if="dialogSelectFeiYongInfoVisible" :visible.sync="dialogSelectFeiYongInfoVisible" class="specialDialog" :close-on-click-modal="false">
            <selectForm1 :param1="queryInfo.listF" :param2="useForSelect1" @closeSelectDialog1="closeSelectDialog1" @closeDialog2="closeDialog2" />
          </el-dialog>
          <el-dialog v-if="dialogFuLiaoTableVisible" :visible.sync="dialogFuLiaoTableVisible" :close-on-click-modal="false">
            <selectFuLiao @closeDialogWithParam="closeDialogWithParam" @passParam="passParam" @closeDialog2="closeDialog2" />
          </el-dialog>
          <el-dialog v-if="dialogFeiYongTableVisible" :visible.sync="dialogFeiYongTableVisible" :close-on-click-modal="false">
            <selectFeiYong @closeDialogWithParam1="closeDialogWithParam1" @passParam1="passParam1" @closeDialog2="closeDialog2" />
          </el-dialog>

          <el-scrollbar style="height: calc(100vh - 350px);">

            <el-row :gutter="10" style="margin-left:0;margin-right:0;padding-bottom:0" class="specialSelect">
              <el-form :inline="true" :rules="rules" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="95px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="公司款号 :">
                      <el-input v-model="queryInfo.companyNo" placeholder="请输入">
                        <el-button slot="append" icon="el-icon-search" />
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="客户款号 :">
                      <el-input v-model="queryInfo.clientNo" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="款式 :" prop="kuanStyle">
                      <el-input v-model="queryInfo.kuanStyle" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="数量 :">
                      <el-input v-model="queryInfo.quantity" placeholder="" type="number" on-keypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" clearable maxlength="100" @mousewheel.native.prevent />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="工厂名称 :">
                      <el-input v-model="queryInfo.supplierName" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="halfWidth">
                    <el-form-item label="客户名称 :" prop="clientName">
                      <el-input v-model="queryInfo.clientName" placeholder="" clearable maxlength="100" />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="日期 :" prop="baoJiaDate">
                      <el-date-picker
                        v-model="queryInfo.baoJiaDate"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        disabled
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务部门 :" prop="deptName">
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
                    <el-form-item label="业务员 :" prop="employeeName">
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
                    <el-form-item label="制单人 :" prop="zhiDan">
                      <el-input v-model="queryInfo.zhiDan" placeholder="" disabled />
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-form>
            </el-row>
            <!-- 列表区 -->
            <div style="padding-top:20px;padding-bottom:12px">物料信息 :</div>

            <div style=" border: 1px dashed #DCE1F0;">
              <el-row style="padding:0 10px;display: flex; flex-direction:column;padding-bottom:20px;padding-top: 11px;">
                <el-row style="display:flex;padding-bottom:0px">
                  <el-col :span="24" style="display:flex;padding-top:10px;padding-bottom:0px">
                    <el-button type="primary" style="margin-left:auto" class="specialFormat" @click="addNewFuLiao">新增</el-button>
                  </el-col>
                </el-row>
                <el-table :data="queryInfo.listM" border class="specialIcon" style="margin-top:12px;font-size:14px" :cell-style="changeCellStyle" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod">
                  <el-table-column label="物料分类" prop="classifaction" width="150" />
                  <el-table-column label="物料类型" prop="style" width="250" />
                  <el-table-column label="物料名称" prop="name" width="250">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name" placeholder="请选择" suffix-icon="el-icon-position" @click.native="handleClick(scope.row, scope.$index)" />
                    </template>
                  </el-table-column>
                  <el-table-column label="物料编号" prop="nameNo" width="150" />
                  <el-table-column label="成分（包含经纬纱织）" prop="mcontent" width="180">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.mcontent" placeholder="" :disabled="scope.row.name === ''" />
                    </template>
                  </el-table-column>

                  <el-table-column label="单位" prop="unit" width="150" />
                  <el-table-column label="幅宽" prop="fuKuan" width="150" />
                  <el-table-column label="单件用量" prop="perLiang" width="150">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.perLiang" placeholder="" :disabled="scope.row.name === ''" on-keypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" @blur="handlerInput(scope.row, scope.$index)" />
                    </template>
                  </el-table-column>

                  <el-table-column label="损耗10%" prop="sunHao" width="150">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sunHao" placeholder="" type="number" :disabled="scope.row.name === ''" on-keypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" @mousewheel.native.prevent @blur="handlerInput(scope.row, scope.$index)" />
                    </template>
                  </el-table-column>
                  <el-table-column label="总用量" prop="totalLiang" width="150" />

                  <el-table-column label="单价（元/含税）" prop="unitPrice" width="180" />
                  <el-table-column label="使用部位" prop="usePart" width="150">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.usePart" placeholder="" :disabled="scope.row.name === ''" />
                    </template>
                  </el-table-column>
                  <el-table-column label="小计（元/含税）" prop="xiaoJi" width="150" />

                  <el-table-column label="原材料合计（元/含税）" prop="yuanCaiLiaoXiaoJi" width="180" />

                  <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="text" style="color:#FAAB15" @click="deleteData(scope.$index,scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </div>
            <div style="padding-top:20px;padding-bottom:12px">费用信息 :</div>
            <div style=" border: 1px dashed #DCE1F0;">
              <el-row style="padding:0 10px;display: flex; flex-direction:column;padding-bottom:20px;padding-top: 11px;">
                <el-row style="display:flex;padding-bottom:0px">
                  <el-col :span="24" style="display:flex;padding-top:10px;padding-bottom:0px">
                    <el-button type="primary" style="margin-left:auto" class="specialFormat" @click="addNewFeiYong">新增</el-button>
                  </el-col>
                </el-row>
                <el-table :data="queryInfo.listF" border style="margin-top:12px;font-size:14px" :cell-style="changeCellStyle" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :span-method="objectSpanMethod">
                  <el-table-column label="费用分类" prop="classifaction" />
                  <el-table-column label="费用类型" prop="style" />
                  <el-table-column label="费用名称" prop="name">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name" placeholder="请选择" suffix-icon="el-icon-position" @click.native="handleClick1(scope.row, scope.$index)" />
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" prop="usePart">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.usePart" placeholder="" :disabled="scope.row.name === ''" />
                    </template>
                  </el-table-column>
                  <el-table-column label="小计（元/含税）" prop="xiaoJi" width="160">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.xiaoJi" placeholder="" :disabled="scope.row.name === ''" type="number" on-keypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" @mousewheel.native.prevent @change="handlerInput1(scope.row, scope.$index)" />
                    </template>
                  </el-table-column>
                  <el-table-column label="费用合计（元/含税）" prop="feeHeJi" width="200" />

                  <el-table-column label="操作" fixed="right" width="160">
                    <template slot-scope="scope">
                      <el-button type="text" style="color:#FAAB15" @click="deleteData1(scope.$index,scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </div>
            <div style="padding-top:20px;padding-bottom:0px">总合计金额（元/含税）: {{ totalBigPrice.toFixed(2) }} </div>
            <div style="padding-top:20px;padding-bottom:12px">图片 :</div>
            <div style=" border: 1px dashed #DCE1F0;">
              <div style="padding: 36px 28px;">
                <el-upload
                  :action="$upLoadbaseURL"
                  :before-upload="beforeUpload"
                  :data="listE"
                  :file-list="queryInfo.listE"
                  :limit="5"
                  :on-preview="handlePictureCardPreview"
                  :on-error="handleError"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  list-type="picture-card"
                  multiple
                >

                  <i class="el-icon-plus" />
                  <div slot="tip" class="el-upload__tip">温馨提示</div>
                  <div slot="tip" class="el-upload__tip">支持上传图片（图片格式支持.jpg .jpeg .png）</div>
                  <div slot="tip" class="el-upload__tip">大小限制5M以内</div>
                </el-upload>
              </div>

            </div>

          </el-scrollbar>

        </el-tab-pane>
      </el-tabs>
      <el-image-viewer v-if="dialogImageVisible" :on-close="closeViewer" :url-list="[dialogImageUrl]" />

      <div style="padding-top:15px; padding-bottom: 0px; display:flex; justify-content:center">
        <el-button class="specialConfirmBtn" @click="saveToServe"> 保存</el-button>
        <el-button class="specialContinueBtn" style="margin-left:68px" @click="specialMethod">退出</el-button>
      </div>
    </div>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadYeWuPerson, loadYwDept, addData, loadKeHuList, loadData, postData } from '@/api/baoJiaDan'
import { combineObject } from '@/utils/combineObject'
import { baseUrl } from '@/api/apiUrl'
import selectForm from '@/views/baoJiaDan/selectForm'
import selectForm1 from '@/views/baoJiaDan/selectForm1'
import selectFuLiao from '@/views/baoJiaDan/wuLiaoXinZeng'
import selectFeiYong from '@/views/baoJiaDan/feiYongXinZeng'
import { getGuid } from '@/utils/getGuid'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: 'BaoJiaDan',

  components: {
    selectFuLiao,
    selectForm1,
    selectForm,
    selectFeiYong,
    ElImageViewer
  },

  data() {
    return {
      dialogImageUrl: '',
      dialogImageVisible: false,
      initAllData: '',
      queryInfoO: '',
      queryInfo: '',
      rules: {
        kuanStyle: [
          { required: true, message: '请填写款式名称', trigger: 'change' }
        ],
        deptName: [
          { required: true, message: '请选择业务部门', trigger: 'change' }
        ],
        employeeName: [
          { required: true, message: '请选择业务员', trigger: 'change' }
        ],
        baoJiaDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        clientName: [
          { required: true, message: '请填写客户名称', trigger: 'change' }
        ],
        supplierName: [
          { required: true, message: '请填写加工厂名称', trigger: 'change' }
        ],

        clientContractNo: [
          { required: true, message: '请填写客户合同号', trigger: 'change' }
        ],
        xiangQ: [
          { required: true, message: '请填写箱数', trigger: 'change' }
        ]
      },
      titileName: '报价单（修改）',
      value: '',
      dialogAddTableVisible: false,
      dialogSelectWuLiaoInfoVisible: false,
      dialogFuLiaoTableVisible: false,
      dialogFeiYongTableVisible: false,
      dialogSelectFeiYongInfoVisible: false,
      useForSelect: '',
      useForSelect1: '',
      editData: '',
      totalSize: '',
      index: '',
      index1: '',
      pageSetting: {
        current: 1,
        size: 10
      },
      deleteItem: {
        id: ''
      },
      passFlag: false,
      yeWuPersonList: '',
      yeWuDeptList: '',
      totalBigPrice: 0.00,
      listE: [],
      checkList: true

    }
  },
  watch: {
    'queryInfo.listF': {
      handler: function(val, oldval) {
        this.totalBigPrice = 0.00
        if (val.length > 0 && val[0].feeHeJi !== '' && val[0].feeHeJi !== undefined) {
          this.totalBigPrice = parseFloat(this.totalBigPrice) + parseFloat(val[0].feeHeJi)
        }
        if (this.queryInfo.listM.length > 0 && this.queryInfo.listM[0].yuanCaiLiaoXiaoJi !== '') {
          this.totalBigPrice = parseFloat(this.totalBigPrice) + parseFloat(this.queryInfo.listM[0].yuanCaiLiaoXiaoJi)
        }
      },
      deep: true,
      immediate: true
    },
    'queryInfo.listM': {
      handler: function(val, oldval) {
        this.totalBigPrice = 0.00
        if (val.length > 0 && val[0].yuanCaiLiaoXiaoJi !== '' && val[0].yuanCaiLiaoXiaoJi !== undefined) {
          this.totalBigPrice = parseFloat(this.totalBigPrice) + parseFloat(val[0].yuanCaiLiaoXiaoJi)
        }
        if (this.queryInfo.listF.length > 0 && this.queryInfo.listF[0].feeHeJi !== '') {
          this.totalBigPrice = parseFloat(this.totalBigPrice) + parseFloat(this.queryInfo.listF[0].feeHeJi)
        }
      },
      deep: true,
      immediate: true
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
      var param1 = '/api/Supplier?'
      loadData(param1).then(res => {
        this.yiFangList = res.data.data
      })
      var param2 = '/api/BaoJiaDan?zhiDan=1&baoJiaNo=' + this.$route.query.baoJiaNo
      loadData(param2).then(res => {
        this.queryInfo = res.data.data[0]

        this.rebuildList()
      })
    },
    rebuildList() {
      if (this.queryInfo.listM.length >= 1 || this.queryInfo.listF.length >= 1) {
        var jsonObj = { rowspan: this.queryInfo.listM.length, colspan: 1 }
        var newJsonObj = { rowspan: 0, colspan: 0 }
        var jsonObj1 = { rowspan: this.queryInfo.listF.length, colspan: 1 }
        var newJsonObj1 = { rowspan: 0, colspan: 0 }
        if (this.queryInfo.listM.length >= 1 && this.queryInfo.listF.length >= 1) {
          this.$set(this.queryInfo.listM[0], 'yuanCaiLiaoXiaoJi-span', jsonObj)
          this.$set(this.queryInfo.listF[0], 'feeHeJi-span', jsonObj1)
          this.queryInfo.listM.map((item, index) => {
            if (index !== 0) {
              this.$set(this.queryInfo.listM[index], 'yuanCaiLiaoXiaoJi-span', newJsonObj)
            }
          })
          this.queryInfo.listF.map((item, index) => {
            if (index !== 0) {
              this.$set(this.queryInfo.listF[index], 'feeHeJi-span', newJsonObj1)
            }
          })
        } else if (this.queryInfo.listM.length >= 1) {
          this.$set(this.queryInfo.listM[0], 'yuanCaiLiaoXiaoJi-span', jsonObj)
          this.queryInfo.listM.map((item, index) => {
            if (index !== 0) {
              this.$set(this.queryInfo.listM[index], 'yuanCaiLiaoXiaoJi-span', newJsonObj)
            }
          })
        } else {
          this.$set(this.queryInfo.listF[0], 'feeHeJi-span', jsonObj1)
          this.queryInfo.listF.map((item, index) => {
            if (index !== 0) {
              this.$set(this.queryInfo.listF[index], 'feeHeJi-span', newJsonObj1)
            }
          })
        }
        this.queryInfoO = JSON.parse(JSON.stringify(this.queryInfo))
        this.$set(this.queryInfoO, 'listE', this.queryInfo.listE)
      }
    },

    initSearchList() {
      var urlParam = '/ERP/selectDepartment?parentId=82'
      loadYwDept(urlParam).then(res => {
        this.yeWuDeptList = res.data.data
      })
    },
    bindYeWuId(id) {
      this.$set(this.queryInfo, 'deptId', id)
      this.$set(this.queryInfo, 'employeeName', '')
      this.yeWuPersonList = []
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
            this.$store.dispatch('toolbar/delView', this.$route)
            this.$router.push({ path: '/采购入库新增', query: { guid: getGuid() }})
          }
        })
      }
    },
    specialMethod() {
      window.console.log(this.queryInfo)
      window.console.log(this.queryInfoO, 'ooooooooooo')

      if (JSON.stringify(this.queryInfo) === JSON.stringify(this.queryInfoO)) {
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
    exitToHome() {
      this.$store.dispatch('toolbar/delView', this.$route)
      this.$router.push({ path: '/报价单' })
    },
    OriginData() {
      this.queryInfoOrigin = {
        ruKuDate: this.getNowTime(),
        deptName: '',
        employeeName: '',
        purchaseNo: '',
        contractNo: '',
        supplierName: '',
        clientName: '',
        clientContractNo: '',
        xiangQ: '',
        remark: ''
      }
    },
    handlerInput(data, index) {
      window.console.log(data, 'data')
      if (data.unitPrice !== '') {
        if ((data.perLiang !== '' || data.sunHao !== '')) {
          if (data.perLiang === '' && data.sunHao !== '') {
            this.$set(this.queryInfo.listM[index], 'totalLiang', parseFloat(data.sunHao))
            this.$set(this.queryInfo.listM[index], 'xiaoJi', (parseFloat(data.sunHao) * parseFloat(data.unitPrice)).toFixed(2))
          } else if (data.perLiang !== '' && data.sunHao === '') {
            this.$set(this.queryInfo.listM[index], 'totalLiang', parseFloat(data.perLiang))
            this.$set(this.queryInfo.listM[index], 'xiaoJi', (parseFloat(data.perLiang) * parseFloat(data.unitPrice)).toFixed(2))
          } else {
            this.$set(this.queryInfo.listM[index], 'totalLiang', parseFloat(data.perLiang) + parseFloat(data.sunHao))
            this.$set(this.queryInfo.listM[index], 'xiaoJi', ((parseFloat(data.perLiang) + parseFloat(data.sunHao)) * parseFloat(data.unitPrice)).toFixed(2))
          }

          window.console.log(this.queryInfo.listM)
        } else {
          this.$set(this.queryInfo.listM[index], 'totalLiang', 0.00)
          this.$set(this.queryInfo.listM[index], 'xiaoJi', 0.00)
        }
      } else {
        if ((data.perLiang !== '' || data.sunHao !== '')) {
          if (data.perLiang === '' && data.sunHao !== '') {
            this.$set(this.queryInfo.listM[index], 'totalLiang', parseFloat(data.sunHao))
          } else if (data.perLiang !== '' && data.sunHao === '') {
            this.$set(this.queryInfo.listM[index], 'totalLiang', parseFloat(data.perLiang))
          } else {
            this.$set(this.queryInfo.listM[index], 'totalLiang', parseFloat(data.perLiang) + parseFloat(data.sunHao))
          }

          window.console.log(this.queryInfo.listM)
        } else {
          this.$set(this.queryInfo.listM[index], 'totalLiang', 0.00)
        }
      }

      this.reBuild()
    },
    handlerInput1(data, index) {
      this.reBuild1()
    },
    reCalc() {
      var total = 0.00
      this.queryInfo.listM.map((item, index) => {
        if (item.name !== '' && item.xiaoJi !== '') {
          total += parseFloat(item.xiaoJi)
        }
      })
      this.queryInfo.listM.map((item, index) => {
        this.$set(this.queryInfo.listM[index], 'yuanCaiLiaoXiaoJi', total.toFixed(2))
      })
    },
    reBuild() {
      var total = 0.00
      this.queryInfo.listM.map((item, index) => {
        if (item.name !== '' && item.xiaoJi !== '') {
          total += parseFloat(item.xiaoJi)
        }
      })
      this.queryInfo.listM.map((item, index) => {
        this.$set(this.queryInfo.listM[index], 'yuanCaiLiaoXiaoJi', total.toFixed(2))
      })
      if (this.queryInfo.listM.length >= 1) {
        var jsonObj = { rowspan: this.queryInfo.listM.length, colspan: 1 }
        var newJsonObj = { rowspan: 0, colspan: 0 }
        this.$set(this.queryInfo.listM[0], 'yuanCaiLiaoXiaoJi-span', jsonObj)
        this.queryInfo.listM.map((item, index) => {
          if (index !== 0) {
            this.$set(this.queryInfo.listM[index], 'yuanCaiLiaoXiaoJi-span', newJsonObj)
          }
        })

        window.console.log(this.queryInfo.listM, 'mmm')
        // this.queryInfo.listM = this.mergeTableRow(this.queryInfo.listM, ['yuanCaiLiaoXiaoJi'])
      }
    },
    reCalc1() {
      var total = 0.00
      this.queryInfo.listF.map((item, index) => {
        if (item.name !== '' && item.xiaoJi !== '') {
          total += parseFloat(item.xiaoJi)
        }
      })
      this.queryInfo.listF.map((item, index) => {
        this.$set(this.queryInfo.listF[index], 'feeHeJi', total.toFixed(2))
      })
    },
    reBuild1() {
      var total = 0.00
      this.queryInfo.listF.map((item, index) => {
        if (item.name !== '' && item.xiaoJi !== '') {
          total += parseFloat(item.xiaoJi)
        }
      })
      this.queryInfo.listF.map((item, index) => {
        this.$set(this.queryInfo.listF[index], 'feeHeJi', total.toFixed(2))
      })
      if (this.queryInfo.listF.length >= 1) {
        var jsonObj = { rowspan: this.queryInfo.listF.length, colspan: 1 }
        var newJsonObj = { rowspan: 0, colspan: 0 }
        this.$set(this.queryInfo.listF[0], 'feeHeJi-span', jsonObj)
        this.queryInfo.listF.map((item, index) => {
          if (index !== 0) {
            this.$set(this.queryInfo.listF[index], 'feeHeJi-span', newJsonObj)
          }
        })
        // this.queryInfo.listM = this.mergeTableRow(this.queryInfo.listM, ['yuanCaiLiaoXiaoJi'])
      }
    },

    addNewFuLiao() {
      this.dialogFuLiaoTableVisible = true
    },
    addNewFeiYong() {
      this.dialogFeiYongTableVisible = true
    },
    bindYeWuPerson(data) {
      this.$set(this.queryInfo, 'employeeId', data.employeeId)
      var urlParam = '/api/Purchase?employeeId=' + data.employeeId
      loadData(urlParam).then(res => {
        this.caiGouHeTongList = res.data.data
        window.console.log(this.caiGouHeTongList)
      })
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
    preSave() {
      this.$set(this.queryInfo, 'userId', '10001')
      this.$set(this.queryInfo, 'userName', '邓科')
      this.$set(this.queryInfo, 'listD', this.listD)
      this.$set(this.queryInfo, 'listRE', this.listRE)
    },
    handleClick(data, index) {
      this.dialogSelectWuLiaoInfoVisible = true
      this.useForSelect = data
      this.index = index
    },
    handleClick1(data, index) {
      this.dialogSelectFeiYongInfoVisible = true
      this.useForSelect1 = data
      this.index1 = index
    },
    preCheck() {
      for (var i = 0; i < this.queryInfo.listM.length; i++) {
        if (this.queryInfo.listM[i].name === '') {
          this.$message.error('物料信息不完全')
          return false
        }
      }

      for (var j = 0; j < this.queryInfo.listF.length; j++) {
        if (this.queryInfo.listF[j].name === '') {
          this.$message.error('费用信息不完全')
          return false
        }
      }
      return true
    },
    saveToServe() {
      if (this.queryInfo.kuanStyle === '' || this.queryInfo.clientName === '' || this.queryInfo.baoJiaDate === '' || this.queryInfo.deptName === '' || this.queryInfo.employeeName === '') {
        this.$message.error('请添加必填项')
      } else {
        // var flag = this.preCheck()
        // if (flag) {
        postData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
          }
        })
        // }
      }
    },
    closeDialoga() {
      this.dialogSelectTableVisible = false
    },
    closeSelectDialog(dataList) {
      this.dialogSelectWuLiaoInfoVisible = false
      window.console.log(dataList)
      if (dataList.length === 1) {
        this.$set(this.queryInfo.listM[this.index], 'id', dataList[0].id)
        this.$set(this.queryInfo.listM[this.index], 'name', dataList[0].name)
        this.$set(this.queryInfo.listM[this.index], 'nameNo', dataList[0].no)
        this.$set(this.queryInfo.listM[this.index], 'mcontent', '')
        this.$set(this.queryInfo.listM[this.index], 'unit', dataList[0].unit)
        this.$set(this.queryInfo.listM[this.index], 'fuKuan', dataList[0].sec)
        this.$set(this.queryInfo.listM[this.index], 'perLiang', '')
        this.$set(this.queryInfo.listM[this.index], 'sunHao', '')
        this.$set(this.queryInfo.listM[this.index], 'totalLiang', '')
        this.$set(this.queryInfo.listM[this.index], 'unitPrice', dataList[0].price)
        this.$set(this.queryInfo.listM[this.index], 'usePart', '')
        this.$set(this.queryInfo.listM[this.index], 'xiaoJi', 0.00)
        this.$set(this.queryInfo.listM[this.index], 'yuanCaiLiaoXiaoJi', 0.00)
        this.reCalc()
      } else {
        this.$set(this.queryInfo.listM[this.index], 'id', dataList[0].id)

        this.$set(this.queryInfo.listM[this.index], 'name', dataList[0].name)
        this.$set(this.queryInfo.listM[this.index], 'nameNo', dataList[0].no)
        this.$set(this.queryInfo.listM[this.index], 'mcontent', '')
        this.$set(this.queryInfo.listM[this.index], 'unit', dataList[0].unit)
        this.$set(this.queryInfo.listM[this.index], 'fuKuan', dataList[0].sec)
        this.$set(this.queryInfo.listM[this.index], 'perLiang', '')
        this.$set(this.queryInfo.listM[this.index], 'sunHao', '')
        this.$set(this.queryInfo.listM[this.index], 'totalLiang', '')
        this.$set(this.queryInfo.listM[this.index], 'unitPrice', dataList[0].price)
        this.$set(this.queryInfo.listM[this.index], 'usePart', '')
        this.$set(this.queryInfo.listM[this.index], 'xiaoJi', 0.00)
        this.$set(this.queryInfo.listM[this.index], 'yuanCaiLiaoXiaoJi', 0.00)
        // dataList.map(item => {
        for (var i = 1; i < dataList.length; i++) {
          var jsonData = {
            id: dataList[i].id,
            classifaction: dataList[i].classify,
            style: dataList[i].style,
            name: dataList[i].name,
            nameNo: dataList[i].no,
            mcontent: '',
            unit: dataList[i].unit,
            fuKuan: dataList[i].sec,
            perLiang: '',
            sunHao: '',
            totalLiang: '',
            unitPrice: dataList[i].price,
            usePart: '',
            xiaoJi: 0.00,
            yuanCaiLiaoXiaoJi: 0.00
          }
          this.queryInfo.listM.push(jsonData)
          this.queryInfo.listM = this.groupBy1(this.queryInfo.listM, 'classifaction')

          this.reBuild()
        }
      }
    },
    closeSelectDialog1(dataList) {
      this.dialogSelectFeiYongInfoVisible = false
      window.console.log(dataList)
      if (dataList.length === 1) {
        this.$set(this.queryInfo.listF[this.index1], 'id', dataList[0].id)
        this.$set(this.queryInfo.listF[this.index1], 'name', dataList[0].name)
        this.$set(this.queryInfo.listF[this.index1], 'usePart', '')
        this.$set(this.queryInfo.listF[this.index1], 'xiaoJi', dataList[0].price)
        this.$set(this.queryInfo.listF[this.index1], 'feeHeJi', 0.00)
        this.reCalc1()
      } else {
        this.$set(this.queryInfo.listF[this.index1], 'id', dataList[0].id)
        this.$set(this.queryInfo.listF[this.index1], 'name', dataList[0].name)
        this.$set(this.queryInfo.listF[this.index1], 'usePart', '')
        this.$set(this.queryInfo.listF[this.index1], 'xiaoJi', dataList[0].price)
        this.$set(this.queryInfo.listF[this.index1], 'feeHeJi', 0.00)
        // dataList.map(item => {
        for (var i = 1; i < dataList.length; i++) {
          var jsonData = {
            id: dataList[i].id,
            classifaction: dataList[i].classify,
            style: dataList[i].style,
            name: dataList[i].name,
            usePart: '',
            xiaoJi: dataList[0].price,
            feeHeJi: 0.00
          }
          this.queryInfo.listF.unshift(jsonData)
          this.queryInfo.listF = this.groupBy1(this.queryInfo.listF, 'classifaction')

          this.reBuild1()
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const span = column['property'] + '-span'
      if (row[span]) {
        return row[span]
      }
    },
    groupByStyle(data) {
      var styleList = []
      data.map(item => {
        if (styleList.indexOf(item.style) < 0) {
          styleList.push(item.style)
        }
      })
      var sortedList = []
      styleList.map(item => {
        data.map(item1 => {
          if (item === item1.style) {
            sortedList.push(item1)
          }
        })
      })
      return sortedList
    },
    groupBy1(array, id) {
      const groups = {}
      array.forEach(function(o) {
        const group = JSON.stringify(o[id])
        groups[group] = groups[group] || []
        groups[group].push(o)
      })
      window.console.log(groups, 'asasaas')
      var result = Object.values(groups)
      var finalList = []
      result.map(list => {
        this.groupByStyle(list).map(innerlist => {
          finalList.push(innerlist)
        })
      })
      return finalList
    },
    closeDialog() {
      this.dialogAddTableVisible = false
      // this.initData(this.pageSetting)
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
      // this.$set(this.selectedSupplier, 'signDate', defaultDate)
    },

    successFile(data) {
      this.listRE = data
    },
    deleteData(index1, data) {
      if (this.queryInfo.listM.length === 1) {
        this.queryInfo.listM = []
      } else {
        this.queryInfo.listM.splice(index1, 1)
        this.reBuild()
      }
    },
    deleteData1(index1, data) {
      if (this.queryInfo.listF.length === 1) {
        this.queryInfo.listF = []
      } else {
        this.queryInfo.listF.splice(index1, 1)
        this.reBuild1()
      }
    },
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === '费用合计（元/含税）' || row.column.label === '原材料合计（元/含税）') {
        return 'background: #F9F9FB' // 修改的样式
      } else {
        return ''
      }
    },
    handleSuccess(response) {
      window.console.log(response)
      var uploadJson = {
        enclosureName: response.data[0].fileName,
        enclosureAddress: response.data[0].url,
        name: response.data[0].fileName,
        url: baseUrl + response.data[0].url
      }

      this.queryInfo.listE.push(uploadJson)

      window.console.log(this.queryInfo.listE, 'listE')
      this.$message.success('文件上传成功')
    },
    handleRemove(file) {
      window.console.log(file.url)
      this.queryInfo.listE.map((item, index) => {
        if (item.url === file.url) {
          this.queryInfo.listE.splice(index, 1)
        }
      })
    },
    handleError() {
      this.$message.handleError('文件上传失败')
    },
    beforeUpload(file) {
      window.console.log(file)
      // this.sampleClothPic01.businessCode = this.detailform.sampleClothPic01.length
      var reNew = file.name.split('.')
      var poi = reNew.length - 1
      var type = reNew[poi].toLowerCase()
      const isPic = type === 'jpg' || type === 'png' || type === 'jpeg'
      if (!isPic) {
        this.$message.error('上传图片只能是.jpg .jpeg .png格式!')
      }
      return isPic
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogImageVisible = true
    },
    closeViewer() {
      this.dialogImageVisible = false
    },
    closeDialog2() {
      this.dialogFuLiaoTableVisible = false
      this.dialogSelectWuLiaoInfoVisible = false
      this.dialogFeiYongTableVisible = false
      this.dialogSelectFeiYongInfoVisible = false
    },
    closeDialogWithParam(param) {
      this.dialogFuLiaoTableVisible = false
      var jsonData = {
        classifaction: param.classify,
        style: param.style,
        name: ''
      }
      this.queryInfo.listM.push(jsonData)

      this.queryInfo.listM = this.groupBy1(this.queryInfo.listM, 'classifaction')
      this.reBuild()
    },
    closeDialogWithParam1(param) {
      this.dialogFeiYongTableVisible = false
      var jsonData = {
        classifaction: param.classify,
        style: param.style,
        name: ''
      }
      this.queryInfo.listF.unshift(jsonData)
      this.queryInfo.listF = this.groupBy1(this.queryInfo.listF, 'classifaction')
      this.reBuild1()
    },
    passParam(param) {
      var jsonData = {
        classifaction: param.classify,
        style: param.style,
        name: ''
      }
      this.queryInfo.listM.unshift(jsonData)
    },
    passParam1(param) {
      var jsonData = {
        classifaction: param.classify,
        style: param.style,
        name: ''
      }
      this.queryInfo.listF.unshift(jsonData)
    }

  }
}
</script>

<style scoped>
.fullClass .el-form-item{
  width: 100%;

}
.fullClass /deep/ .el-form-item__content{
  width: calc(100% - 115px);

}
.fullClass2 .el-form-item{
  width: 100%;

}
.fullClass2 /deep/ .el-form-item__content{
  width: calc(100% - 125px);

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
    border-bottom:1px solid #F3F3F3;
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
      width: 200px;
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
