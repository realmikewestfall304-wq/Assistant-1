# 🚀 Quick Deployment

## One-Line Deploy (Local)

```bash
bash deploy.sh && source venv/bin/activate && python cli.py dashboard
```

## Docker Deploy

```bash
docker build -t business-mentor . && docker run -it business-mentor python cli.py dashboard
```

## Test After Deploy

```bash
# Get business advice
python cli.py mentor "Should I hire more employees?"

# View dashboard
python cli.py dashboard

# Schedule appointment
python cli.py appointment schedule "Team Meeting" "2026-03-01T10:00:00"
```

## Full Documentation

- **[DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)** - Complete deployment instructions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed production setup
- **[QUICKSTART.md](QUICKSTART.md)** - Usage examples
- **[README.md](README.md)** - Full feature documentation

## Quick Links

| What | Command |
|------|---------|
| Local Deploy | `bash deploy.sh` |
| Docker Build | `docker build -t business-mentor .` |
| Docker Run | `docker run -it business-mentor python cli.py help` |
| Docker Compose | `docker-compose up -d` |
| Get Help | `python cli.py help` |
| Dashboard | `python cli.py dashboard` |
| Ask Mentor | `python cli.py mentor "Your question"` |

**Status: ✅ Production Ready**
