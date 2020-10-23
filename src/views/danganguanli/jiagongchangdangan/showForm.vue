<template>
  <el-card class="formStyle">
    <cardTitile :param="titileName" :show="true" :direct="'/加工厂档案'" :route="$route" />

    <div style="padding: 0 15px">
      <el-tabs type="border-card">
        <el-tab-pane label="加工厂档案">
          <!-- 检索区 -->
          <el-row :gutter="10" style="margin-left:0;margin-right:0">
            <el-form :inline="true" :rules="rules" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="110px">
              <el-row>
                <el-col :span="12" class="halfWidth">
                  <el-form-item label="加工厂名称:" prop="supplierName">
                    <el-tooltip :disabled="queryInfo.supplierName.length < 50" effect="dark" :content="queryInfo.supplierName" placement="top">

                      <el-input v-model="queryInfo.supplierName" placeholder="" disabled />
                    </el-tooltip>

                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="简称:" prop="supplierJName">
                    <el-tooltip :disabled="queryInfo.supplierJName.length < fixLimit" effect="dark" :content="queryInfo.supplierJName" placement="top">
                      <el-input ref="words" v-model="queryInfo.supplierJName" placeholder="" disabled />
                    </el-tooltip>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="代码:" prop="supplierNo">
                    <el-tooltip :disabled="queryInfo.supplierNo.length < fixLimit" effect="dark" :content="queryInfo.supplierNo" placement="top">

                      <el-input ref="words" v-model="queryInfo.supplierNo" placeholder="" disabled />
                    </el-tooltip>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="工厂负责人:" prop="supplierPerson">
                    <el-tooltip :disabled="queryInfo.supplierPerson.length < fixLimit" effect="dark" :content="queryInfo.supplierPerson" placement="top">

                      <el-input ref="words" v-model="queryInfo.supplierPerson" placeholder="" disabled />
                    </el-tooltip>

                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电话:" prop="telephone">
                    <el-tooltip :disabled="queryInfo.telephone.length < fixLimit" effect="dark" :content="queryInfo.telephone" placement="top">

                      <el-input ref="words" v-model="queryInfo.telephone" placeholder="" disabled />
                    </el-tooltip>

                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="业务联系人:" prop="yeWuPerson">
                    <el-tooltip :disabled="queryInfo.yeWuPerson.length < fixLimit" effect="dark" :content="queryInfo.yeWuPerson" placement="top">

                      <el-input ref="words" v-model="queryInfo.yeWuPerson" placeholder="" disabled />
                    </el-tooltip>

                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="联系人电话:" prop="yeWuTel">
                    <el-tooltip :disabled="queryInfo.yeWuTel.length < fixLimit" effect="dark" :content="queryInfo.yeWuTel" placement="top">

                      <el-input ref="words" v-model="queryInfo.yeWuTel" placeholder="" disabled />
                    </el-tooltip>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="halfWidth">
                  <el-form-item label="地址:" prop="address">

                    <el-input v-model="queryInfo.address" placeholder="" type="textarea" disabled />

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="开户行:" prop="kaiHuBank">
                    <el-tooltip :disabled="queryInfo.kaiHuBank.length < fixLimit" effect="dark" :content="queryInfo.kaiHuBank" placement="top">

                      <el-input ref="words" v-model="queryInfo.kaiHuBank" placeholder="" disabled />
                    </el-tooltip>

                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="银行账号:" prop="bankAccount">
                    <el-tooltip :disabled="queryInfo.bankAccount.length < fixLimit" effect="dark" :content="queryInfo.bankAccount" placement="top">

                      <el-input ref="words" v-model="queryInfo.bankAccount" placeholder="" disabled />
                    </el-tooltip>

                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="税号:" prop="taxAccount">
                    <el-tooltip :disabled="queryInfo.taxAccount.length < fixLimit" effect="dark" :content="queryInfo.taxAccount" placement="top">

                      <el-input ref="words" v-model="queryInfo.taxAccount" placeholder="" disabled />
                    </el-tooltip>

                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否停用:" prop="state">
                    <el-input ref="words" v-model="queryInfo.state" placeholder="" disabled />

                    <!-- <el-select v-model="queryInfo.state" placeholder="请选择" disabled>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>

                <el-col :span="12" class="halfWidth">
                  <el-form-item label="汇入地点:" prop="huiRuPlace">

                    <el-input v-model="queryInfo.huiRuPlace" placeholder="" disabled />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24" class="fullWidth">
                  <el-form-item label="备注:">

                    <el-input v-model="queryInfo.remark" placeholder="" type="textarea" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
          <!-- 列表区 -->
        </el-tab-pane>
        <el-tab-pane label="相关附件">
          <tailfile
            :data="listSE"
            :instid="111"
            :table-data="listSE"
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
import { postData, loadData, searchData, deleteRecord } from '@/api/jiagongchangdangan'
import { combineObject } from '@/utils/combineObject'
import addPhotoForm from '@/views/danganguanli/jiagongchangdangan/addPhotoForm'
import { baseUrl } from '@/api/apiUrl'
import tailfile from '@/layout/mixin/uploadAttachment'

import cardTitile from '@/layout/mixin/cardTitile'

export default {
  name: 'Jiagongchangdanganchakan',

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
        supplierName: [
          { required: true, message: '请填写加工厂名称', trigger: 'blur' }
        ],
        supplierJName: [
          { required: true, message: '请填写简称', trigger: 'blur' }
        ],
        supplierNo: [
          { required: true, message: '请填写代码', trigger: 'blur' }
        ],
        supplierPerson: [
          { required: true, message: '请填写工厂负责人', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请填写电话', trigger: 'blur' }
        ],
        yeWuPerson: [
          { required: true, message: '请填写业务联系人', trigger: 'blur' }
        ],
        yeWuTel: [
          { required: true, message: '请填写联系人电话', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写地址', trigger: 'blur' }
        ],
        kaiHuBank: [
          { required: true, message: '请填写开户行', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, message: '请填写银行账号', trigger: 'blur' }
        ],
        taxAccount: [
          { required: true, message: '请填写税号', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请填写停用状态', trigger: 'blur' }
        ],
        huiRuPlace: [
          { required: true, message: '请填写汇入地点', trigger: 'blur' }
        ]
      },
      listSE: [],
      titileName: '加工厂档案(详情)',
      value: '',
      dialogAddTableVisible: false,
      dialogEditTableVisible: false,
      editData: '',
      totalSize: '',
      pageSetting: {
        current: 1,
        size: 10
      },
      fixLimit: 13,

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
  },
  methods: {
    // 数据初始化
    initData() {
      var urlParam = '/api/Supplier?supplierName=' + this.$route.query.supplierName
      loadData(urlParam).then(res => {
        this.queryInfo = res.data.data[0]
        this.listSE = res.data.data[0].listSE
      })
    },
    statusCheck(val) {
      return val === 0 ? '否' : '是'
    },
    showTooltip() {
      const lifeW = this.$refs.words
      this.disabledTooltip = lifeW.value.length < 12
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
          this.listSE.splice(index, 1)
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
      this.listSE.push(data)
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
    handleCurrentChange(val) {
      this.pageSetting.current = val
      this.initData(this.pageSetting)
    },
    preSave() {
      this.$set(this.queryInfo, 'listSE', this.listSE)
    },
    saveToServe() {
      window.console.log(this.queryInfo)
      if (this.queryInfo.supplierName === '' || this.queryInfo.supplierJName === '' || this.queryInfo.supplierNo === '' || this.queryInfo.supplierPerson === '' || this.queryInfo.telephone === '' || this.queryInfo.yeWuPerson === '' || this.queryInfo.yeWuTel === '' || this.queryInfo.address === '' || this.queryInfo.kaiHuBank === '' || this.queryInfo.bankAccount === '' || this.queryInfo.taxAccount === '' || this.queryInfo.huiRuPlace === '' || this.queryInfo.state === '') {
        this.$message.error('请添加必填项')
      } else {
        this.preSave()
        postData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$router.push({ path: '/加工厂档案' })
          // this.$emit('closeDialog')
          }
        })
      }
    },
    closeDialog() {
      this.dialogAddTableVisible = false
      // this.initData(this.pageSetting)
    },
    successFile(data) {
      this.listSE = data
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

/deep/ .el-row{
  padding-bottom: 25px
}

/deep/ .el-input.is-disabled .el-input__inner{
  color: black
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
}
.fullWidth /deep/ .el-form-item .el-form-item__content{
      width: calc(75% + 200px);
}
.halfWidth /deep/ .el-form-item{
  width: 100%;
}
.halfWidth /deep/ .el-form-item .el-form-item__content{
      width: calc(50% + 200px);
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
