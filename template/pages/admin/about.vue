<template>
    <div>
        sdassadsad
    </div>
</template>

<script>
export default {
    layout:'admin',
    head(){
		return {
			titleTemplate: '%s - 关于'
		};
	},
    mounted(){
        /**
         * 修改面包屑,一下方法都可以
         */
        //this.$store.commit('setBreadcrumb',['任务管理','关于']);
        //this.$store.commit('setBreadcrumb',[{name:'任务管理',path:'/admin/'},'关于']);
        this.$store.commit('setBreadcrumb',[{name:'任务管理',path:'/admin/'},{name:'关于'}]);
    }
}
</script>
