const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ 在这里添加静态资源托管
// 假设你的目录结构是 backend/server.js，frontend/ 在 backend 上一级
app.use(express.static(__dirname));


const db = require('./event_db');
// ================= API 路由 ==================
// 示例：获取所有活动
app.get('/api/events', (req, res) => {
  db.query(
    `SELECT e.event_id, e.event_name, e.event_datetime, e.location, e.ticket_price,
            c.category_name, o.organization_name
     FROM events e
     JOIN categories c ON e.category_id = c.category_id
     JOIN organizations o ON e.organization_id = o.organization_id`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.json(results);
    }
  );
});

// ================= 启动服务 ==================
app.listen(PORT, () => {
  console.log(`✅ API 已启动: http://localhost:${PORT}`);
});
