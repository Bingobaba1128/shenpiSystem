
<template>
  <div class="scaleProgress">
    <el-progress :text-inside="true" :stroke-width="18" :percentage="progressNum" />
  </div>
</template>

<script>
export default {
  props: {
    progressStatus: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      progressNum: 10,
      startTimer: '',
      endTimer: ''
    }
  },
  watch: {
    progressStatus(val) {
      if (val) {
        this.endProgress()
      }
    }
  },
  mounted() {
    this.startProgress()
  },
  methods: {
    startProgress() {
      this.startTimer = setInterval(() => {
        this.progressNum++
        if (this.progressNum > 85) {
          clearInterval(this.startTimer)
        }
      }, 100)
    },
    endProgress() {
      clearInterval(this.startTimer)
      this.endTimer = setInterval(() => {
        this.progressNum++
        if (this.progressNum > 99) {
          clearInterval(this.endTimer)
          this.finishProgress()
        }
      }, 10)
    },
    finishProgress() {
      this.$emit('finishProgress', false)
    }
  }
}
// 使用示例
// import sProgress from 'components/common/SProgress'
// <s-progress @finishProgress="closeProgress" v-if="showProgress" :progressStatus="progressStatus"></s-progress>
// closeProgress (val) {
//     this.showProgress = val
//     this.progressStatus = val
// },
// save () {
//     this.showProgress = true
//     setTimeout(() => {
//         this.progressStatus = true
//     }, 3000)
// },
</script>
<style scoped>
.scaleProgress {
    transform: scaleY(0.75);
}
</style>
