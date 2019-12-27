<template>
  <el-dropdown class="lang-selector" @command="handleCommand">
    <span class="el-dropdown-link">
      <span>{{language}}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh:中文">中文</el-dropdown-item>
      <el-dropdown-item command="en:English">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      language: "中文"
    };
  },
  methods: {
    // 语言切换
    handleCommand(command) {
      let array = command.split(":");
      let lang = array[0] === "" ? "zh" : array[0];
      let label = array[1];
      this.language = label;
      this.$i18n.locale = lang;
    }
  }
};
</script>