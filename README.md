# Support Ticket System

A simple, modern, full-stack application for managing support tickets built with Node.js, Express, TypeScript, Prisma ORM, React, and Docker Compose.

---

## 🚀 How to Run the Project

### Option 1: Docker Compose (Recommended)

Ensure Docker Desktop is installed and running, then execute:

```bash
docker compose up --build
```

Access the application in your browser:
- **Frontend Dashboard**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:4000](http://localhost:4000)
- **PostgreSQL Database**: `localhost:5432`

To stop all services:
```bash
docker compose down
```

---

### Option 2: Local Development Setup

#### 1. Database Setup
Start a local PostgreSQL instance or run PostgreSQL via Docker:
```bash
docker run -d --name postgres-local -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tickets_db -p 5432:5432 postgres:16
```

#### 2. Backend Setup
```bash
cd backend
npm install
npx prisma db push
npm run dev
```
Backend will run at `http://localhost:4000`.

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run at `http://localhost:3000`.

---

## 🛠️ Technologies Used

- **Backend**:
  - Node.js (v24 / v22)
  - Express.js
  - TypeScript
  - Prisma ORM
  - Zod (Runtime Schema Validation)
  - CORS, Dotenv
- **Frontend**:
  - React 19 + TypeScript
  - Vite
  - Glassmorphic Vanilla CSS (Custom Design System with CSS variables and micro-animations)
  - Lucide React (Modern UI Icons)
- **Database**:
  - PostgreSQL 16
- **Containerization**:
  - Docker & Docker Compose (Multi-stage builds with Nginx for frontend)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tickets` | Retrieve list of all tickets |
| `POST` | `/tickets` | Create a new support ticket |
| `GET` | `/tickets/:id` | Get details of a single ticket |
| `PATCH` | `/tickets/:id` | Update ticket status or priority |
| `DELETE` | `/tickets/:id` | Delete ticket by ID |
| `GET` | `/tickets/:ticketId/comments` | Fetch comments for a specific ticket on-demand |
| `POST` | `/tickets/:ticketId/comments` | Add a comment to a ticket |

---

## 🗄️ Database Description

The PostgreSQL database contains two primary tables linked via foreign key:

### `tickets` Table
- `id` (UUID, Primary Key)
- `title` (VARCHAR, Required)
- `description` (TEXT, Required)
- `status` (ENUM: `open`, `in_progress`, `resolved`, Default: `open`)
- `priority` (ENUM: `low`, `medium`, `high`, Default: `medium`)
- `created_at` (TIMESTAMP, Default: `NOW()`)

### `comments` Table
- `id` (UUID, Primary Key)
- `ticket_id` (FK -> `tickets.id`, ON DELETE CASCADE)
- `message` (TEXT, Required)
- `created_at` (TIMESTAMP, Default: `NOW()`)

---

## 🐳 Docker Description

The project utilizes `docker-compose.yml` orchestrating three containers:
1. **`postgres`**: Runs `postgres:16-alpine` on port `5432` with healthcheck.
2. **`backend`**: Node.js multi-stage build running Express server on port `4000`. Runs Prisma database migrations automatically on boot (`npx prisma db push`).
3. **`frontend`**: React Vite multi-stage build served via lightweight Nginx web server on port `3000`.

---

## ✅ What is Completed

- [x] Full-stack architecture (Node.js Express TypeScript + React Vite TypeScript)
- [x] PostgreSQL database integration with Prisma ORM
- [x] Split-pane responsive layout UI (Ticket list, search & status/priority filters on left; Ticket details & comments on right)
- [x] On-demand comment loading per ticket
- [x] Status & Priority interactive update controls
- [x] Ticket deletion with confirmation dialog
- [x] Ticket creation modal with client & server validation
- [x] Multi-stage Docker Compose setup
- [x] Project governance & logging (`PROMPT_LOG.md`, `MIGRATION_LOG.md`, `MEMORY.md`, `RULES.md`)

---

## 🚧 What is Not Completed (Future Enhancements)

- User authentication & role-based permissions (e.g. Customer vs Support Agent roles).
- Real-time comment updates via WebSockets (Socket.io).
- File attachment uploads for support tickets.

---

## 🤖 AI Usage Report

- **AI tool used**: Gemini 3.6 Flash (High) / Antigravity Agent
- **What I used AI for**:
  1. Planning Clean Architecture structure (Separation of Controllers, Services, Repositories).
  2. Designing glassmorphic CSS styling and theme tokens for responsive split-pane UI.
  3. Configuring multi-stage Dockerfiles and Docker Compose files.
- **2–3 example prompts**:
  - *"get known with the instructions and rules files, to understang the project scope. ask me relevant questions while working on this project. after reading the instructions and rules proceed further"*
  - *"1) use typescript for everything, 2) Use Prisma ORM, 3) create split-pane layout, 4) fetch comments on demand"*
- **What I changed manually**:
  - Confirmed and finalized technical decisions (TypeScript, Prisma ORM, Split-Pane layout).
- **What was difficult**:
  - Ensuring Docker compose service ordering and container healthchecks wait properly for PostgreSQL database readiness before executing Prisma schema pushes.
