#!/bin/bash
# Quick deployment script for Business Mentor Agent

set -e

echo "=========================================="
echo "Business Mentor Agent - Deployment Script"
echo "=========================================="
echo ""

# Check Python version
python_version=$(python3 --version 2>&1 | grep -oP '\d+\.\d+' | head -1)
required_version="3.8"

if (( $(echo "$python_version < $required_version" | bc -l) )); then
    echo "❌ Error: Python 3.8 or higher required (found $python_version)"
    exit 1
fi

echo "✓ Python version: $python_version"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo ""
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo "✓ Virtual environment created"
fi

# Activate virtual environment
echo ""
echo "Activating virtual environment..."
source venv/bin/activate
echo "✓ Virtual environment activated"

# Install dependencies
echo ""
echo "Installing dependencies..."
pip install --upgrade pip -q
pip install -r requirements.txt -q
echo "✓ Dependencies installed"

# Copy .env.example to .env if .env doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "✓ .env file created"
    echo "⚠️  Please edit .env with your configuration"
else
    echo ""
    echo "✓ .env file already exists"
fi

# Test the installation
echo ""
echo "Testing installation..."
python3 cli.py help > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Installation successful"
else
    echo "❌ Installation test failed"
    exit 1
fi

# Display next steps
echo ""
echo "=========================================="
echo "✅ Deployment Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Edit .env with your configuration (optional)"
echo "  2. Run: source venv/bin/activate"
echo "  3. Test: python cli.py dashboard"
echo "  4. Use: python cli.py mentor \"Your question\""
echo ""
echo "For production deployment:"
echo "  - Docker: docker-compose up -d"
echo "  - Systemd: See DEPLOYMENT.md"
echo "  - Cloud: See DEPLOYMENT.md for AWS/GCP/Heroku"
echo ""
