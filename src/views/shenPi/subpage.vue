<template>

  <div>
    <el-card style="margin:16px;margin-bottom:0">
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


    <el-card style="margin:16px;margin-top:0;height:70px" class="footer">
      <div style="padding: 16px; display:flex; justify-content:left">
        <el-button class="specialConfirmBtn" style="width:88px" @click="passThrough"> 通过</el-button>
        <el-button class="specialContinueBtn" style="background-color:#FAAB15;color:white;margin-left:40px;border:none;width:88px" @click="passBack">驳回</el-button>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" style="flex:1;display:flex;align-items:center">

          <el-col :span="20" class="reasonClass">
            <el-form-item label="驳回理由 :">
              <el-input v-model.trim="reason" placeholder="" clearable maxlength="100" show-word-limit show-overflow-tooltip />
            </el-form-item>
          </el-col>
        </el-form>

      </div>
    </el-card>
  </div>

</template>

<script>
import { loadData, passData, passBackData } from '@/api/baoJiaDan'

export default {
  data() {
    return {

      // http://localhost:8089/#/%E6%8A%A5%E4%BB%B7%E5%8D%95/%E6%8A%A5%E4%BB%B7%E5%8D%95%E5%AE%A1%E6%89%B9?pkNo=BJD202010-045
      // reportUrl: this.$route.query.data,
      reportUrl: 'http://localhost:8089/#/%E6%8A%A5%E4%BB%B7%E5%8D%95/%E6%8A%A5%E4%BB%B7%E5%8D%95%E5%AE%A1%E6%89%B9?pkNo=BJD202010-045',
      searchTableHeight: 0,
      searchTableWidth: 0,
      token: '',
      isChildReady: false,
      data: this.$route.query.data,
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
      listS: [],
      pkNo: '',
      flag: 0
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
        employeeId: '10001',
        employeeName: '邓科',
        state: '1'
      }
      passData(passJson).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('审批通过')
          this.initData()
        }
      })
    },
    passBack() {
      var passJson = {
        pkNo: this.$route.query.pkNo,
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
          this.initData()
        }
      })
    },
    initData() {
      var param1 = '/api/Approve/getApproveState?pkNo=' + this.$route.query.pkNo
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
                this.$set(this.listSOrigin[index], 'title', '已通过')
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
          // var len = this.listS.length
          // var testPoint =
          // if(this.listS[len - 1].approveState !== 0){
          //   if()
          // } else {
          //   this.flag = 1
          // }
          // window.console.log(this.listS)
        }
      })
    }

  }
}
</script>

<style>
.iframe {

    width: 100%;
    height: calc( 100vh - 280px );
    background: #fff;
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
.stepClass {
  display: flex;
  justify-content: center;
  
    padding-bottom: 5px;
}
.el-steps--horizontal{
  width: 500px !important;
}
</style>