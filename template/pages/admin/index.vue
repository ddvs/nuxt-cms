
<style scoped>

</style>

<template>
	<section>
		<!--面包屑-->
		<div class="page-header row-xl mb20 mt-20">
			<div class="page-header-content">
				<div class="page-title">
					<h4>
						<i class="fa fa-arrow-circle-left position-left pointer"></i>
						<span class="text-semibold">活动管理</span> - 首页
					</h4>
				</div>
			</div>
			<el-breadcrumb separator="/" class="breadcrumb-line pl20 pr20 h37">
				<el-breadcrumb-item :to="{ path: '/admin/' }">
					<i class="fa fa-home mr10"></i>首页
				</el-breadcrumb-item>
				<el-breadcrumb-item>活动管理</el-breadcrumb-item>
				<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!--面包屑-->
		<!--主内容-->
		<el-col :span="24" class="clearfix">
			{{name}}
			<br>
			<el-button :plain="true" @click="open">打开消息提示</el-button>
			<br>
			<br>
			<button type="button" class="btn-xs btn-primary">asdsadd</button>
			<br>
			<br>
			<button type="button" class="btn-sm bg-success-300">asdsadd</button>
			<br>
			<br>
			<button type="button" class="btn-group-multiselect bg-success-300">asdsadd</button>
			<br>
			<br>
			<button type="button" class="btn-group bg-teal-800">asdsadd</button>

			<div class="panel panel-white">
				<div class="panel-heading">
					<h5 class="panel-title">asdsad</h5>
				</div>
				<div class="form-basic ui-formwizard">
					sadsasaddasd
				</div>
			</div>

			<nuxt-link tag="li" to="/foo">
			  <a>/foo</a>
			</nuxt-link>
		</el-col>
		<!--主内容-->
	</section>
</template>

<script src="~assets/admin/js/index.js"></script>
