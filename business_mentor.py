"""
Business Mentor Agent - Main Implementation
Direct, honest business mentorship and office task management
"""

import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from agent_config import (
    BUSINESS_MENTOR_PROMPT,
    TASK_CATEGORIES,
    AUTOMATION_RULES,
    MENTOR_PERSONALITY
)


class BusinessMentorAgent:
    """
    Main agent class that provides business mentorship and handles office tasks
    """
    
    def __init__(self, config: Optional[Dict] = None):
        """Initialize the Business Mentor Agent"""
        self.config = config or {}
        self.personality = MENTOR_PERSONALITY
        self.system_prompt = BUSINESS_MENTOR_PROMPT
        self.task_queue = []
        self.completed_tasks = []
        self.active_projects = {}
        
    def get_mentor_response(self, query: str, context: Optional[Dict] = None) -> str:
        """
        Generate a direct, honest business mentor response
        
        Args:
            query: The question or situation to address
            context: Additional context about the business/situation
            
        Returns:
            Direct, actionable advice
        """
        response = {
            "analysis": self._analyze_situation(query, context),
            "hard_truth": self._provide_honest_feedback(query, context),
            "action_items": self._generate_action_plan(query, context),
            "timeline": self._estimate_timeline(query),
            "success_metrics": self._define_success_metrics(query)
        }
        return self._format_mentor_response(response)
    
    def _analyze_situation(self, query: str, context: Optional[Dict]) -> str:
        """Analyze the business situation objectively"""
        return f"Based on your situation, here's the reality: [Analysis would go here based on query context]"
    
    def _provide_honest_feedback(self, query: str, context: Optional[Dict]) -> str:
        """Provide direct, unfiltered feedback"""
        return "Let me be straight with you: [Direct feedback based on query]"
    
    def _generate_action_plan(self, query: str, context: Optional[Dict]) -> List[str]:
        """Generate concrete, actionable steps"""
        return [
            "Immediate action: [Specific step]",
            "Within 1 week: [Specific step]",
            "Within 1 month: [Specific step]"
        ]
    
    def _estimate_timeline(self, query: str) -> str:
        """Provide realistic timeline expectations"""
        return "Realistic timeline: [Time estimate based on query]"
    
    def _define_success_metrics(self, query: str) -> List[str]:
        """Define clear success metrics"""
        return [
            "Metric 1: [Measurable outcome]",
            "Metric 2: [Measurable outcome]"
        ]
    
    def _format_mentor_response(self, response: Dict) -> str:
        """Format the response in a direct, professional manner"""
        output = []
        output.append("=" * 60)
        output.append("BUSINESS MENTOR ASSESSMENT")
        output.append("=" * 60)
        output.append("")
        output.append("SITUATION ANALYSIS:")
        output.append(response["analysis"])
        output.append("")
        output.append("THE HARD TRUTH:")
        output.append(response["hard_truth"])
        output.append("")
        output.append("ACTION PLAN:")
        for i, action in enumerate(response["action_items"], 1):
            output.append(f"{i}. {action}")
        output.append("")
        output.append("TIMELINE:")
        output.append(response["timeline"])
        output.append("")
        output.append("SUCCESS METRICS:")
        for metric in response["success_metrics"]:
            output.append(f"• {metric}")
        output.append("")
        output.append("=" * 60)
        return "\n".join(output)


class OfficeTaskManager:
    """
    Handles all office tasks: emails, calls, appointments, quotes, paperwork
    """
    
    def __init__(self):
        """Initialize the Office Task Manager"""
        self.email_inbox = []
        self.call_log = []
        self.appointments = []
        self.quotes = []
        self.paperwork = []
        self.task_categories = TASK_CATEGORIES
        
    def manage_emails(self, action: str, **kwargs) -> Dict:
        """
        Manage email tasks
        
        Actions: list, read, send, categorize, archive
        """
        if action == "list":
            return self._list_emails(kwargs.get("filter"))
        elif action == "send":
            return self._send_email(kwargs)
        elif action == "categorize":
            return self._categorize_emails()
        elif action == "archive":
            return self._archive_email(kwargs.get("email_id"))
        return {"status": "unknown_action"}
    
    def manage_phone_calls(self, action: str, **kwargs) -> Dict:
        """
        Manage phone call tasks
        
        Actions: log, schedule_callback, get_log, screen
        """
        if action == "log":
            return self._log_call(kwargs)
        elif action == "schedule_callback":
            return self._schedule_callback(kwargs)
        elif action == "get_log":
            return self._get_call_log(kwargs.get("filter"))
        elif action == "screen":
            return self._screen_call(kwargs)
        return {"status": "unknown_action"}
    
    def manage_appointments(self, action: str, **kwargs) -> Dict:
        """
        Manage appointment scheduling
        
        Actions: schedule, reschedule, cancel, list, check_conflicts
        """
        if action == "schedule":
            return self._schedule_appointment(kwargs)
        elif action == "reschedule":
            return self._reschedule_appointment(kwargs)
        elif action == "cancel":
            return self._cancel_appointment(kwargs.get("appointment_id"))
        elif action == "list":
            return self._list_appointments(kwargs.get("date_range"))
        elif action == "check_conflicts":
            return self._check_conflicts(kwargs.get("proposed_time"))
        return {"status": "unknown_action"}
    
    def manage_quotes(self, action: str, **kwargs) -> Dict:
        """
        Manage quote generation and tracking
        
        Actions: create, send, track, update, list
        """
        if action == "create":
            return self._create_quote(kwargs)
        elif action == "send":
            return self._send_quote(kwargs)
        elif action == "track":
            return self._track_quote(kwargs.get("quote_id"))
        elif action == "update":
            return self._update_quote(kwargs)
        elif action == "list":
            return self._list_quotes(kwargs.get("filter"))
        return {"status": "unknown_action"}
    
    def manage_paperwork(self, action: str, **kwargs) -> Dict:
        """
        Manage paperwork and documents
        
        Actions: file, retrieve, track_deadline, organize, archive
        """
        if action == "file":
            return self._file_document(kwargs)
        elif action == "retrieve":
            return self._retrieve_document(kwargs.get("document_id"))
        elif action == "track_deadline":
            return self._track_deadline(kwargs)
        elif action == "organize":
            return self._organize_documents(kwargs.get("category"))
        elif action == "archive":
            return self._archive_document(kwargs.get("document_id"))
        return {"status": "unknown_action"}
    
    # Email Management Methods
    def _list_emails(self, filter_criteria: Optional[Dict]) -> Dict:
        """List emails with optional filtering"""
        return {
            "status": "success",
            "emails": self.email_inbox,
            "count": len(self.email_inbox)
        }
    
    def _send_email(self, email_data: Dict) -> Dict:
        """Send an email"""
        email = {
            "id": len(self.email_inbox) + 1,
            "to": email_data.get("to"),
            "subject": email_data.get("subject"),
            "body": email_data.get("body"),
            "sent_at": datetime.now().isoformat(),
            "status": "sent"
        }
        self.email_inbox.append(email)
        return {"status": "success", "email_id": email["id"]}
    
    def _categorize_emails(self) -> Dict:
        """Auto-categorize emails by urgency and topic"""
        categorized = {
            "urgent": [],
            "high": [],
            "normal": [],
            "low": []
        }
        return {"status": "success", "categories": categorized}
    
    def _archive_email(self, email_id: int) -> Dict:
        """Archive an email"""
        return {"status": "success", "email_id": email_id}
    
    # Phone Call Management Methods
    def _log_call(self, call_data: Dict) -> Dict:
        """Log a phone call"""
        call = {
            "id": len(self.call_log) + 1,
            "caller": call_data.get("caller"),
            "duration": call_data.get("duration"),
            "notes": call_data.get("notes"),
            "timestamp": datetime.now().isoformat(),
            "follow_up_required": call_data.get("follow_up_required", False)
        }
        self.call_log.append(call)
        return {"status": "success", "call_id": call["id"]}
    
    def _schedule_callback(self, callback_data: Dict) -> Dict:
        """Schedule a callback"""
        return {
            "status": "success",
            "callback_scheduled": callback_data.get("scheduled_time")
        }
    
    def _get_call_log(self, filter_criteria: Optional[Dict]) -> Dict:
        """Get call log with optional filtering"""
        return {
            "status": "success",
            "calls": self.call_log,
            "count": len(self.call_log)
        }
    
    def _screen_call(self, call_info: Dict) -> Dict:
        """Screen incoming calls"""
        return {
            "status": "success",
            "action": "accept" if call_info.get("priority") == "high" else "voicemail"
        }
    
    # Appointment Management Methods
    def _schedule_appointment(self, appointment_data: Dict) -> Dict:
        """Schedule a new appointment"""
        appointment = {
            "id": len(self.appointments) + 1,
            "title": appointment_data.get("title"),
            "datetime": appointment_data.get("datetime"),
            "duration": appointment_data.get("duration", 60),
            "attendees": appointment_data.get("attendees", []),
            "location": appointment_data.get("location"),
            "notes": appointment_data.get("notes"),
            "created_at": datetime.now().isoformat()
        }
        self.appointments.append(appointment)
        return {"status": "success", "appointment_id": appointment["id"]}
    
    def _reschedule_appointment(self, reschedule_data: Dict) -> Dict:
        """Reschedule an existing appointment"""
        return {
            "status": "success",
            "appointment_id": reschedule_data.get("appointment_id"),
            "new_time": reschedule_data.get("new_datetime")
        }
    
    def _cancel_appointment(self, appointment_id: int) -> Dict:
        """Cancel an appointment"""
        return {"status": "success", "appointment_id": appointment_id}
    
    def _list_appointments(self, date_range: Optional[Dict]) -> Dict:
        """List appointments for a date range"""
        return {
            "status": "success",
            "appointments": self.appointments,
            "count": len(self.appointments)
        }
    
    def _check_conflicts(self, proposed_time: str) -> Dict:
        """Check for scheduling conflicts"""
        return {
            "status": "success",
            "has_conflict": False,
            "conflicts": []
        }
    
    # Quote Management Methods
    def _create_quote(self, quote_data: Dict) -> Dict:
        """Create a new quote"""
        quote = {
            "id": len(self.quotes) + 1,
            "client": quote_data.get("client"),
            "items": quote_data.get("items", []),
            "total": quote_data.get("total"),
            "valid_until": quote_data.get("valid_until"),
            "status": "draft",
            "created_at": datetime.now().isoformat()
        }
        self.quotes.append(quote)
        return {"status": "success", "quote_id": quote["id"]}
    
    def _send_quote(self, send_data: Dict) -> Dict:
        """Send a quote to client"""
        return {
            "status": "success",
            "quote_id": send_data.get("quote_id"),
            "sent_to": send_data.get("recipient")
        }
    
    def _track_quote(self, quote_id: int) -> Dict:
        """Track quote status"""
        return {
            "status": "success",
            "quote_id": quote_id,
            "current_status": "pending"
        }
    
    def _update_quote(self, update_data: Dict) -> Dict:
        """Update an existing quote"""
        return {
            "status": "success",
            "quote_id": update_data.get("quote_id")
        }
    
    def _list_quotes(self, filter_criteria: Optional[Dict]) -> Dict:
        """List all quotes with optional filtering"""
        return {
            "status": "success",
            "quotes": self.quotes,
            "count": len(self.quotes)
        }
    
    # Paperwork Management Methods
    def _file_document(self, document_data: Dict) -> Dict:
        """File a document"""
        document = {
            "id": len(self.paperwork) + 1,
            "title": document_data.get("title"),
            "category": document_data.get("category"),
            "file_path": document_data.get("file_path"),
            "deadline": document_data.get("deadline"),
            "filed_at": datetime.now().isoformat()
        }
        self.paperwork.append(document)
        return {"status": "success", "document_id": document["id"]}
    
    def _retrieve_document(self, document_id: int) -> Dict:
        """Retrieve a document"""
        return {
            "status": "success",
            "document_id": document_id,
            "document": None  # Would return actual document
        }
    
    def _track_deadline(self, deadline_data: Dict) -> Dict:
        """Track document deadlines"""
        return {
            "status": "success",
            "document_id": deadline_data.get("document_id"),
            "deadline": deadline_data.get("deadline"),
            "reminder_set": True
        }
    
    def _organize_documents(self, category: str) -> Dict:
        """Organize documents by category"""
        return {
            "status": "success",
            "category": category,
            "organized_count": 0
        }
    
    def _archive_document(self, document_id: int) -> Dict:
        """Archive a document"""
        return {"status": "success", "document_id": document_id}


class IntegratedAssistant:
    """
    Combined Business Mentor and Office Task Manager
    """
    
    def __init__(self, config: Optional[Dict] = None):
        """Initialize the integrated assistant"""
        self.mentor = BusinessMentorAgent(config)
        self.office_manager = OfficeTaskManager()
        self.config = config or {}
    
    def process_request(self, request_type: str, **kwargs) -> Dict[str, Any]:
        """
        Process any type of request - mentorship or office task
        
        Args:
            request_type: Type of request (mentor, email, call, appointment, quote, paperwork)
            **kwargs: Request-specific parameters
            
        Returns:
            Response dictionary with results
        """
        if request_type == "mentor":
            return {
                "type": "mentorship",
                "response": self.mentor.get_mentor_response(
                    kwargs.get("query", ""),
                    kwargs.get("context")
                )
            }
        elif request_type == "email":
            return {
                "type": "email",
                "response": self.office_manager.manage_emails(
                    kwargs.get("action", "list"),
                    **kwargs
                )
            }
        elif request_type == "call":
            return {
                "type": "call",
                "response": self.office_manager.manage_phone_calls(
                    kwargs.get("action", "get_log"),
                    **kwargs
                )
            }
        elif request_type == "appointment":
            return {
                "type": "appointment",
                "response": self.office_manager.manage_appointments(
                    kwargs.get("action", "list"),
                    **kwargs
                )
            }
        elif request_type == "quote":
            return {
                "type": "quote",
                "response": self.office_manager.manage_quotes(
                    kwargs.get("action", "list"),
                    **kwargs
                )
            }
        elif request_type == "paperwork":
            return {
                "type": "paperwork",
                "response": self.office_manager.manage_paperwork(
                    kwargs.get("action", "organize"),
                    **kwargs
                )
            }
        else:
            return {
                "type": "error",
                "response": {"status": "error", "message": "Unknown request type"}
            }
    
    def get_dashboard(self) -> Dict[str, Any]:
        """Get a dashboard overview of all tasks and status"""
        return {
            "emails": {
                "total": len(self.office_manager.email_inbox),
                "unread": 0
            },
            "calls": {
                "today": 0,
                "follow_ups": 0
            },
            "appointments": {
                "today": 0,
                "this_week": len(self.office_manager.appointments)
            },
            "quotes": {
                "pending": 0,
                "sent": len(self.office_manager.quotes)
            },
            "paperwork": {
                "urgent_deadlines": 0,
                "total": len(self.office_manager.paperwork)
            }
        }


if __name__ == "__main__":
    # Example usage
    assistant = IntegratedAssistant()
    
    # Get business mentorship
    print("=" * 60)
    print("EXAMPLE: Business Mentorship Request")
    print("=" * 60)
    mentor_response = assistant.process_request(
        "mentor",
        query="I'm thinking about launching a new product line but I'm not sure if it's the right time.",
        context={"current_revenue": 100000, "team_size": 5}
    )
    print(mentor_response["response"])
    print("\n")
    
    # Get dashboard
    print("=" * 60)
    print("DASHBOARD OVERVIEW")
    print("=" * 60)
    dashboard = assistant.get_dashboard()
    print(json.dumps(dashboard, indent=2))
