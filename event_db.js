// event_db.js
const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          
  password: '1121',      
  database: 'charityevents_db'
});


db.connect(err => {
  if (err) {
    console.error(' 数据库连接失败: ', err);
  } else {
    console.log(' 数据库连接成功');
  }
});


module.exports = db;
