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
        parts = []
        q_lower = (query or "").lower()
        
        # Add context if available
        if context:
            if "revenue" in context:
                parts.append(f"Current revenue: ${context['revenue']:,}")
            if "team_size" in context or "employees" in context:
                size = context.get("team_size") or context.get("employees")
                parts.append(f"Team size: {size} people")
            if "growth_rate" in context:
                parts.append(f"Growth rate: {context['growth_rate']}")
        
        # Analyze based on query topic
        analysis = "Based on your situation"
        if parts:
            analysis += f" ({', '.join(parts)})"
        analysis += ", here's the reality: "
        
        if any(word in q_lower for word in ["hire", "team", "staff", "employee"]):
            analysis += "You're at a critical scaling point. Hiring impacts both capacity and burn rate."
        elif any(word in q_lower for word in ["price", "pricing", "cost", "charge"]):
            analysis += "Pricing is a positioning decision, not just a revenue lever. Wrong pricing signals wrong market."
        elif any(word in q_lower for word in ["market", "expand", "international", "new product"]):
            analysis += "Expansion requires capital, focus, and execution capability. Most businesses expand too early."
        elif any(word in q_lower for word in ["revenue", "sales", "customer"]):
            analysis += "Revenue issues are usually symptoms of product-market fit or go-to-market problems."
        else:
            analysis += "This requires a straightforward assessment of risks versus potential returns."
        
        return analysis
    
    def _provide_honest_feedback(self, query: str, context: Optional[Dict]) -> str:
        """Provide direct, unfiltered feedback"""
        q_lower = (query or "").lower()
        
        # Direct feedback based on common patterns
        if any(word in q_lower for word in ["should i", "is it time", "when should"]):
            feedback = "Let me be straight with you: If you're asking, you're probably not ready. "
            feedback += "The right time is when you have clear metrics showing you NEED to, not when you WANT to."
        elif "lower" in q_lower and "price" in q_lower:
            feedback = "Let me be straight with you: Competing on price is a race to the bottom. "
            feedback += "If price is your only differentiator, you don't have a real business—you have a commodity."
        elif any(word in q_lower for word in ["hire", "fire", "employee"]):
            feedback = "Let me be straight with you: People decisions are the hardest but most impactful. "
            feedback += "Wrong people cost you months of momentum. Right people multiply your output."
        elif "expand" in q_lower or "international" in q_lower:
            feedback = "Let me be straight with you: Most expansions fail because businesses don't dominate their current market first. "
            feedback += "Master one market before attempting two."
        else:
            feedback = "Let me be straight with you: The answer depends on whether you're making this decision from strength or desperation. "
            feedback += "Desperate decisions rarely work out."
        
        return feedback
    
    def _generate_action_plan(self, query: str, context: Optional[Dict]) -> List[str]:
        """Generate concrete, actionable steps"""
        q_lower = (query or "").lower()
        
        if "hire" in q_lower or "staff" in q_lower:
            return [
                "Immediate action: Document exactly what work isn't getting done and why",
                "Within 1 week: Calculate if revenue per employee supports another hire",
                "Within 1 month: If metrics support it, write detailed job spec and start recruiting"
            ]
        elif "price" in q_lower or "pricing" in q_lower:
            return [
                "Immediate action: Survey your best customers on what they value most",
                "Within 1 week: Analyze competitor positioning and pricing tiers",
                "Within 1 month: Test new pricing with new prospects, not existing customers"
            ]
        elif "expand" in q_lower or "market" in q_lower:
            return [
                "Immediate action: Define what 'success' looks like in current market (market share %)",
                "Within 1 week: Analyze if you're top 3 in current market. If not, stay focused here.",
                "Within 1 month: If you're dominant locally, research one adjacent market thoroughly"
            ]
        else:
            return [
                "Immediate action: Write down your decision criteria and what success looks like",
                "Within 1 week: Gather hard data on costs, timeline, and expected outcomes",
                "Within 1 month: Make decision based on data, not gut feel. Then commit fully or drop it."
            ]
    
    def _estimate_timeline(self, query: str) -> str:
        """Provide realistic timeline expectations"""
        q_lower = (query or "").lower()
        
        if "hire" in q_lower:
            return "Realistic timeline: 2-3 months to hire, 3-6 months until they're productive. Budget 6 months total."
        elif "price" in q_lower or "pricing" in q_lower:
            return "Realistic timeline: 2-4 weeks to research and decide, 1-2 months to test with new customers."
        elif "expand" in q_lower or "international" in q_lower:
            return "Realistic timeline: 6-12 months for proper market entry, 18-24 months to profitability."
        elif "product" in q_lower:
            return "Realistic timeline: 3-6 months to build and launch, 6-12 months to product-market fit."
        else:
            return "Realistic timeline: Most business initiatives take 2x longer and cost 1.5x more than you think. Plan accordingly."
    
    def _define_success_metrics(self, query: str) -> List[str]:
        """Define clear success metrics"""
        q_lower = (query or "").lower()
        
        if "hire" in q_lower or "team" in q_lower:
            return [
                "Revenue per employee increases or stays flat",
                "Key deliverables that were blocked are now shipping on time",
                "New hire becomes net-positive within 6 months"
            ]
        elif "price" in q_lower or "pricing" in q_lower:
            return [
                "Customer acquisition cost stays same or decreases",
                "Profit margin increases by at least 5 percentage points",
                "Close rate on new pricing is 20%+ (healthy B2B benchmark)"
            ]
        elif "expand" in q_lower or "market" in q_lower:
            return [
                "New market represents 15%+ of revenue within 18 months",
                "Customer acquisition cost in new market is within 150% of current market",
                "Net Promoter Score in new market matches current market"
            ]
        else:
            return [
                "Define clear before/after metrics specific to your decision",
                "Set a checkpoint at 90 days to evaluate progress",
                "Measure actual results vs. projected—be honest about gaps"
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
        if email_id is None:
            return {
                "status": "error",
                "message": "email_id is required"
            }
        
        for email in self.email_inbox:
            if email.get("id") == email_id:
                email["status"] = "archived"
                email["archived_at"] = datetime.now().isoformat()
                return {
                    "status": "success",
                    "email_id": email_id,
                    "message": "Email archived"
                }
        
        return {
            "status": "error",
            "message": f"Email {email_id} not found"
        }
    
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
        for apt in self.appointments:
            if apt.get("id") == appointment_id:
                apt["status"] = "cancelled"
                apt["cancelled_at"] = datetime.now().isoformat()
                return {
                    "status": "success",
                    "appointment_id": appointment_id,
                    "message": "Appointment cancelled"
                }
        return {
            "status": "error",
            "message": f"Appointment {appointment_id} not found"
        }
    
    def _list_appointments(self, date_range: Optional[Dict]) -> Dict:
        """List appointments for a date range"""
        return {
            "status": "success",
            "appointments": self.appointments,
            "count": len(self.appointments)
        }
    
    def _check_conflicts(self, proposed_time: str) -> Dict:
        """Check for scheduling conflicts"""
        try:
            # Parse proposed time (expect ISO format datetime string)
            proposed_dt = datetime.fromisoformat(proposed_time)
            proposed_duration = 60  # default 60 minutes
            proposed_end = proposed_dt + timedelta(minutes=proposed_duration)
            
            # Get buffer time from config (default 15 minutes)
            buffer_minutes = 15
            
            conflicts = []
            for apt in self.appointments:
                if "datetime" not in apt:
                    continue
                
                try:
                    apt_dt = datetime.fromisoformat(apt["datetime"])
                    apt_duration = apt.get("duration", 60)
                    apt_end = apt_dt + timedelta(minutes=apt_duration)
                    
                    # Check for overlap with buffer
                    apt_start_with_buffer = apt_dt - timedelta(minutes=buffer_minutes)
                    apt_end_with_buffer = apt_end + timedelta(minutes=buffer_minutes)
                    
                    # Conflict if proposed time overlaps with existing appointment + buffer
                    if not (proposed_end <= apt_start_with_buffer or proposed_dt >= apt_end_with_buffer):
                        conflicts.append({
                            "appointment_id": apt.get("id"),
                            "title": apt.get("title"),
                            "datetime": apt.get("datetime"),
                            "duration": apt_duration
                        })
                except (ValueError, TypeError):
                    continue
            
            return {
                "status": "success",
                "has_conflict": len(conflicts) > 0,
                "conflicts": conflicts
            }
        except (ValueError, TypeError) as e:
            return {
                "status": "error",
                "message": f"Invalid datetime format: {str(e)}",
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
            action = kwargs.pop("action", "list")
            return {
                "type": "email",
                "response": self.office_manager.manage_emails(action, **kwargs)
            }
        elif request_type == "call":
            action = kwargs.pop("action", "get_log")
            return {
                "type": "call",
                "response": self.office_manager.manage_phone_calls(action, **kwargs)
            }
        elif request_type == "appointment":
            action = kwargs.pop("action", "list")
            return {
                "type": "appointment",
                "response": self.office_manager.manage_appointments(action, **kwargs)
            }
        elif request_type == "quote":
            action = kwargs.pop("action", "list")
            return {
                "type": "quote",
                "response": self.office_manager.manage_quotes(action, **kwargs)
            }
        elif request_type == "paperwork":
            action = kwargs.pop("action", "organize")
            return {
                "type": "paperwork",
                "response": self.office_manager.manage_paperwork(action, **kwargs)
            }
        else:
            return {
                "type": "error",
                "response": {"status": "error", "message": "Unknown request type"}
            }
    
    def get_dashboard(self) -> Dict[str, Any]:
        """Get a dashboard overview of all tasks and status"""
        now = datetime.now()
        today = now.date()
        
        # Count unread emails
        unread_count = sum(1 for email in self.office_manager.email_inbox 
                          if not email.get("read", True))
        
        # Count today's calls and follow-ups
        calls_today = 0
        follow_ups = 0
        for call in self.office_manager.call_log:
            if "timestamp" in call:
                try:
                    call_date = datetime.fromisoformat(call["timestamp"]).date()
                    if call_date == today:
                        calls_today += 1
                except (ValueError, TypeError):
                    pass
            if call.get("follow_up_required"):
                follow_ups += 1
        
        # Count today's and this week's appointments
        appointments_today = 0
        appointments_this_week = 0
        week_start = today - timedelta(days=today.weekday())
        week_end = week_start + timedelta(days=6)
        
        for apt in self.office_manager.appointments:
            if "datetime" in apt:
                try:
                    apt_date = datetime.fromisoformat(apt["datetime"]).date()
                    if apt_date == today:
                        appointments_today += 1
                    if week_start <= apt_date <= week_end:
                        appointments_this_week += 1
                except (ValueError, TypeError):
                    pass
        
        # Count pending quotes
        pending_quotes = sum(1 for quote in self.office_manager.quotes 
                           if quote.get("status") in ["draft", "sent", "pending"])
        
        # Count urgent paperwork (deadlines within 7 days)
        urgent_deadlines = 0
        week_from_now = today + timedelta(days=7)
        for doc in self.office_manager.paperwork:
            if "deadline" in doc:
                try:
                    deadline = datetime.fromisoformat(doc["deadline"]).date()
                    if today <= deadline <= week_from_now:
                        urgent_deadlines += 1
                except (ValueError, TypeError):
                    pass
        
        return {
            "emails": {
                "total": len(self.office_manager.email_inbox),
                "unread": unread_count
            },
            "calls": {
                "today": calls_today,
                "follow_ups": follow_ups
            },
            "appointments": {
                "today": appointments_today,
                "this_week": appointments_this_week
            },
            "quotes": {
                "pending": pending_quotes,
                "sent": len(self.office_manager.quotes)
            },
            "paperwork": {
                "urgent_deadlines": urgent_deadlines,
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
