#!/bin/bash
# Test script for upload directory creation

echo "================================"
echo "Testing Upload Directory Creation"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Server startup with missing directory
echo "Test 1: Server startup with missing uploads directory"
echo "------------------------------------------------------"
cd /home/runner/work/Assistant-1/Assistant-1/restaurant-maintenance/backend

# Remove uploads directory if it exists
if [ -d "uploads" ]; then
  rm -rf uploads
  echo "✓ Removed existing uploads directory"
fi

# Start server in background
node server.js > /tmp/server.log 2>&1 &
SERVER_PID=$!
sleep 2

# Check if directory was created
if [ -d "uploads" ]; then
  echo -e "${GREEN}✓ PASS: Uploads directory was created on startup${NC}"
else
  echo -e "${RED}✗ FAIL: Uploads directory was not created${NC}"
  kill $SERVER_PID
  exit 1
fi

# Test 2: Health check
echo ""
echo "Test 2: Health check endpoint"
echo "------------------------------------------------------"
HEALTH_RESPONSE=$(curl -s http://localhost:5001/api/health)
if echo "$HEALTH_RESPONSE" | grep -q "\"status\":\"OK\""; then
  echo -e "${GREEN}✓ PASS: Health check returned OK${NC}"
else
  echo -e "${RED}✗ FAIL: Health check failed${NC}"
  kill $SERVER_PID
  exit 1
fi

if echo "$HEALTH_RESPONSE" | grep -q "\"uploadsDirExists\":true"; then
  echo -e "${GREEN}✓ PASS: Health check confirms uploads directory exists${NC}"
else
  echo -e "${RED}✗ FAIL: Uploads directory existence not confirmed${NC}"
  kill $SERVER_PID
  exit 1
fi

# Test 3: First file upload
echo ""
echo "Test 3: First file upload (no ENOENT error)"
echo "------------------------------------------------------"
echo "Test content for upload" > /tmp/test-file.txt
UPLOAD_RESPONSE=$(curl -s -X POST http://localhost:5001/api/work-orders \
  -F "title=Test Work Order" \
  -F "description=Testing first upload" \
  -F "status=pending" \
  -F "attachment=@/tmp/test-file.txt")

if echo "$UPLOAD_RESPONSE" | grep -q "\"message\":\"Work order created successfully\""; then
  echo -e "${GREEN}✓ PASS: File upload successful${NC}"
else
  echo -e "${RED}✗ FAIL: File upload failed${NC}"
  echo "Response: $UPLOAD_RESPONSE"
  kill $SERVER_PID
  exit 1
fi

if echo "$UPLOAD_RESPONSE" | grep -q "\"filename\":"; then
  echo -e "${GREEN}✓ PASS: File was saved with generated filename${NC}"
else
  echo -e "${RED}✗ FAIL: File metadata not in response${NC}"
  kill $SERVER_PID
  exit 1
fi

# Test 4: Verify file was actually saved
echo ""
echo "Test 4: Verify uploaded file exists on disk"
echo "------------------------------------------------------"
FILE_COUNT=$(ls -1 uploads/ | grep -v ".gitignore" | wc -l)
if [ "$FILE_COUNT" -ge "1" ]; then
  echo -e "${GREEN}✓ PASS: Uploaded file exists in uploads directory${NC}"
  echo "  Files in uploads/: $FILE_COUNT"
else
  echo -e "${RED}✗ FAIL: No files found in uploads directory${NC}"
  kill $SERVER_PID
  exit 1
fi

# Test 5: Idempotent directory creation (restart server)
echo ""
echo "Test 5: Idempotent behavior - restart with existing directory"
echo "------------------------------------------------------"
kill $SERVER_PID
sleep 1

# Restart server
node server.js > /tmp/server2.log 2>&1 &
SERVER_PID=$!
sleep 2

# Check if directory still exists and server started successfully
if [ -d "uploads" ]; then
  echo -e "${GREEN}✓ PASS: Uploads directory still exists after restart${NC}"
else
  echo -e "${RED}✗ FAIL: Uploads directory was removed${NC}"
  kill $SERVER_PID
  exit 1
fi

# Verify server is still responsive
HEALTH_RESPONSE2=$(curl -s http://localhost:5001/api/health)
if echo "$HEALTH_RESPONSE2" | grep -q "\"status\":\"OK\""; then
  echo -e "${GREEN}✓ PASS: Server restarted successfully with existing directory${NC}"
else
  echo -e "${RED}✗ FAIL: Server did not restart properly${NC}"
  kill $SERVER_PID
  exit 1
fi

# Test 6: Rate limiting
echo ""
echo "Test 6: Rate limiting is active"
echo "------------------------------------------------------"
HEADERS=$(curl -s -I http://localhost:5001/api/health)
if echo "$HEADERS" | grep -q "X-RateLimit"; then
  echo -e "${GREEN}✓ PASS: Rate limiting headers present${NC}"
else
  echo -e "${RED}✗ FAIL: Rate limiting headers not found${NC}"
  kill $SERVER_PID
  exit 1
fi

# Cleanup
echo ""
echo "Cleaning up..."
kill $SERVER_PID
rm -f /tmp/test-file.txt
rm -f /tmp/server.log /tmp/server2.log

echo ""
echo "================================"
echo -e "${GREEN}All tests passed! ✓${NC}"
echo "================================"
