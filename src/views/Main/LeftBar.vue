<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :collapse-transition="true"
    :unique-opened="false"
    @open="handleopen"
    @close="handleclose"
    @select="handleselect"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">{{$t("sys.sysMng")}}</span>
      </template>
      <el-menu-item index="1-1" @click="$router.push('user')">{{$t("sys.userMng")}}</el-menu-item>
      <el-menu-item index="1-2" @click="$router.push('dept')">{{$t("sys.deptMng")}}</el-menu-item>
      <el-menu-item index="1-3" @click="$router.push('role')">{{$t("sys.roleMng")}}</el-menu-item>
      <el-menu-item index="1-4" @click="$router.push('menu')">{{$t("sys.menuMng")}}</el-menu-item>
      <el-menu-item index="1-5" @click="$router.push('log')">{{$t("sys.logMng")}}</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">{{$t("sys.sysMonitor")}}</span>
      </template>
      <el-menu-item index="2-1">{{$t("sys.userMng")}}</el-menu-item>
      <el-menu-item index="2-2">{{$t("sys.deptMng")}}</el-menu-item>
      <el-menu-item index="2-3">{{$t("sys.roleMng")}}</el-menu-item>
      <el-menu-item index="2-4">{{$t("sys.menuMng")}}</el-menu-item>
      <el-menu-item index="2-5">{{$t("sys.logMng")}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleopen() {},
    handleclose() {},
    handleselect(a, b) {}
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>