<style src="element-ui/lib/theme-default/index.css" lang="css"></style>
<style src="~assets/admin/css/common/bootstrap/css/bootstrap.css" lang="css"></style>
<style src="~assets/admin/css/common/font-awesome/css/font-awesome.min.css" lang="css"></style>
<style src="~assets/admin/scss/common/core.scss" lang="scss"></style>
<style src="~assets/admin/scss/common/components.scss" lang="scss"></style>
<style src="~assets/admin/css/common/colors.css" lang="css"></style>
<style src="~assets/admin/css/common/base.css" lang="css"></style>

<style lang="scss">
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
	<div class="ddv-management-system">
		<transition name="bounce">
			<nuxt v-if="!storeData.isLogin"/>
		</transition>

		<el-row class="panels" v-if="storeData.isLogin&&!isloading">
			<admin-header :isFullScreen="isFullScreen" @fullTodo="fullTodo"/>
			<el-col :span="24" class="panel-center clearfix">
				<admin-sidebar :isFullScreen="isFullScreen"/>
				<section class="panel-content" :class="{'active':isFullScreen}">

					<div class="page-header mb20">
						<div class="page-header-content">
							<div class="page-title">
								<h4>
									<i class="fa fa-arrow-circle-left position-left pointer" @click="$router.go(-1)">
									</i>
									<span class="text-semibold">{{ground}}</span>{{nowPage}}
								</h4>
							</div>
						</div>
						<el-breadcrumb separator="/" class="breadcrumb-line pl20 pr20 h37">
							<el-breadcrumb-item :to="{ path: '/admin/' }">
								<i class="fa fa-home mr10"></i>首页
							</el-breadcrumb-item>
							<el-breadcrumb-item v-for="data in storeData.breadcrumb" :to="{path:data.path}">{{data.name}}</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<el-row class="content">
						<nuxt style="display:none"/>
					</el-row>
				</section>
			</el-col>
		</el-row>
	</div>
</template>

<script>

import Vue from 'vue';
import ElementUI from 'element-ui';
import { mapState } from 'vuex';
import d from 'ddv-util';

Vue.filter('d',d);
Vue.use(ElementUI);

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

//头部
import AdminHeader from '~components/admin/common/header.vue';
//侧边栏
import AdminSidebar from '~components/admin/common/sidebar.vue';

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
			isloading:true
		};
	},
	methods: {
  	fullTodo() {
    	this.isFullScreen = !this.isFullScreen;
  	},
		changePage(){
			let flag = this.$route.path !== '/admin/login';
			this.$store.commit('setLogin',flag);
		}
  },
	components: {
		AdminHeader,
		AdminSidebar
	},
	computed:mapState({
		storeData : state => state.admin,
		breadcrumbTitle(){
			return this.storeData.breadcrumb.slice(this.storeData.breadcrumb.length-2,this.storeData.breadcrumb.length);
		},
		ground(){
			if(this.storeData.breadcrumb.length === 1){
				let obj = this.storeData.breadcrumb[0];
				return obj.name;
			}else if(this.storeData.breadcrumb.length >= 2){
				let obj = this.storeData.breadcrumb[this.storeData.breadcrumb.length-2];
				return obj.name;
			}
			return ''
		},
		nowPage(){
			if(this.storeData.breadcrumb.length >= 2){
				let obj = this.storeData.breadcrumb[this.storeData.breadcrumb.length-1];
				return ` - ${obj.name}`;
			}
			return ''
		}
  }),
	watch:{
		'$route.path':{
			handler:'changePage',
			deep:true
		}
	},
	created(){
		setTimeout(() => {
			this.isloading = false;
		},50);
	}
};
</script>
