<style scoped src="~assets/admin/css/login.css"></style>

<template>
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
            <el-button type="primary" class="col-xs-12" @click.native.prevent="handleSubmit2">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script src="~assets/admin/js/login.js"></script>
