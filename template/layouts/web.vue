<template>
	<div>
		<nuxt/>
	</div>
</template>

<script>
import Vue from 'Vue';
import d from 'ddv-util';
Vue.filter('d',d);
	export default {
		head(){
			return{
				title:'屏趣',
				meta:[
			        {'charset': 'utf-8' },
					{'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'},
			        {'name':'renderer','content':'webkit'}
			    ]
			}
		}
	}
</script>
