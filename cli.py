"""
Command-line interface for the Business Mentor Agent
Run the agent from the command line
"""

import sys
import json
from typing import Optional
from business_mentor import IntegratedAssistant


def print_banner():
    """Print the application banner"""
    banner = """
    ╔══════════════════════════════════════════════════════════╗
    ║         BUSINESS MENTOR ASSISTANT v1.0                   ║
    ║         Direct, Honest, Actionable Advice                ║
    ╚══════════════════════════════════════════════════════════╝
    """
    print(banner)


def print_help():
    """Print help information"""
    help_text = """
    USAGE:
        python cli.py [command] [options]
    
    COMMANDS:
        mentor      Get business mentorship and advice
        email       Manage emails
        call        Manage phone calls
        appointment Manage appointments
        quote       Manage quotes
        paperwork   Manage paperwork and documents
        dashboard   View dashboard overview
        help        Show this help message
    
    EXAMPLES:
        # Get business advice
        python cli.py mentor "Should I expand to a new market?"
        
        # List appointments
        python cli.py appointment list
        
        # Schedule appointment
        python cli.py appointment schedule "Client Meeting" "2026-02-10 14:00"
        
        # View dashboard
        python cli.py dashboard
        
        # Send email
        python cli.py email send "client@example.com" "Subject" "Body text"
    
    For more detailed help on a specific command:
        python cli.py [command] --help
    """
    print(help_text)


def handle_mentor_command(assistant: IntegratedAssistant, args: list):
    """Handle mentor command"""
    if len(args) < 1:
        print("ERROR: Please provide a question or situation for mentorship")
        print("USAGE: python cli.py mentor \"Your question here\"")
        return
    
    query = " ".join(args)
    result = assistant.process_request("mentor", query=query)
    print(result["response"])


def handle_email_command(assistant: IntegratedAssistant, args: list):
    """Handle email command"""
    if len(args) < 1:
        print("ERROR: Please provide an email action")
        print("ACTIONS: list, send, categorize, archive")
        return
    
    action = args[0]
    
    if action == "list":
        result = assistant.process_request("email", action="list")
        print(json.dumps(result["response"], indent=2))
    elif action == "send":
        if len(args) < 4:
            print("USAGE: python cli.py email send <to> <subject> <body>")
            return
        result = assistant.process_request(
            "email",
            action="send",
            to=args[1],
            subject=args[2],
            body=" ".join(args[3:])
        )
        print(json.dumps(result["response"], indent=2))
    else:
        result = assistant.process_request("email", action=action)
        print(json.dumps(result["response"], indent=2))


def handle_appointment_command(assistant: IntegratedAssistant, args: list):
    """Handle appointment command"""
    if len(args) < 1:
        print("ERROR: Please provide an appointment action")
        print("ACTIONS: list, schedule, reschedule, cancel, check_conflicts")
        return
    
    action = args[0]
    
    if action == "list":
        result = assistant.process_request("appointment", action="list")
        print(json.dumps(result["response"], indent=2))
    elif action == "schedule":
        if len(args) < 3:
            print("USAGE: python cli.py appointment schedule <title> <datetime>")
            return
        # Create kwargs separately to avoid passing action twice
        kwargs = {
            "title": args[1],
            "datetime": args[2]
        }
        result = assistant.office_manager.manage_appointments("schedule", **kwargs)
        print(json.dumps(result, indent=2))
    else:
        result = assistant.process_request("appointment", action=action)
        print(json.dumps(result["response"], indent=2))


def handle_quote_command(assistant: IntegratedAssistant, args: list):
    """Handle quote command"""
    if len(args) < 1:
        print("ERROR: Please provide a quote action")
        print("ACTIONS: list, create, send, track, update")
        return
    
    action = args[0]
    result = assistant.process_request("quote", action=action)
    print(json.dumps(result["response"], indent=2))


def handle_paperwork_command(assistant: IntegratedAssistant, args: list):
    """Handle paperwork command"""
    if len(args) < 1:
        print("ERROR: Please provide a paperwork action")
        print("ACTIONS: file, retrieve, track_deadline, organize, archive")
        return
    
    action = args[0]
    result = assistant.process_request("paperwork", action=action)
    print(json.dumps(result["response"], indent=2))


def handle_dashboard_command(assistant: IntegratedAssistant, args: list):
    """Handle dashboard command"""
    dashboard = assistant.get_dashboard()
    print("\n" + "=" * 60)
    print("BUSINESS ASSISTANT DASHBOARD")
    print("=" * 60)
    print(f"\nEMAILS:")
    print(f"  Total: {dashboard['emails']['total']}")
    print(f"  Unread: {dashboard['emails']['unread']}")
    print(f"\nCALLS:")
    print(f"  Today: {dashboard['calls']['today']}")
    print(f"  Follow-ups: {dashboard['calls']['follow_ups']}")
    print(f"\nAPPOINTMENTS:")
    print(f"  Today: {dashboard['appointments']['today']}")
    print(f"  This Week: {dashboard['appointments']['this_week']}")
    print(f"\nQUOTES:")
    print(f"  Pending: {dashboard['quotes']['pending']}")
    print(f"  Total Sent: {dashboard['quotes']['sent']}")
    print(f"\nPAPERWORK:")
    print(f"  Urgent Deadlines: {dashboard['paperwork']['urgent_deadlines']}")
    print(f"  Total Documents: {dashboard['paperwork']['total']}")
    print("=" * 60 + "\n")


def main():
    """Main entry point for CLI"""
    print_banner()
    
    if len(sys.argv) < 2:
        print_help()
        return
    
    command = sys.argv[1].lower()
    args = sys.argv[2:] if len(sys.argv) > 2 else []
    
    if command == "help" or command == "--help" or command == "-h":
        print_help()
        return
    
    # Initialize assistant
    assistant = IntegratedAssistant()
    
    # Route to appropriate command handler
    if command == "mentor":
        handle_mentor_command(assistant, args)
    elif command == "email":
        handle_email_command(assistant, args)
    elif command == "call":
        # Similar to email
        result = assistant.process_request("call", action=args[0] if args else "get_log")
        print(json.dumps(result["response"], indent=2))
    elif command == "appointment":
        handle_appointment_command(assistant, args)
    elif command == "quote":
        handle_quote_command(assistant, args)
    elif command == "paperwork":
        handle_paperwork_command(assistant, args)
    elif command == "dashboard":
        handle_dashboard_command(assistant, args)
    else:
        print(f"ERROR: Unknown command '{command}'")
        print("Run 'python cli.py help' for usage information")


if __name__ == "__main__":
    main()
