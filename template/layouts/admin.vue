<style src="element-ui/lib/theme-chalk/index.css" lang="css"></style>
<style src="bootstrap/dist/css/bootstrap.min.css" lang="css"></style>
<style src="font-awesome/css/font-awesome.min.css" lang="css"></style>
<style src="ddv-ui/css/admin/core.css" lang="css"></style>
<style src="ddv-ui/css/admin/components.css" lang="css"></style>
<style src="ddv-ui/css/admin/colors.css" lang="css"></style>
<style src="ddv-ui/css/admin/base.css" lang="css"></style>

<style lang="scss">
  [v-cloak] {
    display: none;
  }
  .ddv-management-system{
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s
    }

    .fade-enter,
    .fade-leave-active {
      opacity: 0
    }

    .panels {
      position: absolute;
      top: 0px;
      bottom: 0px;
      width: 100%;
    }

    .panel-top {
      height: 60px;
      line-height: 60px;
      background-color: #37474f;
      border-color: #37474f;
      color: #c0ccda;
    }

    .panel-center {
      background: #37474f;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
    }

    .logout {
      background-size: contain;
      width: 20px;
      height: 20px;
      float: left;
    }

    .pointer{
      cursor: pointer;
    }

    .logo {
      // width: 40px;
      // float: left;
      // margin: 10px 10px 10px 18px;
      height: 40px;
      float: left;
      width: auto;
      margin: 10px 10px 10px 18px;
    }

    .tip-logout {
      padding-right: 20px;
    }

    .tip-logout i {
      cursor: pointer;
    }

    .admin {
      color: #c0ccda;
      text-align: center;
    }

    .sidebars{
      height: 100%;
      /* overflow: auto; */
      vertical-align: top;
      width: 260px;
      background-color: #263238;
      color: #fff;
      position: relative;

      .el-menu--dark{
        background-color:#263238;
      }

      .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
        background-color: #26a69a !important;
        color: #fff;
      }
    }

    .sidebars-main{
      z-index: 99;
      transition:all 0.3s;
      -moz-transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -o-transition: all 0.3s;
    }

    .sidebars-main.active{
      width: 64px;
    }

    .panel-content{
      background: #f1f2f7;
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      left: 0px;
      overflow-y: auto;
      overflow-x: hidden;
      /*padding: 20px;*/
      padding-left: 260px;
      transition:all 0.3s;
      -moz-transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -o-transition: all 0.3s;
    }

    .panel-content.active{
      padding-left: 64px !important;
    }

    .h37{
      height: 37px;
      line-height: 37px;
    }

    .mt-20{
      margin-top: -20px !important;
    }

    .row-xl{
      margin: 0 -20px;
    }

    .navbar-header-btn:hover{
      background-color: #324148;
    }

    .navbar-header{
      min-width: 260px;
    }

    .sidebars .el-menu--dark .el-submenu .el-menu{
      background-color:rgba(0,0,0,0.15) !important;
      -webkit-box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset !important;
      box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset !important;
    }

    ::-webkit-scrollbar {
      width: 8px;
      max-height: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: #fff;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-button {
      background-color: #7c2929;
    }

    ::-webkit-scrollbar-corner {
      background-color: black;
    }
  }
  .overflow-visible {
    overflow: visible;
  }
</style>

<template>
  <div class="ddv-management-system">
    <el-row class="panels">
      <admin-header
        :fullTodo="fullTodo"
        title="ddv"
        type-name="管理后台"
        logo="/logo.png"
        user="管理员"
        :logout="logout"/>
      <el-col :span="24" class="panel-center clearfix">
        <admin-sidebar :isFullScreen="isFullScreen">
          <el-menu
            :router="true"
            :unique-opened="true"
            :default-active="$route.path"
            background-color="#263238"
            text-color="#fff"
            :collapse="isFullScreen"
            >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">菜单</span>
              </template>
              <el-menu-item index="/admin/">
                首页
              </el-menu-item>
              <el-menu-item index="/admin/about">
                关于
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </admin-sidebar>
        <section
          class="panel-content"
          :class="{'active':isFullScreen}">
          <admin-breadcrumb
            :ground="ground"
            :now-page="nowPage"
            :breadcrumb="storeData.breadcrumb"/>
          <el-row class="content">
            <nuxt/>
          </el-row>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import d from 'ddv-util'
// 头部-侧边栏-面包屑
// import { adminHeader, adminSidebar, adminBreadcrumb } from 'ddv-ui'
import adminHeader from '~/components/admin/common/admin-header'
import adminSidebar from '~/components/admin/common/admin-sidebar'
import adminBreadcrumb from '~/components/admin/common/admin-breadcrumb'
// 只全局安装常用组件
import {
  Loading,
  MessageBox,
  Message,
  Notification,
  Form,
  FormItem,
  Input,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  TabPane,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  Row,
  tooltip
} from 'element-ui'

Vue.filter('d', d)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Row)
Vue.use(tooltip)

if (process.browser) {
  d.api.onDataClientError(function onDataClientError (e, context) {
    var toPath
    if (e.errorId === 'NO_LOGIN' && context) {
      if (context.$router && context.$route) {
        toPath = '/' + d._getTypeByRoute(context.$route) + '/login'
        context.$router.push(toPath)
      } else if (context.redirect) {
        toPath = '/' + d._getTypeByContext(context) + '/login'
        context.redirect('302', toPath)
      } else {
        throw e
      }
    } else if (e.errorId === 'UNKNOWN_ERROR') {
      MessageBox({
        title: '警告',
        message: '网络错误',
        type: 'error'
      })
    } else {
      MessageBox({
        title: '警告',
        message: e.message,
        type: 'error'
      })
    }
  })
}

export default {
  middleware: 'adminCheckLogin',
  head () {
    return {
      title: 'ddv管理后台',
      meta: [
        {
          'charset': 'utf-8'
        },
        {
          'name': 'viewport',
          'content': 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        {
          'name': 'renderer',
          'content': 'webkit'
        }
      ]
    }
  },
  data () {
    return {
      isFullScreen: false,
      showPage: false
    }
  },
  methods: {
    fullTodo () {
      this.isFullScreen = !this.isFullScreen
    },
    changePage () {
      let flag = this.$route.path !== '/admin/login'
      this.$store.commit('admin/setLogin', flag)
    },
    logout () {
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$router.replace('/admin/login')
      }).catch(() => {})
    }
  },
  components: {
    adminHeader,
    adminSidebar,
    adminBreadcrumb
  },
  computed: mapState({
    storeData: state => state.admin,
    breadcrumbTitle () {
      return this.storeData.breadcrumb.slice(this.storeData.breadcrumb.length - 2, this.storeData.breadcrumb.length)
    },
    ground () {
      if (this.storeData.breadcrumb.length === 1) {
        let obj = this.storeData.breadcrumb[0]
        return obj.name
      } else if (this.storeData.breadcrumb.length >= 2) {
        let obj = this.storeData.breadcrumb[this.storeData.breadcrumb.length - 2]
        return obj.name
      }
      return ''
    },
    nowPage () {
      if (this.storeData.breadcrumb.length >= 2) {
        let obj = this.storeData.breadcrumb[this.storeData.breadcrumb.length - 1]
        return ` - ${obj.name}`
      }
      return ''
    }
  }),
  watch: {
    '$route.path': {
      handler: 'changePage',
      deep: true
    }
  },
  created () {
    this.changePage()
  }
}
</script>
