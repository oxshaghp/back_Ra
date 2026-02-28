#!/bin/bash

# Backend Testing Script
# استخدم هذا الملف لاختبار الـ API endpoints

API_URL="http://localhost:3000"
TOKEN=""  # سيتم ملؤها بعد التسجيل

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Backend API Testing Script${NC}"
echo -e "${BLUE}================================${NC}\n"

# Register a new user
echo -e "${YELLOW}1. Register New User${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "password123"
  }')

echo "$REGISTER_RESPONSE" | jq .
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.accessToken')
echo -e "${GREEN}✓ Token: $TOKEN\n${NC}"

# Login
echo -e "${YELLOW}2. Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }')

echo "$LOGIN_RESPONSE" | jq .
echo ""

# Create a project
echo -e "${YELLOW}3. Create a Project${NC}"
PROJECT_RESPONSE=$(curl -s -X POST "$API_URL/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Project",
    "description": "This is a test project",
    "imageUrl": "https://example.com/image.jpg",
    "price": 5000
  }')

echo "$PROJECT_RESPONSE" | jq .
PROJECT_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.id')
echo -e "${GREEN}✓ Project ID: $PROJECT_ID\n${NC}"

# Get all projects
echo -e "${YELLOW}4. Get All Projects${NC}"
curl -s -X GET "$API_URL/projects" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

# Get a specific project
echo -e "${YELLOW}5. Get Specific Project${NC}"
curl -s -X GET "$API_URL/projects/$PROJECT_ID" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

# Update a project
echo -e "${YELLOW}6. Update Project${NC}"
curl -s -X PATCH "$API_URL/projects/$PROJECT_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Project Name",
    "price": 6000
  }' | jq .
echo ""

# Add a review
echo -e "${YELLOW}7. Add Review to Project${NC}"
REVIEW_RESPONSE=$(curl -s -X POST "$API_URL/reviews" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"projectId\": \"$PROJECT_ID\",
    \"rating\": 5,
    \"comment\": \"Excellent work!\",
    \"clientName\": \"John Doe\",
    \"clientEmail\": \"john@example.com\"
  }")

echo "$REVIEW_RESPONSE" | jq .
REVIEW_ID=$(echo "$REVIEW_RESPONSE" | jq -r '.id')
echo -e "${GREEN}✓ Review ID: $REVIEW_ID\n${NC}"

# Get all reviews for a project
echo -e "${YELLOW}8. Get All Reviews for Project${NC}"
curl -s -X GET "$API_URL/reviews/project/$PROJECT_ID" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

# Get a specific review
echo -e "${YELLOW}9. Get Specific Review${NC}"
curl -s -X GET "$API_URL/reviews/$REVIEW_ID" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

# Update a review
echo -e "${YELLOW}10. Update Review${NC}"
curl -s -X PATCH "$API_URL/reviews/$REVIEW_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4,
    "comment": "Updated comment"
  }' | jq .
echo ""

# Delete a review
echo -e "${YELLOW}11. Delete Review${NC}"
curl -s -X DELETE "$API_URL/reviews/$REVIEW_ID" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

# Delete a project
echo -e "${YELLOW}12. Delete Project${NC}"
curl -s -X DELETE "$API_URL/projects/$PROJECT_ID" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

echo -e "${GREEN}✓ All tests completed!${NC}"
