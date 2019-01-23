<template>
  <div class="loginForm">
    <p class="name"><i class="el-icon-setting"></i>vue管理系统</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
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
            this.$axios.post('/api/checklogin',{
              params:{
                username: _this.ruleForm.username,
                password: _this.ruleForm.password
              }
            })
            .then(res=>{
              if(res.data.length){
                // 把当前用户数据存入state
                console.log('后台响应数据:',res.data[0])
                _this.$store.commit('SAVE_USERINFO',res.data[0])
                _this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                // 跳转到首页
                _this.$router.push('/home')
              }else{
                this.$message.error('用户名或密码错误')
              }
            })
          } else {
            this.$message.error('请输入格式正确的用户名和密码')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body,#app,html{
  margin: 0;
  padding: 0;
}
.loginForm{
  position: absolute;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
  border: 1px solid #aaa;
  padding: 30px 50px 10px 0;
  border-radius: 15px;
  background-color: #fff;
}
.name{
  color: #555;
  margin: 0;
  padding: 0 20px 20px;
  font-weight: 700
}
i{
  font-weight: 700
}
</style>
