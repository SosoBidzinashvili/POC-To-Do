# Frontend (`src/`)

This folder contains the **React + Vite** frontend for the To-Do application.

## Contents

- `App.jsx` – main application component.
- `App.module.css` – scoped styling for the main app layout and components.
- `main.jsx` – React entry point (bootstraps the app into `index.html`).
- `index.css` – global baseline styles.
- `__tests__/` – frontend tests.

## Responsibilities

- Render the UI (task list, due dates, summary).
- Communicate with the backend via `/api` endpoints.
- Contain all client-side behavior and state management.

## Testing

Frontend tests will live in `src/__tests__/`. For now this folder only contains a placeholder test file; as the project evolves, add:

- Component tests (e.g., with React Testing Library).
- Integration tests that exercise add / toggle / delete flows and due-date display.

