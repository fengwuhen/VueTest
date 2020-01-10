<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header :style="{ background: themeColor }">
      <Header></Header>
    </el-header>
    <el-container>
      <!-- 导航菜单栏 -->
      <el-aside :width="!isCollapse ? '200px' : '70px'" :style="{ background: themeColor }">
        <LeftBar></LeftBar>
      </el-aside>
      <!-- 主内容区域 -->
      <el-main :class="!isCollapse ? 'el-main' : 'el-content'">
        <MainContent></MainContent>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from "./Main/Header";
import LeftBar from "./Main/LeftBar";
import MainContent from "./Main/Main";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    LeftBar,
    MainContent
  }
};
</script>

<style scoped lang="scss">
.el-container {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  bottom: 0px;
}

.el-header {
  padding: 0px;
  z-index: 1000;
  line-height: 60px;
}

.el-header .fr {
  float: right;
}

.el-header .el-menu {
  border-bottom: none;
}

.el-aside {
  position: absolute;
  top: 60px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

.el-main {
  position: absolute;
  top: 60px;
  bottom: 0px;
  left: 200px;
  right: 0px;
  padding: 5px;
}

.el-content {
  position: absolute;
  top: 60px;
  bottom: 0px;
  left: 70px;
  right: 0px;
  padding: 5px;
}

.el-aside .el-menu {
  border-right: none;
}
</style>
