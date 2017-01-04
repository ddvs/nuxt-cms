<style scoped>

</style>

<template >
    <div>
        asdsadsad
    </div>
</template>

<script>
export default {
    layout:'wap',
    head(){
		return {
			titleTemplate: '%s - 首页'
		};
	},
	data ({ req }) {
		return {
			name: req ? 'server' : 'client'
		};
	},
}
</script>
