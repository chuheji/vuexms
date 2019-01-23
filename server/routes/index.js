const express = require('express');
const router = express.Router();
const connection = require('./conn')
const md5 = require('blueimp-md5')

// 连接数据库
connection.connect(()=>{
	console.log('数据库连接成功')
})
/* 检查用户名密码是否正确. */
router.post('/checklogin',(req, res)=> {
  // res.send('1');
  let { username,password } = req.body.params
  // 定义sql语句
  let loginsql = `select * from user where username='${username}' and password='${password}'`
  connection.query(loginsql,(err,data)=>{
  	if(err){
  		throw err
      res.send('用户名或密码错误')
  	}
  	else{
  		res.send(data)
  	}
  })
  console.log(username,password)
  // res.send(username,password)
});
// 获取用户列表
router.get('/getusers',(req,res)=>{
  let getsql = 'select * from user'
  connection.query(getsql,(err,data)=>{
    if(err){
      throw err
    }
    else{
      res.send(data)
    }
  })
})
// 添加用户
router.post('/useradd',(req,res)=>{
  let { username,password,realname } = req.body.params
  let addsql = `INSERT INTO user(id,username,password,realname) VALUES(0,?,?,?)`
  let addSqlParams = [`${username}`, `${password}`,`${realname}`];
  connection.query(addsql,addSqlParams,(err,data)=>{
    if(err){
      throw err
    }
    else{
      res.send(data)
    }
  })
})
// 修改密码
router.post('/updatepwd',(req,res)=>{
  let { id,oldpassword,password,username } = req.body.params
  let getsql = `select * from user where username=? and password=?`
  let updatesql = `UPDATE user SET password = ? WHERE id = ?`
  let getParams = ['${username}','${oldpassword}']
  let updateParams = [`${password}`,`${id}`]
  connection.query(getsql,getParams,(err,data)=>{
    if(err){
      throw err
    }
    else{
      connection.query(updatesql,updateParams,(err,data)=>{
        if(err){
          throw err
        }
        else{
          res.send(data)
        }
      })
    }
  })
  
})
// 删除用户
router.post('/del',(req,res)=>{
  let { id } = req.body.params
  // console.log(${id})
  let delsql = `DELETE FROM user WHERE id = '${id}'`
  connection.query(delsql,(err,data)=>{
    if(err){
      throw err
    }
    else{
      res.send(data)
    }
  })
})
module.exports = router;
