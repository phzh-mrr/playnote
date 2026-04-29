# SQLite Playground App Spec

## Goal
Build a small Node + React application that demonstrates writing to and reading from a SQLite database.

## Stack
- Frontend: React
- Backend: Node.js with Express
- Database: SQLite
- Tooling: Vite for the React app

## User Flow
1. The user opens the app in a browser.
2. The user can enter a text value and submit it.
3. The app sends the value to the backend.
4. The backend stores the value in SQLite.
5. The app can load and display all saved values from SQLite.

## Initial Feature Sequence
1. Create the project skeleton for a Node + React app.
2. Add a backend API and SQLite database setup.
3. Add a UI for creating records.
4. Add a UI for reading records.
5. Verify each feature with tests or direct automated checks and commit each step.

## Data Model
A single table named `notes`:
- `id` integer primary key
- `text` text not null
- `created_at` text not null

## API
- `GET /api/notes` returns all notes ordered by newest first
- `POST /api/notes` accepts `{ "text": string }` and stores a note

## Acceptance Criteria
- The app runs locally with one command for the frontend and one for the backend.
- Notes can be added from the UI.
- Notes are persisted in SQLite.
- Notes can be fetched and displayed in the UI.
- Basic automated tests or scripted checks verify the implemented features before each commit.

## Commit Workflow
Each feature will be implemented in a separate git commit. After a feature is tested and committed, I will report that checkpoint so it can be verified.
