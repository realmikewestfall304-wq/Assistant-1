const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const dbPath = path.join(__dirname, '../workorders.db');
const db = new Database(dbPath);

// Create work_orders table
db.exec(`
  CREATE TABLE IF NOT EXISTS work_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    attachment_filename TEXT,
    attachment_originalname TEXT,
    attachment_path TEXT,
    attachment_size INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  )
`);

console.log('✅ Database initialized at:', dbPath);

// Database operations
const workOrdersDB = {
  // Get all work orders
  getAll: () => {
    const stmt = db.prepare('SELECT * FROM work_orders ORDER BY created_at DESC');
    return stmt.all();
  },

  // Get work order by ID
  getById: (id) => {
    const stmt = db.prepare('SELECT * FROM work_orders WHERE id = ?');
    return stmt.get(id);
  },

  // Create new work order
  create: (workOrder) => {
    const stmt = db.prepare(`
      INSERT INTO work_orders (title, description, status, attachment_filename, 
                               attachment_originalname, attachment_path, attachment_size)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      workOrder.title,
      workOrder.description,
      workOrder.status || 'pending',
      workOrder.attachment?.filename || null,
      workOrder.attachment?.originalname || null,
      workOrder.attachment?.path || null,
      workOrder.attachment?.size || null
    );
    
    return result.lastInsertRowid;
  },

  // Update work order
  update: (id, workOrder) => {
    const stmt = db.prepare(`
      UPDATE work_orders 
      SET title = ?, description = ?, status = ?, 
          attachment_filename = ?, attachment_originalname = ?, 
          attachment_path = ?, attachment_size = ?,
          updated_at = datetime('now')
      WHERE id = ?
    `);
    
    const result = stmt.run(
      workOrder.title,
      workOrder.description,
      workOrder.status,
      workOrder.attachment?.filename || null,
      workOrder.attachment?.originalname || null,
      workOrder.attachment?.path || null,
      workOrder.attachment?.size || null,
      id
    );
    
    return result.changes;
  },

  // Delete work order
  delete: (id) => {
    const stmt = db.prepare('DELETE FROM work_orders WHERE id = ?');
    const result = stmt.run(id);
    return result.changes;
  },

  // Close database connection
  close: () => {
    db.close();
  }
};

module.exports = workOrdersDB;
