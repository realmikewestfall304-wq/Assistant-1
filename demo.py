#!/usr/bin/env python3
"""
Demo Script - Business Mentor Agent
Shows practical examples of how to use the agent
"""

from business_mentor import IntegratedAssistant
import json


def print_section(title):
    """Print a section header"""
    print("\n" + "=" * 70)
    print(f"  {title}")
    print("=" * 70 + "\n")


def demo_business_mentorship():
    """Demonstrate business mentorship capabilities"""
    print_section("DEMO 1: Business Mentorship - Direct, Honest Advice")
    
    assistant = IntegratedAssistant()
    
    # Example 1: Strategic decision
    print("Question: Should I lower prices to compete with bigger companies?\n")
    response = assistant.process_request(
        "mentor",
        query="Should I lower prices to compete with bigger companies?",
        context={"current_revenue": 150000, "profit_margin": 0.25}
    )
    print(response["response"])
    
    print("\n" + "-" * 70)
    input("\nPress Enter to see next example...")
    
    # Example 2: Hiring decision
    print("\nQuestion: I have a team member who's been underperforming for 6 months. What should I do?\n")
    response = assistant.process_request(
        "mentor",
        query="I have a team member who's been underperforming for 6 months. What should I do?",
        context={"team_size": 8, "position": "sales"}
    )
    print(response["response"])


def demo_office_management():
    """Demonstrate office task management"""
    print_section("DEMO 2: Office Task Management")
    
    assistant = IntegratedAssistant()
    
    # Schedule appointments
    print("Scheduling appointments...")
    apt1 = assistant.office_manager.manage_appointments(
        "schedule",
        title="Client Discovery Call - ABC Corp",
        datetime="2026-02-10 10:00",
        duration=60,
        attendees=["john@abccorp.com"],
        notes="Discuss project requirements"
    )
    print(f"✓ Appointment scheduled: ID {apt1['appointment_id']}")
    
    apt2 = assistant.office_manager.manage_appointments(
        "schedule",
        title="Team Standup",
        datetime="2026-02-10 09:00",
        duration=15,
        attendees=["team@company.com"]
    )
    print(f"✓ Appointment scheduled: ID {apt2['appointment_id']}")
    
    apt3 = assistant.office_manager.manage_appointments(
        "schedule",
        title="Investor Pitch Meeting",
        datetime="2026-02-12 14:00",
        duration=90,
        attendees=["investor@vc.com"],
        location="Conference Room A"
    )
    print(f"✓ Appointment scheduled: ID {apt3['appointment_id']}")
    
    # Log some calls
    print("\nLogging phone calls...")
    call1 = assistant.office_manager.manage_phone_calls(
        "log",
        caller="Jane Smith - Prospect",
        duration=15,
        notes="Interested in Enterprise plan, needs pricing quote",
        follow_up_required=True
    )
    print(f"✓ Call logged: ID {call1['call_id']}")
    
    # Create a quote
    print("\nCreating quotes...")
    quote1 = assistant.office_manager.manage_quotes(
        "create",
        client="ABC Corp",
        items=[
            {"name": "Consulting Services", "quantity": 40, "rate": 150},
            {"name": "Implementation", "quantity": 1, "rate": 5000}
        ],
        total=11000,
        valid_until="2026-03-10"
    )
    print(f"✓ Quote created: ID {quote1['quote_id']}")
    
    # File some paperwork
    print("\nFiling paperwork...")
    doc1 = assistant.office_manager.manage_paperwork(
        "file",
        title="Client Contract - ABC Corp",
        category="contracts",
        file_path="/documents/abc_contract.pdf",
        deadline="2026-02-15"
    )
    print(f"✓ Document filed: ID {doc1['document_id']}")
    
    print("\n" + "-" * 70)
    input("\nPress Enter to see dashboard...")
    
    # Show dashboard
    print("\n")
    print_section("Dashboard Overview")
    dashboard = assistant.get_dashboard()
    print(json.dumps(dashboard, indent=2))


def demo_integrated_workflow():
    """Demonstrate a complete workflow"""
    print_section("DEMO 3: Complete Workflow - Landing a New Client")
    
    assistant = IntegratedAssistant()
    
    print("SCENARIO: You just had a promising call with a potential client.")
    print("Let's use the agent to handle all the follow-up tasks...\n")
    
    # Step 1: Log the call
    print("Step 1: Logging the initial call...")
    call = assistant.office_manager.manage_phone_calls(
        "log",
        caller="Sarah Johnson - TechStart Inc",
        duration=20,
        notes="Needs help with digital transformation. Budget: $50k. Timeline: 3 months.",
        follow_up_required=True
    )
    print(f"✓ Call logged (ID: {call['call_id']})")
    
    # Step 2: Get mentor advice
    print("\nStep 2: Getting business mentor advice...")
    advice = assistant.process_request(
        "mentor",
        query="Potential client wants digital transformation. Budget $50k, timeline 3 months. Is this realistic?",
        context={"our_typical_rate": 150, "team_capacity": 0.7}
    )
    print(advice["response"])
    
    input("\nPress Enter to continue...")
    
    # Step 3: Schedule follow-up meeting
    print("\nStep 3: Scheduling discovery meeting...")
    meeting = assistant.office_manager.manage_appointments(
        "schedule",
        title="Discovery Meeting - TechStart Inc",
        datetime="2026-02-11 14:00",
        duration=90,
        attendees=["sarah@techstart.com"],
        notes="Discuss project scope, timeline, and deliverables"
    )
    print(f"✓ Meeting scheduled (ID: {meeting['appointment_id']})")
    
    # Step 4: Create quote
    print("\nStep 4: Preparing quote...")
    quote = assistant.office_manager.manage_quotes(
        "create",
        client="TechStart Inc",
        items=[
            {"name": "Discovery & Planning", "quantity": 40, "rate": 150},
            {"name": "Implementation Phase 1", "quantity": 80, "rate": 150},
            {"name": "Implementation Phase 2", "quantity": 80, "rate": 150},
            {"name": "Training & Documentation", "quantity": 20, "rate": 150}
        ],
        total=33000,
        valid_until="2026-02-28"
    )
    print(f"✓ Quote prepared (ID: {quote['quote_id']})")
    
    # Step 5: Set up document tracking
    print("\nStep 5: Setting up document tracking...")
    doc = assistant.office_manager.manage_paperwork(
        "file",
        title="TechStart Inc - Proposal",
        category="proposals",
        file_path="/documents/techstart_proposal.pdf",
        deadline="2026-02-15"
    )
    print(f"✓ Document tracking setup (ID: {doc['document_id']})")
    
    print("\n" + "=" * 70)
    print("✓ COMPLETE WORKFLOW FINISHED")
    print("=" * 70)
    print("\nAll tasks organized and ready to go!")
    print("Next steps are clear, timeline is set, and nothing falls through the cracks.")


def main():
    """Run all demos"""
    print("""
    ╔════════════════════════════════════════════════════════════════════╗
    ║                                                                    ║
    ║           BUSINESS MENTOR AGENT - INTERACTIVE DEMO                ║
    ║                                                                    ║
    ║  This demo shows you how the agent works in real scenarios        ║
    ║  Direct, honest business advice + efficient office management     ║
    ║                                                                    ║
    ╚════════════════════════════════════════════════════════════════════╝
    """)
    
    print("\nThis demo will show you three key capabilities:")
    print("1. Business mentorship (direct, actionable advice)")
    print("2. Office task management (emails, calls, appointments, etc.)")
    print("3. Integrated workflows (combining both)")
    
    input("\nPress Enter to start the demo...")
    
    try:
        # Demo 1: Business Mentorship
        demo_business_mentorship()
        
        input("\n\nPress Enter to continue to office management demo...")
        
        # Demo 2: Office Management
        demo_office_management()
        
        input("\n\nPress Enter to see complete workflow demo...")
        
        # Demo 3: Integrated Workflow
        demo_integrated_workflow()
        
        # Final message
        print("\n\n")
        print("=" * 70)
        print("  DEMO COMPLETE")
        print("=" * 70)
        print("\nYou've seen how the Business Mentor Agent:")
        print("  ✓ Provides direct, honest business advice")
        print("  ✓ Manages appointments, calls, quotes, and paperwork")
        print("  ✓ Keeps everything organized and on track")
        print("  ✓ Works as an integrated system")
        print("\nReady to use it? Run: python cli.py help")
        print("\n")
        
    except KeyboardInterrupt:
        print("\n\nDemo interrupted. Thanks for checking it out!")
    except Exception as e:
        print(f"\n\nError during demo: {e}")


if __name__ == "__main__":
    main()
