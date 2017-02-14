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
  // data(context){
  //   return d.api.data(context,(data, addData, {req, res}) => {
  //     addData({})
  //     return d.get('v1_0/xxx').send({})
  //     .then(res => {
  //
  //     })
  //   })
  // },
  mounted(){
      /**
       * 修改面包屑,一下方法都可以
       */
      this.$store.commit('setBreadcrumb',['任务管理','关于']);
      //this.$store.commit('setBreadcrumb',[{name:'任务管理',path:'/admin/'},'关于']);
      //this.$store.commit('setBreadcrumb',[{name:'任务管理',path:'/admin/'},{name:'关于'}]);
  }
}
</script>
