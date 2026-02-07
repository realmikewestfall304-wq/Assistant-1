const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all business plans
router.get('/plans', (req, res) => {
  db.all('SELECT * FROM business_plans ORDER BY updated_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get single business plan
router.get('/plans/:id', (req, res) => {
  db.get('SELECT * FROM business_plans WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Business plan not found' });
      return;
    }
    res.json(row);
  });
});

// Create business plan
router.post('/plans', (req, res) => {
  const { plan_name, plan_type, content, status } = req.body;
  
  if (!plan_name) {
    res.status(400).json({ error: 'Plan name is required' });
    return;
  }

  const query = `
    INSERT INTO business_plans (plan_name, plan_type, content, status)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [plan_name, plan_type, content, status || 'draft'], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Business plan created successfully' });
  });
});

// Update business plan
router.put('/plans/:id', (req, res) => {
  const { plan_name, plan_type, content, status } = req.body;
  
  const query = `
    UPDATE business_plans 
    SET plan_name = COALESCE(?, plan_name),
        plan_type = COALESCE(?, plan_type),
        content = COALESCE(?, content),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [plan_name, plan_type, content, status, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Business plan not found' });
      return;
    }
    res.json({ message: 'Business plan updated successfully' });
  });
});

// Delete business plan
router.delete('/plans/:id', (req, res) => {
  db.run('DELETE FROM business_plans WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Business plan not found' });
      return;
    }
    res.json({ message: 'Business plan deleted successfully' });
  });
});

// Get all business goals
router.get('/goals', (req, res) => {
  const { status, goal_type } = req.query;
  let query = 'SELECT * FROM business_goals WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  if (goal_type) {
    query += ' AND goal_type = ?';
    params.push(goal_type);
  }

  query += ' ORDER BY target_date ASC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Create business goal
router.post('/goals', (req, res) => {
  const { goal_title, description, goal_type, target_date, progress } = req.body;
  
  if (!goal_title) {
    res.status(400).json({ error: 'Goal title is required' });
    return;
  }

  const query = `
    INSERT INTO business_goals (goal_title, description, goal_type, target_date, progress)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [goal_title, description, goal_type, target_date, progress || 0], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Business goal created successfully' });
  });
});

// Update business goal
router.put('/goals/:id', (req, res) => {
  const { goal_title, description, goal_type, target_date, progress, status } = req.body;
  
  const query = `
    UPDATE business_goals 
    SET goal_title = COALESCE(?, goal_title),
        description = COALESCE(?, description),
        goal_type = COALESCE(?, goal_type),
        target_date = COALESCE(?, target_date),
        progress = COALESCE(?, progress),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [goal_title, description, goal_type, target_date, progress, status, req.params.id], 
    function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Business goal not found' });
      return;
    }
    res.json({ message: 'Business goal updated successfully' });
  });
});

// Get business plan templates
router.get('/templates', (req, res) => {
  const templates = [
    {
      id: 1,
      name: 'Traditional Business Plan',
      type: 'full',
      sections: [
        'Executive Summary',
        'Company Description',
        'Market Analysis',
        'Organization and Management',
        'Service or Product Line',
        'Marketing and Sales',
        'Funding Request',
        'Financial Projections',
        'Appendix'
      ]
    },
    {
      id: 2,
      name: 'Lean Startup Plan',
      type: 'lean',
      sections: [
        'Problem',
        'Solution',
        'Key Metrics',
        'Unique Value Proposition',
        'Unfair Advantage',
        'Channels',
        'Customer Segments',
        'Cost Structure',
        'Revenue Streams'
      ]
    },
    {
      id: 3,
      name: 'One-Page Business Plan',
      type: 'simple',
      sections: [
        'Vision',
        'Mission',
        'Objectives',
        'Strategies',
        'Action Plans'
      ]
    }
  ];
  
  res.json(templates);
});

// Get SWOT analysis template
router.get('/swot-template', (req, res) => {
  const template = {
    title: 'SWOT Analysis',
    description: 'Analyze your business Strengths, Weaknesses, Opportunities, and Threats',
    sections: {
      strengths: {
        title: 'Strengths',
        description: 'Internal positive attributes and advantages',
        questions: [
          'What do you do well?',
          'What unique resources do you have?',
          'What advantages do you have over competitors?'
        ]
      },
      weaknesses: {
        title: 'Weaknesses',
        description: 'Internal negative attributes and disadvantages',
        questions: [
          'What could you improve?',
          'What resources are you lacking?',
          'What do competitors do better than you?'
        ]
      },
      opportunities: {
        title: 'Opportunities',
        description: 'External factors you could exploit to your advantage',
        questions: [
          'What market trends could benefit you?',
          'Are there gaps in the market?',
          'What technology could you leverage?'
        ]
      },
      threats: {
        title: 'Threats',
        description: 'External factors that could cause trouble',
        questions: [
          'What obstacles do you face?',
          'What are your competitors doing?',
          'Are there emerging threats to your business?'
        ]
      }
    }
  };
  
  res.json(template);
});

module.exports = router;
