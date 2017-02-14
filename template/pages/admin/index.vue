
<template>
	<section>
		<!--主内容-->
		<el-row class="panel panel-flat">
			<el-row class="panel-heading">
				<h5 class="panel-title">
					基本形式输入
					{{msg | d('date,1','Y-d-m') }}
				</h5>
			</el-row>

			<el-row class="panel-body clearfix">
				<!--随便打的内容-->
				<div class="form-horizontal">
					<fieldset class="content-group">
						<legend class="text-bold">
							基本输入
						</legend>
						<div class="form-group">
							<label class="control-label col-lg-2">
								默认文本输入
							</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" placeholder="asdsadsad">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-lg-2">
								默认文本输入
							</label>
							<div class="col-lg-10">
								<input type="text" class="form-control">
							</div>
						</div>
					</fieldset>

					<fieldset class="content-group">
						<legend class="text-bold">
							基本输入
						</legend>
						<el-row class="clearfix">
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
							<button type="button" class="btn btn-group bg-teal-800">asdsadd</button>

							<nuxt-link tag="li" to="/foo">
							  <a>/foo</a>
							</nuxt-link>
						</el-row>
					</fieldset>
				</div>
				<!--随便打的内容-->
			</el-row>
		</el-row>
		<!--主内容-->
	</section>
</template>

<script src="~assets/admin/js/index.js"></script>
