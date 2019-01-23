<template>
	<div class="header">
		<el-header style="text-align: right; font-size: 12px">
	      <el-dropdown @command="handleCommand">
	        <i class="el-icon-setting" style="margin-right: 15px"></i>
	        <el-dropdown-menu slot="dropdown">
	          <el-dropdown-item command='privateinfo'>
	          	<el-popover
				  placement="left"
				  width="400"
				  trigger="click">
				  <el-table :data="gridData">
				    <el-table-column width="100" property="username" label="用户名"></el-table-column>
				    <el-table-column width="100" property="password" label="密码"></el-table-column>
				    <el-table-column width="100" property="realname" label="实名"></el-table-column>
				  </el-table>
				  <el-button slot="reference">个人信息</el-button>
				</el-popover>
	          </el-dropdown-item>
	          <el-dropdown-item command='logout'>退出登录</el-dropdown-item>
	        </el-dropdown-menu>
	      </el-dropdown>
	      <span>{{ username }}</span>
	    </el-header>
	</div>
</template>
<script>
	export default{
		data() {
	      return {
	        gridData: [{
	          username: this.$store.state.userinfo.username,
	          password: this.$store.state.userinfo.password,
	          realname: this.$store.state.userinfo.realname
	        }]
	      };
	    },
		computed: {
			username() {
				return this.$store.state.userinfo.username
			}
		},
		methods: {
			handleCommand(command){
				console.log(command)
				// this.$message(command);
				if(command!='privateinfo'){
					this.$confirm('是否确定退出登录', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          this.$router.push('/login')
			          localStorage.removeItem('userinfo')
			          this.$message({
			            type: 'success',
			            message: '已退出!'
			          });
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消'
			          });          
			        });
				}
				else{
					// alert('privateinfo')
				}
			},
			logout(){
				
			},
			privateinfo(){

			}
		}
	}
</script>
<style>
	.header{
		width: 1061px;
	}
	.el-button{
		border: none !important;
	}
	.el-dropdown-menu__item{
		text-align: center;
		padding: 0 !important;
	}
</style>