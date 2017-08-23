<template>
  <section>
    <h1 class="error-title" v-html="error.statusCode"></h1>
    <h2 class="info" v-if="error.statusCode === 404">
      抱歉，页面被外星人劫走了~~
    </h2>
    <h2 class="info" v-else v-html="error.message"></h2>
  </section>
</template>

<script>
import Vue from 'vue'
import d from 'ddv-util'
Vue.filter('d', d)

export default {
  props: ['error'],
  head () {
    return {
      title: `ddv -- ${this.error.statusCode}`,
      meta: [
        {'charset': 'utf-8'},
        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'},
        {'name': 'renderer', 'content': 'webkit'}
      ]
    }
  }
}
</script>

<style scoped>
.error-title{
  text-align: center;
  color: #fff;
  font-size: 150px;
  line-height: 1;
  margin: 100px 0 20px;
  font-weight: 300;
  text-stroke: 1px transparent;
  display: block;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,0.1), 0 0 5px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.3), 0 3px 5px rgba(0,0,0,0.2), 0 5px 10px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.2), 0 20px 20px rgba(0,0,0,0.15);
}
.info{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  text-align: center;
}
.button{
  margin-top: 50px;
}
</style>
