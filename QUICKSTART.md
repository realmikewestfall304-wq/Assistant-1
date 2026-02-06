# Quick Start Guide

## Getting Started in 3 Steps

### 1. Run the Demo
See what the assistant can do:
```bash
python3 demo.py
```

### 2. Start Using the Assistant
Launch the interactive application:
```bash
python3 assistant.py
```

### 3. Explore the Features

#### Create Your First Task
1. Choose option `1` (Add Task)
2. Enter a task title
3. Add a description (optional)
4. Set priority (high/medium/low)

#### Set a Reminder
1. Choose option `4` (Add Reminder)
2. Enter reminder message
3. Set time (format: YYYY-MM-DD HH:MM)

#### Schedule an Appointment
1. Choose option `10` (Add Appointment)
2. Enter appointment title
3. Set date/time
4. Add location and notes (optional)

## Example Workflow

**Morning Routine:**
1. Check Dashboard (option 14) - See everything at a glance
2. Plan Workload (option 7) - Get recommended task order
3. Review Appointments (option 11) - Know what's coming up

**During the Day:**
- Add tasks as they come up (option 1)
- Complete tasks as you finish them (option 3)
- Log calls after important conversations (option 12)
- Create social media ads when needed (option 8)

**End of Day:**
- Check Dashboard (option 14) - Review progress
- Set reminders for tomorrow (option 4)

## Tips

- Use **high priority** for urgent tasks
- Set reminders at least 30 minutes before important events
- Log all client calls for better record keeping
- Review your workload plan daily
- Check the dashboard frequently to stay organized

## Data Storage

Your data is automatically saved to `assistant_data.json`. This file:
- Saves automatically after every change
- Persists between sessions
- Can be backed up by copying the file
- Can be shared across devices

## Need Help?

Run the demo to see examples:
```bash
python3 demo.py
```

View test coverage:
```bash
python3 test_assistant.py
```

Read the full documentation in [README.md](README.md)
