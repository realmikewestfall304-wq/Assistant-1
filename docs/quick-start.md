# Assistant-1 Quick Start Guide

Get up and running with Assistant-1 in minutes!

## 🚀 Installation (5 minutes)

### Step 1: Install Dependencies
```bash
cd Assistant-1
npm run install-all
```

### Step 2: Start the Application
```bash
npm run dev
```

The application will start on:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📝 Your First 5 Minutes

### 1. Explore the Dashboard (30 seconds)
- Open http://localhost:3000
- Notice your daily motivation quote
- View the statistics cards (all zeros to start)
- Check out the financial summary
- Browse the quick action buttons

### 2. Create Your First Task (1 minute)
1. Click **"✓ Tasks"** in the sidebar OR click **"Add Task"** quick action
2. Click **"+ New Task"** button
3. Fill in:
   - **Title**: "Set up my business plan"
   - **Priority**: High
   - **Category**: Business
   - **Due Date**: Tomorrow
4. Click **"Create Task"**
5. See your task appear in the list!

### 3. Get Business Advice (1 minute)
1. Click **"🎓 Mentor"** in the sidebar
2. Click **"Starting A Business"** topic
3. Read through the validation advice
4. Try other topics like "Marketing" or "Sales"
5. Bookmark useful articles mentally

### 4. Check Dashboard Stats (30 seconds)
1. Return to the **Dashboard**
2. Notice "Pending Tasks" now shows 1
3. Your dashboard is now personalized!

### 5. Explore Other Modules (2 minutes)
- **📅 Calendar**: Schedule events and appointments
- **🔔 Reminders**: Set important reminders
- **💰 Financial**: Track income and expenses
- **📊 Business Plan**: Create business plans and goals
- **💬 Communications**: Manage contacts
- **📁 Management**: Store notes and documents

## 🎯 Common Tasks

### Creating Multiple Tasks
1. Go to Tasks module
2. Click **"+ New Task"** for each task
3. Use different priorities:
   - **Urgent**: Must do today
   - **High**: Important, due soon
   - **Medium**: Regular priority
   - **Low**: Can wait

### Filtering Tasks
- Click **"All Tasks"** to see everything
- Click **"Pending"** to see active tasks
- Click **"Completed"** to see finished tasks

### Completing a Task
- Check the checkbox next to any task
- Task moves to completed status
- Dashboard stats update automatically

### Editing a Task
1. Click **"Edit"** on any task
2. Modify the fields
3. Click **"Update Task"**

### Deleting a Task
1. Click **"Delete"** on any task
2. Confirm deletion
3. Task is removed permanently

## 💡 Pro Tips

### Daily Routine
**Morning (5 minutes)**
1. Check dashboard for today's priorities
2. Review pending tasks
3. Read your daily motivation
4. Check financial summary

**Throughout Day**
- Mark tasks complete as you finish them
- Log new tasks as they come up
- Quick glance at dashboard for priorities

**Evening (3 minutes)**
1. Review completed tasks
2. Update task statuses
3. Plan tomorrow's priorities

### Weekly Planning (15 minutes)
**Every Sunday or Monday:**
1. Review all pending tasks
2. Set priorities for the week
3. Create new tasks for weekly goals
4. Read 1-2 mentorship articles
5. Update financial transactions
6. Review business goals progress

### Navigation Shortcuts
- Click sidebar icons to navigate
- Click **"Assistant-1"** logo to return to dashboard
- Use the **"‹"** button to collapse/expand sidebar
- Quick actions on dashboard for common tasks

### Getting Business Advice
**When Starting Out:**
- Read "Starting A Business" section first
- Follow the validation advice
- Use the business plan templates

**When Growing:**
- Check "Marketing" for customer acquisition
- Review "Sales" for closing techniques
- Read "Scaling" for growth strategies

**When Managing:**
- Reference "Team Building" for hiring
- Check "Customer Service" for retention
- Review "Sales" for pipeline management

## 🆘 Troubleshooting

### Application Won't Start
```bash
# Stop any running processes
# Check if ports 3000 and 5000 are free
# Try restarting
npm run dev
```

### Database Issues
```bash
# Delete and recreate database
rm database/assistant.db
npm run server
```

### Module Installation Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
cd frontend && npm install
```

## 📚 Learn More

- **[Setup Guide](./setup.md)** - Detailed installation
- **[User Guide](./user-guide.md)** - Complete feature docs
- **[Features Directory](./features/)** - Module-specific guides

## 🎓 Learning Path

### Week 1: Basics
- [ ] Create and complete 5 tasks
- [ ] Read 3 mentorship articles
- [ ] Explore all dashboard modules
- [ ] Set up your first financial goal

### Week 2: Business Planning
- [ ] Create a business plan outline
- [ ] Set 3 business goals
- [ ] Add 5 contacts
- [ ] Log 3 communications

### Week 3: Daily Operations
- [ ] Use task management daily
- [ ] Track all financial transactions
- [ ] Schedule week's appointments
- [ ] Review progress on goals

### Month 1: Full Integration
- [ ] Complete daily dashboard review
- [ ] Active task management workflow
- [ ] Regular financial tracking
- [ ] Weekly mentorship article reading
- [ ] Monthly progress review

## 🌟 Success Tips

1. **Start Small**: Don't try to use everything at once
2. **Be Consistent**: Use it daily, even if just for 5 minutes
3. **Customize**: Adapt the system to your workflow
4. **Iterate**: Refine your process as you learn
5. **Stay Focused**: Use mentorship content when stuck

## 📈 Measuring Success

After 1 week, you should:
- ✅ Have completed several tasks
- ✅ Know where to find all modules
- ✅ Be comfortable creating and editing tasks
- ✅ Have read at least 2 mentorship articles

After 1 month, you should:
- ✅ Use the dashboard daily
- ✅ Have an active task list
- ✅ Track your finances regularly
- ✅ Reference mentorship content often
- ✅ Feel more organized and focused

## 🎉 Ready to Go!

You're all set! Open http://localhost:3000 and start building your business with Assistant-1 as your personal mentor and assistant.

**Remember**: The best assistant is one you actually use. Start simple, build the habit, and let it grow with you.

---

**Questions?** Check the [User Guide](./user-guide.md) or [Setup Guide](./setup.md) for more details.
