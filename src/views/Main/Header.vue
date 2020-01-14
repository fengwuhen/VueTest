<template>
  <div class="header">
    <div class="logo">
      <img @click.prevent="onCollapse" :src="this.logo" />
      <div class="logo-title">{{ $t("common.webName") }}</div>
    </div>
    <div class="userinfo">
      <!-- 用户信息 -->
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link">
          <div class="avatar">
            <div class="username">{{ userName }}</div>
            <el-avatar :src="this.userAvatar"></el-avatar>
          </div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">{{$t("common.logout")}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="theme">
      <!-- 主题切换 -->
      <ThemePicker class="theme-picker" @onThemeChange="onThemeChange"></ThemePicker>
      <!-- 语言切换 -->
      <LangSelector class="lang-selector"></LangSelector>
    </div>
  </div>
</template>

<script>
import ThemePicker from "../../components/Themes/Index";
import LangSelector from "../../components/Languages/Index";
export default {
  components: {
    ThemePicker,
    LangSelector
  },
  data() {
    return {
      userName: "Louis",
      userAvatar: "",
      logo: ""
    };
  },
  methods: {
    //折叠导航栏
    onCollapse() {
      this.$store.dispatch("onCollapse", !this.isCollapse);
    },
    onThemeChange(themeColor, oldThemeColor) {
      this.$store.dispatch("onThemeChange", { themeColor, oldThemeColor });
    },
    //退出登录
    logout() {
      var _this = this;
      _this
        .$confirm("确认退出吗?", "提示", {
          type: "warning"
        })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.logo = require("../../assets/images/logo.png");
    var user = sessionStorage.getItem("user");
    if (user) {
      this.userName = JSON.parse(user).username;
      this.userAvatar = require("../../assets/images/user.png");
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  padding-left: 20px;
  padding-right: 20px;
  color: white;

  .logo {
    float: left;
    padding-top: 10px;

    img {
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
    .logo-title {
      float: right;
      font-size: 20px;
      line-height: 40px;
      margin-left: 10px;
    }
  }
  .theme,
  .userinfo {
    float: right;
  }
  .el-dropdown {
    color: white;
  }
  .theme-picker,
  .lang-selector {
    margin-right: 10px;
    cursor: pointer;
  }
  .username {
    float: left;
    line-height: 40px;
    margin-right: 3px;
    font-weight: bold;
  }
  .avatar {
    padding-top: 10px;
    cursor: pointer;
  }
}
</style>
