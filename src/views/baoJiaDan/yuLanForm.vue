<template>
  <el-card class="formStyle">
    <cardTitile :param="titileName" :show="true" :direct="'/报价单'" :route="$route" />

    <div style="padding: 0 15px" class="overWriteStyle">

      <el-card class="container">

        <p
          style="
  margin:10px;
font-size: 36px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #000000;"
        >报价单</p>
        <el-scrollbar style="height: calc(100vh - 350px);">

          <el-card class="box-card" style="height:100%">

            <div id="printTest" ref="print" style="display:flex;">

              <div style="width:896px;display:flex;flex-direction:column">

                <el-row style="display: flex">

                  <table class="mailTable" :style="styleObject" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background-color: #F6F8FC;width:65px;border:1px solid #E6EAEE; color: #000000 !important;font-weight: 400;">款号</td>
                      <td style="background-color: #fffff;width:128px ">{{ queryInfo.clientNo }}</td>
                      <td style="background-color: #F6F8FC; width:64px;border:1px solid #E6EAEE; color: #000000 !important;font-weight: 400; ">款式</td>
                      <td style="background-color: #fffff; width:128px ">{{ queryInfo.kuanStyle }}</td>
                      <td style="background-color: #F6F8FC;width:128px;pxborder:1px solid #E6EAEE; color: #000000 !important;font-weight: 400;">数量</td>
                      <td style="background-color: #fffff; width:128px ">{{ queryInfo.quantity }}</td>
                      <td style="background-color: #F6F8FC;width:128px;border:1px solid #E6EAEE; color: #000000 !important;font-weight: 400;">工厂名称</td>
                      <td style="background-color: #fffff; width:129px ">{{ queryInfo.supplierName }}</td>

                    </tr>
                  </table>
                </el-row>
                <el-row style="display: flex">
                  <div class="special1">
                    <!-- <el-table :data="queryInfo.listM" border class="specialIcon" :cell-style="changeCellStyle" :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize: '10px'}" :span-method="objectSpanMethod">
                <el-table-column label="物料分类" prop="classifaction" />
                <el-table-column label="物料类型" prop="style" />
                <el-table-column label="物料名称" prop="name" />
                <el-table-column label="物料编号" prop="nameNo" />
                <el-table-column label="成分（包含经纬纱织）" prop="mcontent" />
                <el-table-column label="单位" prop="unit" />
                <el-table-column label="幅宽" prop="fuKuan" />
                <el-table-column label="单件用量" prop="perLiang" />
                <el-table-column label="损耗10%" prop="sunHao" />
                <el-table-column label="总用量" prop="totalLiang" />
                <el-table-column label="单价（元/含税）" prop="unitPrice" />
                <el-table-column label="使用部位" prop="usePart" />
                <el-table-column label="小计（元/含税）" prop="xiaoJi" />
                <el-table-column label="原材料合计（元/含税）" prop="yuanCaiLiaoXiaoJi" />

              </el-table> -->
                    <div>
                      <el-table class="table1" style="margin-top:0;" :data="queryInfo.listM" border :cell-style="changeCellStyle" :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize: '8px'}" :span-method="objectSpanMethod">
                        <el-table-column label="物料分类" prop="classifaction" width="64" />
                        <el-table-column label="物料类型" prop="style" width="64" />
                        <el-table-column label="物料名称" prop="name" width="64" />
                        <el-table-column label="物料编号" prop="nameNo" width="64" />
                        <el-table-column label="成分（包含经纬纱织）" prop="mcontent" width="64" />
                        <el-table-column label="单位" prop="unit" width="64" />
                        <el-table-column label="幅宽" prop="fuKuan" width="64" />
                        <el-table-column label="单件用量" prop="perLiang" width="64" />
                        <el-table-column label="损耗10%" prop="sunHao" width="64" />
                        <el-table-column label="总用量" prop="totalLiang" width="64" />
                        <el-table-column :label="'单价\n(元/含税)'" prop="unitPrice" width="64" />
                        <el-table-column label="使用部位" prop="usePart" width="64" />
                        <el-table-column :label="'小计\n(元/含税)'" prop="xiaoJi" width="64" />
                        <el-table-column :label="'原材料合计\n(元/含税)'" prop="yuanCaiLiaoXiaoJi" width="62" />
                      </el-table>
                    </div>
                    <div>
                      <el-table style="margin-top:0" :data="queryInfo.listF" border :cell-style="changeCellStyle" :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize: '8px'}" :span-method="objectSpanMethod">
                        <el-table-column label="费用分类" prop="classifaction" width="64" />
                        <el-table-column label="费用类型" prop="style" width="64" />
                        <el-table-column label="费用名称" prop="name" width="576" />
                        <el-table-column label="备注" prop="usePart" width="64" />
                        <el-table-column :label="'小计\n(元/含税)'" prop="xiaoJi" width="64" />
                        <el-table-column :label="'费用合计\n(元/含税)'" prop="feeHeJi" width="62" />
                      </el-table>
                    </div>
                    <div>
                      <table class="mailTable" style="margin-top:0" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="832" style="background-color: #F6F8FC;width:832px;border-top: 0;color: #000000 !important;font-weight: 400;">总合计金额（元/含税）</td>
                          <td width="64" style="background-color: #F6F8FC;width:64px;border-top: 0; ">{{ totalBigPrice }}</td>

                        </tr>
                      </table>
                    </div>

                    <div style="margin-top:15px;margin-bottom:15px;margin-left:5px">
                      <span>制作人 : {{ queryInfo.zhiDan }} </span><span style="margin-left:15px">       日期 : {{ queryInfo.baoJiaDate }}</span>

                    </div>
                  </div>

                </el-row>
              </div>
              <div style="flex:1">
                <el-table id="sp1" :data="queryInfo.listE" border style="font-size:8px" :cell-style="changeCellStyle" :header-cell-style="{background:'#eef1f6',color:'#606266' ,fontSize: '8px', height:'112px'}" :span-method="objectSpanMethod">
                  <el-table-column label="图片">
                    <template slot-scope="scope">
                      <img :src="scope.row.url" style="width:85px">
                      </img>
                    </template>
                  </el-table-column>

                </el-table>

              </div>

            </div>

          </el-card>
        </el-scrollbar>

      </el-card>

      <div style="padding-top:30px; padding-bottom: 30px; display:flex; justify-content:center">
        <el-button class="specialConfirmBtn" @click="print"> 打印</el-button>
        <el-button class="specialContinueBtn" style="margin-left:68px;background-color:#959FBB;color:white;border:none" @click="exitToHome">关闭</el-button>
      </div>
    </div>

  </el-card>
</template>

<script>
// import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadYeWuPerson, loadYwDept, addData, loadKeHuList, loadData, passData, passBackData } from '@/api/baoJiaDan'
import { combineObject } from '@/utils/combineObject'
import { baseUrl } from '@/api/apiUrl'
import { getGuid } from '@/utils/getGuid'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  name: 'BaoJiaDan',

  components: {
    ElImageViewer,
    cardTitile
  },

  data() {
    return {
      tableColums: [{ prop: 'unitPrice', label: '数据\n单位' }],
      styleObject: {},
      s_showByRow: true,
      icon0: require('@/assets/icon0.png'),
      icon1: require('@/assets/icon1.png'),
      icon2: require('@/assets/icon2.png'),
      icon3: require('@/assets/zuofei.png'),
      dialogImageUrl: '',
      dialogImageVisible: false,
      initAllData: '',
      queryInfoO: {
        baoJiaDate: this.getNowTime(),
        deptName: '',
        employeeName: '',
        purchaseNo: '',
        contractNo: '',
        supplierName: '',
        clientName: '',
        clientContractNo: '',
        xiangQ: '',
        remark: '',
        zhiDan: '邓科',
        userName: '邓科',
        listD: [],
        listE: [],
        listF: [],
        listM: []
      },
      queryInfo: '',

      titileName: '报价单预览',
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
      totalBigPrice: 0,
      listE: [],
      approveState: '',
      title1: '',
      title2: '',
      dyIcon1: '',
      dyIcon2: '',
      checkPerson: '',
      checkDate: '',
      remarks: '',
      reason: ''

    }
  },
  watch: {
    'queryInfo.listF': {
      handler: function(val, oldval) {
        this.totalBigPrice = 0
        window.console.log(val[0].feeHeJi, 'here')
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
        this.totalBigPrice = 0
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
    exitToHome() {
      this.$store.dispatch('toolbar/delView', this.$route)
      this.$router.push({ path: '/报价单' })
    },
    // 数据初始化
    initData() {
      var param = '/api/BaoJiaDan?zhiDan=1&baoJiaNo=' + this.$route.query.baoJiaNo

      loadData(param).then(res => {
        this.queryInfo = res.data.data[0]
        this.rebuildList()
      })
      var param1 = '/api/Approve/getApproveState?pkNo=' + this.$route.query.baoJiaNo
      loadData(param1).then(res => {
        this.approveState = res.data.data.approveState
        this.listS = res.data.data.listS
        if (this.listS.length !== 0) {
          var element = this.listS[this.listS.length - 1]

          switch (this.approveState) {
            case '-4':
            // if(this.listS !== null){
              this.title1 = '待提交'
              this.title2 = '未开始'
              this.dyIcon1 = this.icon2
              this.dyIcon2 = this.icon2
              break
            // } else {
            //   this.title1 = '待提交'
            // this.title2 = '未开始'
            // this.dyIcon1 = this.icon2
            // this.dyIcon2 = this.icon2
            // break
            // }
            case '4':
            // if(this.listS !== null){
              this.title1 = '待提交'
              this.title2 = '未开始'
              this.dyIcon1 = this.icon2
              this.dyIcon2 = this.icon2
              break
            case '0':
              this.title1 = '已提交'
              this.title2 = '待审批'
              this.dyIcon1 = this.icon0
              this.dyIcon2 = this.icon2

              this.checkPerson = element.approvePerson
              this.checkDate = element.approveTime.trim().split(/\s+/)[0]
              this.remarks = element.remark

              break
            case '1':
              this.title1 = '已提交'
              this.title2 = '通过'
              this.dyIcon1 = this.icon0
              this.dyIcon2 = this.icon0
              this.checkPerson = element.approvePerson
              this.checkDate = element.approveTime.trim().split(/\s+/)[0]
              this.remarks = element.remark
              break
            case '2':
              this.title1 = '已提交'
              this.title2 = '驳回'
              this.dyIcon1 = this.icon0
              this.dyIcon2 = this.icon1
              this.checkPerson = element.approvePerson
              this.checkDate = element.approveTime.trim().split(/\s+/)[0]
              this.remarks = element.remark
              break
            case '3':
              this.title1 = '通过'
              this.title2 = '作废'
              this.dyIcon1 = this.icon0
              this.dyIcon2 = this.icon3
              this.checkPerson = element.approvePerson
              this.checkDate = element.approveTime.trim().split(/\s+/)[0]
              this.remarks = element.remark
              break
          }
        } else {
          this.title1 = '待提交'
          this.title2 = '未开始'
          this.dyIcon1 = this.icon2
          this.dyIcon2 = this.icon2
        }
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
      if (data.perLiang !== '' && data.sunHao !== '' && data.unitPrice !== '') {
        this.$set(this.queryInfo.listM[index], 'totalLiang', parseFloat(data.perLiang) + parseFloat(data.sunHao))
        this.$set(this.queryInfo.listM[index], 'xiaoJi', ((parseFloat(data.perLiang) + parseFloat(data.sunHao)) * parseFloat(data.unitPrice)).toFixed(2))

        window.console.log(this.queryInfo.listM)
      }

      this.reBuild()
    },
    handlerInput1(data, index) {
      this.reBuild1()
    },
    reBuild() {
      var total = 0
      this.queryInfo.listM.map((item, index) => {
        if (item.xiaoJi !== '') {
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
    reBuild1() {
      var total = 0
      this.queryInfo.listF.map((item, index) => {
        if (item.xiaoJi !== '') {
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
    saveToServe() {
      // if (this.queryInfo.signDate === '' || this.queryInfo.supplierName === '') {
      //   this.$message.error('请添加必填项')
      // } else {
      // this.preSave()

      addData(this.queryInfo).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.$message.success(res.data.tipInfo)
        }
      })

      // }
    },
    passThrough() {
      var passJson = {
        pkNo: this.$route.query.baoJiaNo,
        employeeId: '10001',
        employeeName: '邓科',
        state: '1'
      }
      passData(passJson).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('审批通过')
        }
      })
    },
    passBack() {
      var passJson = {
        pkNo: this.$route.query.baoJiaNo,
        employeeId: '10001',
        employeeName: '李四',
        state: '2',
        reason: this.reason
      }
      passBackData(passJson).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('审批驳回')
        }
      })
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
        this.$set(this.queryInfo.listM[this.index], 'xiaoJi', 0)
        this.$set(this.queryInfo.listM[this.index], 'yuanCaiLiaoXiaoJi', 0)
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
        this.$set(this.queryInfo.listM[this.index], 'xiaoJi', 0)
        this.$set(this.queryInfo.listM[this.index], 'yuanCaiLiaoXiaoJi', 0)
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
            xiaoJi: 0,
            yuanCaiLiaoXiaoJi: 0
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
        this.$set(this.queryInfo.listF[this.index1], 'feeHeJi', '')
      } else {
        this.$set(this.queryInfo.listF[this.index1], 'id', dataList[0].id)
        this.$set(this.queryInfo.listF[this.index1], 'name', dataList[0].name)
        this.$set(this.queryInfo.listF[this.index1], 'usePart', '')
        this.$set(this.queryInfo.listF[this.index1], 'xiaoJi', dataList[0].price)
        this.$set(this.queryInfo.listF[this.index1], 'feeHeJi', '')
        // dataList.map(item => {
        for (var i = 1; i < dataList.length; i++) {
          var jsonData = {
            id: dataList[i].id,
            classifaction: dataList[i].classify,
            style: dataList[i].style,
            name: dataList[i].name,
            usePart: '',
            xiaoJi: dataList[0].price,
            feeHeJi: ''
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
      if (row.column.label === '费用合计（元/含税）' || row.column.label === '小计（元/含税）' || row.column.label === '原材料合计（元/含税）') {
        return 'background: #F9F9FB' // 修改的样式
      } else {
        return ''
      }
    },
    handleSuccess(response) {
      var uploadJson = {
        enclosureName: response.data[0].fileName,
        enclosureAddress: response.data[0].url
      }
      this.queryInfo.listE.push(uploadJson)

      this.$message.success('文件上传成功')
    },
    beforeUpload(file) {
      window.console.log(file)
      // this.sampleClothPic01.businessCode = this.detailform.sampleClothPic01.length
      var type = file.name.split('.')[1].toLowerCase()
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
        style: param.style
      }
      this.queryInfo.listM.push(jsonData)

      this.queryInfo.listM = this.groupBy1(this.queryInfo.listM, 'classifaction')
    },
    closeDialogWithParam1(param) {
      this.dialogFeiYongTableVisible = false
      var jsonData = {
        classifaction: param.classify,
        style: param.style
      }
      this.queryInfo.listF.unshift(jsonData)
      this.queryInfo.listF = this.groupBy1(this.queryInfo.listF, 'classifaction')
    },
    passParam(param) {
      var jsonData = {
        classifaction: param.classify,
        style: param.style
      }
      this.queryInfo.listM.unshift(jsonData)
    },
    passParam1(param) {
      var jsonData = {
        classifaction: param.classify,
        style: param.style
      }
      this.queryInfo.listF.unshift(jsonData)
    },
    print() {
      this.$print(this.$refs.print)
    }

  }
}
</script>

<style>
  #id /deep/ .el-table .cell{
    padding-left: 0 !important;
  }
    #id /deep/ .el-table--enable-row-transition .el-table__body td{
    padding: 0 !important;
  }
</style>

<style scoped>
/deep/ .el-table .cell {

  /*text-align: center;*/

  white-space: pre-line !important; /*保留换行符*/

}
@media print  {

    @page {
  size: auto A4 landscape;
   margin-top: 1mm;
   margin-bottom: 10mm;
}
#printTest {
    padding-top: 35px;
}
  body{
	font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
	color: #333333;
	margin-top: 2cm;
	margin-right: 2cm;
	margin-bottom: 1.5cm;
  margin-left: 2cm;
  font-size: 8px;
  }

/* table {page-break-after:always;} */

  /* table{border: 2px solid black;width: 80%;border-collapse: collapse; font-size: 3px;} */
  .el-table {
    margin-top: 0;
    font-size: 8px;
    width: 100%;
    border-left: 2px solid #EBEEF5;
  }

  #printTest {
    width: 1000px;
  }
  .el-row{
    width: 896px;
  }
  /deep/ .el-table--border th.gutter:last-of-type {
    display: block !important;
    width: 0!important;
}
table
  {
  table-layout:auto !important;
  }
  #id{
    padding-left: 0;
  }
  .special1 table{
  table-layout: auto !important;
  width:100% !important;
}
.special1 /deep/ .el-table__header{
  table-layout: auto !important;
  /* width:1079px  !important; */
}
.special1 /deep/ .el-table__body{
  table-layout: auto !important;
  /* width:1079px!important; */
}
.special1 {
  display: flex;
  flex-direction:column
}
}

/* zheli  */
#printTest table tr td {
    padding:0 !important
}
.mailTable tr td{
  padding:0 !important
}
/deep/ .el-table--enable-row-transition .el-table__body td {
    font-size: 8px !important;
}
.el-table th.gutter {
  display :table-cell !important
}
.sp .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 10px;
}

  #printTest {
    width: 1000px;
  }

/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
  /* overflow-y: hidden; */
}
/deep/ .el-scrollbar__bar.is-horizontal {
    display: none;
}
/deep/ .el-scrollbar__bar{
  display: none;
}
.el-row{
  width: 896px;
}
.box-card /deep/ .el-card__body{
  height: auto;
}
.container{
  height: 600px !important;

}
.box-card{
  box-shadow:none !important;
  border: 3px solid #DCE1F0 !important;
}
.container /deep/ .el-card__body{
  justify-content: center;
    align-items: center;
}
.container /deep/ .is-always-shadow{
  height: auto!important;
}
  .el-table th.gutter{
    display: table-cell!important;
  }
  .special1{
    width: 896px;
    display: flex;
    flex-direction: column;
  }
.special1 table{
  table-layout: auto !important;
  /* width:100%  !important; */
}
.special1 /deep/ .el-table__header{
  table-layout: auto !important;
  /* width:100% !important; */
}
.special1 /deep/ .el-table__body{
  table-layout: auto !important;
  /* width:100% !important; */
}
.special1 /deep/ .el-table--border th.gutter:last-of-type {
    display: block !important;
    width: 0!important;
}

/* table
  {
  table-layout:auto;
  } */

#printTest{
  height: auto !important;
}
    #printTest table  tr td{
        font-size:8px;
        border: 1px solid #dce1f0;
        height: 40px;
        text-align: center;
    }
/* 　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; } */
　　.mailTable{ font-size: 8px; color: #71787E; }
　　.mailTable tr td{  width: 150px; height: 35px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
　　.mailTable .specialColumnStyle {
  background-color: #F6F8FC !important;
  width: 105px
  }

.fullClass .el-form-item{
  width: 100%;

}
.specialColumn .el-form-item{
  width: 100%;
}
.specialColumn /deep/ .el-form-item__content{
  width: calc(100% - 90px);
}
.specialColumn .el-form-item{
  width: 100%;
}
.reasonClass /deep/ .el-form-item__content{
  width: 523px;
}
/deep/ .el-upload--picture-card{
  display: none;
}
/deep/ .el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none;
}
  .spanBox {
    width: 100%;
    line-height: 20px;
    display: inline-block;
    word-wrap: break-word;
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

.overWriteStyle /deep/  .el-steps--horizontal {
    white-space: nowrap;
    display: flex;
    justify-content: center;
}
.overWriteStyle /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background-color: #F5F7FA;
  border: hidden;
  color: #333333 !important;
  width: 100%;
}
.overWriteStyle /deep/ .el-tabs__nav {

    padding-left: 0px;
}
.overWriteStyle /deep/ .el-tabs__nav-scroll{
  width: 100%;
}
.overWriteStyle /deep/ .el-tabs__nav{
  width: 100%;
}
.overWriteStyle /deep/ .el-tabs__nav-wrap{
  width: 100%;
}

.overWriteStyle /deep/ .el-table{
  margin-top: 0;
}
.el-card__body {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header_title::before {
  content:'';
    font-size: 8px;
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
    width: 100px;
}
/deep/ .el-input.is-disabled .el-input__inner{
  color: black
}
/deep/ .el-row{
  padding-bottom: 0px
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
