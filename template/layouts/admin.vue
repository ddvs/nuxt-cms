<style src="element-ui/lib/theme-default/index.css" lang="css"></style>
<style src="~assets/admin/css/common/bootstrap/css/bootstrap.min.css"></style>
<style src="~assets/admin/css/common/font-awesome/css/font-awesome.min.css"></style>
<style src="~assets/admin/css/common/base.css"></style>

<style scoped>

</style>

<template>
	<div>
		<el-row class="panels">
			<admin-header/>
			<el-col :span="24" class="panel-center clearfix">
				<admin-sidebar/>
				<section class="panel-content">
					<nuxt/>
				</section>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import AdminHeader from '~components/admin/common/header.vue';
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
	methods: {
      	onSubmit() {
        	console.log('submit!');
      	},
		handleopen(){
			//console.log('handleopen');
		},
		handleclose(){
			//console.log('handleclose');
		},
        handleselect:function(a,b){
        },
		//退出登录
		logout:function(){
			var _this=this;
			this.$confirm('确认退出吗?', '提示', {
				type: 'warning'
			}).then(() => {
				_this.$router.replace('/login');
			}).catch(() => {

			});

		}
    },
	components: {
		AdminHeader,
		AdminSidebar
	}
};
</script>
