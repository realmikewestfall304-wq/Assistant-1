# Restaurant Facility Maintenance Work Order System

## Overview

A comprehensive web application for restaurant chain facility maintenance management. Store managers can submit detailed maintenance requests, and maintenance providers can view, manage, and coordinate solutions.

## Features

### For Store Managers
- **Submit Maintenance Requests** - Create detailed work orders with photos
- **Track Work Orders** - View status and updates on submitted requests
- **Priority Levels** - Set urgency from Low to Critical
- **Photo Attachments** - Upload up to 5 images per work order
- **Real-time Updates** - Receive notes and updates from maintenance providers

### For Maintenance Providers
- **Centralized Dashboard** - View all work orders across all stores
- **Advanced Filtering** - Filter by status, priority, category, and location
- **Work Order Management** - Update status, assign technicians, add notes
- **Status Workflow** - Track progress from Pending to Completed
- **Communication** - Add updates visible to store managers

## Categories

- **Lighting** - Bulbs, fixtures, electrical
- **Equipment** - Kitchen equipment, POS systems
- **HVAC** - Heating, cooling, ventilation
- **Plumbing** - Leaks, drains, fixtures
- **Upkeep** - Cleaning, painting, repairs
- **Safety** - Fire extinguishers, exits, hazards
- **Other** - Miscellaneous issues

## Priority Levels

- **Critical** 🔴 - Immediate attention required (safety hazard, business impact)
- **High** 🟠 - Important but not emergency
- **Medium** 🟡 - Standard maintenance
- **Low** 🟢 - Non-urgent, cosmetic

## Status Workflow

1. **Pending** - New request submitted
2. **Assigned** - Technician assigned
3. **In Progress** - Work has started
4. **Completed** - Work finished
5. **Closed** - Verified and closed

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Assistant-1.git
cd Assistant-1

# Install dependencies
npm install
cd frontend && npm install && cd ..

# Seed the database with sample data
node backend/seedData.js

# Start the application
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Restaurant Maintenance: http://localhost:3000/restaurant-maintenance

### First Time Setup

1. Navigate to http://localhost:3000/restaurant-maintenance
2. Use the demo credentials to log in (see below)
3. Explore the interface based on your role

### Demo Credentials

**Store Manager 1:**
- Username: `store1`
- Password: `password123`
- Store: Downtown Restaurant

**Store Manager 2:**
- Username: `store2`
- Password: `password123`
- Store: Westside Diner

**Maintenance Provider:**
- Username: `maintenance1`
- Password: `password123`
- Company: City Maintenance Services

**Admin:**
- Username: `admin`
- Password: `password123`

## User Guide

### For Store Managers

#### Submitting a Work Order

1. Log in with your store manager credentials
2. Click **"Submit New Request"** tab
3. Fill in the required fields:
   - Store Name and Address
   - Specific Location (e.g., "Kitchen", "Dining Room")
   - Category (select from dropdown)
   - Priority Level
   - Issue Title
   - Detailed Description
4. Optionally attach photos (up to 5)
5. Click **"Submit Work Order"**

#### Viewing Your Work Orders

1. Click **"My Work Orders"** tab
2. Use filters to find specific orders:
   - Filter by Status, Priority, or Category
   - Search by keywords
3. Click on any work order to view details
4. Add comments or notes as needed

### For Maintenance Providers

#### Viewing All Work Orders

1. Log in with maintenance provider credentials
2. View all work orders from all stores
3. Use filters to prioritize:
   - Status (Pending, Assigned, In Progress, Completed)
   - Priority (Critical, High, Medium, Low)
   - Category
   - Search by keywords

#### Managing a Work Order

1. Click on any work order to view details
2. In the **"Manage Work Order"** sidebar:
   - Update the Status
   - Assign to a technician (or yourself)
   - Click **"Update Work Order"**
3. Add notes and updates in the timeline
4. Mark as Completed when work is done

#### Adding Updates

1. Open a work order
2. Scroll to **"Updates & Notes"**
3. Type your update in the text area
4. Click **"Add Update"**
5. Updates are visible to the store manager

## API Documentation

### Authentication

#### Register User
```
POST /api/auth/register
Body: {
  username, password, role, 
  store_name, email, phone
}
```

#### Login
```
POST /api/auth/login
Body: { username, password }
Returns: { token, user }
```

#### Get Current User
```
GET /api/auth/me
Headers: { Authorization: Bearer <token> }
```

### Work Orders

#### Get All Work Orders
```
GET /api/work-orders?status=&priority=&category=&search=
Headers: { Authorization: Bearer <token> }
```

#### Get Single Work Order
```
GET /api/work-orders/:id
Headers: { Authorization: Bearer <token> }
```

#### Create Work Order
```
POST /api/work-orders
Headers: { Authorization: Bearer <token> }
Content-Type: multipart/form-data
Body: FormData with work order fields and photos
```

#### Update Work Order
```
PUT /api/work-orders/:id
Headers: { Authorization: Bearer <token> }
Body: { status, assigned_to, priority, etc. }
```

#### Add Update/Note
```
POST /api/work-orders/:id/updates
Headers: { Authorization: Bearer <token> }
Body: { update_text }
```

#### Upload Attachment
```
POST /api/work-orders/:id/upload
Headers: { Authorization: Bearer <token> }
Content-Type: multipart/form-data
Body: FormData with photo file
```

### Users

#### Get All Users (Admin Only)
```
GET /api/users
Headers: { Authorization: Bearer <token> }
```

#### Get Technicians
```
GET /api/users/technicians
Headers: { Authorization: Bearer <token> }
```

## Security

- **Password Hashing** - All passwords are hashed with bcrypt
- **JWT Authentication** - Token-based session management
- **Role-Based Access** - Different permissions for each role
- **Input Validation** - All inputs are validated and sanitized
- **File Upload Security** - Restricted to images only, 5MB limit

## Technology Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- CSS3 with responsive design

### Backend
- Node.js with Express
- SQLite3 database
- Bcrypt for password hashing
- JSON Web Tokens (JWT)
- Multer for file uploads

## Database Schema

### Users Table
```sql
- id (PRIMARY KEY)
- username (UNIQUE)
- password_hash
- role (store_manager, maintenance_provider, admin)
- store_name
- email
- phone
- created_at
```

### Work Orders Table
```sql
- id (PRIMARY KEY)
- store_name
- store_address
- location_details
- category
- priority
- title
- description
- status
- submitted_by (FOREIGN KEY -> users.id)
- assigned_to (FOREIGN KEY -> users.id)
- created_at
- updated_at
- completed_at
```

### Work Order Updates Table
```sql
- id (PRIMARY KEY)
- work_order_id (FOREIGN KEY -> work_orders.id)
- user_id (FOREIGN KEY -> users.id)
- update_text
- created_at
```

### Attachments Table
```sql
- id (PRIMARY KEY)
- work_order_id (FOREIGN KEY -> work_orders.id)
- file_name
- file_path
- uploaded_at
```

## Screenshots

### Login Page
![Login Page](https://github.com/user-attachments/assets/3be69076-c780-407a-9e00-6453a155be2f)

### Store Manager Dashboard
![Store Dashboard](https://github.com/user-attachments/assets/92d25652-edac-4528-bcd5-7512b0ff2a56)

### Submit Work Order Form
![Submit Form](https://github.com/user-attachments/assets/f1fca526-1b48-43ab-88c3-84572ab15146)

### Work Order Details
![Work Order Details](https://github.com/user-attachments/assets/5c53b22f-6225-4486-95e2-b04e46dafd55)

### Maintenance Provider Dashboard
![Maintenance Dashboard](https://github.com/user-attachments/assets/d6080a65-dc9d-44a8-b394-16410f7f4e04)

### Maintenance Provider Work Order Management
![Maintenance Details](https://github.com/user-attachments/assets/6f94ca9e-4832-4a2e-9a01-813d46f3b82b)

## Troubleshooting

### Database Issues
If you encounter database errors, delete the database file and re-run the seed script:
```bash
rm database/assistant.db
node backend/seedData.js
```

### Port Conflicts
If ports 3000 or 5000 are in use, you can change them:
- Backend: Set `PORT` environment variable
- Frontend: Edit `frontend/package.json` proxy setting

### File Upload Issues
Ensure the `uploads/work-orders/` directory exists and has write permissions.

## License

MIT License

## Support

For issues or questions, please open an issue on GitHub.
