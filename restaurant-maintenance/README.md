# Restaurant Maintenance Work Order System

A complete backend API for managing restaurant facility maintenance work orders with SQLite database persistence and file upload support.

## Features

- ✅ Full CRUD operations for work orders with database persistence
- ✅ File attachment support for work orders
- ✅ Automatic creation of uploads directory
- ✅ RESTful API design
- ✅ Input validation and error handling
- ✅ Rate limiting for API security
- ✅ CORS support for cross-origin requests
- ✅ Comprehensive test suite

## System Status

**✅ COMPLETED AND READY FOR TESTING**

All core features have been implemented and tested:
- Database persistence using SQLite (better-sqlite3)
- Complete CRUD operations working correctly
- File uploads functional with proper storage
- 27/27 tests passing in the comprehensive test suite

## Installation

```bash
cd restaurant-maintenance/backend
npm install
```

## Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5001` by default.

## Testing

### Run the comprehensive test suite:
```bash
bash api-test-suite.sh
```

This will run 27 tests covering:
- Health checks and connectivity
- GET operations (list and retrieve)
- POST operations (create with validation)
- PUT operations (update)
- DELETE operations (remove)
- File uploads
- Status transitions
- Security features (rate limiting, CORS)
- Edge cases

### Run the upload directory tests:
```bash
bash test-upload-directory.sh
```

## Database Schema

The system uses SQLite with the following schema:

```sql
CREATE TABLE work_orders (
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
);
```

### Status Values
- `pending` - Work order has been created but not started
- `in-progress` - Work is currently being performed
- `completed` - Work has been finished

## API Endpoints

### Health Check
- **GET** `/api/health` - Check server status and uploads directory

**Example:**
```bash
curl http://localhost:5001/api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Restaurant Maintenance API is running",
  "uploadsDir": "/path/to/uploads",
  "uploadsDirExists": true
}
```

### Work Orders

#### List All Work Orders
- **GET** `/api/work-orders` - List all work orders

**Example:**
```bash
curl http://localhost:5001/api/work-orders
```

**Response:**
```json
{
  "message": "Work orders retrieved successfully",
  "count": 2,
  "workOrders": [
    {
      "id": 1,
      "title": "Fix ice machine",
      "description": "Not cooling properly",
      "status": "pending",
      "attachment_filename": null,
      "attachment_originalname": null,
      "attachment_path": null,
      "attachment_size": null,
      "created_at": "2026-02-13 10:00:00",
      "updated_at": "2026-02-13 10:00:00"
    }
  ]
}
```

#### Get Specific Work Order
- **GET** `/api/work-orders/:id` - Get a specific work order

**Example:**
```bash
curl http://localhost:5001/api/work-orders/1
```

**Response:**
```json
{
  "message": "Work order retrieved successfully",
  "workOrder": {
    "id": 1,
    "title": "Fix ice machine",
    "description": "Not cooling properly",
    "status": "pending",
    "created_at": "2026-02-13 10:00:00",
    "updated_at": "2026-02-13 10:00:00"
  }
}
```

#### Create Work Order
- **POST** `/api/work-orders` - Create a new work order (with optional file attachment)

**Required Fields:**
- `title` (string) - Work order title

**Optional Fields:**
- `description` (string) - Detailed description
- `status` (string) - Status (pending, in-progress, completed)
- `attachment` (file) - File attachment

**Example without attachment:**
```bash
curl -X POST http://localhost:5001/api/work-orders \
  -F "title=Fix ice machine" \
  -F "description=Not cooling properly" \
  -F "status=pending"
```

**Example with attachment:**
```bash
curl -X POST http://localhost:5001/api/work-orders \
  -F "title=Fix ice machine" \
  -F "description=Not cooling properly" \
  -F "status=pending" \
  -F "attachment=@/path/to/file.pdf"
```

**Response:**
```json
{
  "message": "Work order created successfully",
  "workOrder": {
    "id": 1,
    "title": "Fix ice machine",
    "description": "Not cooling properly",
    "status": "pending",
    "attachment_filename": "attachment-123456789-987654321.pdf",
    "attachment_originalname": "file.pdf",
    "attachment_path": "/path/to/uploads/attachment-123456789-987654321.pdf",
    "attachment_size": 2048,
    "created_at": "2026-02-13 10:00:00",
    "updated_at": "2026-02-13 10:00:00"
  }
}
```

#### Update Work Order
- **PUT** `/api/work-orders/:id` - Update a work order (with optional file attachment)

**Example:**
```bash
curl -X PUT http://localhost:5001/api/work-orders/1 \
  -F "status=in-progress"
```

**Response:**
```json
{
  "message": "Work order updated successfully",
  "workOrder": {
    "id": 1,
    "title": "Fix ice machine",
    "description": "Not cooling properly",
    "status": "in-progress",
    "updated_at": "2026-02-13 10:30:00"
  }
}
```

#### Delete Work Order
- **DELETE** `/api/work-orders/:id` - Delete a work order

**Example:**
```bash
curl -X DELETE http://localhost:5001/api/work-orders/1
```

**Response:**
```json
{
  "message": "Work order deleted successfully",
  "id": "1"
}
```

### File Uploads

Work orders support file attachments via multipart form data. Use the `attachment` field to upload a file. Files are:
- Stored in the `uploads/` directory
- Given unique names to prevent conflicts (timestamp + random number)
- Automatically deleted when the associated work order is deleted

### Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "message": "Detailed error information"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Uploads Directory

The system automatically creates the `uploads/` directory on server startup if it doesn't exist. This ensures that file uploads work correctly from the first request without manual directory creation.

The directory creation is:
- **Idempotent**: Safe to run multiple times
- **Recursive**: Creates parent directories if needed
- **Automatic**: No manual setup required

## Environment Variables

- `PORT` - Server port (default: 5001)

## Security Features

- **Rate Limiting**: API endpoints are rate-limited to 100 requests per 15 minutes per IP address
- **CORS**: Cross-origin requests are enabled
- **File Storage**: Uploaded files are stored with unique names to prevent conflicts
- **Input Validation**: Required fields are validated before processing

## Files and Directories

```
backend/
├── api/
│   ├── database.js         # Database operations layer
│   └── workOrders.js       # Work orders API routes
├── uploads/                # File uploads directory (gitignored)
│   └── .gitkeep
├── server.js               # Main server file
├── package.json            # Dependencies
├── .gitignore             # Git ignore rules
├── api-test-suite.sh      # Comprehensive test suite
└── test-upload-directory.sh # Upload directory tests
```

## Manual Testing Workflow

1. Start the server:
   ```bash
   npm start
   ```

2. Check health:
   ```bash
   curl http://localhost:5001/api/health
   ```

3. Create a work order:
   ```bash
   curl -X POST http://localhost:5001/api/work-orders \
     -F "title=Test Work Order" \
     -F "description=This is a test" \
     -F "status=pending"
   ```

4. List all work orders:
   ```bash
   curl http://localhost:5001/api/work-orders
   ```

5. Update the work order:
   ```bash
   curl -X PUT http://localhost:5001/api/work-orders/1 \
     -F "status=completed"
   ```

6. Delete the work order:
   ```bash
   curl -X DELETE http://localhost:5001/api/work-orders/1
   ```

## Troubleshooting

### Server won't start
- Check if port 5001 is already in use: `lsof -i :5001`
- Check server logs for error messages
- Verify all dependencies are installed: `npm install`

### File uploads fail
- Ensure uploads directory exists and is writable
- Check disk space availability
- Verify file size is reasonable (very large files may fail)

### Database errors
- The database file (`workorders.db`) is created automatically
- If corrupted, delete it and restart the server to recreate

## Next Steps

The system is now **complete and ready for testing**. Potential future enhancements could include:

- Frontend UI for managing work orders
- User authentication and authorization
- Email notifications for work order updates
- Scheduled maintenance tracking
- Work order priority levels
- Assignment to specific technicians
- Integration with existing restaurant management systems

## License

MIT
