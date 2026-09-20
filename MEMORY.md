# Project Memory

## Project Overview
- **Project**: Support Ticket System (Full-stack application)
- **Goal**: Build a simple full-stack app for managing support tickets with Docker Compose, Node.js backend, React frontend, and PostgreSQL database.

## Governance & Rules
- Log all user prompts in `PROMPT_LOG.md` with timestamps.
- Begin all chat responses with sequential ID format `ID: XXX` (starting at 001).
- Log all app changes in `MIGRATION_LOG.md`.
- Maintain `MEMORY.md` organized by topic.
- Follow Clean Architecture and best practices.

## Tech Stack Decisions
- Backend: Node.js + Express + TypeScript
- Frontend: React + Vite + TypeScript + Vanilla CSS Modules (Split-pane layout)
- Database: PostgreSQL 16 + Prisma ORM (schema migrations + Prisma Client)
- API Pattern: Comments fetched on-demand per selected ticket via `GET /tickets/:ticketId/comments`
- Containerization: Docker Compose (services: `frontend`, `backend`, `postgres`)
