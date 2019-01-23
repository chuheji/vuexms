<template>
	<div class="userlist">
		<div>
			<div class="listcard">
				<el-card class="box-card">
	  				<div slot="header" class="clearfix">
	    				<span>账号列表</span>
	    				<el-button
	    				  style="float: right; padding: 3px 0"
	    				  type="text"
						  @click="addUser()"
	    				>添加</el-button>
	  				</div>
	  				<el-table
				    :data="tableData"
				    style="width: 100%"
				    height="300">
				    <el-table-column
				      fixed
				      prop="id"
				      label="编号"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      prop="username"
				      label="姓名"
				      width="150">
				    </el-table-column>
				    <el-table-column
				      prop="realname"
				      label="实名"
				      width="150">
				    </el-table-column>
				    <el-table-column label="操作">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="handleEdit(scope.row.id)">修改</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="handleDelete(scope.row.id)">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
				</el-card>
			</div>
		</div>
	</div>
	
</template>
<script>
	import { mapState,mapActions } from 'vuex'
	export default{
		data() {
	      return {
	        tableData: []
	      }
	    },
		methods: {
			...mapActions([
				'GET_USERLIST'
			]),
			getIdx(){
				this.tableData.id = 1
			},
      		handleEdit(id) {
        		console.log('修改',id);
      		},
      		handleDelete(id) {
      			this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	let _this = this
		        	console.log(id)
		        	this.$axios.post('/api/del',{
		        		params: {
		        			id: id
		        		}
		        	}).then((res)=>{
		        		if(res.code = 200){
		        			this.$message({
					            type: 'success',
					            message: '删除成功!'
				            });
		        			setTimeout(function(){
		        				history.go(0)
		        			},200) 
		        		}
		        		else{
		        			this.$message.error('删除失败了(ಥ﹏ಥ)')
		        		}
      				})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
      		}
    	},
    	computed: {
    		...mapState({
    			userlist : state=> state.userlist
    		})
    	},
    	created(){
    		this.GET_USERLIST().then(()=>{
    			this.tableData = this.userlist
    			this.tableData.idx = 1
    			console.log(this.tableData)
    		})
    	}
	}
</script>
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 800px;
    height: 400px;
  }
  .listcard{
  	margin: 40px 100px;
  }
</style>