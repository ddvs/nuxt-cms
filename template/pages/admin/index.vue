<template>
	<section>
		{{name}}
		 <el-button :plain="true" @click="open">打开消息提示</el-button>
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

  	},
	mounted () {

	}
}
</script>
<style scoped>

</style>
