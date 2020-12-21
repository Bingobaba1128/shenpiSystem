<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <div class="content">
      <el-form :rules="rules" :model="queryInfo" label-width="321px" @submit.native.prevent>
        <el-form-item label="系统名称" prop="systemName">
          <el-select v-model="queryInfo.systemName" placeholder="请选择" clearable filterable @clear="clearData1">
            <el-option
              v-for="item in fenLeiList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
                    @click.native="bindSyetemId(item)"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none">
        <el-form-item label="单据名称" prop="approveStyleName">
          <el-select v-model="queryInfo.approveStyleName" placeholder="请选择" clearable @clear="clearData2" filterable>
            <el-option
              v-for="item in nameList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
              @click.native="bindModuleId(item.id)"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none">
        <el-form-item label="类型" prop="flagName">
          <el-select v-model="queryInfo.flagName" placeholder="全部" clearable filterable  >
            <el-option
              v-for="item in stateList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
              @click.native="bindFlag(item.value)"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none">
        <el-form-item label="部门" prop="deptName">
          <el-select v-model="queryInfo.deptName" placeholder="全部" clearable @clear="clearData3">
            <el-option
              v-for="item in deptList"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptName"
              @click.native="bindDeptId(item.deptId)"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none">
        <el-form-item label="审批人" prop="employeeName">
          <el-select v-model="queryInfo.employeeName" placeholder="全部" clearable>
            <el-option
              v-for="item in personList"
              :key="item.employeeId"
              :label="item.employeeName"
              :value="item.employeeName"
              @click.native="bindYeWuId(item.employeeId)"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :rules="rules" :model="queryInfo" label-width="321px" style="border-top:none">
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="queryInfo.remark" placeholder="请输入" maxlength="100" clearable />
        </el-form-item>
      </el-form>

    </div>
    <div class="footer">
      <el-button class="jiChuConfirmBtn" @click="saveToServe"> 确认保存</el-button>
      <el-button class="jiChuContinueBtn" style="margin-left:68px" @click="addMore">继续新增</el-button>
    </div>

  </div>
</template>
<script>
import { addDataConfig, loadData, loadDept, loadPerson } from '@/api/shenPiPeiZhi'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },

  data() {
    return {
      queryInfo: {
        deptName: '',
        deptId: '',
        employeeId: '',
        approveStyleName: '',
        employeeName: '',
        remark: '',
        flag: '',
        systemId: '',
        classifyId: '',
        systemName: '',
        recordMan: '邓科',
        flagName: ''
      },
            stateList: [
        { name: '审批', value: 0 },
        { name: '撤单', value: 1 },
        { name: '抄送', value: 2 }
      ],
      nameList: [],
      deptList: [],
      personList: [],
      titileName: '审批流程配置（新增）',
      fenLeiList: [],
      LeiXingList: [],
      rules: {
        classify: [
          { required: true, message: '请填写费用分类', trigger: 'blur' }
        ],
        style: [
          { required: true, message: '请填写物料类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initBaseData()
  },
  methods: {
    initBaseData() {
      var urlParam = '/api/ApproveSystem?flag=1'
      loadData(urlParam).then(res => {
        this.fenLeiList = res.data.data
      })
      var param1 = '/ERP/selectAllDepartment'
      loadDept(param1).then(res => {
        this.deptList = res.data.data
      })
    },
    bindDeptId(id) {
      this.queryInfo.deptId = id
      var url = '/ERP/selectEmplyee?symbol=2&duty=' + id
      loadPerson(url).then(res => {
        this.personList = res.data.data
      })
    },
    bindYeWuId(id) {
      this.queryInfo.employeeId = id
    },
    searchLeiXing(val) {
      this.queryInfo.style = ''
      var urlParam = '/api/FeeStyle?size=-1&classify=' + val
      loadData(urlParam).then(res => {
        this.LeiXingList = res.data.data
      })
      
    },
        bindFlag(flag) {
      this.$set(this.queryInfo, 'flag', flag)
    },
        bindModuleId(id) {
      this.$set(this.queryInfo, 'classifyId', id)
    },
    saveToServe() {
      if (this.queryInfo.classify === '' || this.queryInfo.style === '') {
        this.$message.error('请填写必填项')
      } else {
        addDataConfig(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$emit('closeDialog')
          }
        })
      }
    },
        bindSyetemId(data) {
      this.$set(this.queryInfo, 'systemId', data.id)
      this.$set(this.queryInfo, 'classifyId', '')
      this.$set(this.queryInfo, 'approveStyleName', '')
      var url1 = '/api/ApproveSystem?flag=2&parentId=' + data.id
      loadData(url1).then(res => {
        this.nameList = res.data.data
      })
    },
        clearData1() {
      this.$set(this.queryInfo, 'systemId', '')
      this.$set(this.queryInfo, 'approveStyleName', '')
      this.$set(this.queryInfo, 'classifyId', '')
      this.nameList = []
    },
            clearData2() {

      this.$set(this.queryInfo, 'classifyId', '')
    },
                clearData3() {

      this.$set(this.queryInfo, 'employeeName', '')
      this.personList = []
    },
    addMore() {
      window.console.log(this.queryInfo)
      if (this.queryInfo.classify === '' || this.queryInfo.style === '') {
        this.$message.error('请填写必填项')
      } else {
        addDataConfig(this.queryInfo).then(res => {
          if (res.data.code !== 1) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.queryInfo = {
              style: '',
              classify: '',
              name: '',
              price: '',
              styleId: '',
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

</style>
