<style scoped>

.login-pages{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #20A079;
  z-index: 200;
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

<template>
  <div class="login-pages">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
        <el-form-item>
            <el-button type="primary" class="col-xs-12" @click.native.prevent="handleSubmit2" @keyup.enter="handleSubmit2">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script src="~assets/admin/js/login.js"></script>
