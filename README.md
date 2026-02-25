# My To-Do List (PoC)

A simple, modern To-Do List proof of concept with a Node.js/Express backend and a React (Vite) frontend, styled to match the provided design.

## Tech Stack

- **Backend**: Node.js, Express, CORS, in-memory task storage
- **Frontend**: React (functional components + hooks), Vite
- **Styling**: CSS Modules (`App.module.css`) + global reset in `index.css`

## Project Structure

- `server/index.js` – Express API with in-memory tasks
- `src/App.jsx` – Main React app
- `src/App.module.css` – Scoped styling for the app
- `src/main.jsx` – React/Vite entry
- `vite.config.mts` – Vite configuration + API proxy

## Install Dependencies

From the project root:

```bash
npm install
```

All backend and frontend dependencies are defined in `package.json`.

## Running in Development

This will start both the backend (Express) and the frontend (Vite) together.

```bash
npm run dev
```

- **Backend**: `http://localhost:4000`
- **Frontend**: `http://localhost:5173`

The frontend is configured to proxy `/api` requests to the backend.

You can also run them separately:

```bash
# Backend only
npm run dev:server

# Frontend only
npm run dev:client
```

Then open `http://localhost:5173` in your browser.

## Building the Frontend

To create a production build of the React app:

```bash
npm run build
```

To preview the built frontend:

```bash
npm run preview
```

Make sure the backend (`server/index.js`) is running separately if you want the API to work with the preview.

## Usage

- Type a task name in the first input field.
- (Optional) Pick a **due date** in the date field next to it. If the date is today or tomorrow, the app will show **“Today”** or **“Tomorrow”**; otherwise it shows the selected date in `dd.mm.yyyy` format under the task name with a calendar icon.
- Click **“+ Add”** to create the new task.
- Use the checkbox to mark tasks as complete/incomplete. Completed tasks get a green checkbox and strikethrough text.
- Click the trash icon to delete a task.
- The summary text at the bottom (e.g., “1 of 3 tasks completed”) updates in real time.

Note: tasks are stored **in memory only** on the server; restarting the backend resets the list to the initial sample tasks.

