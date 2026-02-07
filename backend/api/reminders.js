const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all reminders
router.get('/', (req, res) => {
  const { status, priority, category } = req.query;
  let query = 'SELECT * FROM reminders WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  if (priority) {
    query += ' AND priority = ?';
    params.push(priority);
  }
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  query += ' ORDER BY reminder_time ASC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get single reminder
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM reminders WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Reminder not found' });
      return;
    }
    res.json(row);
  });
});

// Create reminder
router.post('/', (req, res) => {
  const { title, description, reminder_time, reminder_type, priority, category, recurring } = req.body;
  
  if (!title || !reminder_time) {
    res.status(400).json({ error: 'Title and reminder_time are required' });
    return;
  }

  const query = `
    INSERT INTO reminders (title, description, reminder_time, reminder_type, priority, category, recurring)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [title, description, reminder_time, reminder_type || 'time-based', 
    priority || 'medium', category, recurring], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Reminder created successfully' });
  });
});

// Update reminder
router.put('/:id', (req, res) => {
  const { title, description, reminder_time, reminder_type, priority, category, recurring, status, snoozed_until } = req.body;
  
  const query = `
    UPDATE reminders 
    SET title = COALESCE(?, title),
        description = COALESCE(?, description),
        reminder_time = COALESCE(?, reminder_time),
        reminder_type = COALESCE(?, reminder_type),
        priority = COALESCE(?, priority),
        category = COALESCE(?, category),
        recurring = COALESCE(?, recurring),
        status = COALESCE(?, status),
        snoozed_until = COALESCE(?, snoozed_until),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [title, description, reminder_time, reminder_type, priority, category, recurring, 
    status, snoozed_until, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Reminder not found' });
      return;
    }
    res.json({ message: 'Reminder updated successfully' });
  });
});

// Delete reminder
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM reminders WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Reminder not found' });
      return;
    }
    res.json({ message: 'Reminder deleted successfully' });
  });
});

// Snooze reminder
router.post('/:id/snooze', (req, res) => {
  const { minutes } = req.body;
  
  if (!minutes) {
    res.status(400).json({ error: 'Minutes parameter is required' });
    return;
  }

  const snoozedUntil = new Date(Date.now() + minutes * 60000).toISOString();
  
  db.run('UPDATE reminders SET snoozed_until = ?, status = ? WHERE id = ?', 
    [snoozedUntil, 'snoozed', req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Reminder not found' });
      return;
    }
    res.json({ message: 'Reminder snoozed successfully', snoozed_until: snoozedUntil });
  });
});

module.exports = router;
