const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all knowledge base entries
router.get('/knowledge', (req, res) => {
  const { category, search } = req.query;
  let query = 'SELECT * FROM knowledge_base WHERE 1=1';
  const params = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (search) {
    query += ' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  query += ' ORDER BY updated_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get single knowledge base entry
router.get('/knowledge/:id', (req, res) => {
  db.get('SELECT * FROM knowledge_base WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Knowledge base entry not found' });
      return;
    }
    res.json(row);
  });
});

// Create knowledge base entry
router.post('/knowledge', (req, res) => {
  const { title, content, category, tags } = req.body;
  
  if (!title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  const query = `
    INSERT INTO knowledge_base (title, content, category, tags)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [title, content, category, tags], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Knowledge base entry created successfully' });
  });
});

// Update knowledge base entry
router.put('/knowledge/:id', (req, res) => {
  const { title, content, category, tags } = req.body;
  
  const query = `
    UPDATE knowledge_base 
    SET title = COALESCE(?, title),
        content = COALESCE(?, content),
        category = COALESCE(?, category),
        tags = COALESCE(?, tags),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [title, content, category, tags, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Knowledge base entry not found' });
      return;
    }
    res.json({ message: 'Knowledge base entry updated successfully' });
  });
});

// Delete knowledge base entry
router.delete('/knowledge/:id', (req, res) => {
  db.run('DELETE FROM knowledge_base WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Knowledge base entry not found' });
      return;
    }
    res.json({ message: 'Knowledge base entry deleted successfully' });
  });
});

// Get dashboard statistics
router.get('/dashboard/stats', (req, res) => {
  const stats = {};
  let completed = 0;
  let total = 5; // Total number of queries

  // Get tasks count
  db.get('SELECT COUNT(*) as count FROM tasks WHERE completed = 0', [], (err, row) => {
    if (!err) stats.pending_tasks = row.count;
    if (++completed === total) res.json(stats);
  });

  // Get today's events
  const today = new Date().toISOString().split('T')[0];
  db.get('SELECT COUNT(*) as count FROM calendar_events WHERE DATE(start_time) = ?', [today], (err, row) => {
    if (!err) stats.todays_events = row.count;
    if (++completed === total) res.json(stats);
  });

  // Get active reminders
  db.get('SELECT COUNT(*) as count FROM reminders WHERE status = ?', ['active'], (err, row) => {
    if (!err) stats.active_reminders = row.count;
    if (++completed === total) res.json(stats);
  });

  // Get active business goals
  db.get('SELECT COUNT(*) as count FROM business_goals WHERE status = ?', ['active'], (err, row) => {
    if (!err) stats.active_goals = row.count;
    if (++completed === total) res.json(stats);
  });

  // Get this month's financial summary
  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  const firstDay = firstDayOfMonth.toISOString().split('T')[0];
  
  db.get(`
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses
    FROM financial_transactions 
    WHERE date >= ?
  `, [firstDay], (err, row) => {
    if (!err) {
      stats.monthly_income = row.income || 0;
      stats.monthly_expenses = row.expenses || 0;
      stats.monthly_profit = (row.income || 0) - (row.expenses || 0);
    }
    if (++completed === total) res.json(stats);
  });
});

module.exports = router;
