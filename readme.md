# Code Challenge - Tran Minh Toan

Solutions for the Backend Code Challenge.

## Setup

1. **Clone the repository**:

```
git clone https://github.com/Mtoan12/tran_minh_toan.git
```

2. **Install dependencies**:

```
npm install (do not need to cd to problem5 folder)
```

## Problem 4: Three ways to sum to n

-   **File**: `src/problem4/index.ts`
-   **Run**: `npm run test:problem4`
-   **Description**: Implements three unique methods to calculate the sum of numbers from 1 to `n` in TypeScript:

1. **Iterative Method**:

-   Uses a `for` loop to add numbers from 1 to `n`.
-   Time Complexity: O(n) - Linear time due to `n` iterations.
-   Space Complexity: O(1) - Constant space with a single variable.

2. **Formula Method**:

-   Uses the arithmetic series formula `(n * (n + 1)) / 2`.
-   Time Complexity: O(1) - Constant time with a direct calculation.
-   Space Complexity: O(1) - No additional memory used.

3. **Recursive Method**:

-   Recursively computes `n + sumToN(n-1)` until base case.
-   Time Complexity: O(n) - Linear time due to `n` recursive calls.
-   Space Complexity: O(n) - Linear space due to call stack.
-   **Input Handling**:
-   The `normalizeInput` function ensures valid input:
-   Returns 0 if `n` is not an integer, negative, or zero.
-   Otherwise, returns `n` for summation.
-   **How to Test**: Run `npm run test:problem4` to see results for test cases.

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

# Problem 6: Scoreboard Service Module

A specification for a backend API module to manage a live-updating scoreboard.

## Overview

This module, `ScoreboardService`, handles the backend logic for a website's scoreboard, displaying the top 10 users by score with real-time updates. It processes user actions to increment scores and ensures security against unauthorized updates.

## API Endpoints

### 1. GET /api/v1/scoreboard

-   **Description**: Retrieves the top 10 users by score.
-   **Query Params**:
    -   `limit` (optional, integer, default: 10): Number of users to return.
-   **Response** (200):

    ```json
    {
      "status": "success",
      "data": [
        { "userId": 1, "username": "user1", "score": 1500 },
        ...
      ]
    }
    ```

-   **Error Responses**:
    -   500: Internal Server Error.

### 2. POST /api/v1/scoreboard/update

-   **Description**: Updates a user's score after completing an action.
-   **Headers**:
    -   `Authorization: Bearer <token>` (JWT).
-   **Request Body**:

    ```json
    {
        "userId": 1,
        "scoreIncrement": 100
    }
    ```

-   **Response** (201):

    ```json
    {
        "status": "success",
        "data": { "userId": 1, "newScore": 1600 }
    }
    ```

-   **Error Responses**:
    -   400: Invalid input.
    -   401: Unauthorized.
    -   403: Forbidden (userId mismatch).
    -   500: Internal Server Error.

### 3. WebSocket /ws/scoreboard

-   **Description**: Provides real-time scoreboard updates to connected clients.
-   **Message**:

    ```json
    {
      "event": "scoreboardUpdate",
      "data": [
        { "userId": 1, "username": "user1", "score": 1600 },
        ...
      ]
    }
    ```

## Database Schema

**Table: `user_scores`**

-   `id` (integer, PK): User ID.
-   `username` (varchar): Username.
-   `score` (integer, default: 0): User score.
-   `updatedAt` (timestamp): Last update time.

## Implementation Details

### Tech Stack:

-   ExpressJS with TypeScript.
-   PostgreSQL for persistent storage.
-   Redis for caching and Pub/Sub.
-   WebSocket for real-time updates.
-   JWT for authentication.

### Flow:

1. Client calls `POST /api/v1/scoreboard/update` with action result.
2. Server validates JWT, authorizes user, updates score in DB.
3. Server publishes event to Redis, fetches updated top 10, broadcasts via WebSocket.

### Security:

-   JWT token required for updates.
-   User can only update their own score.
-   Rate limiting on `/update` endpoint (e.g., 10 req/min/user).

### How to Implement

1. Database: Create user_scores table with schema above.
2. Redis: Set up Redis for caching (key: scoreboard:top10) and Pub/Sub (channel: scoreboard_updates).
3. Endpoints: Implement REST APIs as specified.
4. WebSocket: Run a separate WebSocket service subscribing to Redis channel.
5. Security: Add JWT middleware and rate limiting.

## Improvement Suggestions

-   Caching: Use Redis to cache top 10 scores, reducing DB load (update cache on score change).
-   Validation: Add DTOs with class-validator for request body.
-   Leaderboard History: Store historical top 10 snapshots for analytics.
-   Rate Limiting: Prevent abuse and potential DoS attacks
