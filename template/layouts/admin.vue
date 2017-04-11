<style src="element-ui/lib/theme-default/index.css" lang="css"></style>
<style src="ddv-cms/lib/style/bootstrap/css/bootstrap.min.css" lang="css"></style>
<style src="ddv-cms/lib/style/admin/font-awesome/css/font-awesome.min.css" lang="css"></style>
<style src="ddv-cms/lib/style/admin/scss/core.scss" lang="scss"></style>
<style src="ddv-cms/lib/style/admin/scss/components.scss" lang="scss"></style>
<style src="ddv-cms/lib/style/admin/colors.css" lang="css"></style>
<style src="ddv-cms/lib/style/admin/base.css" lang="css"></style>

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
		    width: 40px;
		    float: left;
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
	    overflow: auto;
	    vertical-align: top;
	    width: 260px;
	    background-color: #263238;
	    color: #fff;
	    position: relative;

			.el-menu--dark{
	        background-color:#263238;
	    }

	    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
	        background-color: #26a69a;
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
		    transform: translate3d(-280px,0,0);
		    -moz-transform: translate3d(-280px,0,0);
		    -webkit-transform: translate3d(-280px,0,0);
		    -o-transform: translate3d(-280px,0,0);
		    opacity: 0;
		    -ms-opacity:0;
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
		    padding-left: 0px !important;
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
</style>

<template>
	<div class="ddv-management-system">
		<transition name="bounce">
			<nuxt v-if="!storeData.isLogin"/>
		</transition>
		<el-row class="panels" v-if="storeData.isLogin">
			<admin-header :fullTodo="fullTodo" title="屏趣" type-name="管理后台" logo="/logo.png" user="管理员"/>
			<el-col :span="24" class="panel-center clearfix">
				<admin-sidebar :isFullScreen="isFullScreen">
					<el-menu theme="dark" :router="true" :unique-opened="true" :default-active="$route.path">
	          <el-submenu index="1">
	            <template slot="title">
	              <i class="el-icon-message"></i>
	              菜单
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
				<section class="panel-content" :class="{'active':isFullScreen}">
					<admin-breadcrumb/>
					<el-row class="content">
						<nuxt v-show="showPage"/>
					</el-row>
				</section>
			</el-col>
		</el-row>
	</div>
</template>

<script>

import Vue from 'vue'
import ElementUI from 'element-ui'
import { mapState } from 'vuex'
import d from 'ddv-util'

Vue.filter('d',d)
Vue.use(ElementUI)

if (process.BROWSER_BUILD) {
  d.api.onDataClientError(function onDataClientError(e,context) {
  	var toPath
    if (e.error_id === 'NO_LOGIN'&&context) {
    	if(context.$router && context.$route){
    		toPath = '/'+ d._getTypeByRoute(context.$route) + '/login'
      	  context.$router.push(toPath)
    	}else if( context.redirect){
      	   toPath = '/' + d._getTypeByContext(context) + '/login'
      	  context.redirect('302', toPath)
    	}else{
      		throw e
    	}
    } else {
      ElementUI.MessageBox({
				title:'警告',
				message:e.message,
				type:'error'
			})
    }
  })
}

//头部-侧边栏-面包屑
import {adminHeader, adminSidebar, adminBreadcrumb} from 'ddv-cms';

export default {
	middleware:'adminCheckLogin',
	head(){
		return {
			title:'屏趣管理后台',
		    meta:[
		      {'charset': 'utf-8' },
					{'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
		      {'name':'renderer','content':'webkit'}
		    ]
		}
	},
	data(){
		return{
			isFullScreen:false,
			showPage:false
		};
	},
	methods: {
  	fullTodo() {
    	this.isFullScreen = !this.isFullScreen
  	},
		changePage(){
			let flag = this.$route.path !== '/admin/login'
			this.$store.commit('setLogin',flag)
		},
		showContent(){
			setTimeout(()=>{
				this.showPage = (this.storeData.isLogin && this.$route.path !== '/admin/login')
			},500)
		}
  },
	components: {
		adminHeader,
		adminSidebar,
		adminBreadcrumb
	},
	computed:mapState({
		storeData : state => state.admin
  }),
	watch:{
		'$route.path':{
			handler:'changePage',
			deep:true
		},
		'storeData.isLogin':{
			handler:'showContent',
			deep:true
		}
	},
	created(){
		var _this = this
		_this.changePage()
		_this.$nextTick(()=>{
			this.showContent()
		})
	}
}
</script>
