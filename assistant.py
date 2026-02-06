#!/usr/bin/env python3
"""
Personal Business Assistant
A comprehensive assistant to manage tasks, reminders, emails, appointments, and more.
"""

import os
import json
import datetime
from typing import List, Dict, Any


class PersonalAssistant:
    """Main Personal Business Assistant class"""
    
    def __init__(self, data_file='assistant_data.json'):
        self.data_file = data_file
        self.data = self.load_data()
    
    def load_data(self) -> Dict[str, Any]:
        """Load data from JSON file"""
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r') as f:
                return json.load(f)
        return {
            'tasks': [],
            'reminders': [],
            'emails': [],
            'appointments': [],
            'workload': [],
            'social_media_ads': []
        }
    
    def save_data(self):
        """Save data to JSON file"""
        with open(self.data_file, 'w') as f:
            json.dump(self.data, f, indent=2)
    
    # Task Management
    def add_task(self, title: str, description: str = "", priority: str = "medium"):
        """Add a new task"""
        task = {
            'id': len(self.data['tasks']) + 1,
            'title': title,
            'description': description,
            'priority': priority,
            'status': 'pending',
            'created': datetime.datetime.now().isoformat()
        }
        self.data['tasks'].append(task)
        self.save_data()
        print(f"✓ Task added: {title}")
        return task
    
    def list_tasks(self, status: str = None):
        """List all tasks or filter by status"""
        tasks = self.data['tasks']
        if status:
            tasks = [t for t in tasks if t['status'] == status]
        
        if not tasks:
            print("No tasks found.")
            return
        
        print("\n" + "="*60)
        print("TASKS")
        print("="*60)
        for task in tasks:
            priority_icon = {"high": "🔴", "medium": "🟡", "low": "🟢"}.get(task['priority'], "⚪")
            status_icon = {"pending": "⏳", "completed": "✓", "in_progress": "🔄"}.get(task['status'], "?")
            print(f"{status_icon} [{task['id']}] {priority_icon} {task['title']}")
            if task['description']:
                print(f"    {task['description']}")
        print("="*60 + "\n")
    
    def complete_task(self, task_id: int):
        """Mark a task as completed"""
        for task in self.data['tasks']:
            if task['id'] == task_id:
                task['status'] = 'completed'
                task['completed'] = datetime.datetime.now().isoformat()
                self.save_data()
                print(f"✓ Task completed: {task['title']}")
                return
        print(f"Task {task_id} not found.")
    
    # Reminder Management
    def add_reminder(self, message: str, reminder_time: str):
        """Add a reminder"""
        reminder = {
            'id': len(self.data['reminders']) + 1,
            'message': message,
            'time': reminder_time,
            'created': datetime.datetime.now().isoformat(),
            'status': 'active'
        }
        self.data['reminders'].append(reminder)
        self.save_data()
        print(f"✓ Reminder set: {message} at {reminder_time}")
        return reminder
    
    def list_reminders(self):
        """List all active reminders"""
        reminders = [r for r in self.data['reminders'] if r['status'] == 'active']
        
        if not reminders:
            print("No active reminders.")
            return
        
        print("\n" + "="*60)
        print("REMINDERS")
        print("="*60)
        for reminder in reminders:
            print(f"🔔 [{reminder['id']}] {reminder['message']}")
            print(f"    Time: {reminder['time']}")
        print("="*60 + "\n")
    
    # Email Management
    def check_emails(self):
        """Check and display email summary"""
        print("\n" + "="*60)
        print("EMAIL SUMMARY")
        print("="*60)
        print(f"📧 Total emails: {len(self.data['emails'])}")
        
        if self.data['emails']:
            print("\nRecent emails:")
            for email in self.data['emails'][-5:]:
                print(f"  • From: {email['from']}")
                print(f"    Subject: {email['subject']}")
                print(f"    Date: {email['date']}")
        else:
            print("No emails in inbox.")
        print("="*60 + "\n")
    
    def add_sample_email(self, from_addr: str, subject: str):
        """Add a sample email for demonstration"""
        email = {
            'from': from_addr,
            'subject': subject,
            'date': datetime.datetime.now().isoformat(),
            'read': False
        }
        self.data['emails'].append(email)
        self.save_data()
        print(f"✓ Email added from {from_addr}")
    
    # Workload Planning
    def plan_workload(self):
        """Generate and display workload plan"""
        print("\n" + "="*60)
        print("WORKLOAD PLAN")
        print("="*60)
        
        # Analyze pending tasks
        pending_tasks = [t for t in self.data['tasks'] if t['status'] == 'pending']
        high_priority = [t for t in pending_tasks if t['priority'] == 'high']
        medium_priority = [t for t in pending_tasks if t['priority'] == 'medium']
        low_priority = [t for t in pending_tasks if t['priority'] == 'low']
        
        print(f"Total pending tasks: {len(pending_tasks)}")
        print(f"  🔴 High priority: {len(high_priority)}")
        print(f"  🟡 Medium priority: {len(medium_priority)}")
        print(f"  🟢 Low priority: {len(low_priority)}")
        
        print("\nRecommended order:")
        for i, task in enumerate(high_priority + medium_priority + low_priority, 1):
            print(f"  {i}. {task['title']} ({task['priority']} priority)")
        
        print("\nUpcoming appointments: " + str(len(self.data['appointments'])))
        print("Active reminders: " + str(len([r for r in self.data['reminders'] if r['status'] == 'active'])))
        print("="*60 + "\n")
    
    # Social Media Ads
    def create_social_media_ad(self, platform: str, content: str, target: str):
        """Create a social media ad"""
        ad = {
            'id': len(self.data['social_media_ads']) + 1,
            'platform': platform,
            'content': content,
            'target': target,
            'created': datetime.datetime.now().isoformat(),
            'status': 'draft'
        }
        self.data['social_media_ads'].append(ad)
        self.save_data()
        print(f"✓ Social media ad created for {platform}")
        return ad
    
    def list_social_media_ads(self):
        """List all social media ads"""
        ads = self.data['social_media_ads']
        
        if not ads:
            print("No social media ads created.")
            return
        
        print("\n" + "="*60)
        print("SOCIAL MEDIA ADS")
        print("="*60)
        for ad in ads:
            print(f"📱 [{ad['id']}] {ad['platform']} - {ad['status']}")
            print(f"    Content: {ad['content'][:50]}...")
            print(f"    Target: {ad['target']}")
        print("="*60 + "\n")
    
    # Appointment Management
    def add_appointment(self, title: str, date_time: str, location: str = "", notes: str = ""):
        """Add an appointment"""
        appointment = {
            'id': len(self.data['appointments']) + 1,
            'title': title,
            'date_time': date_time,
            'location': location,
            'notes': notes,
            'created': datetime.datetime.now().isoformat()
        }
        self.data['appointments'].append(appointment)
        self.save_data()
        print(f"✓ Appointment scheduled: {title} at {date_time}")
        return appointment
    
    def list_appointments(self):
        """List all appointments"""
        appointments = self.data['appointments']
        
        if not appointments:
            print("No appointments scheduled.")
            return
        
        print("\n" + "="*60)
        print("APPOINTMENTS")
        print("="*60)
        for apt in appointments:
            print(f"📅 [{apt['id']}] {apt['title']}")
            print(f"    Time: {apt['date_time']}")
            if apt['location']:
                print(f"    Location: {apt['location']}")
            if apt['notes']:
                print(f"    Notes: {apt['notes']}")
        print("="*60 + "\n")
    
    # Call Management
    def log_call(self, contact: str, duration: str, notes: str = ""):
        """Log a call"""
        call = {
            'contact': contact,
            'duration': duration,
            'notes': notes,
            'timestamp': datetime.datetime.now().isoformat()
        }
        if 'calls' not in self.data:
            self.data['calls'] = []
        self.data['calls'].append(call)
        self.save_data()
        print(f"✓ Call logged: {contact} ({duration})")
        return call
    
    def list_calls(self):
        """List recent calls"""
        calls = self.data.get('calls', [])
        
        if not calls:
            print("No calls logged.")
            return
        
        print("\n" + "="*60)
        print("CALL HISTORY")
        print("="*60)
        for call in calls[-10:]:
            print(f"📞 {call['contact']} - {call['duration']}")
            print(f"    Time: {call['timestamp']}")
            if call['notes']:
                print(f"    Notes: {call['notes']}")
        print("="*60 + "\n")


def print_menu():
    """Display the main menu"""
    print("\n" + "="*60)
    print("PERSONAL BUSINESS ASSISTANT")
    print("="*60)
    print("1.  Add Task")
    print("2.  List Tasks")
    print("3.  Complete Task")
    print("4.  Add Reminder")
    print("5.  List Reminders")
    print("6.  Check Emails")
    print("7.  Plan Workload")
    print("8.  Create Social Media Ad")
    print("9.  List Social Media Ads")
    print("10. Add Appointment")
    print("11. List Appointments")
    print("12. Log Call")
    print("13. List Calls")
    print("14. Dashboard (Overview)")
    print("0.  Exit")
    print("="*60)


def show_dashboard(assistant: PersonalAssistant):
    """Show overview dashboard"""
    print("\n" + "="*60)
    print("DASHBOARD - OVERVIEW")
    print("="*60)
    
    pending_tasks = [t for t in assistant.data['tasks'] if t['status'] == 'pending']
    completed_tasks = [t for t in assistant.data['tasks'] if t['status'] == 'completed']
    active_reminders = [r for r in assistant.data['reminders'] if r['status'] == 'active']
    
    print(f"📋 Tasks: {len(pending_tasks)} pending, {len(completed_tasks)} completed")
    print(f"🔔 Active Reminders: {len(active_reminders)}")
    print(f"📧 Emails: {len(assistant.data['emails'])}")
    print(f"📅 Appointments: {len(assistant.data['appointments'])}")
    print(f"📱 Social Media Ads: {len(assistant.data['social_media_ads'])}")
    print(f"📞 Call History: {len(assistant.data.get('calls', []))}")
    print("="*60 + "\n")


def main():
    """Main application loop"""
    assistant = PersonalAssistant()
    
    print("Welcome to your Personal Business Assistant!")
    
    while True:
        print_menu()
        choice = input("Enter your choice: ").strip()
        
        if choice == '1':
            title = input("Task title: ").strip()
            description = input("Description (optional): ").strip()
            priority = input("Priority (high/medium/low) [medium]: ").strip() or "medium"
            assistant.add_task(title, description, priority)
        
        elif choice == '2':
            status_filter = input("Filter by status (pending/completed/all) [all]: ").strip()
            assistant.list_tasks(None if status_filter == 'all' else status_filter or None)
        
        elif choice == '3':
            task_id = input("Task ID to complete: ").strip()
            try:
                assistant.complete_task(int(task_id))
            except ValueError:
                print("Invalid task ID.")
        
        elif choice == '4':
            message = input("Reminder message: ").strip()
            reminder_time = input("Time (e.g., '2026-02-07 10:00'): ").strip()
            assistant.add_reminder(message, reminder_time)
        
        elif choice == '5':
            assistant.list_reminders()
        
        elif choice == '6':
            assistant.check_emails()
            if input("Add a sample email? (y/n): ").strip().lower() == 'y':
                from_addr = input("From: ").strip()
                subject = input("Subject: ").strip()
                assistant.add_sample_email(from_addr, subject)
        
        elif choice == '7':
            assistant.plan_workload()
        
        elif choice == '8':
            platform = input("Platform (Facebook/Instagram/Twitter/LinkedIn): ").strip()
            content = input("Ad content: ").strip()
            target = input("Target audience: ").strip()
            assistant.create_social_media_ad(platform, content, target)
        
        elif choice == '9':
            assistant.list_social_media_ads()
        
        elif choice == '10':
            title = input("Appointment title: ").strip()
            date_time = input("Date/Time (e.g., '2026-02-07 14:00'): ").strip()
            location = input("Location (optional): ").strip()
            notes = input("Notes (optional): ").strip()
            assistant.add_appointment(title, date_time, location, notes)
        
        elif choice == '11':
            assistant.list_appointments()
        
        elif choice == '12':
            contact = input("Contact name: ").strip()
            duration = input("Duration (e.g., '15 minutes'): ").strip()
            notes = input("Notes (optional): ").strip()
            assistant.log_call(contact, duration, notes)
        
        elif choice == '13':
            assistant.list_calls()
        
        elif choice == '14':
            show_dashboard(assistant)
        
        elif choice == '0':
            print("Thank you for using Personal Business Assistant!")
            break
        
        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()
