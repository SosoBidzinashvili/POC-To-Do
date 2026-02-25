# Key Decisions & Assumptions

This document records important technical decisions and assumptions for the To-Do application.

## 0001 – Single repository for backend and frontend

- **Status**: Accepted
- **Context**: The project is small and the frontend and backend are tightly coupled.
- **Decision**: Use a single repository containing:
  - `server/` – Express backend
  - `src/` – React frontend
  - `docs/` – architecture and technical documentation
  - `config/` – environment configuration and tooling
- **Consequences**: Easier local development and refactoring. If the system grows significantly, we can still extract services later.

## 0002 – In-memory task storage for PoC

- **Status**: Accepted (for now)
- **Context**: The goal is to validate UX and flows, not persistence or scaling.
- **Decision**: Store tasks in an in-memory array inside the server process.
- **Consequences**: Data resets on server restart; not suitable for production. Future work will add a proper database and persistence layer.

## 0003 – React + Vite for frontend

- **Status**: Accepted
- **Context**: Need a fast, modern frontend setup with good DX.
- **Decision**: Use Vite with React and CSS Modules for scoped styling.
- **Consequences**: Quick builds and hot reloads; easy to extend with TypeScript and testing frameworks.

## 0004 – Express for backend HTTP API

- **Status**: Accepted
- **Context**: Simple REST API with minimal dependencies.
- **Decision**: Use Express as the HTTP server and routing layer.
- **Consequences**: Familiar ecosystem; easy to add middleware (logging, validation, auth) later.

