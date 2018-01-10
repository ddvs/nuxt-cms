<style scoped>

.login-pages{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #20A079;
  z-index: 1000;
}

.card-box {
  padding: 20px;
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #F9FAFC;
  margin: 120px auto;
  width: 400px;
  border: 2px solid #8492A6;
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.loginform {
  width: 350px;
  padding: 35px 35px 15px 35px;
}
</style>
<style>
.bounce-enter-active {
  animation: bounce-in .3s;
}

.bounce-leave-active {
  animation: bounce-out .2s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0);
  }
}
</style>

<template>
  <div class="login-pages">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm card-box loginform"
      @keyup.enter.native="handleSubmit">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号" ref="account"/>
      </el-form-item>
      <el-form-item prop="passWord">
        <el-input type="password" v-model="ruleForm.passWord" auto-complete="off" placeholder="密码" ref="passWord"/>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked style="margin:0px 0px 35px 0px;">记住密码</el-checkbox> -->
      <el-form-item>
        <el-button type="primary" class="col-xs-12" @click.native.prevent="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="~/assets/admin/js/login.js"></script>
