<template>
	<div class="updatepwd">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="原密码" prop="oldpassword">
	        <el-input type="password" v-model="ruleForm.oldpassword"></el-input>
	      </el-form-item>
	      <el-form-item label="新密码" prop="password">
	        <el-input type="password" v-model="ruleForm.password"></el-input>
	      </el-form-item>
	      <el-form-item label="确认密码" prop="subpassword">
	        <el-input type="password" v-model="ruleForm.subpassword"></el-input>
	      </el-form-item>
	      <el-form-item>
	        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
	        <el-button @click="resetForm('ruleForm')">重置</el-button>
	      </el-form-item>
	    </el-form>
	</div>
</template>
<script>
	export default{
		data() {
	      return {
	        ruleForm: {
	          password: '',
	          subpassword: '',
	          oldpassword: ''
	        },
	        rules: {
	          oldpassword: [
	            { required: true, message: '请输入密码', trigger: 'blur' },
	            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
	          ],
	          password: [
	            { required: true, message: '请输入密码', trigger: 'blur' },
	            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
	          ],
	          subpassword: [
	            { required: true, message: '请确认密码', trigger: 'blur' }
	          ]
	        }
	      };
	    },
	    methods: {
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            // 保留this
	            let _this = this
	            this.$axios.post('/api/updatepwd',{
	            	params: {
	            		username: _this.$store.state.userinfo.username,
	            		id: _this.$store.state.userinfo.id,
	            		password: _this.ruleForm.password,
	            		oldpassword: _this.ruleForm.oldpassword
	            	}
	            }).then(res=>{
	            	if(res.code = 200){
	            		this.$message({
				          showClose: true,
				          message: '修改成功啦',
				          type: 'success'
				        });
	            	}
	            	else{
	            		this.$message.error('修改失败了o(╥﹏╥)o')
	            	}
	            })
	          } else {
	            this.$message.error('请输入格式正确的信息')
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
	    }
	}
</script>
<style scoped>
	.updatepwd{
		margin: 50px 100px;
		width: 600px;
	}
</style>