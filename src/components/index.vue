<template>
	<div class="index clearfix">
		<el-container style="height: 500px; border: 1px solid #eee">
		  <el-aside width="200px">
		  	<router-link to="/home">
		  		<div class="title">
		  			<h1>vuex管理系统</h1>
		  		</div>
		  	</router-link>
		    <el-menu :default-openeds="['1']" default-active='1' background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
		      <el-submenu index="1">
		        <template slot="title"><i class="el-icon-message"></i>账号管理</template>
		        <el-menu-item-group>
		          <el-menu-item index="userlist">账号列表</el-menu-item>
		          <el-menu-item index="useradd">添加账号</el-menu-item>
		          <el-menu-item index="updatepwd">修改密码</el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>
		      <el-submenu index="2">
		        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
		        <el-menu-item-group>
		          <el-menu-item index="2-1">选项1</el-menu-item>
		          <el-menu-item index="2-2">选项2</el-menu-item>
		          <el-menu-item index="2-3">选项3</el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>
		    </el-menu>
		  </el-aside>
		  
		  <el-container class="right">
		  	<Header></Header>
		    <!-- 路由出口 -->
		    <router-view></router-view>
		  </el-container>
		</el-container>
	</div>
</template>
		

<style>
  body,html,.index{
  	margin: 0;
  	padding: 0;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #545c64 !important;
  }
  .el-container{
  	height: 100% !important;
  }
  #app,body,html,.index{
  	height: 100%;
  }
  .title{
  	background-color: #444;
  	height: 70px;
  	line-height: 70px;
  	padding-left: 20px;
  	margin-top: -20px;
  	
  }
  a{
  	color: #fff;
  	text-decoration: none
  }
  .el-menu{
  	border: none !important;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .right{
		display: block !important;
		float: left;
	}
	.el-aside{
		float: left;
	}
</style>

<script>
  const Header = ()=> import('@/components/header')
  export default {
  	components: {
  		Header
  	}
  };
</script>