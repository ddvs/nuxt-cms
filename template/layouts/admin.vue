<style src="element-ui/lib/theme-default/index.css" lang="css"></style>
<style src="~assets/admin/css/common/bootstrap/css/bootstrap.min.css" lang="css"></style>
<style src="~assets/admin/css/common/font-awesome/css/font-awesome.min.css" lang="css"></style>
<style src="~assets/admin/css/common/base.css" lang="css"></style>

<template>
	<div>
		<nuxt v-if="$router.currentRoute.path == '/admin/login'"/>
		<el-row class="panels" v-else>
			<admin-header :isFullScreen="isFullScreen" @fullTodo="fullTodo"/>
			<el-col :span="24" class="panel-center clearfix">
				<admin-sidebar :isFullScreen="isFullScreen"/>
				<section class="panel-content" :class="{'active':isFullScreen}">
					<nuxt/>
				</section>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
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
			isFullScreen:false
		};
	},
	methods: {
      	fullTodo() {
        	this.isFullScreen = !this.isFullScreen;
      	},
    },
	components: {
		AdminHeader,
		AdminSidebar
	}
};
</script>
