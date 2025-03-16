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
