import {mapState} from 'vuex';
import {get} from 'ddv-restful-api';
import _ from 'lodash';
import tool from '~plugins/util.js';

export default{
	layout:'admin',
	head(){
		return {
			titleTemplate: '%s - 首页'
		};
	},
	data ({ req, res }) {
		// return get('/v1_0/xxxx',req,res).then(function(res){
		// 	res.name = req ? 'server' : 'client';
		// 	return res;
		// });
		return {
			name: req ? 'server' : 'client',
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
		var p = [0, 1, false, 2, '', 3];
		tool.compactArray(p);
		console.log(p);
		
		console.log(_.chunk(['a', 'b', 'c', 'd'], 3));
		this.$store.commit('setBreadcrumb',['任务管理','首页']);
		//console.log('路由',this.$route.path);
	}
};
