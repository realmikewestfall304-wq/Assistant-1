#!/usr/bin/env python3
"""
Personal Business Assistant
A no-nonsense assistant that provides honest feedback and keeps you on track.
"""

import json
import os
from datetime import datetime
from typing import List, Dict, Optional


class BusinessAssistant:
    """
    A personal assistant that acts as a business savior, not a yes-man.
    Provides honest feedback, manages emails, appointments, and reminders.
    """
    
    def __init__(self, data_file: str = "assistant_data.json"):
        self.data_file = data_file
        self.data = self._load_data()
        
    def _load_data(self) -> Dict:
        """Load assistant data from file."""
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r') as f:
                return json.load(f)
        return {
            "reminders": [],
            "appointments": [],
            "emails": [],
            "ideas": []
        }
    
    def _save_data(self):
        """Save assistant data to file."""
        with open(self.data_file, 'w') as f:
            json.dump(self.data, f, indent=2)
    
    def evaluate_idea(self, idea: str) -> Dict[str, str]:
        """
        Evaluate a business idea with honest, constructive feedback.
        Acts as a business savior, not a yes-man.
        """
        # Analyze the idea for potential issues
        concerns = []
        strengths = []
        
        idea_lower = idea.lower()
        
        # Check for red flags
        if "guaranteed" in idea_lower or "can't fail" in idea_lower:
            concerns.append("Nothing is guaranteed in business. This mindset could lead to poor risk management.")
        
        if "everyone will" in idea_lower or "nobody will" in idea_lower:
            concerns.append("Avoid absolute statements. Market research is needed to validate assumptions.")
        
        if "quick money" in idea_lower or "get rich" in idea_lower:
            concerns.append("Get-rich-quick schemes rarely work. Focus on sustainable value creation.")
        
        if "no competition" in idea_lower:
            concerns.append("No competition might mean no market. Validate demand before proceeding.")
        
        # Check for positive indicators
        if any(word in idea_lower for word in ["customer", "client", "user", "market"]):
            strengths.append("Customer-focused thinking is essential for success.")
        
        if any(word in idea_lower for word in ["solve", "problem", "need", "pain point"]):
            strengths.append("Solving real problems creates value and drives business success.")
        
        if any(word in idea_lower for word in ["test", "validate", "research", "data"]):
            strengths.append("Data-driven approach increases chances of success.")
        
        # Generate honest feedback
        assessment = "HONEST ASSESSMENT:\n"
        
        if concerns:
            assessment += "\n⚠️ CONCERNS (Things that could sink this):\n"
            for i, concern in enumerate(concerns, 1):
                assessment += f"  {i}. {concern}\n"
        
        if strengths:
            assessment += "\n✅ STRENGTHS (What's working):\n"
            for i, strength in enumerate(strengths, 1):
                assessment += f"  {i}. {strength}\n"
        
        # Overall verdict
        if len(concerns) > len(strengths):
            verdict = "CAUTION: This idea needs significant refinement before moving forward."
        elif len(strengths) > len(concerns):
            verdict = "PROMISING: This has potential, but address the concerns before investing heavily."
        else:
            verdict = "PROCEED WITH CARE: Balance the risks and opportunities carefully."
        
        # Save for tracking
        self.data["ideas"].append({
            "idea": idea,
            "timestamp": datetime.now().isoformat(),
            "concerns": len(concerns),
            "strengths": len(strengths)
        })
        self._save_data()
        
        return {
            "idea": idea,
            "assessment": assessment,
            "verdict": verdict,
            "concerns_count": len(concerns),
            "strengths_count": len(strengths)
        }
    
    def add_reminder(self, task: str, due_date: Optional[str] = None) -> Dict:
        """Add a reminder to keep you on task."""
        reminder = {
            "id": len(self.data["reminders"]) + 1,
            "task": task,
            "due_date": due_date,
            "created": datetime.now().isoformat(),
            "completed": False
        }
        self.data["reminders"].append(reminder)
        self._save_data()
        return {"status": "success", "reminder": reminder}
    
    def get_reminders(self, show_completed: bool = False) -> List[Dict]:
        """Get all reminders, optionally including completed ones."""
        if show_completed:
            return self.data["reminders"]
        return [r for r in self.data["reminders"] if not r["completed"]]
    
    def complete_reminder(self, reminder_id: int) -> Dict:
        """Mark a reminder as completed."""
        for reminder in self.data["reminders"]:
            if reminder["id"] == reminder_id:
                reminder["completed"] = True
                reminder["completed_at"] = datetime.now().isoformat()
                self._save_data()
                return {"status": "success", "message": f"Reminder {reminder_id} marked complete"}
        return {"status": "error", "message": f"Reminder {reminder_id} not found"}
    
    def add_appointment(self, title: str, date_time: str, notes: Optional[str] = None) -> Dict:
        """Schedule an appointment."""
        appointment = {
            "id": len(self.data["appointments"]) + 1,
            "title": title,
            "date_time": date_time,
            "notes": notes,
            "created": datetime.now().isoformat()
        }
        self.data["appointments"].append(appointment)
        self._save_data()
        return {"status": "success", "appointment": appointment}
    
    def get_appointments(self) -> List[Dict]:
        """Get all scheduled appointments."""
        return self.data["appointments"]
    
    def add_email_draft(self, to: str, subject: str, body: str) -> Dict:
        """Create an email draft for review."""
        email = {
            "id": len(self.data["emails"]) + 1,
            "to": to,
            "subject": subject,
            "body": body,
            "created": datetime.now().isoformat(),
            "sent": False
        }
        self.data["emails"].append(email)
        self._save_data()
        return {"status": "success", "email": email}
    
    def get_emails(self, sent_only: bool = False, draft_only: bool = False) -> List[Dict]:
        """Get emails, optionally filtered by status."""
        emails = self.data["emails"]
        if sent_only:
            return [e for e in emails if e["sent"]]
        if draft_only:
            return [e for e in emails if not e["sent"]]
        return emails
    
    def get_summary(self) -> str:
        """Get a summary of all pending tasks and items."""
        pending_reminders = self.get_reminders(show_completed=False)
        appointments = self.get_appointments()
        draft_emails = self.get_emails(draft_only=True)
        
        summary = "📊 BUSINESS ASSISTANT SUMMARY\n"
        summary += "=" * 50 + "\n\n"
        
        summary += f"⏰ Pending Reminders: {len(pending_reminders)}\n"
        if pending_reminders:
            for reminder in pending_reminders[:3]:
                due = f" (Due: {reminder['due_date']})" if reminder['due_date'] else ""
                summary += f"  • {reminder['task']}{due}\n"
            if len(pending_reminders) > 3:
                summary += f"  ... and {len(pending_reminders) - 3} more\n"
        
        summary += f"\n📅 Upcoming Appointments: {len(appointments)}\n"
        if appointments:
            for apt in appointments[:3]:
                summary += f"  • {apt['title']} at {apt['date_time']}\n"
            if len(appointments) > 3:
                summary += f"  ... and {len(appointments) - 3} more\n"
        
        summary += f"\n📧 Draft Emails: {len(draft_emails)}\n"
        if draft_emails:
            for email in draft_emails[:3]:
                summary += f"  • To: {email['to']} - {email['subject']}\n"
            if len(draft_emails) > 3:
                summary += f"  ... and {len(draft_emails) - 3} more\n"
        
        summary += "\n" + "=" * 50 + "\n"
        summary += "💡 Remember: Stay focused on what moves the needle!\n"
        
        return summary


def main():
    """Main entry point for the assistant."""
    assistant = BusinessAssistant()
    
    print("=" * 60)
    print("🎯 PERSONAL BUSINESS ASSISTANT")
    print("Your honest business advisor and task manager")
    print("=" * 60)
    print()
    
    while True:
        print("\nWhat would you like to do?")
        print("1. Evaluate a business idea (honest feedback)")
        print("2. Add a reminder")
        print("3. View reminders")
        print("4. Complete a reminder")
        print("5. Schedule an appointment")
        print("6. View appointments")
        print("7. Draft an email")
        print("8. View emails")
        print("9. Get summary")
        print("0. Exit")
        
        choice = input("\nEnter your choice (0-9): ").strip()
        
        if choice == "1":
            idea = input("\nDescribe your business idea: ")
            result = assistant.evaluate_idea(idea)
            print("\n" + "=" * 60)
            print(result["assessment"])
            print(f"\n🎯 {result['verdict']}")
            print("=" * 60)
        
        elif choice == "2":
            task = input("\nWhat do you need to remember? ")
            due_date = input("Due date (optional, press Enter to skip): ").strip() or None
            result = assistant.add_reminder(task, due_date)
            print(f"\n✅ Reminder added: {result['reminder']['task']}")
        
        elif choice == "3":
            reminders = assistant.get_reminders()
            print(f"\n📋 You have {len(reminders)} pending reminders:")
            for r in reminders:
                due = f" (Due: {r['due_date']})" if r['due_date'] else ""
                print(f"  [{r['id']}] {r['task']}{due}")
        
        elif choice == "4":
            reminder_id = int(input("\nEnter reminder ID to complete: "))
            result = assistant.complete_reminder(reminder_id)
            print(f"\n{result['message']}")
        
        elif choice == "5":
            title = input("\nAppointment title: ")
            date_time = input("Date and time: ")
            notes = input("Notes (optional): ").strip() or None
            result = assistant.add_appointment(title, date_time, notes)
            print(f"\n✅ Appointment scheduled: {result['appointment']['title']}")
        
        elif choice == "6":
            appointments = assistant.get_appointments()
            print(f"\n📅 You have {len(appointments)} appointments:")
            for apt in appointments:
                print(f"  [{apt['id']}] {apt['title']} at {apt['date_time']}")
                if apt['notes']:
                    print(f"      Notes: {apt['notes']}")
        
        elif choice == "7":
            to = input("\nTo: ")
            subject = input("Subject: ")
            body = input("Body: ")
            result = assistant.add_email_draft(to, subject, body)
            print(f"\n✅ Email draft created: {result['email']['subject']}")
        
        elif choice == "8":
            emails = assistant.get_emails()
            print(f"\n📧 You have {len(emails)} emails:")
            for email in emails:
                status = "✓ Sent" if email['sent'] else "📝 Draft"
                print(f"  [{email['id']}] {status} - To: {email['to']}")
                print(f"      Subject: {email['subject']}")
        
        elif choice == "9":
            print("\n" + assistant.get_summary())
        
        elif choice == "0":
            print("\n👋 Stay focused and make it happen!")
            break
        
        else:
            print("\n❌ Invalid choice. Please try again.")


if __name__ == "__main__":
    main()
