const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken, requireRole } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', verifyToken, requireRole('admin'), (req, res) => {
  const query = 'SELECT id, username, role, store_name, email, phone, created_at FROM users';

  db.all(query, [], (err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ users });
  });
});

// Get maintenance providers/technicians
router.get('/technicians', verifyToken, (req, res) => {
  const query = `
    SELECT id, username, email, phone, store_name 
    FROM users 
    WHERE role = 'maintenance_provider'
  `;

  db.all(query, [], (err, technicians) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ technicians });
  });
});

module.exports = router;
