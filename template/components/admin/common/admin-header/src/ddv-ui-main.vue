<template>
  <ddv-ui-col :span="24" class="panel-top">
    <ddv-ui-col :span="18" class="f24">
      <div class="navbar-header pull-left pl20">
        <img :src="logo" alt="" class="logo round">
        <span>
          <span v-text="title"></span>
          <i style="color:#20a0ff">{{typeName}}</i>
        </span>
      </div>
      <div class="pull-left pl20 pr20 pointer f20 navbar-header-btn" @click="fullTodo">
        <i class="el-icon-menu"></i>
      </div>
    </ddv-ui-col>
    <ddv-ui-col :span="6">
      <div class="clearfix pull-right pointer admin-logout" @click="logout">
        {{user}}
        <span>退出</span>
      </div>
    </ddv-ui-col>
  </ddv-ui-col>
</template>

<style>
.admin-logout{
  margin-right: 50px;
}
</style>

<script>
import ddvUiCol from './ddv-ui-col'
export default{
  components: {
    ddvUiCol
    // ddvUiTooltip
  },
  name: 'adminHeader',
  props: {
    'fullTodo': {
      type: Function,
      required: true,
      default: function () {}
    },
    'title': {
      type: String,
      default: '项目'
    },
    'typeName': {
      type: String,
      default: '管理后台'
    },
    'user': {
      type: String,
      default: '管理员'
    },
    'logo': {
      type: String
    },
    'logout': {
      type: Function,
      default: function () {}
    }
  }
}
</script>
