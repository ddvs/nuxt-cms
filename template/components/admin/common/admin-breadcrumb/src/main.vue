<template>
  <div class="page-header mb20">
    <div class="page-header-content">
      <div class="page-title">
        <h4>
          <i class="fa fa-arrow-circle-left position-left pointer" @click="$router.go(-1)">
          </i>
          <span class="text-semibold" v-text="ground"></span>
          <span v-text="nowPage"></span>
        </h4>
      </div>
    </div>
    <el-breadcrumb separator="/" class="breadcrumb-line pl20 pr20 h37">
      <el-breadcrumb-item :to="{ path: '/admin/' }">
        <i class="fa fa-home mr10"></i>首页
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="(data,index) in breadcrumb" :to="{path:data.path}" :key="index">
        <span v-text="data.name"></span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
// import ddvUiBreadcrumb from './ddv-ui-breadcrumb'
// import ddvUiBreadcrumbItem from './ddv-ui-breadcrumb-item'
export default {
  name: 'adminBreadcrumb',
  props: {
    'ground': {
      type: String
    },
    'nowPage': {
      type: String
    },
    'breadcrumb': {
      type: Array,
      default: []
    }
  }
  // components:{
  //   ddvUiBreadcrumb,
  //   ddvUiBreadcrumbItem
  // }
}
</script>
