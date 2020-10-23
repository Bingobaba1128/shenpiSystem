<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <!-- <keep-alive :include="cachedViews">
        <router-view :key="$route.fullPath" />
      </keep-alive> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
    <!-- </transition> -->
  </section>
</template>
<script>

export default {
  name: 'AppMain'
}
</script>

<style scoped>
.app-main .el-card{
  /*50 = navbar  */
  height: calc(100% - 30px);
}
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
