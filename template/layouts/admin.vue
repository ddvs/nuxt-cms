<style src="element-ui/lib/theme-default/index.css" lang="css"></style>
<style src="~assets/admin/css/common/bootstrap/css/bootstrap.css" lang="css"></style>
<style src="~assets/admin/css/common/font-awesome/css/font-awesome.min.css" lang="css"></style>
<style src="~assets/admin/css/common/core.scss" lang="scss"></style>
<style src="~assets/admin/css/common/components.scss" lang="scss"></style>
<style src="~assets/admin/css/common/colors.css" lang="css"></style>
<style src="~assets/admin/css/common/base.css" lang="css"></style>

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
			<nuxt v-if="storeData.isLogin"/>
		</transition>

		<el-row class="panels" v-show="!storeData.isLogin&&!isloading">
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
						<nuxt/>
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
			let flag = this.$route.path === '/admin/login';
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
				let name = this.storeData.breadcrumb[0];
				return name.name;
			}else if(this.storeData.breadcrumb.length >= 2){
				let name = this.storeData.breadcrumb[this.storeData.breadcrumb.length-2];
				return name.name;
			}
			return ''
		},
		nowPage(){
			if(this.storeData.breadcrumb.length >= 2){
				let name = this.storeData.breadcrumb[this.storeData.breadcrumb.length-1];
				return ` - ${name.name}`;
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
		this.changePage();
		setTimeout(() => {
			this.isloading = false;
		},50);
	}
};
</script>
