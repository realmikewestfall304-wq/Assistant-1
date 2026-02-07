const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all transactions
router.get('/transactions', (req, res) => {
  const { type, category, start_date, end_date } = req.query;
  let query = 'SELECT * FROM financial_transactions WHERE 1=1';
  const params = [];

  if (type) {
    query += ' AND type = ?';
    params.push(type);
  }
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (start_date) {
    query += ' AND date >= ?';
    params.push(start_date);
  }
  if (end_date) {
    query += ' AND date <= ?';
    params.push(end_date);
  }

  query += ' ORDER BY date DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Create transaction
router.post('/transactions', (req, res) => {
  const { type, category, amount, description, date, payment_method, invoice_number, client_name, tags } = req.body;
  
  if (!type || !category || !amount || !date) {
    res.status(400).json({ error: 'Type, category, amount, and date are required' });
    return;
  }

  const query = `
    INSERT INTO financial_transactions (type, category, amount, description, date, payment_method, invoice_number, client_name, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [type, category, amount, description, date, payment_method, invoice_number, client_name, tags], 
    function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Transaction created successfully' });
  });
});

// Update transaction
router.put('/transactions/:id', (req, res) => {
  const { type, category, amount, description, date, payment_method, invoice_number, client_name, tags } = req.body;
  
  const query = `
    UPDATE financial_transactions 
    SET type = COALESCE(?, type),
        category = COALESCE(?, category),
        amount = COALESCE(?, amount),
        description = COALESCE(?, description),
        date = COALESCE(?, date),
        payment_method = COALESCE(?, payment_method),
        invoice_number = COALESCE(?, invoice_number),
        client_name = COALESCE(?, client_name),
        tags = COALESCE(?, tags),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [type, category, amount, description, date, payment_method, invoice_number, 
    client_name, tags, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.json({ message: 'Transaction updated successfully' });
  });
});

// Delete transaction
router.delete('/transactions/:id', (req, res) => {
  db.run('DELETE FROM financial_transactions WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.json({ message: 'Transaction deleted successfully' });
  });
});

// Get financial summary
router.get('/summary', (req, res) => {
  const { start_date, end_date } = req.query;
  let dateFilter = '';
  const params = [];

  if (start_date) {
    dateFilter += ' AND date >= ?';
    params.push(start_date);
  }
  if (end_date) {
    dateFilter += ' AND date <= ?';
    params.push(end_date);
  }

  const query = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expenses,
      SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as net_profit
    FROM financial_transactions 
    WHERE 1=1 ${dateFilter}
  `;

  db.get(query, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Get all financial goals
router.get('/goals', (req, res) => {
  db.all('SELECT * FROM financial_goals ORDER BY deadline ASC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Create financial goal
router.post('/goals', (req, res) => {
  const { goal_name, target_amount, current_amount, deadline, category } = req.body;
  
  if (!goal_name || !target_amount) {
    res.status(400).json({ error: 'Goal name and target amount are required' });
    return;
  }

  const query = `
    INSERT INTO financial_goals (goal_name, target_amount, current_amount, deadline, category)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [goal_name, target_amount, current_amount || 0, deadline, category], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Financial goal created successfully' });
  });
});

// Update financial goal
router.put('/goals/:id', (req, res) => {
  const { goal_name, target_amount, current_amount, deadline, category, status } = req.body;
  
  const query = `
    UPDATE financial_goals 
    SET goal_name = COALESCE(?, goal_name),
        target_amount = COALESCE(?, target_amount),
        current_amount = COALESCE(?, current_amount),
        deadline = COALESCE(?, deadline),
        category = COALESCE(?, category),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [goal_name, target_amount, current_amount, deadline, category, status, req.params.id], 
    function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Financial goal not found' });
      return;
    }
    res.json({ message: 'Financial goal updated successfully' });
  });
});

module.exports = router;
