#!/bin/bash
# Comprehensive API Test Suite for Restaurant Maintenance Work Order System

echo "========================================"
echo "Restaurant Maintenance API Test Suite"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function to run tests
run_test() {
  local test_name="$1"
  local test_command="$2"
  local expected_pattern="$3"
  
  echo -n "Testing: $test_name... "
  
  local response=$(eval "$test_command")
  
  if echo "$response" | grep -q "$expected_pattern"; then
    echo -e "${GREEN}PASS${NC}"
    ((TESTS_PASSED++))
    return 0
  else
    echo -e "${RED}FAIL${NC}"
    echo "  Expected pattern: $expected_pattern"
    echo "  Got response: $response"
    ((TESTS_FAILED++))
    return 1
  fi
}

# Start the server
echo "Starting server..."
cd /home/runner/work/Assistant-1/Assistant-1/restaurant-maintenance/backend

# Remove old database to start fresh
if [ -f "workorders.db" ]; then
  rm -f workorders.db
  echo "Removed old database for fresh start"
fi

node server.js > /tmp/test-server.log 2>&1 &
SERVER_PID=$!
sleep 3

# Verify server is running
if ! ps -p $SERVER_PID > /dev/null; then
  echo -e "${RED}ERROR: Server failed to start${NC}"
  cat /tmp/test-server.log
  exit 1
fi

echo -e "${GREEN}Server started successfully (PID: $SERVER_PID)${NC}"
echo ""

# Test 1: Health Check
echo -e "${YELLOW}=== Test Suite 1: Health & Connectivity ===${NC}"
run_test "Health check endpoint" \
  "curl -s http://localhost:5001/api/health" \
  '"status":"OK"'

run_test "Uploads directory exists" \
  "curl -s http://localhost:5001/api/health" \
  '"uploadsDirExists":true'

echo ""

# Test 2: GET operations
echo -e "${YELLOW}=== Test Suite 2: GET Operations ===${NC}"
run_test "Get all work orders (empty)" \
  "curl -s http://localhost:5001/api/work-orders" \
  '"workOrders":\[\]'

run_test "Get non-existent work order (404)" \
  "curl -s http://localhost:5001/api/work-orders/9999" \
  '"error":"Work order not found"'

echo ""

# Test 3: POST operations (Create)
echo -e "${YELLOW}=== Test Suite 3: POST Operations (Create) ===${NC}"

# Create work order without attachment
run_test "Create work order without attachment" \
  "curl -s -X POST http://localhost:5001/api/work-orders -F 'title=Test Order 1' -F 'description=Test description' -F 'status=pending'" \
  '"message":"Work order created successfully"'

# Create work order with attachment
echo "Test file content" > /tmp/test-attachment.txt
run_test "Create work order with attachment" \
  "curl -s -X POST http://localhost:5001/api/work-orders -F 'title=Test Order 2' -F 'description=With attachment' -F 'status=pending' -F 'attachment=@/tmp/test-attachment.txt'" \
  '"attachment_filename":'

# Test required field validation
run_test "Create work order without title (validation)" \
  "curl -s -X POST http://localhost:5001/api/work-orders -F 'description=No title'" \
  '"error":"Title is required"'

# Verify work orders were created
run_test "Verify work orders count" \
  "curl -s http://localhost:5001/api/work-orders" \
  '"count":2'

echo ""

# Test 4: GET specific work order
echo -e "${YELLOW}=== Test Suite 4: GET Specific Work Order ===${NC}"

run_test "Get work order by ID (1)" \
  "curl -s http://localhost:5001/api/work-orders/1" \
  '"title":"Test Order 1"'

run_test "Get work order by ID (2)" \
  "curl -s http://localhost:5001/api/work-orders/2" \
  '"attachment_filename":'

echo ""

# Test 5: PUT operations (Update)
echo -e "${YELLOW}=== Test Suite 5: PUT Operations (Update) ===${NC}"

run_test "Update work order status" \
  "curl -s -X PUT http://localhost:5001/api/work-orders/1 -F 'status=in-progress'" \
  '"status":"in-progress"'

run_test "Update work order title and description" \
  "curl -s -X PUT http://localhost:5001/api/work-orders/1 -F 'title=Updated Title' -F 'description=Updated description'" \
  '"title":"Updated Title"'

run_test "Update non-existent work order (404)" \
  "curl -s -X PUT http://localhost:5001/api/work-orders/9999 -F 'status=completed'" \
  '"error":"Work order not found"'

echo ""

# Test 6: DELETE operations
echo -e "${YELLOW}=== Test Suite 6: DELETE Operations ===${NC}"

run_test "Delete work order" \
  "curl -s -X DELETE http://localhost:5001/api/work-orders/1" \
  '"message":"Work order deleted successfully"'

run_test "Verify work order was deleted" \
  "curl -s http://localhost:5001/api/work-orders/1" \
  '"error":"Work order not found"'

run_test "Delete non-existent work order (404)" \
  "curl -s -X DELETE http://localhost:5001/api/work-orders/9999" \
  '"error":"Work order not found"'

echo ""

# Test 7: File uploads and attachments
echo -e "${YELLOW}=== Test Suite 7: File Uploads ===${NC}"

# Create different file types
echo "PDF content" > /tmp/test.pdf
echo "Image content" > /tmp/test.jpg
echo "Document content" > /tmp/test.docx

run_test "Upload work order with PDF" \
  "curl -s -X POST http://localhost:5001/api/work-orders -F 'title=PDF Test' -F 'attachment=@/tmp/test.pdf'" \
  '"attachment_filename":'

run_test "Upload work order with image" \
  "curl -s -X POST http://localhost:5001/api/work-orders -F 'title=Image Test' -F 'attachment=@/tmp/test.jpg'" \
  '"attachment_originalname":"test.jpg"'

# Verify files are stored
FILE_COUNT=$(ls -1 uploads/ | grep -v ".gitkeep" | wc -l)
if [ "$FILE_COUNT" -ge "3" ]; then
  echo -e "Testing: Files stored on disk... ${GREEN}PASS${NC}"
  ((TESTS_PASSED++))
else
  echo -e "Testing: Files stored on disk... ${RED}FAIL${NC}"
  echo "  Expected: >= 3 files, Got: $FILE_COUNT"
  ((TESTS_FAILED++))
fi

echo ""

# Test 8: Status transitions
echo -e "${YELLOW}=== Test Suite 8: Work Order Status Transitions ===${NC}"

# Create a work order and transition through statuses
CREATE_RESPONSE=$(curl -s -X POST http://localhost:5001/api/work-orders -F 'title=Status Test' -F 'status=pending')
WO_ID=$(echo "$CREATE_RESPONSE" | grep -o '"id":[0-9]*' | grep -o '[0-9]*')

run_test "Initial status is pending" \
  "curl -s http://localhost:5001/api/work-orders/$WO_ID" \
  '"status":"pending"'

run_test "Transition to in-progress" \
  "curl -s -X PUT http://localhost:5001/api/work-orders/$WO_ID -F 'status=in-progress'" \
  '"status":"in-progress"'

run_test "Transition to completed" \
  "curl -s -X PUT http://localhost:5001/api/work-orders/$WO_ID -F 'status=completed'" \
  '"status":"completed"'

echo ""

# Test 9: Rate limiting
echo -e "${YELLOW}=== Test Suite 9: Security Features ===${NC}"

run_test "Rate limiting headers present" \
  "curl -sI http://localhost:5001/api/health" \
  "X-RateLimit"

run_test "CORS headers present" \
  "curl -sI http://localhost:5001/api/health" \
  "Access-Control-Allow-Origin"

echo ""

# Test 10: Edge cases
echo -e "${YELLOW}=== Test Suite 10: Edge Cases ===${NC}"

run_test "Create work order with very long title" \
  "curl -s -X POST http://localhost:5001/api/work-orders -F 'title=This is a very long title that should still be accepted by the system because there is no length limit imposed' -F 'status=pending'" \
  '"message":"Work order created successfully"'

run_test "Create work order with special characters" \
  "curl -s -X POST http://localhost:5001/api/work-orders -F 'title=Test & Order #1 @2024 (v2.0)' -F 'status=pending'" \
  '"message":"Work order created successfully"'

run_test "Update work order with empty description" \
  "curl -s -X PUT http://localhost:5001/api/work-orders/2 -F 'description='" \
  '"message":"Work order updated successfully"'

echo ""

# Cleanup
echo "Cleaning up..."
kill $SERVER_PID
rm -f /tmp/test-attachment.txt /tmp/test.pdf /tmp/test.jpg /tmp/test.docx /tmp/test-server.log

echo ""
echo "========================================"
echo "Test Results Summary"
echo "========================================"
echo -e "${GREEN}Tests Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Tests Failed: $TESTS_FAILED${NC}"
echo "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"

if [ $TESTS_FAILED -eq 0 ]; then
  echo ""
  echo -e "${GREEN}🎉 All tests passed successfully! The system is ready for testing. 🎉${NC}"
  exit 0
else
  echo ""
  echo -e "${RED}❌ Some tests failed. Please review the output above.${NC}"
  exit 1
fi
