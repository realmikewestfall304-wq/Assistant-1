const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const db = require('../config/database');
const { verifyToken, requireRole } = require('../middleware/auth');
const { apiLimiter, uploadLimiter } = require('../middleware/rateLimiter');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/work-orders/');
  },
  filename: (req, file, cb) => {
    // Use crypto for secure random filename
    const uniqueSuffix = crypto.randomBytes(16).toString('hex');
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Get all work orders with optional filters
router.get('/', apiLimiter, verifyToken, (req, res) => {
  const { status, priority, category, store_name, search } = req.query;
  
  let query = `
    SELECT wo.*, 
           u1.username as submitted_by_username,
           u2.username as assigned_to_username,
           u2.store_name as assigned_to_store
    FROM work_orders wo
    LEFT JOIN users u1 ON wo.submitted_by = u1.id
    LEFT JOIN users u2 ON wo.assigned_to = u2.id
    WHERE 1=1
  `;
  
  const params = [];

  // Filter by user role
  if (req.user.role === 'store_manager') {
    query += ' AND wo.submitted_by = ?';
    params.push(req.user.id);
  }

  if (status) {
    query += ' AND wo.status = ?';
    params.push(status);
  }

  if (priority) {
    query += ' AND wo.priority = ?';
    params.push(priority);
  }

  if (category) {
    query += ' AND wo.category = ?';
    params.push(category);
  }

  if (store_name) {
    query += ' AND wo.store_name LIKE ?';
    params.push(`%${store_name}%`);
  }

  if (search) {
    query += ' AND (wo.title LIKE ? OR wo.description LIKE ? OR wo.store_name LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY wo.created_at DESC';

  db.all(query, params, (err, workOrders) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    res.json({ workOrders });
  });
});

// Get single work order by ID
router.get('/:id', apiLimiter, verifyToken, (req, res) => {
  const query = `
    SELECT wo.*, 
           u1.username as submitted_by_username,
           u1.email as submitted_by_email,
           u1.phone as submitted_by_phone,
           u2.username as assigned_to_username,
           u2.email as assigned_to_email
    FROM work_orders wo
    LEFT JOIN users u1 ON wo.submitted_by = u1.id
    LEFT JOIN users u2 ON wo.assigned_to = u2.id
    WHERE wo.id = ?
  `;

  db.get(query, [req.params.id], (err, workOrder) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!workOrder) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    // Get attachments
    db.all('SELECT * FROM attachments WHERE work_order_id = ?', [req.params.id], (err, attachments) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      // Get updates/notes
      db.all(`
        SELECT wou.*, u.username 
        FROM work_order_updates wou
        JOIN users u ON wou.user_id = u.id
        WHERE wou.work_order_id = ?
        ORDER BY wou.created_at DESC
      `, [req.params.id], (err, updates) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({
          workOrder,
          attachments,
          updates
        });
      });
    });
  });
});

// Create new work order
router.post('/', uploadLimiter, verifyToken, upload.array('photos', 5), (req, res) => {
  const {
    store_name,
    store_address,
    location_details,
    category,
    priority,
    title,
    description
  } = req.body;

  // Validate required fields
  if (!store_name || !category || !priority || !title || !description) {
    return res.status(400).json({ 
      error: 'Required fields: store_name, category, priority, title, description' 
    });
  }

  const query = `
    INSERT INTO work_orders (
      store_name, store_address, location_details, 
      category, priority, title, description, submitted_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [store_name, store_address, location_details, category, priority, title, description, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      const workOrderId = this.lastID;

      // Save attachments if any
      if (req.files && req.files.length > 0) {
        const attachmentQuery = 'INSERT INTO attachments (work_order_id, file_name, file_path) VALUES (?, ?, ?)';
        
        req.files.forEach(file => {
          db.run(attachmentQuery, [workOrderId, file.originalname, file.path], (err) => {
            if (err) {
              console.error('Error saving attachment:', err);
            }
          });
        });
      }

      res.status(201).json({
        message: 'Work order created successfully',
        workOrderId: workOrderId
      });
    }
  );
});

// Update work order
router.put('/:id', apiLimiter, verifyToken, (req, res) => {
  const { status, assigned_to, priority, title, description } = req.body;
  
  let query = 'UPDATE work_orders SET updated_at = CURRENT_TIMESTAMP';
  const params = [];

  if (status) {
    query += ', status = ?';
    params.push(status);
    
    // If completed, set completed_at
    if (status === 'completed') {
      query += ', completed_at = CURRENT_TIMESTAMP';
    }
  }

  if (assigned_to !== undefined) {
    query += ', assigned_to = ?';
    params.push(assigned_to);
  }

  if (priority) {
    query += ', priority = ?';
    params.push(priority);
  }

  if (title) {
    query += ', title = ?';
    params.push(title);
  }

  if (description) {
    query += ', description = ?';
    params.push(description);
  }

  query += ' WHERE id = ?';
  params.push(req.params.id);

  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    res.json({ message: 'Work order updated successfully' });
  });
});

// Add update/note to work order
router.post('/:id/updates', apiLimiter, verifyToken, (req, res) => {
  const { update_text } = req.body;

  if (!update_text) {
    return res.status(400).json({ error: 'Update text is required' });
  }

  const query = 'INSERT INTO work_order_updates (work_order_id, user_id, update_text) VALUES (?, ?, ?)';

  db.run(query, [req.params.id, req.user.id, update_text], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    res.status(201).json({
      message: 'Update added successfully',
      updateId: this.lastID
    });
  });
});

// Upload attachment to existing work order
router.post('/:id/upload', uploadLimiter, verifyToken, upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const query = 'INSERT INTO attachments (work_order_id, file_name, file_path) VALUES (?, ?, ?)';

  db.run(query, [req.params.id, req.file.originalname, req.file.path], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    res.status(201).json({
      message: 'Attachment uploaded successfully',
      attachmentId: this.lastID,
      file: {
        name: req.file.originalname,
        path: req.file.path
      }
    });
  });
});

module.exports = router;
