<template>
	<div class="useradd">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	      <el-form-item label="用户名" prop="username">
	        <el-input v-model="ruleForm.username"></el-input>
	      </el-form-item>
	      <el-form-item label="密码" prop="password">
	        <el-input type="password" v-model="ruleForm.password"></el-input>
	      </el-form-item>
	      <el-form-item label="实名" prop="realname">
	        <el-input v-model="ruleForm.realname"></el-input>
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
	          username: '',
	          password: '',
	          realname: ''
	        },
	        rules: {
	          username: [
	            { required: true, message: '请输入用户名', trigger: 'blur' },
	            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
	          ],
	          password: [
	            { required: true, message: '请输入密码', trigger: 'blur' },
	            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
	          ],
	          realname: [
	            { required: true, message: '请输入实名', trigger: 'blur' }
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
	            console.log(_this.ruleForm.username)
	            this.$axios.post('/api/useradd',{
	            	params: {
	            		username: _this.ruleForm.username,
	            		password: _this.ruleForm.password,
	            		realname: _this.ruleForm.realname
	            	}
	            }).then(res=>{
	            	if(res.code = 200){
	            		_this.$message({
		                  message: '添加用户成功',
		                  type: 'success'
		                });
	            	}else{
	            		_this.$message.error('添加用户失败QAQ');
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
	.useradd{
		margin: 50px 100px;
		width: 600px;
	}
</style>