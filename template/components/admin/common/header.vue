<template>
    <el-col :span="24" class="panel-top">
        <el-col :span="20" class="f24">
            <div class="navbar-header pull-left pl20">
                <img src="~assets/admin/images/logo.png" alt="" class="logo round">
                <span>屏趣<i style="color:#20a0ff">管理后台</i></span>
            </div>

            <div class="pull-left pl20 pr20 pointer f20 navbar-header-btn" @click="fullScreens">
                <i class="el-icon-menu"></i>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="clearfix pull-right pointer" @click="logout">
                管理员
                <el-tooltip class="item tip-logout pl10" effect="dark" content="退出" placement="bottom">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                </el-tooltip>
            </div>
        </el-col>
    </el-col>
</template>

<script>
export default{
    //接收来自父组件的数据
    props:['isFullScreen'],
    methods:{
        //退出登录
		logout:function(){
			var _this=this;
			this.$confirm('确认退出吗?', '提示', {
				type: 'warning'
			}).then(() => {
				_this.$router.replace('/admin/login');
			}).catch(() => {

			});
		},
        fullScreens(){
            //触发当前实例上的事件
            this.$emit('fullTodo');
        }
    }
}
</script>
