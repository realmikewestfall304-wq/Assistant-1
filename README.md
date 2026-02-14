# Business Mentor Assistant

**Direct, Honest, Actionable Business Mentorship + Office Task Management**

A no-nonsense AI agent that provides straightforward business advice without sugar coating anything, plus handles all your office tasks efficiently.

## 🎯 Purpose

This agent serves dual roles:
1. **Business Mentor**: Provides direct, honest, actionable business advice. No fluff, no false encouragement - just real talk about what you need to do to succeed.
2. **Office Assistant**: Manages emails, phone calls, appointments, quotes, and paperwork with professional efficiency.

## ✨ Key Features

### Business Mentorship
- **No Sugar Coating**: Get the hard truth about your business decisions
- **Direct Feedback**: Honest assessment of your plans and strategies
- **Actionable Plans**: Concrete steps, not vague advice
- **Realistic Timelines**: No false promises, just real expectations
- **Success Metrics**: Clear, measurable goals

### Office Task Management
- **Email Management**: Send, list, categorize, and archive emails (in-memory storage)
- **Phone Call Handling**: Log calls with notes and follow-up tracking
- **Appointment Scheduling**: Calendar management with automatic conflict detection
- **Quote Generation**: Create and track quotes with line items
- **Paperwork Organization**: Digital filing with deadline tracking and alerts

## 🚀 Quick Start

### Installation
```bash
# Clone repository
git clone https://github.com/realmikewestfall304-wq/Assistant-1.git
cd Assistant-1

# Set up virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings
```

### Basic Usage

#### Command Line
```bash
# Get business mentorship
python cli.py mentor "Should I hire more staff or outsource?"

# View dashboard
python cli.py dashboard

# Manage appointments
python cli.py appointment list
python cli.py appointment schedule "Team Meeting" "2026-02-10 10:00"

# Manage emails
python cli.py email list

# Get help
python cli.py help
```

#### Python API
```python
from business_mentor import IntegratedAssistant

# Initialize assistant
assistant = IntegratedAssistant()

# Get business advice
response = assistant.process_request(
    "mentor",
    query="I'm thinking about expanding to a new market",
    context={"current_revenue": 100000, "team_size": 5}
)
print(response["response"])

# Schedule appointment
result = assistant.process_request(
    "appointment",
    action="schedule",
    title="Client Call",
    datetime="2026-02-10 14:00",
    duration=60
)

# View dashboard
dashboard = assistant.get_dashboard()
print(dashboard)
```

## 📋 What This Agent Does

### Business Mentorship Examples
```
You: "Should I lower my prices to compete?"

Agent: "Let me be straight with you: If you're competing on price alone, 
you've already lost. Here's what you need to do instead:
1. Identify your unique value proposition in the next 48 hours
2. Document what makes you different from competitors
3. Raise your prices by 20% and improve your positioning
4. Target customers who value quality over price

Timeline: 2 weeks to reposition, 1 month to see results
Success Metric: Close rate should stay the same or improve despite higher prices"
```

### Office Tasks
- ✉️ **Emails**: Automatic sorting, priority flagging, template responses
- 📞 **Calls**: Call logging, follow-up reminders, callback scheduling
- 📅 **Appointments**: Smart scheduling, conflict detection, automatic reminders
- 💰 **Quotes**: Professional quote generation, tracking, follow-up
- 📄 **Paperwork**: Digital filing, deadline tracking, compliance monitoring

## 🔧 Configuration

### Basic Setup
Edit `.env` file:
```bash
AGENT_NAME=Business Mentor Assistant
AGENT_ENVIRONMENT=production
LOG_LEVEL=INFO
```

### Optional Integrations
- **Email**: Gmail, Outlook, SMTP
- **Calendar**: Google Calendar, Outlook Calendar
- **CRM**: Salesforce, HubSpot
- **Storage**: Google Drive, Dropbox, OneDrive

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed configuration options.

## 📦 Project Structure

```
Assistant-1/
├── agent_config.py      # Agent configuration and settings
├── business_mentor.py   # Main agent implementation
├── cli.py              # Command-line interface
├── requirements.txt    # Python dependencies
├── .env.example        # Environment variables template
├── DEPLOYMENT.md       # Deployment guide
└── README.md          # This file
```

## 🎭 Agent Personality

This agent is configured to be:
- **Direct**: No beating around the bush
- **Honest**: Tells you what you need to hear, not what you want to hear
- **Actionable**: Always provides specific next steps
- **Professional**: Maintains high standards
- **Efficient**: Respects your time

## 🔐 Security

- Environment variable configuration
- Secure credential storage
- Data encryption support
- Access logging
- GDPR/CCPA compliance ready

## 📊 Dashboard Example

```
BUSINESS ASSISTANT DASHBOARD
============================================================
EMAILS:
  Total: 24
  Unread: 5

CALLS:
  Today: 3
  Follow-ups: 2

APPOINTMENTS:
  Today: 1
  This Week: 4

QUOTES:
  Pending: 2
  Total Sent: 7

PAPERWORK:
  Urgent Deadlines: 1
  Total Documents: 15
============================================================
```

## 🚀 Deployment

Multiple deployment options:
- **Local**: Run on your machine
- **Server**: Deploy on VPS/cloud server
- **Cloud**: AWS, GCP, Heroku
- **Docker**: Container deployment (coming soon)

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

## 🛠️ Customization

The agent is highly customizable through `agent_config.py`:
- Adjust mentorship style
- Configure task automation rules
- Set up integrations
- Define security settings
- Performance tuning

## 📝 Example Commands

```bash
# Business Mentorship
python cli.py mentor "Is now the right time to raise capital?"
python cli.py mentor "Should I fire my underperforming sales rep?"

# Office Management
python cli.py email list
python cli.py email send "client@example.com" "Follow-up" "Hi there..."
python cli.py appointment schedule "Board Meeting" "2026-02-15 09:00"
python cli.py quote create
python cli.py paperwork organize "contracts"
python cli.py dashboard
```

## 🎯 Use Cases

Perfect for:
- **Entrepreneurs**: Need honest feedback on business decisions
- **Small Business Owners**: Managing multiple office tasks
- **Consultants**: Organizing client work and communications
- **Executives**: Staying on top of appointments and paperwork
- **Anyone**: Who values direct, actionable advice over feel-good platitudes

## 📚 Documentation

- [README.md](README.md) - Overview and quick start (this file)
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- [agent_config.py](agent_config.py) - Configuration reference
- [business_mentor.py](business_mentor.py) - API documentation

## 🤝 Philosophy

This agent operates on these principles:

1. **Truth Over Comfort**: You get honest assessments, not reassurance
2. **Action Over Theory**: Concrete steps, not abstract concepts
3. **Results Over Activity**: Focus on what actually moves the needle
4. **Clarity Over Complexity**: Simple, direct communication
5. **Efficiency Over Busywork**: Respect for your time and resources

## ⚠️ What This Agent Won't Do

- Won't tell you what you want to hear if it's not true
- Won't sugarcoat bad news or poor decisions
- Won't give vague, feel-good advice
- Won't waste your time with unnecessary complexity
- Won't pretend something will work when it won't

## 🎓 Getting Started Tips

1. **Be Specific**: The more context you provide, the better the advice
2. **Be Honest**: Don't hide problems - the agent can't help if you're not truthful
3. **Take Action**: The best advice is worthless if you don't implement it
4. **Follow Up**: Use the office management features to stay organized
5. **Be Ready**: The truth might be uncomfortable, but it's what you need

## 📞 Support

For issues, questions, or suggestions:
1. Check the documentation
2. Review the configuration files
3. Test with the CLI examples
4. Review logs for errors

## 🔄 Updates

Keep your agent up to date:
```bash
git pull origin main
pip install --upgrade -r requirements.txt
```

## 📄 License

See LICENSE file for details.

## 🎯 Bottom Line

This agent tells you what you NEED to hear, not what you WANT to hear. If you're looking for encouragement, look elsewhere. If you want real, actionable advice that will actually help you succeed - you're in the right place.

---

**Ready to get started?** Run `python cli.py help` and see what this agent can do for you. 
