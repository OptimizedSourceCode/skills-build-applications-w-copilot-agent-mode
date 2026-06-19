# OctoFit Tracker Backend

Node.js + Express + TypeScript backend for the OctoFit Tracker app.

Ports:
- Backend: 8000
- MongoDB: 27017

Quick start (no directory changes required):

- Install dependencies:

	```bash
	npm install --prefix octofit-tracker/backend
	```

- Start development server (uses `ts-node`):

	```bash
	npm run dev --prefix octofit-tracker/backend
	```

- Build and run production:

	```bash
	npm run build --prefix octofit-tracker/backend
	npm run start --prefix octofit-tracker/backend
	```

- Seed / status endpoint (simple DB counts):

	```bash
	npm run seed --prefix octofit-tracker/backend
	```

MongoDB check:

```bash
ps aux | grep mongod
# or use `mongosh` to connect: mongosh mongodb://127.0.0.1:27017
```

Codespaces / preview URL:

- When running inside GitHub Codespaces the server exposes a Codespaces-aware preview URL using the `CODESPACE_NAME` environment variable. The server will print the preview API URL on startup in this form:

	`https://<CODESPACE_NAME>-8000.githubpreview.dev`

API routes (mounted under `/api`):

- `/api/users/`
- `/api/teams/`
- `/api/activities/`
- `/api/leaderboard/`
- `/api/workouts/`

Example: after starting the dev server you can fetch the root API status with:

```bash
curl http://localhost:8000/api
```

Note: Commands above use `--prefix octofit-tracker/backend` so you do not need to change your shell working directory.
