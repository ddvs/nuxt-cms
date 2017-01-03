<template>
	<section class="container">
		<h1 class="title">
			{{ error.statusCode }}
		</h1>
		<h2 class="info">
			{{ error.message }}
		</h2>
		<nuxt-link class="button" to="/" v-if="error.statusCode === 404">
			Homepage
		</nuxt-link>
	</section>
</template>

<script>
export default {
	props: ['error'],
	head(){
		return {
			title:`屏趣 -- ${this.error.statusCode}`,
		    meta:[
		        {'charset': 'utf-8' },
				{'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
		        {'name':'renderer','content':'webkit'}
		    ]
		}
	}
}
</script>

<style scoped>
.title{
	margin-top: 15px;
	font-size: 5em;
	text-align: center;
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
