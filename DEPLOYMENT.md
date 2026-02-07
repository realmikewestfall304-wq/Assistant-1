# Deployment Guide - Business Mentor Agent

## Overview
This guide covers deploying the Business Mentor Agent for production use. The agent provides direct, honest business mentorship and handles office tasks including emails, phone calls, appointments, quotes, and paperwork.

## Prerequisites

### System Requirements
- Python 3.8 or higher
- 2GB RAM minimum (4GB recommended)
- 10GB disk space
- Internet connection for external integrations

### Required Knowledge
- Basic command line usage
- Python package management
- Configuration file editing

## Installation Steps

### 1. Clone or Download Repository
```bash
git clone https://github.com/realmikewestfall304-wq/Assistant-1.git
cd Assistant-1
```

### 2. Set Up Python Environment
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your preferred editor
```

## Configuration

### Basic Configuration
Edit `.env` file with your settings:

```bash
AGENT_NAME=Business Mentor Assistant
AGENT_ENVIRONMENT=production
LOG_LEVEL=INFO
```

### Email Integration (Optional)
For email management features:
```bash
EMAIL_PROVIDER=gmail
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
```

### Calendar Integration (Optional)
For appointment management:
```bash
CALENDAR_PROVIDER=google
GOOGLE_CALENDAR_CREDENTIALS_PATH=./credentials/google_calendar.json
```

### Security Settings
```bash
SECRET_KEY=generate_a_random_secret_key_here
SESSION_TIMEOUT=3600
```

## Running the Agent

### Command Line Interface
```bash
# Get business mentorship
python cli.py mentor "Your business question here"

# View dashboard
python cli.py dashboard

# Manage appointments
python cli.py appointment list
python cli.py appointment schedule "Client Meeting" "2026-02-10 14:00"

# Manage emails
python cli.py email list
python cli.py email send "client@example.com" "Subject" "Body"

# Get help
python cli.py help
```

### Python API
```python
from business_mentor import IntegratedAssistant

# Initialize
assistant = IntegratedAssistant()

# Get business advice
response = assistant.process_request(
    "mentor",
    query="Should I expand to a new market?",
    context={"current_revenue": 100000}
)
print(response["response"])

# Manage tasks
dashboard = assistant.get_dashboard()
print(dashboard)
```

## Deployment Options

### Option 1: Local Deployment
Run the agent locally on your machine:
```bash
python cli.py dashboard
```

### Option 2: Server Deployment
Deploy on a server for 24/7 availability:

1. **Using systemd (Linux)**
   Create `/etc/systemd/system/business-mentor.service`:
   ```ini
   [Unit]
   Description=Business Mentor Agent
   After=network.target

   [Service]
   Type=simple
   User=your_username
   WorkingDirectory=/path/to/Assistant-1
   ExecStart=/path/to/Assistant-1/venv/bin/python cli.py dashboard
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

   Enable and start:
   ```bash
   sudo systemctl enable business-mentor
   sudo systemctl start business-mentor
   ```

2. **Using Docker** (if you create a Dockerfile)
   ```bash
   docker build -t business-mentor .
   docker run -d -p 8000:8000 business-mentor
   ```

### Option 3: Cloud Deployment

#### AWS (Amazon Web Services)
1. Launch EC2 instance
2. Install Python and dependencies
3. Configure security groups
4. Run agent as systemd service

#### Google Cloud Platform
1. Create Compute Engine instance
2. Install dependencies
3. Set up Cloud Scheduler for automation
4. Run agent

#### Heroku
1. Create Heroku app
2. Add Python buildpack
3. Deploy via git
4. Configure environment variables

## Integration Setup

### Email Integration
1. **Gmail**: Generate app-specific password
   - Go to Google Account settings
   - Security → 2-Step Verification
   - App passwords → Generate new
   - Use in `.env` file

2. **Outlook**: Configure OAuth or app password

### Calendar Integration
1. **Google Calendar**: 
   - Create project in Google Cloud Console
   - Enable Calendar API
   - Download credentials JSON
   - Place in `credentials/` directory

### CRM Integration
Configure your CRM credentials in `.env`:
```bash
CRM_PROVIDER=salesforce
CRM_API_KEY=your_api_key
```

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file to git
   - Use strong, unique passwords
   - Rotate credentials regularly

2. **Access Control**
   - Limit file permissions: `chmod 600 .env`
   - Use firewall rules
   - Implement IP whitelisting

3. **Data Protection**
   - Enable encryption at rest
   - Use HTTPS for all communications
   - Regular backups

4. **Monitoring**
   - Set up logging
   - Monitor for suspicious activity
   - Regular security audits

## Troubleshooting

### Common Issues

1. **Import Error**
   ```
   Solution: Ensure virtual environment is activated
   source venv/bin/activate
   ```

2. **Permission Denied**
   ```
   Solution: Check file permissions
   chmod +x cli.py
   ```

3. **API Connection Failed**
   ```
   Solution: Verify API credentials in .env
   Check internet connection
   ```

### Logs
Check logs for errors:
```bash
tail -f logs/agent.log
```

## Maintenance

### Regular Tasks
- Update dependencies: `pip install --upgrade -r requirements.txt`
- Review logs weekly
- Backup data regularly
- Update API credentials as needed

### Updates
```bash
git pull origin main
pip install -r requirements.txt
# Restart service if running
```

## Performance Optimization

### For High Volume
- Increase `MAX_CONCURRENT_TASKS` in `.env`
- Use database for task storage
- Implement caching
- Use message queue for async processing

### Resource Management
```bash
# Monitor resource usage
top
htop

# Check disk space
df -h
```

## Support

### Documentation
- README.md - Overview and quick start
- DEPLOYMENT.md - This file
- agent_config.py - Configuration reference

### Getting Help
- Review documentation
- Check logs for errors
- Test with minimal configuration first

## Production Checklist

- [ ] Python 3.8+ installed
- [ ] Dependencies installed
- [ ] .env configured
- [ ] Credentials set up
- [ ] Security settings configured
- [ ] Logging enabled
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Tested basic operations
- [ ] Documented custom configurations

## Next Steps

After deployment:
1. Test all features
2. Configure integrations
3. Set up monitoring
4. Train team on usage
5. Establish backup procedures

For advanced configurations and customization, see `agent_config.py`.
