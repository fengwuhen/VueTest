<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
        <router-link :to="item.path">
          <el-tag size="small" type="success" style="cursor: pointer;">{{ $t(item.meta.title) }}</el-tag>
        </router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.breadcrumb {
  padding: 10px;
  border-color: rgba(38, 86, 114, 0.2);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  background: rgba(138, 158, 170, 0.2);
}
</style>
