<template>
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed:mapState({
		storeData : state => state.admin,
		breadcrumbTitle(){
			return this.storeData.breadcrumb.slice(this.storeData.breadcrumb.length-2,this.storeData.breadcrumb.length)
		},
		ground(){
			if(this.storeData.breadcrumb.length === 1){
				let obj = this.storeData.breadcrumb[0];
				return obj.name
			}else if(this.storeData.breadcrumb.length >= 2){
				let obj = this.storeData.breadcrumb[this.storeData.breadcrumb.length-2]
				return obj.name
			}
			return ''
		},
		nowPage(){
			if(this.storeData.breadcrumb.length >= 2){
				let obj = this.storeData.breadcrumb[this.storeData.breadcrumb.length-1]
				return ` - ${obj.name}`
			}
			return ''
		}
  })
}
</script>
