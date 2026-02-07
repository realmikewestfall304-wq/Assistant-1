# Quick Start Guide - Business Mentor Agent

## What You Have Now

A fully functional business mentor and office assistant that:
1. Provides direct, honest business advice (no sugar coating)
2. Manages emails, calls, appointments, quotes, and paperwork
3. Can be run locally or deployed to production

## Immediate Steps to Get Started

### 1. Set Up Your Environment (2 minutes)

```bash
# Make sure you're in the project directory
cd /path/to/Assistant-1

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Try It Out (1 minute)

```bash
# Get the help menu
python cli.py help

# View your dashboard
python cli.py dashboard

# Ask for business advice
python cli.py mentor "Should I hire more staff?"

# Schedule an appointment
python cli.py appointment schedule "Client Call" "2026-02-10 14:00"
```

### 3. Configure for Production (5 minutes)

```bash
# Copy the environment template
cp .env.example .env

# Edit with your settings (optional for basic use)
nano .env  # or use your favorite editor
```

## What Each File Does

| File | Purpose |
|------|---------|
| `business_mentor.py` | Main agent code - business mentor & office manager |
| `agent_config.py` | Configuration settings - personality, tasks, integrations |
| `cli.py` | Command-line interface - run the agent from terminal |
| `requirements.txt` | Python dependencies to install |
| `.env.example` | Template for environment variables |
| `README.md` | Complete documentation |
| `DEPLOYMENT.md` | Detailed deployment instructions |

## Core Commands You'll Use

### Business Mentorship
```bash
# Get direct, honest business advice
python cli.py mentor "Your question here"

# Examples:
python cli.py mentor "Is it time to raise prices?"
python cli.py mentor "Should I fire my underperforming team member?"
python cli.py mentor "How do I handle this difficult client?"
```

### Office Tasks
```bash
# Dashboard - see everything at a glance
python cli.py dashboard

# Appointments
python cli.py appointment list
python cli.py appointment schedule "Meeting Name" "2026-02-15 09:00"

# Emails (coming soon with integrations)
python cli.py email list

# Quotes
python cli.py quote create

# Paperwork
python cli.py paperwork organize
```

## Using in Your Own Code

```python
from business_mentor import IntegratedAssistant

# Initialize
assistant = IntegratedAssistant()

# Get business mentorship
response = assistant.process_request(
    "mentor",
    query="Should I expand internationally?",
    context={"revenue": 500000, "employees": 10}
)
print(response["response"])

# Manage office tasks
appointment = assistant.office_manager.manage_appointments(
    "schedule",
    title="Board Meeting",
    datetime="2026-03-01 10:00",
    duration=90
)
```

## Agent Personality

This agent is configured to be:
- **DIRECT**: No beating around the bush
- **HONEST**: The truth, even when it hurts
- **ACTIONABLE**: Always gives you next steps
- **REALISTIC**: No false promises or inflated timelines

Example response format:
```
SITUATION ANALYSIS: [What's really going on]
THE HARD TRUTH: [What you need to hear]
ACTION PLAN: [Specific steps to take]
TIMELINE: [Realistic expectations]
SUCCESS METRICS: [How to measure progress]
```

## Customization

### Change Agent Personality
Edit `agent_config.py` - look for `BUSINESS_MENTOR_PROMPT`

### Add Your Own Commands
Edit `cli.py` - add new command handlers

### Configure Integrations
Edit `.env` - add your API keys and credentials

### Adjust Task Settings
Edit `agent_config.py` - modify `TASK_CATEGORIES` and `AUTOMATION_RULES`

## Next Steps

### For Basic Use
1. Run `python cli.py dashboard` daily
2. Use `python cli.py mentor` when making decisions
3. Track appointments with `python cli.py appointment`

### For Production Deployment
1. Read `DEPLOYMENT.md`
2. Set up integrations (email, calendar, etc.)
3. Configure `.env` file
4. Deploy to server or cloud

### For Development
1. Review `business_mentor.py` to understand the code
2. Check `agent_config.py` for all settings
3. Modify to suit your specific needs
4. Add your own features

## Common Questions

**Q: Do I need API keys to use this?**
A: No, the basic version works without any external APIs. Integrations are optional.

**Q: Can I change the agent's personality?**
A: Yes! Edit the `BUSINESS_MENTOR_PROMPT` in `agent_config.py`.

**Q: How do I add email integration?**
A: See the "Email Integration" section in `DEPLOYMENT.md`.

**Q: Can I use this with my team?**
A: Yes, deploy to a server and share access. See `DEPLOYMENT.md`.

**Q: Is my data secure?**
A: Yes, everything runs locally. Add encryption in `.env` for production.

## Troubleshooting

**Problem**: Import errors
**Solution**: Activate virtual environment: `source venv/bin/activate`

**Problem**: Command not found
**Solution**: Make sure you're in the project directory

**Problem**: Python version error
**Solution**: Requires Python 3.8+, check with `python3 --version`

## Getting Help

1. Check `README.md` for full documentation
2. Read `DEPLOYMENT.md` for deployment issues
3. Review code comments in `business_mentor.py`
4. Check `.env.example` for configuration options

## Pro Tips

1. **Use the mentor feature regularly** - Get honest feedback before making big decisions
2. **Check the dashboard daily** - Stay on top of your tasks
3. **Customize the config** - Make it work for YOUR business
4. **Be specific in questions** - More context = better advice
5. **Take the advice seriously** - This agent doesn't sugarcoat for a reason

## Remember

This agent is designed to tell you what you NEED to hear, not what you WANT to hear. If the advice is uncomfortable, that's probably a sign you really need to hear it.

Now get out there and build something great! 🚀
