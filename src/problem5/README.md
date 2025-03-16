# Problem 5: A Crude Server

An advanced ExpressJS server with TypeScript, PostgreSQL, and TypeORM, featuring CRUD operations for tasks.

## Features

-   **API**: `/api/v1/tasks` with CRUD endpoints.
-   **Validation**: Input validated with `class-validator`.
-   **Global Exception Handling**: Centralized error handling for all exceptions.
-   **Versioning**: API routes prefixed with `/api/v1`.
-   **List Tasks Enhancements**:
    -   Pagination (`page`, `limit`).
    -   Sorting (`sortBy`, `sortOrder`).
    -   Multi-status filter (`status=pending,in_progress`).
    -   Title search (`title` with LIKE).
    -   Filter by `createdAt` (`createdAfter`).

## Prerequisites

-   Node.js (>= 16.x)
-   PostgreSQL (via Docker or local)

## Setup

1. **Clone the repository**:

git clone https://github.com/Mtoan12/tran_minh_toan.git

2. **Install dependencies**:

```
npm install (do not need to cd to problem5 folder)
```

3. **Set up PostgreSQL**:

```
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=taskdb postgres
```

4. **Configure environment**:

-   Create `.env` in the root folder:

```
DB_HOST=localhost

DB_PORT=5432

DB_USERNAME=postgres

DB_PASSWORD=yourpassword

DB_DATABASE=taskdb

PORT=3000
```

5. **Start the server**:

```
npm start (do not need to cd to problem5 folder)
```

Server runs on `http://localhost:3000/api/v1`.

## Test the API

-   **Create**: `POST /api/v1/tasks` with `{"title": "Task", "description": "Test", "status": "pending"}`
-   **List**:
-   Basic: `GET /api/v1/tasks`
-   Paginated: `GET /api/v1/tasks?page=2&limit=5`
-   Sorted: `GET /api/v1/tasks?sortBy=title&sortOrder=ASC`
-   Multi-status: `GET /api/v1/tasks?status=pending,in_progress`
-   Search title: `GET /api/v1/tasks?title=task`
-   After date: `GET /api/v1/tasks?createdAfter=2025-03-16`
-   **Get**: `GET /api/v1/tasks/1`
-   **Update**: `PUT /api/v1/tasks/1` with `{"status": "completed"}`
-   **Delete**: `DELETE /api/v1/tasks/1`

## Advanced Techniques

-   **Validation**: `class-validator` ensures valid input (e.g., title length, status enum).
-   **Middleware**: Global error handling.
-   **Global Exception Handling**: Catches all unhandled errors/rejections via middleware and process events.
-   **Versioning**: Routes use `/api/v1` for future scalability.
-   **List Enhancements**: Pagination, sorting, multi-status filter, title search, and date filtering.
