# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### Auth

#### POST /auth/register
Register a new admin user.

**Request:**
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "accessToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

---

#### POST /auth/login
Login with username and password.

**Request:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

---

### Projects

#### POST /projects
Create a new project. **Requires Auth**.

**Request:**
```json
{
  "name": "Project Name",
  "description": "Project Description",
  "imageUrl": "https://example.com/image.jpg",
  "price": 5000
}
```

**Response (201):**
```json
{
  "id": "project-uuid",
  "name": "Project Name",
  "description": "Project Description",
  "imageUrl": "https://example.com/image.jpg",
  "price": 5000,
  "userId": "user-uuid",
  "createdAt": "2025-02-28T10:00:00Z"
}
```

---

#### GET /projects
Get all projects for the authenticated user. **Requires Auth**.

**Response (200):**
```json
[
  {
    "id": "project-uuid",
    "name": "Project Name",
    "description": "Project Description",
    "imageUrl": "https://example.com/image.jpg",
    "price": 5000,
    "userId": "user-uuid",
    "createdAt": "2025-02-28T10:00:00Z",
    "reviews": [
      {
        "id": "review-uuid",
        "rating": 5,
        "comment": "Great project!",
        "clientName": "John",
        "clientEmail": "john@example.com",
        "createdAt": "2025-02-28T11:00:00Z"
      }
    ]
  }
]
```

---

#### GET /projects/:id
Get a specific project with all reviews. **Requires Auth**.

**Path Parameters:**
- `id` (string, UUID): Project ID

**Response (200):**
Same as single project object above.

**Error (404):**
```json
{
  "statusCode": 404,
  "message": "Project not found"
}
```

---

#### PATCH /projects/:id
Update a project. **Requires Auth**.

**Path Parameters:**
- `id` (string, UUID): Project ID

**Request:**
```json
{
  "name": "Updated Name",
  "description": "Updated Description",
  "price": 6000
}
```

**Response (200):**
Updated project object.

---

#### DELETE /projects/:id
Delete a project and all its reviews. **Requires Auth**.

**Path Parameters:**
- `id` (string, UUID): Project ID

**Response (200):**
```json
{
  "message": "Project deleted successfully"
}
```

---

### Reviews

#### POST /reviews
Add a review to a project. **Requires Auth**.

**Request:**
```json
{
  "projectId": "project-uuid",
  "rating": 5,
  "comment": "Excellent work!",
  "clientName": "John Doe",
  "clientEmail": "john@example.com"
}
```

**Response (201):**
```json
{
  "id": "review-uuid",
  "rating": 5,
  "comment": "Excellent work!",
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "projectId": "project-uuid",
  "createdAt": "2025-02-28T11:00:00Z"
}
```

---

#### GET /reviews/project/:projectId
Get all reviews for a specific project. **Requires Auth**.

**Path Parameters:**
- `projectId` (string, UUID): Project ID

**Response (200):**
```json
[
  {
    "id": "review-uuid",
    "rating": 5,
    "comment": "Great!",
    "clientName": "John",
    "clientEmail": "john@example.com",
    "projectId": "project-uuid",
    "createdAt": "2025-02-28T11:00:00Z"
  }
]
```

---

#### GET /reviews/:id
Get a specific review. **Requires Auth**.

**Path Parameters:**
- `id` (string, UUID): Review ID

**Response (200):**
Same as single review object above.

---

#### PATCH /reviews/:id
Update a review. **Requires Auth**.

**Path Parameters:**
- `id` (string, UUID): Review ID

**Request:**
```json
{
  "rating": 4,
  "comment": "Updated comment"
}
```

**Response (200):**
Updated review object.

---

#### DELETE /reviews/:id
Delete a review. **Requires Auth**.

**Path Parameters:**
- `id` (string, UUID): Review ID

**Response (200):**
```json
{
  "message": "Review deleted successfully"
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200  | OK - Request succeeded |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input data |
| 401  | Unauthorized - Missing or invalid token |
| 403  | Forbidden - Access denied |
| 404  | Not Found - Resource not found |
| 500  | Internal Server Error |

---

## Error Response

All error responses follow this format:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Error type"
}
```

---

## Validation Rules

### Register/Login
- `username`: 3-100 characters
- `email`: Valid email format
- `password`: Minimum 6 characters

### Projects
- `name`: Required, string
- `description`: Required, text
- `imageUrl`: Optional, string
- `price`: Optional, positive number

### Reviews
- `rating`: Required, 1-5 (integer)
- `comment`: Optional, string
- `clientName`: Required, string
- `clientEmail`: Required, valid email
- `projectId`: Required, valid UUID

---

## Rate Limiting

Currently no rate limiting is implemented. This should be added before production deployment.

---

## CORS

CORS is enabled for all origins. Configure `app.enableCors()` in `main.ts` if needed.
