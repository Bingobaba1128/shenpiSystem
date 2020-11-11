<template>
  <el-card class="formStyle">
    <div style="display:flex;align-items: center;height:50px">
      <p class="header_title">审批详情</p>
      <div class="backTo" style="margin-left:auto;height:35px; display:flex; align-item:center;padding-right:16px;padding-top:5px">
        <el-button type="info" plain style="padding: 7px 14px; border:none;background-color:#ECF0F6;color:#8D969F" @click="specialMethod()">返回</el-button>
      </div>
    </div>
    <div style="padding: 0 5px">
      <p class="underLine" />
    </div>
    <div style="flex:1;display:flex;flex-direction:column">
      <el-card style="margin:16px 16px 0 16px !important" class="specialCard">
        <el-row style="padding-right: 16px;padding-top:5px;padding-bottom:5px">
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

      </el-card>
      <iframe
        ref="framePage"
        :src="reportUrl"
        class="pc iframe"
        scrolling="auto"
        @load="deliverToken"
      />
      <el-card v-if="flag === 1 && showable " style="margin:16px;margin-top:0 !important;height:70px" class="footer">
        <div style="padding: 16px; display:flex; justify-content:left">
          <el-button class="specialConfirmBtn" style="width:auto" @click="passThrough"> 通过</el-button>
          <el-button class="specialContinueBtn" style="background-color:#FAAB15;color:white;margin-left:40px;border:none;width:auto" @click="passBack">驳回</el-button>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" style="flex:1;display:flex;align-items:center">

            <el-col :span="20" class="reasonClass">
              <el-form-item label="备注 :">
                <el-input v-model.trim="reason" placeholder="" clearable maxlength="100" show-word-limit show-overflow-tooltip />
              </el-form-item>
            </el-col>
          </el-form>

        </div>
      </el-card>
      <!-- {{flag}} {{showable}} -->
      <el-card v-if="flag === 2 && showable " style="margin:16px;margin-top:0 !important;height:70px" class="footer">
        <div style="padding: 16px; display:flex; justify-content:left">
          <el-button class="specialConfirmBtn" style="width:auto" @click="recallPass"> 撤单通过</el-button>
          <el-button class="specialContinueBtn" style="background-color:#FAAB15;color:white;margin-left:40px;border:none;width:auto" @click="recallPassBack">撤单驳回</el-button>

          <el-button class="specialContinueBtn" style="background-color:#FF0000;color:white;margin-left:40px;border:none;width:112px" @click="wasteApply">作废</el-button>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" style="flex:1;display:flex;align-items:center">

            <el-col class="reasonClass">
              <el-form-item label="备注 :">
                <el-input v-model.trim="reason" placeholder="" clearable maxlength="100" show-word-limit show-overflow-tooltip />
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>

    </div>
  </el-card>
</template>

<script>
import { loadData, passData, passBackData } from '@/api/baoJiaDan'

export default {
  data() {
    return {
      // http://localhost:8089/#/%E6%8A%A5%E4%BB%B7%E5%8D%95/%E6%8A%A5%E4%BB%B7%E5%8D%95%E5%AE%A1%E6%89%B9?pkNo=BJD202010-042
      reportUrl: this.$route.query.url,
      // reportUrl: 'http://localhost:8089/#/%E6%8A%A5%E4%BB%B7%E5%8D%95/%E6%8A%A5%E4%BB%B7%E5%8D%95%E5%AE%A1%E6%89%B9?pkNo=BJD202010-042',
      searchTableHeight: 0,
      searchTableWidth: 0,
      token: '',
      isChildReady: false,
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
      listNOrigin: [],
      listS: [],
      flag: 0,
      showable: false,
      data: sessionStorage.getItem('employeeId')
    }
  },
  watch: {
    isChildReady(isReady) {
      if (!isReady) { return }
      this.deliverToken()
    }
  },
  created() {
    this.initData()
    window.console.log(this.$route.query.pk)
    sessionStorage.removeItem('tabParam')
    sessionStorage.removeItem('currentTag')
  },

  mounted() {
    window.onresize = () => {
      this.widthHeight() // 自适应高宽度
    }
    this.$nextTick(function() {
      this.widthHeight()
    })
    window.console.log(this.data)
  },
  beforeMount() {
    addEventListener('message', function(evt) {
      if (evt.data.type !== 'childStatus') { return }
      this.isChildReady = evt.data.data
    })
  },

  methods: {
    specialMethod() {
      // window.console.log(this.$route,'route')
      // window.console.log(this.$options.name,'nameeeeee')

      sessionStorage.setItem('currentTag', JSON.stringify(this.$route.query.currentTab))
      sessionStorage.setItem('tabParam', JSON.stringify(this.$route.query.queryInfo))
      this.$store.dispatch('toolbar/delView', this.$route)
      this.$router.push('/审批管理/审批管理')// 返回上一层
    },
    widthHeight() {
      this.searchTableHeight = window.innerHeight - 146
      this.searchTableWidth = window.innerWidth - 280
    },
    deliverToken() {
      this.$refs.framePage.contentWindow.postMessage({ type: 'token', data: this.$token.loadToken() }, '*')
    },
    passThrough() {
      var passJson = {
        pkNo: this.$route.query.pkNo,
        employeeId: this.$route.query.employeeId,
        employeeName: this.$route.query.employeeName,
        state: '1',
        reason: this.reason
      }
      passData(passJson).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('审批通过')
          this.flag = 0

          this.initData()
        }
      })
    },
    addListN() {
      if (this.listNOrigin.length !== 0) {
        window.console.log(this.listNOrigin, 'origin')
        this.listNOrigin.map((item, index) => {
          switch (item.approveState) {
            case '-2':
              if (index === 0) {
                this.$set(this.listNOrigin[index], 'icon', this.icon0)
                this.$set(this.listNOrigin[index], 'title', '已提交')
                this.$set(this.listNOrigin[index], 'personTitle', '提交人')
                this.$set(this.listNOrigin[index], 'dateTitle', '提交时间')
                this.$set(this.listNOrigin[index], 'remarkTitle', '备注')
                break
              } else {
                this.$set(this.listNOrigin[index], 'icon', this.icon0)
                this.$set(this.listNOrigin[index], 'title', '待撤单')
                this.$set(this.listNOrigin[index], 'personTitle', '审批人')
                this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')
                this.$set(this.listNOrigin[index], 'remarkTitle', '备注')
                break
              }

            case '1':
              this.$set(this.listNOrigin[index], 'icon', this.icon0)
              this.$set(this.listNOrigin[index], 'title', '审批通过')
              this.$set(this.listNOrigin[index], 'personTitle', '审批人')
              this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')
              this.$set(this.listNOrigin[index], 'remarkTitle', '备注')
              break
            case '2':
              this.$set(this.listNOrigin[index], 'icon', this.icon1)
              this.$set(this.listNOrigin[index], 'title', '驳回')
              this.$set(this.listNOrigin[index], 'personTitle', '审批人')
              this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')
              this.$set(this.listNOrigin[index], 'remarkTitle', '驳回原因')
              break
            case '0':
              this.$set(this.listNOrigin[index], 'icon', this.icon2)
              this.$set(this.listNOrigin[index], 'title', '待审批')
              this.$set(this.listNOrigin[index], 'personTitle', '审批人')
              this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')
              this.$set(this.listNOrigin[index], 'remarkTitle', '备注')
              break
            case '-1':
              this.$set(this.listNOrigin[index], 'icon', this.icon2)
              this.$set(this.listNOrigin[index], 'title', '待审批')
              this.$set(this.listNOrigin[index], 'personTitle', '审批人')
              this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')
              this.$set(this.listNOrigin[index], 'remarkTitle', '备注')
              break
            case '4':
              this.$set(this.listNOrigin[index], 'icon', this.icon2)
              this.$set(this.listNOrigin[index], 'title', '已取消')
              this.$set(this.listNOrigin[index], 'personTitle', '审批人')
              this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')
              this.$set(this.listNOrigin[index], 'remarkTitle', '备注')
              break
            case '3':
              this.$set(this.listNOrigin[index], 'icon', this.icon0)
              this.$set(this.listNOrigin[index], 'title', '待撤单')
              this.$set(this.listNOrigin[index], 'personTitle', '审批人')
              this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')
              this.$set(this.listNOrigin[index], 'remarkTitle', '备注')
              break
            case '5':
              this.$set(this.listNOrigin[index], 'icon', this.icon0)
              this.$set(this.listNOrigin[index], 'title', '撤单通过')
              this.$set(this.listNOrigin[index], 'personTitle', '审批人')
              this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')
              this.$set(this.listNOrigin[index], 'remarkTitle', '备注')
              break
            case '6':
              this.$set(this.listNOrigin[index], 'icon', this.icon1)
              this.$set(this.listNOrigin[index], 'title', '撤单驳回')
              this.$set(this.listNOrigin[index], 'personTitle', '审批人')
              this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')
              this.$set(this.listNOrigin[index], 'remarkTitle', '驳回原因')
              break
            case '7':
              this.$set(this.listNOrigin[index], 'icon', this.icon3)
              this.$set(this.listNOrigin[index], 'title', '作废')
              this.$set(this.listNOrigin[index], 'personTitle', '审批人')
              this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')
              this.$set(this.listNOrigin[index], 'remarkTitle', '作废原因')
              break
          }
        })
      }
    },
    passBack() {
      var passJson = {
        pkNo: this.$route.query.pkNo,
        employeeId: this.$route.query.employeeId,
        employeeName: this.$route.query.employeeName,
        state: '2',
        reason: this.reason
      }
      passBackData(passJson).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('审批驳回')
          this.flag = 0
          this.initData()
        }
      })
    },
    recallPass() {
      var passJson = {
        pkNo: this.$route.query.pkNo,
        employeeId: this.$route.query.employeeId,
        employeeName: this.$route.query.employeeName,
        state: '5',
        reason: this.reason

      }
      passData(passJson).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('撤单审批通过')
          this.flag = 0

          this.initData()
        }
      })
    },
    recallPassBack() {
      var passJson = {
        pkNo: this.$route.query.pkNo,
        employeeId: this.$route.query.employeeId,
        employeeName: this.$route.query.employeeName,
        state: '6',
        reason: this.reason
      }
      passBackData(passJson).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('撤单审批驳回')
          this.flag = 0
          this.initData()
        }
      })
    },
    wasteApply() {
      var passJson = {
        pkNo: this.$route.query.pkNo,
        employeeId: this.$route.query.employeeId,
        employeeName: this.$route.query.employeeName,
        state: '7',
        reason: this.reason
      }
      passBackData(passJson).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('作废成功')
          this.flag = 0
          this.initData()
        }
      })
    },

    initData() {
      if (this.$route.query.flagSpecial === 1) {
        var param1 = '/api/Approve/getApproveState?approveNo=' + this.$route.query.approveNo
      } else {
        param1 = '/api/Approve/getApproveState?pkNo=' + this.$route.query.pkNo
      }
      this.showable = this.$route.query.show
      window.console.log(this.showable, 'showornot')
      loadData(param1).then(res => {
        this.approveState = res.data.data.approveState
        this.listSOrigin = res.data.data.listS
        this.listNOrigin = res.data.data.listN

        window.console.log(this.listSOrigin)
        window.console.log(this.listSOrigin, 'find meeeeeeeeeeeeeeeeeeeee')
        if (this.listSOrigin.length != 0) {
          // if (this.approveState === '0' && this.listSOrigin.length === 1) {
          //   var newJson = {
          //     approvePerson: this.listSOrigin[0].approvePerson,
          //     approvePersonId: this.listSOrigin[0].approvePersonId,
          //     approveState: '0'
          //   }
          //   this.listSOrigin.push(newJson)
          // }
          window.console.log(this.listSOrigin, 'origin')
          this.listSOrigin.map((item, index) => {
            switch (item.approveState) {
              case '-2':
                if (index == 0) {
                  this.$set(this.listSOrigin[index], 'icon', this.icon0)
                  this.$set(this.listSOrigin[index], 'title', '已提交')
                  this.$set(this.listSOrigin[index], 'personTitle', '提交人')
                  this.$set(this.listSOrigin[index], 'dateTitle', '提交时间')
                  this.$set(this.listSOrigin[index], 'remarkTitle', '备注')
                  break
                } else {
                  this.$set(this.listSOrigin[index], 'icon', this.icon0)
                  this.$set(this.listSOrigin[index], 'title', '待撤单')
                  this.$set(this.listSOrigin[index], 'personTitle', '审批人')
                  this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')
                  this.$set(this.listSOrigin[index], 'remarkTitle', '备注')
                  break
                }

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
                this.$set(this.listSOrigin[index], 'icon', this.icon1)
                this.$set(this.listSOrigin[index], 'title', '撤单驳回')
                this.$set(this.listSOrigin[index], 'personTitle', '审批人')
                this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')
                this.$set(this.listSOrigin[index], 'remarkTitle', '驳回原因')
                break
              case '7':
                this.$set(this.listSOrigin[index], 'icon', this.icon3)
                this.$set(this.listSOrigin[index], 'title', '作废')
                this.$set(this.listSOrigin[index], 'personTitle', '审批人')
                this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')
                this.$set(this.listSOrigin[index], 'remarkTitle', '作废原因')
                break
            }
          })

          this.listS = JSON.parse(JSON.stringify(this.listSOrigin))
          var len = this.listS.length
          window.console.log(len, 'length')
          // var testPoint = this.approveState
          if (this.listNOrigin.length != 0) {
            // if (this.listNOrigin[0].approvePersonId === sessionStorage.getItem('employeeId')) {
            if (this.listNOrigin[0].approvePersonId == sessionStorage.getItem('employeeId')) {
              window.console.log(this.listNOrigin[0].approvePersonId, 'id')
              window.console.log(this.approveState, 'appstate')
              if (this.approveState == 3) {
                if (this.$route.query.specialFlag == 1) {
                  this.flag = 2
                }
              } else {
                this.flag = 1
              }
            }
            if (this.approveState != 2 && this.approveState != 4 && this.approveState != 6 && this.approveState != 7) {
              this.addListN()
              // alert(this.approveState)

              // alert('灭有listN')
              window.console.log(this.listNOrigin, 'listN')
              window.console.log(this.listS, 'listsss')
              this.listS = this.listS.concat(this.listNOrigin)
              window.console.log(this.listS)
            }
          }
        }
      })
    }

  }
}
</script>

<style>
.specialCard {
  margin-bottom: 0 !important;
}
.iframe {

    width: 100%;
    flex: 1;
    /* height: calc( 100vh - 377px ); */
    background: #fff;
    border: none;
}
</style>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
<style  scoped>
 .el-card /deep/  .is-always-shadow {
    height: auto !important;
}
.footer /deep/ .el-card__body{
  justify-content: center;
}
/deep/ .el-form-item__content {
  width:600px
}
.reasonClass /deep/ .el-form-item__content {
  width:400px
}
.stepClass {
  display: flex;
  justify-content: center;

    padding-bottom: 5px;
}
/* .el-steps--horizontal{
  width: 500px !important;
} */
.underLine {
  margin-bottom:0 !important
}
</style>
