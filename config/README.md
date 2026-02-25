# Configuration (`config/`)

This folder is intended for **environment-specific configuration** and other project-wide config files.

## Structure

- `environments/`
  - `local.example.env` – example configuration for local development.
  - `staging.example.env` – example configuration for the staging environment.
  - `prod.example.env` – example configuration for the production environment.

## Usage

- These `*.example.env` files are **templates only** and should not contain secrets.
- Real environment files (e.g., `.env.local`, `.env.staging`, `.env.prod`) should be created from these templates and **must not** be committed to version control.

As staging and production environments are introduced, additional configuration (CI/CD workflows, deployment scripts, etc.) can also be added under this folder.

