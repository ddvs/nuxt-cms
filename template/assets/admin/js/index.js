import {mapState} from 'vuex';
import {get} from 'ddv-restful-api';
export default{
	layout:'admin',
	head(){
		return {
			titleTemplate: '%s - 首页'
		};
	},
	data ({ req, res }) {
		return get('/v1_0/pc/raiders/news/type',req,res).then(function(res){
			res.name = req ? 'server' : 'client';
			return res;
		});
		//return {
		//	name: req ? 'server' : 'client'
		//};
	},
	methods: {
      	open() {
        	this.$message('这是一条消息提示');
      	}
  	},
	computed:mapState({
		storeData : state => state.admin
    }),
	mounted(){
		this.$store.commit('setBreadcrumb',['任务管理','首页']);
		//console.log('路由',this.$route.path);
		console.log(this.storeData);
		console.log(1111,this);
		console.log(this.$data);
	}
};
