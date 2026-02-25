# Server (`server/`)

This folder contains the **Node.js / Express** backend for the To-Do application.

## Contents

- `index.js` – main Express server and HTTP API.
- `tests/` – backend tests (API and business logic).

## Responsibilities

- Expose the `/api` endpoints used by the React frontend.
- Contain all server-side business logic (task creation, update, deletion, etc).
- Handle environment configuration (ports, future database connections, etc).

## Testing

Backend tests will live in `server/tests/`. For now this folder only contains a placeholder test file; as the project evolves, add:

- Unit tests for pure logic modules.
- Integration tests for HTTP endpoints (e.g., using Supertest).

