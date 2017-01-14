import {mapState} from 'vuex';
import {get} from 'ddv-restful-api';
import _ from 'lodash';

export default{
	layout:'admin',
	head(){
		return {
			titleTemplate: '%s - 首页'
		};
	},
	data ({ req, res, d }) {
		// return get('/v1_0/xxxx',req,res).then(function(res){
		// 	res.name = req ? 'server' : 'client';
		// 	return res;
		// });
		console.log('6666',d);
		return {
			name: req ? 'server' : 'client',
			msg:'1484379264'
		};
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
		console.log(d.util.compactArray([1,'',2]));
		console.log(_.chunk(['a', 'b', 'c', 'd'], 3));
		this.$store.commit('setBreadcrumb',['任务管理','首页']);
		//console.log('路由',this.$route.path);
	}
};
