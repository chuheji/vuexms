const mysql = require('mysql');
// 创建数据库连接
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'xlf112233',
  database : 'vuexms'
});
 
module.exports = connection