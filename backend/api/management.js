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
  const today = new Date().toISOString().split('T')[0];
  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  const firstDay = firstDayOfMonth.toISOString().split('T')[0];
  
  // Use a single query with multiple CTEs for better performance
  const query = `
    WITH task_stats AS (
      SELECT COUNT(*) as pending_tasks FROM tasks WHERE completed = 0
    ),
    event_stats AS (
      SELECT COUNT(*) as todays_events FROM calendar_events WHERE DATE(start_time) = ?
    ),
    reminder_stats AS (
      SELECT COUNT(*) as active_reminders FROM reminders WHERE status = 'active'
    ),
    goal_stats AS (
      SELECT COUNT(*) as active_goals FROM business_goals WHERE status = 'active'
    ),
    financial_stats AS (
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses
      FROM financial_transactions 
      WHERE date >= ?
    )
    SELECT 
      t.pending_tasks,
      e.todays_events,
      r.active_reminders,
      g.active_goals,
      f.income as monthly_income,
      f.expenses as monthly_expenses,
      (f.income - f.expenses) as monthly_profit
    FROM task_stats t, event_stats e, reminder_stats r, goal_stats g, financial_stats f
  `;
  
  db.get(query, [today, firstDay], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Handle null values
    const stats = {
      pending_tasks: row.pending_tasks || 0,
      todays_events: row.todays_events || 0,
      active_reminders: row.active_reminders || 0,
      active_goals: row.active_goals || 0,
      monthly_income: row.monthly_income || 0,
      monthly_expenses: row.monthly_expenses || 0,
      monthly_profit: row.monthly_profit || 0
    };
    
    res.json(stats);
  });
});

module.exports = router;
