// event_db.js
const mysql = require('mysql2');

// 1️⃣ 创建数据库连接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // ⚠️ 改成你自己的 MySQL 用户名
  password: '1121',      // ⚠️ 改成你自己的 MySQL 密码
  database: 'charityevents_db'
});

// 2️⃣ 测试连接
db.connect(err => {
  if (err) {
    console.error('❌ 数据库连接失败: ', err);
  } else {
    console.log('✅ 数据库连接成功');
  }
});

// 3️⃣ 导出数据库连接供 server.js 使用
module.exports = db;
