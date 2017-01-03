<template>
	<section>
		<!--面包屑-->
		<el-breadcrumb separator="/" class="breadcrumb-line">
			<el-breadcrumb-item :to="{ path: '/' }">
				<i class="fa fa-home mr10"></i>首页
			</el-breadcrumb-item>
			<el-breadcrumb-item>活动管理</el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!--面包屑-->
		<!--主内容-->
		<el-col :span="24" class="clearfix">
			{{name}}
			 <el-button :plain="true" @click="open">打开消息提示</el-button>
		</el-col>
		<!--主内容-->
	</section>
</template>

<script>
export default {
	layout:'admin',
	head(){
		return {
			titleTemplate: '%s - 首页'
		};
	},
	data ({ req }) {
		return {
			name: req ? 'server' : 'client'
		}
	},
	methods: {
      open() {
        this.$message('这是一条消息提示');
      }
  	}
}
</script>
<style scoped>

</style>
