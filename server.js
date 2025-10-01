// server.js
const express = require('express');
const cors = require('cors');
const db = require('./event_db'); // 引入数据库连接

const app = express();
app.use(cors());
app.use(express.json());

// 根路由
app.get('/', (req, res) => {
  res.send('API 正常运行中 🚀');
});

// 获取所有活动类别
app.get('/api/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 获取所有组织
app.get('/api/organizations', (req, res) => {
  db.query('SELECT * FROM organizations', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 获取当前和未来活动（首页）
app.get('/api/events', (req, res) => {
  const sql = `
    SELECT e.*, c.category_name, o.organization_name
    FROM events e
    LEFT JOIN categories c ON e.category_id = c.category_id
    LEFT JOIN organizations o ON e.organization_id = o.organization_id
    WHERE e.is_active = 1 AND e.event_datetime >= NOW()
    ORDER BY e.event_datetime ASC
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
    SELECT e.*, c.category_name, o.organization_name, o.contact_details
    FROM events e
    LEFT JOIN categories c ON e.category_id = c.category_id
    LEFT JOIN organizations o ON e.organization_id = o.organization_id
    WHERE e.event_id = ?
  `;
  db.query(sql, [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(results[0]);
  });
});

// 搜索活动（日期、地点、类别可选）
app.get('/api/search', (req, res) => {
  const { date, location, category_id } = req.query;
  let sql = `
    SELECT e.*, c.category_name, o.organization_name
    FROM events e
    LEFT JOIN categories c ON e.category_id = c.category_id
    LEFT JOIN organizations o ON e.organization_id = o.organization_id
    WHERE e.is_active = 1
  `;
  const params = [];

  if (date) {
    sql += ' AND DATE(e.event_datetime) = ?';
    params.push(date);
  }
  if (location) {
    sql += ' AND e.location LIKE ?';
    params.push(`%${location}%`);
  }
  if (category_id) {
    sql += ' AND e.category_id = ?';
    params.push(category_id);
  }

  sql += ' ORDER BY e.event_datetime ASC';

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 启动服务
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ API 已启动: http://localhost:${PORT}`);
});
