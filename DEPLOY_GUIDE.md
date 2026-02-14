# Deployment Quick Start Guide

This guide provides step-by-step instructions for deploying the Business Mentor Agent.

## Prerequisites

- Python 3.8 or higher
- Git (for cloning the repository)
- Docker (optional, for containerized deployment)

## Deployment Options

Choose the deployment method that best fits your needs:

### Option 1: Local Development (Fastest)

Perfect for testing and personal use.

```bash
# 1. Clone the repository
git clone https://github.com/realmikewestfall304-wq/Assistant-1.git
cd Assistant-1

# 2. Run the deployment script
bash deploy.sh

# 3. Activate the virtual environment
source venv/bin/activate

# 4. Test the agent
python cli.py dashboard
python cli.py mentor "Should I hire more staff?"
```

**Time to deploy: ~2 minutes**

### Option 2: Docker (Recommended for Production)

Perfect for consistent deployment across environments.

```bash
# 1. Clone the repository
git clone https://github.com/realmikewestfall304-wq/Assistant-1.git
cd Assistant-1

# 2. Build the Docker image
docker build -t business-mentor:latest .

# 3. Run interactively
docker run -it business-mentor:latest python cli.py dashboard

# 4. Or run a specific command
docker run business-mentor:latest python cli.py mentor "Your question"

# 5. Using Docker Compose (for scheduled tasks)
docker-compose up -d
```

**Time to deploy: ~3 minutes**

### Option 3: Cloud Deployment

#### Heroku

```bash
# 1. Install Heroku CLI
# 2. Login to Heroku
heroku login

# 3. Create app
heroku create your-business-mentor

# 4. Deploy
git push heroku main

# 5. Run commands
heroku run python cli.py dashboard
```

#### AWS EC2

```bash
# 1. Launch EC2 instance (Ubuntu 20.04+)
# 2. SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# 3. Install dependencies
sudo apt update
sudo apt install -y python3 python3-pip python3-venv git

# 4. Clone and deploy
git clone https://github.com/realmikewestfall304-wq/Assistant-1.git
cd Assistant-1
bash deploy.sh

# 5. Set up systemd timer (optional, see below)
```

#### Google Cloud Platform

```bash
# 1. Create Compute Engine instance
# 2. SSH into instance
# 3. Follow AWS EC2 steps 3-5 above
```

## Scheduled Tasks (Production)

### Using Systemd Timer (Linux)

Create `/etc/systemd/system/business-mentor.timer`:

```ini
[Unit]
Description=Business Mentor Daily Check

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

Create `/etc/systemd/system/business-mentor.service`:

```ini
[Unit]
Description=Business Mentor Agent Check

[Service]
Type=oneshot
User=your_username
WorkingDirectory=/path/to/Assistant-1
ExecStart=/path/to/Assistant-1/venv/bin/python cli.py dashboard
```

Enable and start:

```bash
sudo systemctl enable business-mentor.timer
sudo systemctl start business-mentor.timer
```

### Using Cron (Linux/Mac)

```bash
# Edit crontab
crontab -e

# Add daily dashboard check at 9 AM
0 9 * * * cd /path/to/Assistant-1 && /path/to/Assistant-1/venv/bin/python cli.py dashboard >> /tmp/mentor.log 2>&1
```

### Using Docker Compose

The included `docker-compose.yml` has a scheduler service that runs daily checks automatically.

```bash
docker-compose up -d scheduler
```

## Configuration

### Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your settings:
   ```bash
   AGENT_NAME=Business Mentor Assistant
   AGENT_ENVIRONMENT=production
   LOG_LEVEL=INFO
   
   # Optional integrations
   # EMAIL_PROVIDER=gmail
   # EMAIL_ADDRESS=your@email.com
   # CALENDAR_PROVIDER=google
   ```

### Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong passwords** for any integrations
3. **Limit file permissions**: `chmod 600 .env`
4. **Regular updates**: `git pull && pip install --upgrade -r requirements.txt`

## Verification

After deployment, verify everything works:

```bash
# Test business mentor
python cli.py mentor "Should I raise prices?"

# Test dashboard
python cli.py dashboard

# Test appointment scheduling
python cli.py appointment schedule "Test Meeting" "2026-03-01T10:00:00"

# Test quote creation
python cli.py quote create "Test Client" 1000 "2026-03-31"
```

All commands should return successful results.

## Common Issues

### Issue: "ModuleNotFoundError"
**Solution**: Activate virtual environment first
```bash
source venv/bin/activate
```

### Issue: "Permission denied" on deploy.sh
**Solution**: Make script executable
```bash
chmod +x deploy.sh
```

### Issue: Docker build fails
**Solution**: Ensure Docker is running
```bash
docker ps  # Should not error
```

### Issue: Command not found
**Solution**: Ensure you're in the project directory
```bash
cd /path/to/Assistant-1
```

## Monitoring

### View Logs (Docker)

```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f assistant
```

### View Logs (Systemd)

```bash
# View timer status
systemctl status business-mentor.timer

# View service logs
journalctl -u business-mentor.service -f
```

## Updating

To update to the latest version:

```bash
# Pull latest changes
git pull origin main

# Update dependencies
source venv/bin/activate
pip install --upgrade -r requirements.txt

# Restart services if using Docker
docker-compose restart

# Or restart systemd timer
sudo systemctl restart business-mentor.timer
```

## Backup

Important data to backup:
- `.env` file (contains your configuration)
- Any custom modifications to code

```bash
# Create backup
tar -czf business-mentor-backup-$(date +%Y%m%d).tar.gz \
    .env agent_config.py

# Restore backup
tar -xzf business-mentor-backup-YYYYMMDD.tar.gz
```

## Uninstallation

### Local Deployment

```bash
# Remove virtual environment
rm -rf venv

# Remove repository (if desired)
cd ..
rm -rf Assistant-1
```

### Docker Deployment

```bash
# Stop and remove containers
docker-compose down

# Remove images
docker rmi business-mentor:latest
```

### Systemd Timer

```bash
# Stop and disable
sudo systemctl stop business-mentor.timer
sudo systemctl disable business-mentor.timer

# Remove files
sudo rm /etc/systemd/system/business-mentor.timer
sudo rm /etc/systemd/system/business-mentor.service
sudo systemctl daemon-reload
```

## Support

For issues or questions:
1. Check this guide first
2. Review DEPLOYMENT.md for detailed information
3. Check README.md for feature documentation
4. Review QUICKSTART.md for usage examples

## Next Steps

Now that deployment is complete:

1. **Configure integrations** (optional) - Edit `.env` for email, calendar, CRM
2. **Set up scheduled tasks** - Choose systemd timer, cron, or Docker Compose
3. **Test all features** - Run through the verification steps above
4. **Customize behavior** - Edit `agent_config.py` for personality and task settings
5. **Monitor regularly** - Check logs and dashboard output

**Your Business Mentor Agent is ready to use! 🚀**
