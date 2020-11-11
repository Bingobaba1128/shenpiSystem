<template>
  <div class="dialogClass">
    <cardTitile :param="titileName" :bclose="true" />
    <el-row style="padding-right: 16px;">
      <span style="float:right;display:flex">
        <i style="display:flex;align-items:center">
          <img :src="icon0" style="width:15px">
          <span style="padding-left: 5px; font-style:initial">通过</span>
        </i>
        <i style="display:flex;align-items:center;padding-left:16px">
          <img :src="icon1" style="width:15px">

          <span style="padding-left: 5px; font-style:initial">驳回</span>
        </i>
        <i style="display:flex;align-items:center;padding-left:16px">
          <img :src="icon3" style="width:15px">

          <span style="padding-left: 5px; font-style:initial">作废</span>
        </i>
        <i style="display:flex;align-items:center;padding-left:16px">
          <img :src="icon2" style="width:15px">

          <span style="padding-left:5px; font-style:initial">待审批</span>
        </i>
      </span>
    </el-row>
    <el-row class="stepClass">
      <!-- 未开始 未提交 -->
      <el-steps v-if="approveState==='-4'" :space="250" :active="2" align-center>
        <el-step>
          <template slot="title">
            待提交
          </template>
          <template slot="icon">
            <i slot="reference"><img :src="icon2" style="width:20px"></i>
          </template>
        </el-step>
        <el-step>
          <template slot="title">
            未开始
          </template>
          <template slot="icon">
            <i slot="reference"><img :src="icon2" style="width:20px"></i>
          </template>
        </el-step>

      </el-steps>

      <!-- 多条渲染 -->
      <el-steps v-if="approveState !=='-4'" :space="250" :active="listS.length" align-center>
        <template v-for="(item,index) in listS">
          <el-step :key="index">
            <template slot="icon">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                　<span>{{ item.personTitle }}: {{ item.approvePerson }}</span><br>
                　<span>{{ item.dateTitle }}: {{ item.approveTime }}</span><br>
                　<span>{{ item.remarkTitle }}: {{ item.remark }}</span>

                <i slot="reference">
                  <img :src="item.icon" style="width:20px">

                </i>
              </el-popover>
            </template>

            <template slot="title">
              {{ item.title }}
            </template>
          </el-step>
        </template>
      </el-steps>
    </el-row>
    <div class="paddindSpace" style="padding-top:20px; padding-bottom: 0px">
      <el-button round type="info" @click="backToMain">关闭</el-button>
    </div>

  </div>
</template>
<script>
import { loadData } from '@/api/caigouhetong'
import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    cardTitile
  },
  props: ['param'],
  data() {
    return {
      icon0: require('@/assets/icon0.png'),
      icon1: require('@/assets/icon1.png'),
      icon2: require('@/assets/icon2.png'),
      icon3: require('@/assets/zuofei.png'),
      titileName: '审批详情',
      initAllData: '',
      approveState: '',
      title1: '',
      title2: '',
      dyIcon1: '',
      dyIcon2: '',
      checkPerson: '',
      checkDate: '',
      remarks: '',
      reason: '',
      listSOrigin: [],
      listS: []

    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      var param1 = '/api/Approve/getApproveState?pkNo=' + this.param
      loadData(param1).then(res => {
        this.approveState = res.data.data.approveState
        this.listSOrigin = res.data.data.listS
        if (this.listSOrigin.length !== 0) {
          if (this.approveState === '0' && this.listSOrigin.length === 1) {
            var newJson = {
              approvePerson: this.listSOrigin[0].approvePerson,
              approvePersonId: this.listSOrigin[0].approvePersonId,
              approveState: '0'

            }
            this.listSOrigin.push(newJson)
          }
          this.listSOrigin.map((item, index) => {
            switch (item.approveState) {
              case '-2':
                this.$set(this.listSOrigin[index], 'icon', this.icon0)
                this.$set(this.listSOrigin[index], 'title', '已提交')
                this.$set(this.listSOrigin[index], 'personTitle', '提交人')
                this.$set(this.listSOrigin[index], 'dateTitle', '提交时间')
                this.$set(this.listSOrigin[index], 'remarkTitle', '备注')
                break
              case '1':
                this.$set(this.listSOrigin[index], 'icon', this.icon0)
                this.$set(this.listSOrigin[index], 'title', '审批通过')
                this.$set(this.listSOrigin[index], 'personTitle', '审批人')
                this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')
                this.$set(this.listSOrigin[index], 'remarkTitle', '备注')
                break
              case '2':
                this.$set(this.listSOrigin[index], 'icon', this.icon1)
                this.$set(this.listSOrigin[index], 'title', '驳回')
                this.$set(this.listSOrigin[index], 'personTitle', '审批人')
                this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')
                this.$set(this.listSOrigin[index], 'remarkTitle', '驳回原因')
                break
              case '0':
                this.$set(this.listSOrigin[index], 'icon', this.icon2)
                this.$set(this.listSOrigin[index], 'title', '待审批')
                this.$set(this.listSOrigin[index], 'personTitle', '审批人')
                this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')
                this.$set(this.listSOrigin[index], 'remarkTitle', '备注')
                break
              case '4':
                this.$set(this.listSOrigin[index], 'icon', this.icon2)
                this.$set(this.listSOrigin[index], 'title', '已取消')
                this.$set(this.listSOrigin[index], 'personTitle', '审批人')
                this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')
                this.$set(this.listSOrigin[index], 'remarkTitle', '备注')
                break
              case '3':
                this.$set(this.listSOrigin[index], 'icon', this.icon0)
                this.$set(this.listSOrigin[index], 'title', '待撤单')
                this.$set(this.listSOrigin[index], 'personTitle', '审批人')
                this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')
                this.$set(this.listSOrigin[index], 'remarkTitle', '备注')
                break
              case '5':
                this.$set(this.listSOrigin[index], 'icon', this.icon0)
                this.$set(this.listSOrigin[index], 'title', '撤单通过')
                this.$set(this.listSOrigin[index], 'personTitle', '审批人')
                this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')
                this.$set(this.listSOrigin[index], 'remarkTitle', '备注')
                break
              case '6':
                this.$set(this.listSOrigin[index], 'icon', this.icon2)
                this.$set(this.listSOrigin[index], 'title', '撤单驳回')
                this.$set(this.listSOrigin[index], 'personTitle', '审批人')
                this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')
                this.$set(this.listSOrigin[index], 'remarkTitle', '驳回原因')
                break
            }
          })

          this.listS = JSON.parse(JSON.stringify(this.listSOrigin))
          window.console.log(this.listS)
        }
      })
    },
    backToMain() {
      this.$emit('closeDialog2')
    }
  }
}
</script>

<style scoped>
.dialogClass {
  display: flex;
  flex-direction: column;
}
.paddindSpace{
  padding-top: 20px;
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-bottom: 16px !important;
    border-top: 1px solid #f3f3f3 !important;

}
.stepClass {
      min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.stepClass .el-steps{
    display: flex;
    flex: 1;
}
.el-step.is-horizontal {
    flex: 1;
}
.paddindSpace .el-form  .el-form-item{
  margin-top: 20px;
  padding-bottom: 20px ;
}
</style>
