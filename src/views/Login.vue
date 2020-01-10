<template>
  <div style="width:100%;height:100%;padding-top:180px;">
    <el-form
      :model="loginForm"
      :rules="fieldRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">{{ $t("common.loginLogo") }}</h3>
      <el-form-item prop="account">
        <el-input
          type="text"
          v-model="loginForm.account"
          auto-complete="off"
          :placeholder="$t('common.account')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          :placeholder="$t('common.password')"
        ></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:48%;"
          @click.native.prevent="login"
          :loading="logining"
          >{{ $t("common.login") }}</el-button
        >
        <el-button type="info" style="width:48%;" @click.native.prevent="reset">
          {{ $t("action.reset") }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "../api/login";
import * as Cookies from "../lib/cookie";
import qs from "qs";
import il8n from "../i18n";

export default {
  name: "login",
  data() {
    return {
      logining: false,
      loginForm: {
        account: "admin",
        password: "123456"
      },
      fieldRules: {
        account: [
          {
            required: true,
            message: il8n.t("common.accountTip"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: il8n.t("common.passwordTip"),
            trigger: "blur"
          }
        ]
      },
      checked: true
    };
  },
  methods: {
    login() {
      api
        .login(qs.stringify(this.loginForm))
        .then(res => {
          if (res.code == 0) {
            Cookies.setToken(res.data.account); // 放置token到Cookie
            sessionStorage.setItem("user", JSON.stringify(res.data)); // 保存用户到本地会话
            this.$router.push("/"); // 登录成功，跳转到主页
          } else {
            Message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    reset() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
    font-weight: bolder;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
