#!/usr/bin/env python3
"""
Demo script for Personal Business Assistant
This script demonstrates all the key features of the assistant.
"""

from assistant import PersonalAssistant
import json
import os

def run_demo():
    """Run a demonstration of the assistant features"""
    
    # Remove existing demo data if present
    demo_file = 'demo_data.json'
    if os.path.exists(demo_file):
        os.remove(demo_file)
    
    # Create assistant instance with demo data file
    print("="*60)
    print("PERSONAL BUSINESS ASSISTANT - DEMO")
    print("="*60)
    print("\nInitializing assistant...\n")
    
    assistant = PersonalAssistant(data_file=demo_file)
    
    # Demo 1: Task Management
    print("\n" + "="*60)
    print("DEMO 1: TASK MANAGEMENT")
    print("="*60)
    assistant.add_task("Prepare quarterly report", "Compile Q1 financial data", "high")
    assistant.add_task("Team standup meeting", "Daily sync with dev team", "medium")
    assistant.add_task("Update project documentation", "Add new API endpoints", "low")
    assistant.list_tasks()
    
    # Demo 2: Complete a task
    print("\n" + "="*60)
    print("DEMO 2: COMPLETING A TASK")
    print("="*60)
    assistant.complete_task(2)
    assistant.list_tasks()
    
    # Demo 3: Reminders
    print("\n" + "="*60)
    print("DEMO 3: REMINDERS")
    print("="*60)
    assistant.add_reminder("Submit expense report", "2026-02-10 17:00")
    assistant.add_reminder("Call investor", "2026-02-07 11:00")
    assistant.list_reminders()
    
    # Demo 4: Appointments
    print("\n" + "="*60)
    print("DEMO 4: APPOINTMENTS")
    print("="*60)
    assistant.add_appointment("Board Meeting", "2026-02-08 10:00", "Main Conference Room", "Q1 Review")
    assistant.add_appointment("Lunch with Client", "2026-02-07 12:30", "Downtown Restaurant", "Discuss new contract")
    assistant.list_appointments()
    
    # Demo 5: Social Media Ads
    print("\n" + "="*60)
    print("DEMO 5: SOCIAL MEDIA ADVERTISING")
    print("="*60)
    assistant.create_social_media_ad(
        "Facebook",
        "🚀 New Product Launch! Get 20% off for early adopters. Limited time only!",
        "Tech enthusiasts, age 25-45"
    )
    assistant.create_social_media_ad(
        "Instagram",
        "✨ Behind the scenes of our latest innovation. Follow us for more!",
        "Millennials interested in technology"
    )
    assistant.list_social_media_ads()
    
    # Demo 6: Call Logging
    print("\n" + "="*60)
    print("DEMO 6: CALL MANAGEMENT")
    print("="*60)
    assistant.log_call("Sarah Johnson", "45 minutes", "Discussed partnership opportunities")
    assistant.log_call("Mike Chen", "15 minutes", "Quick status update on Project X")
    assistant.list_calls()
    
    # Demo 7: Email Check
    print("\n" + "="*60)
    print("DEMO 7: EMAIL MANAGEMENT")
    print("="*60)
    assistant.add_sample_email("client@example.com", "Re: Project Proposal")
    assistant.add_sample_email("team@company.com", "Weekly Update - February 2026")
    assistant.add_sample_email("vendor@supplier.com", "Invoice #12345")
    assistant.check_emails()
    
    # Demo 8: Workload Planning
    print("\n" + "="*60)
    print("DEMO 8: WORKLOAD PLANNING")
    print("="*60)
    assistant.plan_workload()
    
    # Demo 9: Dashboard
    print("\n" + "="*60)
    print("DEMO 9: DASHBOARD OVERVIEW")
    print("="*60)
    from assistant import show_dashboard
    show_dashboard(assistant)
    
    # Show saved data
    print("\n" + "="*60)
    print("DEMO DATA SAVED")
    print("="*60)
    print(f"All demo data has been saved to: {demo_file}")
    print("You can inspect this file to see how data is stored.")
    
    with open(demo_file, 'r') as f:
        data = json.load(f)
        print(f"\nData Summary:")
        print(f"  - Tasks: {len(data['tasks'])}")
        print(f"  - Reminders: {len(data['reminders'])}")
        print(f"  - Appointments: {len(data['appointments'])}")
        print(f"  - Social Media Ads: {len(data['social_media_ads'])}")
        print(f"  - Calls: {len(data.get('calls', []))}")
        print(f"  - Emails: {len(data['emails'])}")
    
    print("\n" + "="*60)
    print("DEMO COMPLETE")
    print("="*60)
    print("To start using the assistant, run: python3 assistant.py")
    print("="*60 + "\n")


if __name__ == "__main__":
    run_demo()
