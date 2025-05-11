# Task Management API

A RESTful API for managing tasks with JWT authentication, built with Node.js, Express, and PostgreSQL.

## Features

- User authentication (Register/Login)
- CRUD operations for tasks
- JWT token-based authentication
- PostgreSQL database
- Sequelize ORM
- Input validation
- Error handling

## Prerequisites

- Node.js (v18+)
- PostgreSQL (v15+)
- npm (v9+)
- Postman or curl for testing

## Setup Instructions

### 1. Database Setup (Local Development)

```bash
# Install PostgreSQL
# Create database
createdb task_management_dev

# Create .env file
cp .env.example .env

Update .env with your credentials:

DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=task_management
DB_HOST=localhost
JWT_SECRET=your_jwt_secret_here
PORT=3000
NODE_ENV=development

```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Migrations

```bash

npx sequelize-cli db:migrate
```

### 4. Start the Server
```bash

npm run dev

```

### API Endpoints
```bash
Base URL: https://equentis.up.railway.app/api
```
