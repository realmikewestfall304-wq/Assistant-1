"""
Command-line interface for the Business Mentor Agent
Run the agent from the command line
"""

import sys
import json
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
        result = assistant.office_manager.manage_emails("list")
        print(json.dumps(result, indent=2))
    elif action == "send":
        if len(args) < 4:
            print("USAGE: python cli.py email send <to> <subject> <body>")
            return
        kwargs = {
            "to": args[1],
            "subject": args[2],
            "body": " ".join(args[3:])
        }
        result = assistant.office_manager.manage_emails("send", **kwargs)
        print(json.dumps(result, indent=2))
    else:
        result = assistant.office_manager.manage_emails(action)
        print(json.dumps(result, indent=2))


def handle_appointment_command(assistant: IntegratedAssistant, args: list):
    """Handle appointment command"""
    if len(args) < 1:
        print("ERROR: Please provide an appointment action")
        print("ACTIONS: list, schedule, reschedule, cancel, check_conflicts")
        return
    
    action = args[0]
    
    if action == "list":
        result = assistant.office_manager.manage_appointments("list")
        print(json.dumps(result, indent=2))
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
        result = assistant.office_manager.manage_appointments(action)
        print(json.dumps(result, indent=2))


def handle_quote_command(assistant: IntegratedAssistant, args: list):
    """Handle quote command"""
    if len(args) < 1:
        print("ERROR: Please provide a quote action")
        print("ACTIONS: list, create, send, track, update")
        return
    
    action = args[0]
    
    if action == "list":
        result = assistant.office_manager.manage_quotes("list")
        print(json.dumps(result, indent=2))
    elif action == "create":
        if len(args) < 4:
            print("USAGE: python cli.py quote create <client> <total> <valid_until>")
            print("Example: python cli.py quote create 'Acme Corp' 5000 '2026-03-31'")
            return
        kwargs = {
            "client": args[1],
            "total": float(args[2]),
            "valid_until": args[3],
            "items": []  # Could be expanded to accept items
        }
        result = assistant.office_manager.manage_quotes("create", **kwargs)
        print(json.dumps(result, indent=2))
    elif action == "send":
        if len(args) < 3:
            print("USAGE: python cli.py quote send <quote_id> <recipient>")
            return
        kwargs = {
            "quote_id": int(args[1]),
            "recipient": args[2]
        }
        result = assistant.office_manager.manage_quotes("send", **kwargs)
        print(json.dumps(result, indent=2))
    elif action == "track":
        if len(args) < 2:
            print("USAGE: python cli.py quote track <quote_id>")
            return
        result = assistant.office_manager.manage_quotes("track", quote_id=int(args[1]))
        print(json.dumps(result, indent=2))
    else:
        result = assistant.office_manager.manage_quotes(action)
        print(json.dumps(result, indent=2))


def handle_paperwork_command(assistant: IntegratedAssistant, args: list):
    """Handle paperwork command"""
    if len(args) < 1:
        print("ERROR: Please provide a paperwork action")
        print("ACTIONS: file, retrieve, track_deadline, organize, archive")
        return
    
    action = args[0]
    
    if action == "file":
        if len(args) < 4:
            print("USAGE: python cli.py paperwork file <title> <category> <file_path> [deadline]")
            print("Example: python cli.py paperwork file 'Contract' contracts /docs/contract.pdf '2026-03-15'")
            return
        kwargs = {
            "title": args[1],
            "category": args[2],
            "file_path": args[3]
        }
        if len(args) > 4:
            kwargs["deadline"] = args[4]
        result = assistant.office_manager.manage_paperwork("file", **kwargs)
        print(json.dumps(result, indent=2))
    elif action == "retrieve":
        if len(args) < 2:
            print("USAGE: python cli.py paperwork retrieve <document_id>")
            return
        result = assistant.office_manager.manage_paperwork("retrieve", document_id=int(args[1]))
        print(json.dumps(result, indent=2))
    elif action == "organize":
        category = args[1] if len(args) > 1 else None
        result = assistant.office_manager.manage_paperwork("organize", category=category)
        print(json.dumps(result, indent=2))
    else:
        result = assistant.office_manager.manage_paperwork(action)
        print(json.dumps(result, indent=2))


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
        # Handle call commands
        if not args:
            result = assistant.office_manager.manage_phone_calls("get_log")
            print(json.dumps(result, indent=2))
        else:
            action = args[0]
            if action == "log":
                if len(args) < 3:
                    print("USAGE: python cli.py call log <caller> <duration> [notes]")
                    print("Example: python cli.py call log 'John Doe' 15 'Discussed pricing'")
                    return
                kwargs = {
                    "caller": args[1],
                    "duration": int(args[2]),
                    "notes": " ".join(args[3:]) if len(args) > 3 else "",
                    "follow_up_required": False
                }
                result = assistant.office_manager.manage_phone_calls("log", **kwargs)
            elif action == "get_log":
                result = assistant.office_manager.manage_phone_calls("get_log")
            else:
                result = assistant.office_manager.manage_phone_calls(action)
            print(json.dumps(result, indent=2))
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
