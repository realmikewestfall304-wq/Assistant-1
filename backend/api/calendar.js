const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all calendar events
router.get('/', (req, res) => {
  const { start_date, end_date, event_type, page, limit } = req.query;
  let query = 'SELECT * FROM calendar_events WHERE 1=1';
  const params = [];

  if (start_date) {
    query += ' AND start_time >= ?';
    params.push(start_date);
  }
  if (end_date) {
    query += ' AND start_time <= ?';
    params.push(end_date);
  }
  if (event_type) {
    query += ' AND event_type = ?';
    params.push(event_type);
  }

  query += ' ORDER BY start_time ASC';

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
    let countQuery = 'SELECT COUNT(*) as total FROM calendar_events WHERE 1=1';
    const countParams = [];
    
    if (start_date) {
      countQuery += ' AND start_time >= ?';
      countParams.push(start_date);
    }
    if (end_date) {
      countQuery += ' AND start_time <= ?';
      countParams.push(end_date);
    }
    if (event_type) {
      countQuery += ' AND event_type = ?';
      countParams.push(event_type);
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

// Get single event
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM calendar_events WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    res.json(row);
  });
});

// Create event
router.post('/', (req, res) => {
  const { title, description, start_time, end_time, location, event_type, reminder_minutes } = req.body;
  
  if (!title || !start_time || !end_time) {
    res.status(400).json({ error: 'Title, start_time, and end_time are required' });
    return;
  }

  const query = `
    INSERT INTO calendar_events (title, description, start_time, end_time, location, event_type, reminder_minutes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [title, description, start_time, end_time, location, event_type || 'meeting', 
    reminder_minutes || 15], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Event created successfully' });
  });
});

// Update event
router.put('/:id', (req, res) => {
  const { title, description, start_time, end_time, location, event_type, reminder_minutes } = req.body;
  
  const query = `
    UPDATE calendar_events 
    SET title = COALESCE(?, title),
        description = COALESCE(?, description),
        start_time = COALESCE(?, start_time),
        end_time = COALESCE(?, end_time),
        location = COALESCE(?, location),
        event_type = COALESCE(?, event_type),
        reminder_minutes = COALESCE(?, reminder_minutes),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [title, description, start_time, end_time, location, event_type, reminder_minutes, req.params.id], 
    function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    res.json({ message: 'Event updated successfully' });
  });
});

// Delete event
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM calendar_events WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    res.json({ message: 'Event deleted successfully' });
  });
});

module.exports = router;
