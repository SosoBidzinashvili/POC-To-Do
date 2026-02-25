# Architecture Overview

This document describes the high-level architecture of the To-Do application.

## High-Level Diagram (conceptual)

- **Frontend (React / Vite)** – lives in `src/`
  - Renders the UI for managing tasks.
  - Calls backend endpoints under `/api/*` using `fetch`.
  - Runs in the browser (local dev uses Vite dev server on port `5173`).

- **Backend (Node.js / Express)** – lives in `server/`
  - Exposes REST endpoints such as:
    - `GET /api/tasks`
    - `POST /api/tasks`
    - `PATCH /api/tasks/:id`
    - `DELETE /api/tasks/:id`
  - Stores tasks in memory for this PoC (no database yet).
  - Runs on port `4000` by default.

- **Configuration / Environments** – lives in `config/`
  - Currently only contains example environment files and documentation.
  - Intended to hold environment-specific config as we add staging and production.

## Data Flow

1. The user interacts with the React UI (`src/App.jsx`).
2. The frontend issues HTTP requests to the backend under `/api/*`.
3. The Express server in `server/index.js` handles the request, updates in-memory task state, and returns JSON responses.
4. The frontend updates its local state to reflect the latest task list (including due dates and completion status).

## Boundaries

- **Frontend**
  - Responsible for presentation, user interaction, and optimistic UI updates.
  - Does not contain business rules about data persistence.

- **Backend**
  - Responsible for task lifecycle rules (create, update, delete).
  - Owns the task storage abstraction (currently an in-memory array; future: database).

## Future Extensions

- Replace in-memory storage with a database layer (e.g., PostgreSQL, MongoDB, or SQLite).
- Introduce authentication and per-user task lists.
- Add more services or modules under `server/` if behavior becomes more complex (e.g., notification service).

