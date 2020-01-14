<template>
  <el-menu
    :default-active="onRoutes"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :collapse-transition="true"
    :unique-opened="false"
    :default-openeds="defaultOpen"
    @open="handleopen"
    @close="handleclose"
    @select="handleselect"
    router
  >
    <!-- 一级菜单 -->
    <template v-for="item in items">
      <template v-if="item.subs">
        <el-submenu :index="item.index" :key="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ $t(item.title) }}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="subItem in item.subs">
            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
              <template slot="title">
                <i :class="subItem.icon"></i>
                {{ $t(subItem.title) }}
              </template>
              <!-- 三级菜单 -->
              <el-menu-item
                v-for="(threeItem, i) in subItem.subs"
                :key="i"
                :index="threeItem.index"
              >{{ $t(threeItem.title) }}</el-menu-item>
            </el-submenu>
            <!-- 不存在三级菜单 -->
            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
              <i :class="subItem.icon"></i>
              {{ $t(subItem.title) }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      <!-- 不存在二级菜单 -->
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index">
          <i :class="item.icon"></i>
          <span slot="title">{{ $t(item.title) }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import menus from "../../config/menu";

export default {
  data() {
    return {
      items: menus,
      defaultOpen: []
    };
  },
  methods: {
    handleopen() {},
    handleclose() {},
    handleselect(a, b) {}
  },
  mounted() {},
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
