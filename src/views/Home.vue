<template>
  <div class="container">
    <!-- 导航菜单栏 -->
    <LeftBar></LeftBar>
    <!-- 头部区域 -->
    <Header></Header>
    <!-- 主内容区域 -->
    <Main></Main>
  </div>
</template>

<script>
import Header from "./Main/Header";
import LeftBar from "./Main/LeftBar";
import Main from "./Main/Main";
export default {
  components: {
    Header,
    LeftBar,
    Main
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  background: #4b5f6e;
}
</style>