# Assistant-1 🚀

**Your Personal Mentor and Assistant Dashboard**

A comprehensive self-reliant platform to help you launch and manage your business while handling daily life tasks. Built with modern web technologies and designed for entrepreneurs who need an all-in-one solution.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)

## 🌟 Features

### Core Modules

#### 📋 **Task Management**
- Create, edit, and organize tasks with priorities
- Track progress with completion status
- Support for subtasks and dependencies
- Filter by category, priority, and status
- Due dates and deadline tracking

#### 📅 **Calendar & Scheduling**
- Integrated calendar with multiple views
- Appointment scheduling and management
- Time blocking for focused work
- Meeting reminders and follow-ups
- Event categorization

#### 🔔 **Smart Reminders**
- Time-based and task-based reminders
- Recurring reminder support
- Snooze and reschedule options
- Priority notifications
- Multiple reminder categories

#### 💰 **Financial Management**
- Income and expense tracking
- Budget monitoring
- Financial goal setting
- Transaction categorization
- Monthly profit/loss reports
- Financial health indicators

#### 🎓 **Mentorship & Advice**
Access expert guidance on:
- Starting a business
- Marketing strategies
- Sales techniques
- Customer service
- Team building
- Scaling operations
- Daily motivational insights

#### 📊 **Business Planning Suite**
- Business plan templates and builder
- Goal setting framework
- SWOT analysis tools
- Progress tracking
- Milestone management

#### 💬 **Communications**
- Contact management
- Communication history logging
- Follow-up tracking
- Quick response templates

#### 📁 **Management Tools**
- Personal knowledge base
- Document organization
- Notes and action items
- Search and categorization

#### 🏪 **Restaurant Maintenance System** (NEW!)
Complete facility maintenance work order system for restaurant chains:
- **Store Manager Portal** - Submit maintenance requests with photos
- **Maintenance Provider Portal** - View and manage all work orders
- **Priority Management** - Critical, High, Medium, Low urgency levels
- **Status Tracking** - Pending → Assigned → In Progress → Completed
- **Categories** - Lighting, Equipment, HVAC, Plumbing, Safety, Upkeep
- **Photo Attachments** - Upload up to 5 images per work order
- **Real-time Updates** - Add notes and communicate on work orders
- **Advanced Filtering** - Search by status, priority, category, location
- **Role-based Access** - Store managers, maintenance providers, admins

📖 **[View Restaurant Maintenance Guide](./docs/restaurant-maintenance-guide.md)**

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Assistant-1.git
cd Assistant-1

# Install all dependencies (backend + frontend)
npm run install-all

# Seed the restaurant maintenance database
node backend/seedData.js

# Start the application
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- **Restaurant Maintenance**: http://localhost:3000/restaurant-maintenance

### First Run

1. Open http://localhost:3000 in your browser
2. Explore the dashboard to see your overview
3. Create your first task
4. Visit the Mentor module for business advice
5. Set up your financial tracking

## 📖 Documentation

- **[Setup Guide](./docs/setup.md)** - Detailed installation instructions
- **[User Guide](./docs/user-guide.md)** - Complete feature documentation
- **[API Documentation](./docs/api.md)** - Backend API reference

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Navigation
- **Axios** - API communication
- **CSS3** - Responsive styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **SQLite3** - Local-first database
- **CORS** - Cross-origin support

## 📁 Project Structure

```
Assistant-1/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── layouts/      # Layout components
│   │   └── utils/        # Utilities and API
│   └── public/           # Static assets
├── backend/              # Express backend
│   ├── api/             # API routes
│   ├── config/          # Configuration
│   ├── models/          # Data models
│   └── services/        # Business logic
├── database/            # SQLite database
│   └── schema/          # Database schemas
├── docs/                # Documentation
│   ├── setup.md
│   ├── user-guide.md
│   └── features/
└── tests/               # Test files
```

## 🎯 Development Roadmap

### Phase 1: MVP (Completed) ✅
- [x] Dashboard interface
- [x] Task management system
- [x] Calendar and scheduling
- [x] Reminders system
- [x] Basic financial tracking
- [x] Mentorship module
- [x] Documentation

### Phase 2: Enhanced Features (In Progress)
- [ ] Advanced calendar features
- [ ] Comprehensive financial reports
- [ ] Business plan builder
- [ ] Enhanced communications module
- [ ] Data export functionality

### Phase 3: Advanced Features (Planned)
- [ ] Automation rules
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Integration capabilities
- [ ] Multi-user support

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with passion for entrepreneurs
- Inspired by the need for comprehensive business management tools
- Thanks to the open-source community

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for entrepreneurs and small business owners** 
