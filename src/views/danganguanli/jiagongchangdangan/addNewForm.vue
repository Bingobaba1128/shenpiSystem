<template>
  <el-card class="formStyle">
    <!-- <cardTitile :param="titileName" :show="true" :direct="'/加工厂档案'" :route="$route" /> -->
    <div style="display:flex;align-items: center;height:50px">
      <p class="header_title">加工厂档案（新增）</p>
      <div class="backTo" style="margin-left:auto;height:35px; display:flex; align-item:center;padding-right:16px;padding-top:5px">
        <el-button type="info" plain style="padding: 7px 14px; border:none;background-color:#ECF0F6;color:#8D969F" @click="specialMethod()">返回</el-button>
      </div>
    </div>
    <div style="padding: 0 5px">
      <p class="underLine" />
    </div>

    <div style="padding: 0 15px;display:flex;flex:1;flex-direction:column">
      <el-tabs type="border-card">
        <el-tab-pane label="加工厂信息">
          <!-- 检索区 -->
          <el-row :gutter="10" style="margin-left:0;margin-right:0" class="specialSelect">
            <el-form :inline="true" :rules="rules" :model="queryInfo" label-position="right" class="demo-form-inline" label-width="110px" @submit.native.prevent>
              <el-row>
                <el-col :span="12" class="halfWidth">
                  <el-form-item label="加工厂名称:" prop="supplierName">
                    <el-input v-model="queryInfo.supplierName" placeholder="" maxlength="100" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="简称:">
                    <el-input v-model="queryInfo.supplierJName" placeholder="" maxlength="100" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="代码:" prop="supplierNo">
                    <el-input v-model="queryInfo.supplierNo" placeholder="" maxlength="100" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="工厂负责人:" prop="supplierPerson">
                    <el-input v-model="queryInfo.supplierPerson" placeholder="" maxlength="100" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电话:" prop="telephone">
                    <el-input v-model="queryInfo.telephone" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" maxlength="100" />

                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="业务联系人:" prop="yeWuPerson">
                    <el-input v-model="queryInfo.yeWuPerson" placeholder="" maxlength="100" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="联系人电话:" prop="yeWuTel">
                    <el-input v-model="queryInfo.yeWuTel" placeholder="" onkeyup="value=value.replace(/[^(0-9-()（）+ ]/g,'')" maxlength="100" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="halfWidth">
                  <el-form-item label="地址:" prop="address">
                    <el-input v-model="queryInfo.address" placeholder="" type="textarea" maxlength="100" show-word-limit />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="开户行:" prop="kaiHuBank">
                    <el-input v-model="queryInfo.kaiHuBank" placeholder="" maxlength="100" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="银行账号:" prop="bankAccount">
                    <el-input v-model="queryInfo.bankAccount" placeholder="" maxlength="100" />

                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="税号:" prop="taxAccount">
                    <el-input v-model="queryInfo.taxAccount" placeholder="" maxlength="100" />

                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否停用:" prop="state">
                    <el-select v-model="queryInfo.state" placeholder="请选择">
                      <el-option
                        v-for="item in booleanList"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                        @click.native="bindStatus(item.value)"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>

                <el-col :span="12" class="halfWidth">
                  <el-form-item label="汇入地点:" prop="huiRuPlace">
                    <el-input v-model="queryInfo.huiRuPlace" placeholder="" type="textarea" maxlength="100" show-word-limit />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24" class="fullWidth">
                  <el-form-item label="备注:">
                    <el-input v-model="queryInfo.remark" placeholder="" type="textarea" maxlength="250" show-word-limit />
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
            actpoint="edit"
            limit="1"
            title="相关附件"
            @successFile="successFile"
          />
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
import { addData, loadData, searchData, deleteRecord } from '@/api/jiagongchangdangan'
import { combineObject } from '@/utils/combineObject'
import addPhotoForm from '@/views/danganguanli/jiagongchangdangan/addPhotoForm'
import { baseUrl } from '@/api/apiUrl'
import { booleanList } from '@/utils/listVar'
import tailfile from '@/layout/mixin/uploadAttachment'
import { getGuid } from '@/utils/getGuid'

import cardTitile from '@/layout/mixin/cardTitile'

export default {
  name: 'Jiagongchangdanganxinzeng',

  components: {
    cardTitile,
    addPhotoForm,
    tailfile
  },

  data() {
    return {
      initAllData: '',
      queryInfo: {
        supplierName: '',
        supplierJName: '',
        supplierNo: '',
        supplierPerson: '',
        telephone: '',
        yeWuPerson: '',
        yeWuTel: '',
        address: '',
        kaiHuBank: '',
        bankAccount: '',
        taxAccount: '',
        state: '否',
        huiRuPlace: '',
        remark: ''
      },
      queryInfoOrigin: '',
      passFlag: false,
      rules: {
        supplierName: [
          { required: true, message: '请填写加工厂名称', trigger: 'blur' }
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
      titileName: '加工厂档案（新增）',
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
      booleanList: booleanList,
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

  methods: {
    // 数据初始化
    statusCheck(val) {
      return val === 0 ? '否' : '是'
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
      if (this.queryInfo.supplierName === '' || this.queryInfo.supplierNo === '' || this.queryInfo.supplierPerson === '' || this.queryInfo.telephone === '' || this.queryInfo.yeWuPerson === '' || this.queryInfo.yeWuTel === '' || this.queryInfo.address === '' || this.queryInfo.kaiHuBank === '' || this.queryInfo.bankAccount === '' || this.queryInfo.taxAccount === '' || this.queryInfo.huiRuPlace === '' || this.queryInfo.state === '') {
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
            this.$router.push({ path: '/加工厂档案/加工厂档案修改', query: { supplierName: id }})
          }
        })
      }
    },
    addMore() {
      if (this.queryInfo.supplierName === '' || this.queryInfo.supplierNo === '' || this.queryInfo.supplierPerson === '' || this.queryInfo.telephone === '' || this.queryInfo.yeWuPerson === '' || this.queryInfo.yeWuTel === '' || this.queryInfo.address === '' || this.queryInfo.kaiHuBank === '' || this.queryInfo.bankAccount === '' || this.queryInfo.taxAccount === '' || this.queryInfo.huiRuPlace === '' || this.queryInfo.state === '') {
        this.$message.error('请添加必填项')
      } else {
        this.preSave()
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.msg)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$store.dispatch('toolbar/delView', this.$route)
            this.$router.push({ path: '/加工厂档案/加工厂档案新增', query: { guid: getGuid() }})
          }
        })
      }
    },
    OriginData() {
      this.queryInfoOrigin = {
        supplierName: '',
        supplierJName: '',
        supplierNo: '',
        supplierPerson: '',
        telephone: '',
        yeWuPerson: '',
        yeWuTel: '',
        address: '',
        kaiHuBank: '',
        bankAccount: '',
        taxAccount: '',
        state: '否',
        huiRuPlace: '',
        remark: ''
      }
    },
    closeDialog() {
      this.dialogAddTableVisible = false
      // this.initData(this.pageSetting)
    },
    successFile(data) {
      this.listSE = data
    },
    bindStatus(value) {
      this.queryInfo.state = value
    },
    specialMethod() {
      this.OriginData()
      if (this.listSE.length === 0 && JSON.stringify(this.queryInfo) == JSON.stringify(this.queryInfoOrigin)) {
        this.passFlag = true
      }
      if (!this.passFlag) {
      //   alert('true')
        var _self = this
        this.$utils.isout(function() {
          _self.$router.push('/加工厂档案')
        })
      } else {
        this.$store.dispatch('toolbar/delView', this.route)
        this.$router.push('/加工厂档案')// 返回上一层
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
