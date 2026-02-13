const express = require('express');
const router = express.Router();
const db = require('../config/database');
const cache = require('../utils/cache');

// Get all contacts
router.get('/contacts', (req, res) => {
  const { contact_type } = req.query;
  let query = 'SELECT * FROM contacts WHERE 1=1';
  const params = [];

  if (contact_type) {
    query += ' AND contact_type = ?';
    params.push(contact_type);
  }

  query += ' ORDER BY name ASC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Create contact
router.post('/contacts', (req, res) => {
  const { name, email, phone, company, contact_type, notes } = req.body;
  
  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  const query = `
    INSERT INTO contacts (name, email, phone, company, contact_type, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [name, email, phone, company, contact_type, notes], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Contact created successfully' });
  });
});

// Update contact
router.put('/contacts/:id', (req, res) => {
  const { name, email, phone, company, contact_type, notes } = req.body;
  
  const query = `
    UPDATE contacts 
    SET name = COALESCE(?, name),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        company = COALESCE(?, company),
        contact_type = COALESCE(?, contact_type),
        notes = COALESCE(?, notes),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [name, email, phone, company, contact_type, notes, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.json({ message: 'Contact updated successfully' });
  });
});

// Delete contact
router.delete('/contacts/:id', (req, res) => {
  db.run('DELETE FROM contacts WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.json({ message: 'Contact deleted successfully' });
  });
});

// Get communication logs
router.get('/logs', (req, res) => {
  const { contact_id, communication_type, start_date, end_date, page, limit } = req.query;
  let query = 'SELECT cl.*, c.name as contact_name FROM communications_log cl LEFT JOIN contacts c ON cl.contact_id = c.id WHERE 1=1';
  const params = [];

  if (contact_id) {
    query += ' AND cl.contact_id = ?';
    params.push(contact_id);
  }
  if (communication_type) {
    query += ' AND cl.communication_type = ?';
    params.push(communication_type);
  }
  if (start_date) {
    query += ' AND cl.date_time >= ?';
    params.push(start_date);
  }
  if (end_date) {
    query += ' AND cl.date_time <= ?';
    params.push(end_date);
  }

  query += ' ORDER BY cl.date_time DESC';

  // Add pagination
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 50;
  const offset = (pageNum - 1) * limitNum;
  
  query += ' LIMIT ? OFFSET ?';
  params.push(limitNum, offset);

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Get total count for pagination metadata
    let countQuery = 'SELECT COUNT(*) as total FROM communications_log cl WHERE 1=1';
    const countParams = [];
    
    if (contact_id) {
      countQuery += ' AND cl.contact_id = ?';
      countParams.push(contact_id);
    }
    if (communication_type) {
      countQuery += ' AND cl.communication_type = ?';
      countParams.push(communication_type);
    }
    if (start_date) {
      countQuery += ' AND cl.date_time >= ?';
      countParams.push(start_date);
    }
    if (end_date) {
      countQuery += ' AND cl.date_time <= ?';
      countParams.push(end_date);
    }
    
    db.get(countQuery, countParams, (err, countRow) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.json({
        data: rows,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: countRow.total,
          totalPages: Math.ceil(countRow.total / limitNum)
        }
      });
    });
  });
});

// Create communication log
router.post('/logs', (req, res) => {
  const { contact_id, communication_type, subject, content, direction, date_time, follow_up_required, follow_up_date } = req.body;
  
  if (!communication_type || !date_time) {
    res.status(400).json({ error: 'Communication type and date_time are required' });
    return;
  }

  const query = `
    INSERT INTO communications_log (contact_id, communication_type, subject, content, direction, date_time, follow_up_required, follow_up_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [contact_id, communication_type, subject, content, direction, date_time, 
    follow_up_required || 0, follow_up_date], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Communication log created successfully' });
  });
});

// Get follow-ups
router.get('/follow-ups', (req, res) => {
  const query = `
    SELECT cl.*, c.name as contact_name 
    FROM communications_log cl 
    LEFT JOIN contacts c ON cl.contact_id = c.id 
    WHERE cl.follow_up_required = 1 AND cl.follow_up_date IS NOT NULL
    ORDER BY cl.follow_up_date ASC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get quick response templates
router.get('/templates', (req, res) => {
  const cacheKey = 'communication-templates';
  
  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }
  
  const templates = [
    {
      id: 1,
      name: 'Meeting Confirmation',
      subject: 'Meeting Confirmation',
      content: 'Thank you for scheduling a meeting. I confirm our appointment on [DATE] at [TIME]. Looking forward to speaking with you.'
    },
    {
      id: 2,
      name: 'Follow-up After Meeting',
      subject: 'Great connecting with you',
      content: 'It was great meeting with you today. As discussed, I will [ACTION ITEMS]. Please let me know if you have any questions.'
    },
    {
      id: 3,
      name: 'Introduction Email',
      subject: 'Introduction',
      content: 'Hello [NAME], my name is [YOUR NAME] and I [YOUR BACKGROUND]. I would love to connect with you about [TOPIC].'
    },
    {
      id: 4,
      name: 'Thank You Note',
      subject: 'Thank you',
      content: 'Thank you for [SPECIFIC ACTION]. I really appreciate your [TIME/HELP/SUPPORT].'
    }
  ];
  
  // Cache for 1 hour
  cache.set(cacheKey, templates, 3600000);
  
  res.json(templates);
});

module.exports = router;
