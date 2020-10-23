<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <div class="outline">
      <div class="content">
        <el-form :rules="rules" :model="queryInfo" label-width="321px">
          <el-form-item label="物料分类" prop="classify">
            <el-select v-model="queryInfo.classify" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in fenLeiList"
                :key="item.classify"
                :label="item.classify"
                :value="item.classify"
                @click.native="searchLeiXing(item.classify)"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none">
          <el-form-item label="物料类型" prop="style">
            <el-select v-model="queryInfo.style" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in LeiXingList"
                :key="item.style"
                :label="item.style"
                :value="item.style"
                @click.native="bindId(item.id)"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
          <el-form-item label="物料名称" prop="name">
            <el-input v-model.trim="queryInfo.name" placeholder="请输入" maxlength="100" clearable />
          </el-form-item>
        </el-form>
        <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
          <el-form-item label="物料编号" prop="no">
            <el-input v-model.trim="queryInfo.no" placeholder="请输入" maxlength="100" clearable />
          </el-form-item>
        </el-form>
        <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
          <el-form-item label="幅宽/规格" prop="sec">
            <el-input v-model.trim="queryInfo.sec" placeholder="请输入" maxlength="100" clearable />
          </el-form-item>
        </el-form>
        <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
          <el-form-item label="采购总价(元/含税)" prop="purchasePrice">
            <el-input v-model.trim="queryInfo.purchasePrice" placeholder="请输入" maxlength="100" type="number" on-keypress="return(/[\d || .]/.test(String.fromCharCode(event.keyCode)))" clearable @mousewheel.native.prevent />
          </el-form-item>
        </el-form>
        <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none">
          <el-form-item label="采购总数" prop="purchaseQuantity">
            <el-input v-model.trim="queryInfo.purchaseQuantity" placeholder="请输入" maxlength="100" type="number" on-keypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" clearable @mousewheel.native.prevent />
          </el-form-item>
        </el-form>
        <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
          <el-form-item label="采购单位" prop="purchaseUnit">
            <el-select v-model="queryInfo.purchaseUnit" placeholder="请选择">
              <el-option
                v-for="item in unitList"
                :key="item.unit"
                :label="item.unit"
                :value="item.unit"
                @click.native="changeId1(item.id)"
              />
            </el-select>        </el-form-item>
        </el-form>
        <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
          <el-form-item label="换算数" prop="changeQuantity">
            <el-input v-model.trim="queryInfo.changeQuantity" placeholder="请输入" maxlength="100" type="number" on-keypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" clearable @mousewheel.native.prevent />
          </el-form-item>
        </el-form>
        <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
          <el-form-item label="单价(元/含税)" prop="price">
            <el-input v-model.trim="queryInfo.price" placeholder="" maxlength="100" disabled />
          </el-form-item>
        </el-form>
        <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none" @submit.native.prevent>
          <el-form-item label="单位" prop="unit">
            <el-select v-model="queryInfo.unit" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in unitList"
                :key="item.unit"
                :label="item.unit"
                :value="item.unit"
                @click.native="changeId(item.id)"
              />
            </el-select>        </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="footer">
      <el-button class="jiChuConfirmBtn" @click="saveToServe"> 确认保存</el-button>
      <el-button class="jiChuContinueBtn" style="margin-left:68px" @click="addMore">继续新增</el-button>
    </div>

  </div>
</template>
<script>
import { addData, loadData } from '@/api/wuliaoguanli'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },

  data() {
    return {
      queryInfo: {
        style: '',
        classify: '',
        no: '',
        name: '',
        sec: '',
        purchasePrice: 0,
        purchaseQuantity: 0,
        purchaseUnit: '',
        purchaseUnitId: '',
        changeQuantity: 1,
        price: '',
        unit: '',
        unitId: '',
        styleId: '',
        state: '否',
        operator: '邓科'
      },
      titileName: '物料管理（新增）',
      fenLeiList: [],
      LeiXingList: [],
      unitList: [],
      rules: {
        classify: [
          { required: true, message: '请填写物料分类', trigger: 'blur' }
        ],
        style: [
          { required: true, message: '请填写物料类型', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    queryInfo: {
      handler: function(val, oldval) {
        var purchaseQuantity = parseInt(this.queryInfo.purchaseQuantity)
        var changeQuantity = parseFloat(this.queryInfo.changeQuantity)
        var purchasePrice = parseFloat(this.queryInfo.purchasePrice)
        window.console.log(this.queryInfo.purchaseQuantity)
        if (this.queryInfo.purchaseQuantity !== '' && this.queryInfo.changeQuantity !== '' && this.queryInfo.purchasePrice !== '') {
          if (purchaseQuantity > 0 && changeQuantity > 0 && purchasePrice > 0) {
            this.queryInfo.price = ((parseFloat(val.purchasePrice) / purchaseQuantity) / changeQuantity).toFixed(2)
          } else {
            this.$set(this.queryInfo, 'price', '')
          }
        } else {
          this.$set(this.queryInfo, 'price', '')
        }
      },
      deep: true,

      immediate: true
    }
  },
  created() {
    this.initBaseData()
  },
  methods: {
    initBaseData() {
      var urlParam = '/api/MaterialClassifaction?size=-1'
      loadData(urlParam).then(res => {
        this.fenLeiList = res.data.data
      })
      var urlParam1 = '/api/Unit?size=-1'
      loadData(urlParam1).then(res => {
        this.unitList = res.data.data
      })
    },
    searchLeiXing(val) {
      this.queryInfo.style = ''
      var urlParam = '/api/MaterialStyle?size=-1&classify=' + val
      loadData(urlParam).then(res => {
        this.LeiXingList = res.data.data
      })
    },
    saveToServe() {
      if (this.queryInfo.classify === '' || this.queryInfo.style === '') {
        this.$message.error('请选择必填项')
      } else {
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$emit('closeDialog')
          }
        })
      }
    },
    changeId(id) {
      this.$set(this.queryInfo, 'unitId', id)
    },
    changeId1(id) {
      this.$set(this.queryInfo, 'purchaseUnitId', id)
    },
    addMore() {
      window.console.log(this.queryInfo)
      if (this.queryInfo.classify === '' || this.queryInfo.style === '') {
        this.$message.error('请选择必填项')
      } else {
        addData(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.queryInfo = {
              style: '',
              classify: '',
              no: '',
              name: '',
              sec: '',
              purchasePrice: '',
              purchaseQuantity: '',
              purchaseUnit: '',
              changeQuantity: '',
              price: '',
              unit: '',
              styleId: '',
              state: '否',
              operator: '邓科'
            }
          }
        })
      }
    },
    backToMain() {
      this.$emit('closeDialog2')
    },
    bindId(id) {
      this.queryInfo.styleId = id
    }
  }
}
</script>

<style scoped>
.outline{
   height: 230px;
}
.content{
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.dialogClass .content .el-form .el-form-item{
  height: auto !important;
}
.dialogClass {
  display: flex;
  flex-direction: column;
}
.dialogClass .footer{
  margin-top: auto;
  position: initial !important;
}

</style>
