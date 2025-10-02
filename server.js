// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./event_db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 静态资源
app.use(express.static(__dirname));

// ================= API 路由 ==================
// 获取所有活动
app.get('/api/events', (req, res) => {
  const sql = `
    SELECT 
      e.event_id,
      e.event_name,
      e.event_datetime,
      e.location,
      e.ticket_price,
      e.goal_amount,
      e.current_amount,
      c.category_name,
      o.organization_name,
      o.contact_details
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    JOIN organizations o ON e.organization_id = o.organization_id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 启动服务
app.listen(PORT, () => {
  console.log(`✅ API 已启动: http://localhost:${PORT}`);
});
