<template>
  <el-card class="spClass">
    <div class="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待我审批" name="child1" class="special" />
        <el-tab-pane label="我审批的" name="child2" />
        <el-tab-pane label="我发起的" name="child3" />
        <el-tab-pane label="抄送我的" name="child4" />
      </el-tabs>
      <!-- <keep-alive> -->
      <component :is="currentTabComponent" />
    <!-- </keep-alive> -->
    </div>
  </el-card>

</template>

<script>
import child1 from '@/views/shenPi/tab/child1'
import child2 from '@/views/shenPi/tab/child2'
import child3 from '@/views/shenPi/tab/child3'
import child4 from '@/views/shenPi/tab/child4'

export default {
  name: 'Sp',
  components: {
    child1: child1,
    child2: child2,
    child3: child3,
    child4: child4
  },
  data() {
    return {
      activeName: 'child1',
      currentTabComponent: child1
    }
  },

  methods: {
    handleClick() {
      this.currentTabComponent = this.activeName
    }
  }
}
</script>

<style scoped>
/deep/ .el-tabs__nav-scroll::before {
content:'';
    font-size: 15px;
    border-left:4px solid #4A76E2;
    padding-right: 16px;
    height: 20px;
    margin-top: 11px;
}
/deep/ .el-tabs__nav-wrap{
width: 100%;
padding-top: 5px;
}
/deep/ .el-tabs__item{
  font-size: 18px;
}
/deep/ .el-tabs__header {
  display: flex;
}
/deep/ .el-tabs__active-bar{
  width: 70px;
      color: #5C8BFA;

}
.tab .el-tabs .el-tab-pane{
  color: #fff;
}
.spClass /deep/ .el-tabs__nav{
  padding-left: 0;
}
/deep/ .el-tabs__nav-wrap::after {
    height: 1px;
    background-color: #E4E7ED;
}
/deep/ .el-tabs__active-bar{
  background-color:#5C8BFA ;
}
/deep/ .el-tabs__item.is-active {
    color: #5C8BFA;
}
</style>
