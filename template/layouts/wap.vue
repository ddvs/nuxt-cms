<style src="mint-ui/lib/style.css" lang="css"></style>
<template>
	<div>
		<nuxt/>
	</div>
</template>

<script>
import Vue from 'vue';
import Mint from 'mint-ui';
import { mapState } from 'vuex';
Vue.use(Mint);


export default {
	head(){
		return {
			title:'屏趣',
		    meta:[
		        {'charset': 'utf-8' },
		        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
		        {'name':'renderer','content':'webkit|ie-stand|ie-comp'},
                {'name':'apple-mobile-web-app-capable','content':'yes'},
                {'name':'apple-mobile-web-app-status-bar-style','content':'black'},
                {'name':'format-detection','content':'telephone=no,email=no'},
                {'name':'msapplication-tap-highlight','content':'no'},
				{'name':'flexible','content':'initial-dpr=2,maximum-dpr=3'}
		    ]
		}
	}
};
</script>
