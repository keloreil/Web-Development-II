// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./event_db'); // 你自己的数据库连接配置

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 静态文件服务 (前端 html/js/css)
app.use(express.static(__dirname));

// ================= API ==================

// 获取所有活动
app.get('/api/events', (req, res) => {
  const sql = `
    SELECT 
      e.event_id AS id,
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
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 获取单个活动详情
app.get('/api/events/:id', (req, res) => {
  const eventId = req.params.id;
  const sql = `
    SELECT 
      e.event_id AS id,
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
    WHERE e.event_id = ?
  `;
  db.query(sql, [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Event not found" });
    res.json(results[0]);
  });
});

// 获取所有类别
app.get('/api/categories', (req, res) => {
  const sql = `SELECT category_id AS id, category_name FROM categories`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 获取所有组织
app.get('/api/organizations', (req, res) => {
  const sql = `SELECT organization_id AS id, organization_name, contact_details FROM organizations`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ================= Start Server =================
app.listen(PORT, () => {
  console.log(`✅ API is running at: http://localhost:${PORT}`);
});
