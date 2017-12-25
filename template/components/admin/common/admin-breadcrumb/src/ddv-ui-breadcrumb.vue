<template>
  <div class="ddvui-breadcrumb">
    <slot></slot>
  </div>
</template>
<style src="./ddv-ui-breadcrumb.css"/>

<script>
  export default {
//    name: 'ddvuireadcrumb',
    props: {
      separator: {
        type: String,
        default: '/'
      }
    }
  };
</script>

