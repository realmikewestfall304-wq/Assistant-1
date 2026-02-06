#!/usr/bin/env python3
"""
Quick Start Example for the Personal Business Assistant

This script demonstrates the key features with practical examples.
Run this to see how the assistant can help your one-man show.
"""

from assistant import BusinessAssistant

def main():
    print("=" * 70)
    print("🚀 QUICK START: Personal Business Assistant")
    print("=" * 70)
    print()
    
    # Initialize the assistant
    assistant = BusinessAssistant()
    
    # Example 1: Get honest feedback on a business idea
    print("Example 1: Honest Business Feedback")
    print("-" * 70)
    
    ideas = [
        "Start a business with guaranteed profits and no competition",
        "Create a product that solves customer pain points through validated testing"
    ]
    
    for idea in ideas:
        print(f"\nIdea: {idea}")
        result = assistant.evaluate_idea(idea)
        print(f"Verdict: {result['verdict']}")
        print()
    
    # Example 2: Set up reminders
    print("\nExample 2: Task Management")
    print("-" * 70)
    
    assistant.add_reminder("Call back interested lead", "2026-02-08")
    assistant.add_reminder("Submit tax documents", "2026-04-15")
    assistant.add_reminder("Review marketing metrics", "2026-02-07")
    
    reminders = assistant.get_reminders()
    print(f"Added {len(reminders)} reminders to keep you on track")
    
    # Example 3: Schedule appointments
    print("\nExample 3: Appointments")
    print("-" * 70)
    
    assistant.add_appointment(
        "Sales call with prospect",
        "2026-02-10 3:00 PM",
        "Demo the new features"
    )
    
    assistant.add_appointment(
        "Weekly planning session",
        "2026-02-07 9:00 AM",
        "Review priorities and goals"
    )
    
    appointments = assistant.get_appointments()
    print(f"Scheduled {len(appointments)} appointments")
    
    # Example 4: Draft emails
    print("\nExample 4: Email Management")
    print("-" * 70)
    
    assistant.add_email_draft(
        "client@example.com",
        "Project Update",
        "Just wanted to update you on the progress we've made this week..."
    )
    
    drafts = assistant.get_emails(draft_only=True)
    print(f"Created {len(drafts)} email draft(s)")
    
    # Show summary
    print("\n" + "=" * 70)
    print(assistant.get_summary())
    
    print("\n" + "=" * 70)
    print("✅ Quick Start Complete!")
    print("=" * 70)
    print("\nNow run: python3 assistant.py")
    print("to start using the interactive assistant for your business.")
    print()

if __name__ == "__main__":
    main()
