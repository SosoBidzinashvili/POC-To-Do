# Environments

This project is designed to support multiple environments with a consistent structure.

## 1. Local (current)

- **Purpose**: Day-to-day development.
- **How to run**:

  ```bash
  npm install
  npm run dev
  ```

  - Backend: `http://localhost:4000`
  - Frontend: `http://localhost:5173`

- **Configuration**:
  - Environment variables can be loaded from a local `.env` file in the project root or via future files in `config/environments/`.
  - For now, the only configuration used is the backend port (via `PORT`).

## 2. Staging (planned)

- **Purpose**: Test changes from pull requests and validate features before releasing to production.
- **Source**:
  - Option A: A long-lived `staging` branch that is regularly updated from `main`.
  - Option B: Ephemeral preview environments per PR (e.g., via CI/CD).
- **Configuration**:
  - Environment variables will be defined in `config/environments/staging.example.env` and mapped to the actual staging environment.
  - Same API surface as production, but pointing to non-production data stores.

## 3. Production (planned)

- **Purpose**: Live environment serving end users.
- **Source**:
  - Deployed from **tagged releases** on the `main` branch (e.g., `v1.0.0`).
- **Configuration**:
  - Environment variables will be defined in `config/environments/prod.example.env` and used to configure the real deployment environment.
  - Strictly controlled access; changes must go through code review and CI checks.

## Directory Layout for Configuration

Environment-specific config is organized under `config/environments/`:

- `config/environments/local.example.env`
- `config/environments/staging.example.env`
- `config/environments/prod.example.env`

These files are **examples** only (no secrets). Real `.env` files should not be committed to version control.

