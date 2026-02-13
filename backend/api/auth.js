const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { verifyToken, JWT_SECRET } = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, password, role, store_name, email, phone } = req.body;

    // Validate required fields
    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Username, password, and role are required' });
    }

    // Validate role
    const validRoles = ['store_manager', 'maintenance_provider', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user into database
    const query = `
      INSERT INTO users (username, password_hash, role, store_name, email, phone)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [username, password_hash, role, store_name, email, phone], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'Username already exists' });
        }
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: this.lastID, username, role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: this.lastID,
          username,
          role,
          store_name,
          email,
          phone
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';

  db.get(query, [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    try {
      const validPassword = await bcrypt.compare(password, user.password_hash);

      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          store_name: user.store_name,
          email: user.email,
          phone: user.phone
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
});

// Get current user
router.get('/me', verifyToken, (req, res) => {
  const query = 'SELECT id, username, role, store_name, email, phone, created_at FROM users WHERE id = ?';

  db.get(query, [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  });
});

module.exports = router;
