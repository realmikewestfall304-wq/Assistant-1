"""
Business Mentor Agent Configuration
Straightforward, no-nonsense business mentor and office assistant
"""

AGENT_NAME = "Business Mentor Assistant"
AGENT_VERSION = "1.0.0"

# Business Mentor Personality Configuration
MENTOR_PERSONALITY = {
    "style": "direct_honest",
    "approach": "no_sugar_coating",
    "communication": "straightforward",
    "feedback": "constructive_and_real",
    "tone": "professional_but_direct"
}

# System Prompt for the Business Mentor
BUSINESS_MENTOR_PROMPT = """You are a seasoned business mentor and executive assistant with 20+ years of experience. 
Your role is to provide direct, honest, and actionable advice without sugar coating anything.

Core Principles:
1. BE DIRECT: Tell it like it is. No fluff, no false encouragement.
2. BE HONEST: If something won't work, say so clearly and explain why.
3. BE ACTIONABLE: Always provide concrete next steps.
4. BE PRACTICAL: Focus on what can realistically be done.
5. BE EFFICIENT: Value their time and yours.

When giving feedback:
- Start with the hard truth
- Explain the business reality
- Provide specific actions to improve
- Don't soften bad news - respect them enough to be honest
- Focus on results, not feelings

When handling office tasks:
- Be thorough and detail-oriented
- Anticipate needs and potential issues
- Keep things organized and documented
- Follow up proactively
- Maintain professional standards

Remember: Your job is to help them succeed by being the voice of truth they need, not the voice they want to hear.
"""

# Office Task Management Configuration
TASK_CATEGORIES = {
    "emails": {
        "priority_levels": ["urgent", "high", "normal", "low"],
        "auto_sort": True,
        "response_templates": True,
        "tracking": True
    },
    "phone_calls": {
        "log_calls": True,
        "follow_up_reminders": True,
        "call_screening": True,
        "voicemail_transcription": True
    },
    "appointments": {
        "calendar_integration": True,
        "reminder_system": True,
        "conflict_detection": True,
        "buffer_time": 15  # minutes between appointments
    },
    "quotes": {
        "template_library": True,
        "pricing_calculator": True,
        "approval_workflow": True,
        "tracking_system": True
    },
    "paperwork": {
        "document_management": True,
        "digital_filing": True,
        "deadline_tracking": True,
        "compliance_checks": True
    }
}

# Automation Rules
AUTOMATION_RULES = {
    "email_auto_responses": {
        "enabled": True,
        "rules": [
            "auto_acknowledge_within_1_hour",
            "categorize_by_urgency",
            "flag_requires_action"
        ]
    },
    "appointment_management": {
        "enabled": True,
        "rules": [
            "send_reminder_24h_before",
            "send_reminder_1h_before",
            "auto_reschedule_if_conflict"
        ]
    },
    "document_processing": {
        "enabled": True,
        "rules": [
            "auto_file_by_category",
            "extract_action_items",
            "set_deadline_reminders"
        ]
    }
}

# Integration Settings
INTEGRATIONS = {
    "email": {
        "providers": ["gmail", "outlook", "smtp"],
        "sync_interval": 300  # seconds
    },
    "calendar": {
        "providers": ["google_calendar", "outlook_calendar", "ical"],
        "sync_interval": 300  # seconds
    },
    "crm": {
        "providers": ["salesforce", "hubspot", "custom"],
        "sync_contacts": True
    },
    "storage": {
        "providers": ["google_drive", "dropbox", "onedrive"],
        "auto_backup": True
    }
}

# Security and Privacy
SECURITY_SETTINGS = {
    "data_encryption": True,
    "secure_storage": True,
    "access_logging": True,
    "compliance": ["GDPR", "CCPA"],
    "session_timeout": 3600  # seconds
}

# Performance Settings
PERFORMANCE = {
    "max_concurrent_tasks": 10,
    "response_timeout": 30,  # seconds
    "cache_enabled": True,
    "batch_processing": True
}
