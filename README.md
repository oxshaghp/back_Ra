# Backend API - Projects and Reviews

Simple NestJS backend for managing projects and client reviews with JWT authentication.

## Features

- JWT login for one admin user
- Project CRUD
- Review CRUD
- Owner-based authorization
- Request validation and CORS enabled
- Image upload for projects using multipart/form-data

## Requirements

- Node.js 16+
- MySQL 8+
- npm

## Quick Start

1) Install dependencies

```bash
npm install
```

2) Configure environment variables (create your .env)

Required values:
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
- JWT_SECRET

3) Run the app

```bash
npm run start:dev
```

Server runs on: http://localhost:3000

## Authentication

Only login is available.

Endpoint:
- POST /auth/login

Request body (application/json):

```json
{
  "username": "admin",
  "password": "password123"
}
```

## Projects API

All project endpoints require Authorization header:

Bearer YOUR_JWT_TOKEN

Endpoints:
- POST /projects
- GET /projects
- GET /projects/:id
- PATCH /projects/:id
- DELETE /projects/:id

### Multipart support (POST and PATCH)

The backend supports multipart/form-data on:
- POST /projects
- PATCH /projects/:id

Supported form fields:
- image: uploaded file
- tags: JSON string (parsed in backend)

Example tags value:

```text
["react","nextjs","ui"]
```

Image files are stored in uploads folder and exposed at:

http://localhost:3000/uploads/FILENAME

## Reviews API

All review endpoints require Authorization header.

Endpoints:
- POST /reviews
- GET /reviews/project/:projectId
- GET /reviews/:id
- PATCH /reviews/:id
- DELETE /reviews/:id

## Available Scripts

```bash
npm run build
npm run start:dev
npm run start:prod
npm run lint
npm run test
```
