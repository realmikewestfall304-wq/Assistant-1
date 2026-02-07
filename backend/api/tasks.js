const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all tasks
router.get('/', (req, res) => {
  const { category, status, priority } = req.query;
  let query = 'SELECT * FROM tasks WHERE 1=1';
  const params = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  if (priority) {
    query += ' AND priority = ?';
    params.push(priority);
  }

  query += ' ORDER BY due_date ASC, priority DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get single task
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(row);
  });
});

// Create task
router.post('/', (req, res) => {
  const { title, description, priority, category, status, due_date, parent_task_id } = req.body;
  
  if (!title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  const query = `
    INSERT INTO tasks (title, description, priority, category, status, due_date, parent_task_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [title, description, priority || 'medium', category || 'personal', 
    status || 'pending', due_date, parent_task_id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Task created successfully' });
  });
});

// Update task
router.put('/:id', (req, res) => {
  const { title, description, priority, category, status, due_date, completed, parent_task_id } = req.body;
  
  const query = `
    UPDATE tasks 
    SET title = COALESCE(?, title),
        description = COALESCE(?, description),
        priority = COALESCE(?, priority),
        category = COALESCE(?, category),
        status = COALESCE(?, status),
        due_date = COALESCE(?, due_date),
        completed = COALESCE(?, completed),
        parent_task_id = COALESCE(?, parent_task_id),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [title, description, priority, category, status, due_date, completed, parent_task_id, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json({ message: 'Task updated successfully' });
  });
});

// Delete task
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

// Get subtasks
router.get('/:id/subtasks', (req, res) => {
  db.all('SELECT * FROM tasks WHERE parent_task_id = ?', [req.params.id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;
