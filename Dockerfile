FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY agent_config.py .
COPY business_mentor.py .
COPY cli.py .
COPY .env.example .

# Create a non-root user
RUN useradd -m -u 1000 assistant && \
    chown -R assistant:assistant /app

USER assistant

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Default command - can be overridden
CMD ["python", "cli.py", "help"]
