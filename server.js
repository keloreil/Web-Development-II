// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./event_db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

// ================= API  ==================
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

// Start the service
app.listen(PORT, () => {
  console.log(`✅ API : http://localhost:${PORT}`);
});
