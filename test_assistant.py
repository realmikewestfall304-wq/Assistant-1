#!/usr/bin/env python3
"""
Unit tests for Personal Business Assistant
"""

import unittest
import os
import json
from assistant import PersonalAssistant


class TestPersonalAssistant(unittest.TestCase):
    """Test cases for PersonalAssistant class"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.test_file = 'test_assistant_data.json'
        # Remove test file if it exists
        if os.path.exists(self.test_file):
            os.remove(self.test_file)
        self.assistant = PersonalAssistant(data_file=self.test_file)
    
    def tearDown(self):
        """Clean up test fixtures"""
        if os.path.exists(self.test_file):
            os.remove(self.test_file)
    
    # Task Management Tests
    def test_add_task(self):
        """Test adding a task"""
        task = self.assistant.add_task("Test Task", "Test Description", "high")
        self.assertEqual(task['title'], "Test Task")
        self.assertEqual(task['description'], "Test Description")
        self.assertEqual(task['priority'], "high")
        self.assertEqual(task['status'], "pending")
        self.assertEqual(len(self.assistant.data['tasks']), 1)
    
    def test_complete_task(self):
        """Test completing a task"""
        task = self.assistant.add_task("Test Task", "Test Description", "medium")
        task_id = task['id']
        self.assistant.complete_task(task_id)
        updated_task = self.assistant.data['tasks'][0]
        self.assertEqual(updated_task['status'], "completed")
        self.assertIn('completed', updated_task)
    
    def test_multiple_tasks(self):
        """Test adding multiple tasks"""
        self.assistant.add_task("Task 1", "", "high")
        self.assistant.add_task("Task 2", "", "medium")
        self.assistant.add_task("Task 3", "", "low")
        self.assertEqual(len(self.assistant.data['tasks']), 3)
    
    # Reminder Tests
    def test_add_reminder(self):
        """Test adding a reminder"""
        reminder = self.assistant.add_reminder("Test Reminder", "2026-02-10 10:00")
        self.assertEqual(reminder['message'], "Test Reminder")
        self.assertEqual(reminder['time'], "2026-02-10 10:00")
        self.assertEqual(reminder['status'], "active")
        self.assertEqual(len(self.assistant.data['reminders']), 1)
    
    def test_multiple_reminders(self):
        """Test adding multiple reminders"""
        self.assistant.add_reminder("Reminder 1", "2026-02-10 10:00")
        self.assistant.add_reminder("Reminder 2", "2026-02-11 15:00")
        self.assertEqual(len(self.assistant.data['reminders']), 2)
    
    # Appointment Tests
    def test_add_appointment(self):
        """Test adding an appointment"""
        appointment = self.assistant.add_appointment(
            "Meeting", "2026-02-10 14:00", "Office", "Discuss project"
        )
        self.assertEqual(appointment['title'], "Meeting")
        self.assertEqual(appointment['date_time'], "2026-02-10 14:00")
        self.assertEqual(appointment['location'], "Office")
        self.assertEqual(appointment['notes'], "Discuss project")
        self.assertEqual(len(self.assistant.data['appointments']), 1)
    
    def test_add_appointment_minimal(self):
        """Test adding an appointment with minimal info"""
        appointment = self.assistant.add_appointment("Quick Call", "2026-02-10 09:00")
        self.assertEqual(appointment['title'], "Quick Call")
        self.assertEqual(appointment['location'], "")
        self.assertEqual(appointment['notes'], "")
    
    # Social Media Ads Tests
    def test_create_social_media_ad(self):
        """Test creating a social media ad"""
        ad = self.assistant.create_social_media_ad(
            "Facebook", "Test ad content", "Test audience"
        )
        self.assertEqual(ad['platform'], "Facebook")
        self.assertEqual(ad['content'], "Test ad content")
        self.assertEqual(ad['target'], "Test audience")
        self.assertEqual(ad['status'], "draft")
        self.assertEqual(len(self.assistant.data['social_media_ads']), 1)
    
    def test_multiple_social_media_ads(self):
        """Test creating multiple social media ads"""
        self.assistant.create_social_media_ad("Facebook", "Content 1", "Audience 1")
        self.assistant.create_social_media_ad("Instagram", "Content 2", "Audience 2")
        self.assistant.create_social_media_ad("Twitter", "Content 3", "Audience 3")
        self.assertEqual(len(self.assistant.data['social_media_ads']), 3)
    
    # Call Management Tests
    def test_log_call(self):
        """Test logging a call"""
        call = self.assistant.log_call("John Doe", "30 minutes", "Test notes")
        self.assertEqual(call['contact'], "John Doe")
        self.assertEqual(call['duration'], "30 minutes")
        self.assertEqual(call['notes'], "Test notes")
        self.assertEqual(len(self.assistant.data['calls']), 1)
    
    def test_log_call_minimal(self):
        """Test logging a call with minimal info"""
        call = self.assistant.log_call("Jane Smith", "15 minutes")
        self.assertEqual(call['contact'], "Jane Smith")
        self.assertEqual(call['notes'], "")
    
    # Email Tests
    def test_add_sample_email(self):
        """Test adding a sample email"""
        self.assistant.add_sample_email("test@example.com", "Test Subject")
        self.assertEqual(len(self.assistant.data['emails']), 1)
        email = self.assistant.data['emails'][0]
        self.assertEqual(email['from'], "test@example.com")
        self.assertEqual(email['subject'], "Test Subject")
        self.assertEqual(email['read'], False)
    
    # Data Persistence Tests
    def test_data_persistence(self):
        """Test that data is saved and loaded correctly"""
        # Add some data
        self.assistant.add_task("Test Task", "", "high")
        self.assistant.add_reminder("Test Reminder", "2026-02-10 10:00")
        
        # Create new instance with same file
        assistant2 = PersonalAssistant(data_file=self.test_file)
        
        # Verify data was loaded
        self.assertEqual(len(assistant2.data['tasks']), 1)
        self.assertEqual(len(assistant2.data['reminders']), 1)
        self.assertEqual(assistant2.data['tasks'][0]['title'], "Test Task")
        self.assertEqual(assistant2.data['reminders'][0]['message'], "Test Reminder")
    
    def test_data_structure(self):
        """Test that data structure is initialized correctly"""
        self.assertIn('tasks', self.assistant.data)
        self.assertIn('reminders', self.assistant.data)
        self.assertIn('emails', self.assistant.data)
        self.assertIn('appointments', self.assistant.data)
        self.assertIn('workload', self.assistant.data)
        self.assertIn('social_media_ads', self.assistant.data)
        
        # All should be empty lists initially
        self.assertEqual(len(self.assistant.data['tasks']), 0)
        self.assertEqual(len(self.assistant.data['reminders']), 0)
        self.assertEqual(len(self.assistant.data['emails']), 0)
        self.assertEqual(len(self.assistant.data['appointments']), 0)
        self.assertEqual(len(self.assistant.data['workload']), 0)
        self.assertEqual(len(self.assistant.data['social_media_ads']), 0)
    
    # Edge Cases
    def test_complete_nonexistent_task(self):
        """Test completing a task that doesn't exist"""
        # Should not raise an error, just print message
        self.assistant.complete_task(999)
        # No exception should be raised
    
    def test_task_ids_increment(self):
        """Test that task IDs increment correctly"""
        task1 = self.assistant.add_task("Task 1", "", "high")
        task2 = self.assistant.add_task("Task 2", "", "medium")
        task3 = self.assistant.add_task("Task 3", "", "low")
        
        self.assertEqual(task1['id'], 1)
        self.assertEqual(task2['id'], 2)
        self.assertEqual(task3['id'], 3)


class TestDataValidation(unittest.TestCase):
    """Test data validation and integrity"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.test_file = 'test_validation_data.json'
        if os.path.exists(self.test_file):
            os.remove(self.test_file)
        self.assistant = PersonalAssistant(data_file=self.test_file)
    
    def tearDown(self):
        """Clean up test fixtures"""
        if os.path.exists(self.test_file):
            os.remove(self.test_file)
    
    def test_json_structure(self):
        """Test that saved JSON is valid"""
        self.assistant.add_task("Test", "", "high")
        self.assistant.save_data()
        
        # Load and verify JSON structure
        with open(self.test_file, 'r') as f:
            data = json.load(f)
        
        self.assertIsInstance(data, dict)
        self.assertIsInstance(data['tasks'], list)
        self.assertIsInstance(data['tasks'][0], dict)
    
    def test_timestamp_format(self):
        """Test that timestamps are in ISO format"""
        task = self.assistant.add_task("Test", "", "high")
        self.assertIn('T', task['created'])  # ISO format has 'T' separator


def run_tests():
    """Run all tests"""
    # Suppress print output during tests
    import sys
    from io import StringIO
    
    # Redirect stdout
    old_stdout = sys.stdout
    sys.stdout = StringIO()
    
    try:
        # Run tests
        loader = unittest.TestLoader()
        suite = unittest.TestSuite()
        
        suite.addTests(loader.loadTestsFromTestCase(TestPersonalAssistant))
        suite.addTests(loader.loadTestsFromTestCase(TestDataValidation))
        
        runner = unittest.TextTestRunner(stream=old_stdout, verbosity=2)
        result = runner.run(suite)
        
        return result.wasSuccessful()
    finally:
        # Restore stdout
        sys.stdout = old_stdout


if __name__ == '__main__':
    success = run_tests()
    exit(0 if success else 1)
