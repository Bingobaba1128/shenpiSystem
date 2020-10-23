<template>
  <div>
    <div style="display:flex;align-items: center;height:50px">
      <p class="header_title">{{ param }}</p>
      <div v-if="isShow" class="backTo" style="margin-left:auto;height:35px; display:flex; align-item:center;padding-right:16px;padding-top:5px">
        <el-button type="info" plain style="padding: 7px 14px; border:none;background-color:#ECF0F6;color:#8D969F" @click="back">返回</el-button>
      </div>
      <div v-if="isClose" style="margin-left:auto;height:35px; display:flex; align-item:center;padding-right:16px">
        <el-button type="text" plain style="padding: 7px 14px; border:none;background-color:white;color:grey" @click="childMethod()">X</el-button>
      </div>
      <div v-if="isBackClose" class="backTo" style="margin-left:auto;height:35px; display:flex; align-item:center;padding-right:16px;padding-top:5px">
        <el-button type="info" plain style="padding: 7px 14px; border:none;background-color:#ECF0F6;color:#8D969F" @click="childMethod()">返回</el-button>
      </div>
    </div>

    <div style="padding: 0 5px">
      <p class="underLine" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    param: String,
    show: Boolean,
    close: Boolean,
    bclose: Boolean,
    direct: String,
    route: String
  },
  data() {
    return {
      isShow: this.show,
      isClose: this.close,
      isBackClose: this.bclose
    }
  },
  methods: {
    back() {
      this.$store.dispatch('toolbar/delView', this.route)
      this.$router.push(this.direct)// 返回上一层
    },
    childMethod() {
      this.$parent.backToMain()
    }
  }
}
</script>

    <style scoped>
    .header_title{
          font-size:18px;
font-family:Microsoft YaHei;
font-weight:400;
padding-bottom: 11px;
padding-top: 21px;
    }
        .header_title::before {
        content:'';
            font-size: 15px;
            border-left:4px solid #4A76E2;
            padding-right: 16px;
        }
    </style>
