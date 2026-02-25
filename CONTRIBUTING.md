# Contributing Guidelines

This document describes how to contribute to the To-Do List project and how code ownership and reviews are handled.

## Code Ownership

For now, **all areas** of the repository are owned and reviewed by:

- **@SosoBidzinashvili**

Ownership is also encoded in the `CODEOWNERS` file so that GitHub can automatically request reviews when pull requests are opened.

As the team grows, update `CODEOWNERS` and this document to reflect shared ownership per directory (e.g., `server/`, `src/`, `docs/`, `config/`).

## Branching Model

- `main` – always in a deployable state.
- Feature or fix branches – created from `main`, for example:
  - `feature/due-dates`
  - `fix/delete-task-bug`

### Creating a Branch

```bash
git checkout main
git pull origin main
git checkout -b feature/short-description
```

## Pull Requests

When opening a PR:

- Use a clear title, e.g., `Add due date support for tasks`.
- Provide a short **Summary** describing what changed and why.
- For UI changes, include **screenshots** of the key views.
- Include a **Test plan** with exact steps or commands you ran, e.g.:
  - `npm run dev` and manually tested add/toggle/delete flows.
  - `npm run build` to ensure the frontend builds.

### Review & Approval

- Currently, **@SosoBidzinashvili** reviews and approves all changes.
- Every PR should have at least one approval before being merged.
- Address review comments via follow-up commits (avoid force-pushing to shared branches when possible).

## Local Development

From the project root:

```bash
npm install
npm run dev
```

- Backend: `http://localhost:4000`
- Frontend: `http://localhost:5173`

See `README.md` and the docs in `docs/` for more details on architecture and environments.

