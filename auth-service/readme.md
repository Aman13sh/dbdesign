# Auth Service

A production-oriented authentication service built with **TypeScript, Fastify, tRPC, Prisma, PostgreSQL, and Domain-Driven Design (DDD)** principles.

The project is structured around clean boundaries between the domain, application, infrastructure, and API layers.

## Architecture

```text
Client
  │
  ▼
tRPC
  │
  ▼
Fastify
  │
  ▼
Auth Router
  │
  ▼
RegisterUser Use Case
  │
  ▼
UserRepository
  │
  ▼
PrismaUserRepository
  │
  ▼
Prisma
  │
  ▼
PostgreSQL
```

## Project Structure

```text
src/
├── modules/
│   └── auth/
│       ├── domain/
│       │   ├── entities/
│       │   │   └── User.ts
│       │   ├── repositories/
│       │   │   └── UserRepository.ts
│       │   └── value-object/
│       │       ├── Email.ts
│       │       └── UserId.ts
│       │
│       ├── application/
│       │   ├── ports/
│       │   │   ├── IdGenerator.ts
│       │   │   └── PasswordHasher.ts
│       │   └── use-cases/
│       │       └── RegisterUser.ts
│       │
│       └── interface/
│           └── trpc/
│               └── authRouter.ts
│
├── infrastructure/
│   ├── database/
│   │   ├── prisma.ts
│   │   └── PrismaUserRepository.ts
│   ├── id/
│   │   └── UuidV7Generator.ts
│   ├── security/
│   │   └── Argon2PasswordHasher.ts
│   └── trpc/
│       ├── trpc.ts
│       └── router.ts
│
├── application.ts
├── server.ts
└── generated/
    └── prisma/
```

## Tech Stack

* **TypeScript** — Application language
* **Fastify** — HTTP server
* **tRPC** — Type-safe API layer
* **Prisma 7** — ORM and database access
* **PostgreSQL** — Relational database
* **Argon2id** — Password hashing
* **UUIDv7** — User identifiers
* **Docker** — PostgreSQL development environment
* **pnpm** — Package manager

## Design Principles

### Domain Independence

The domain layer does not depend on:

* Fastify
* Prisma
* PostgreSQL
* Argon2
* tRPC

This keeps business logic independent from infrastructure.

### Dependency Inversion

The application depends on abstractions rather than concrete infrastructure.

```text
RegisterUser
     │
     ▼
UserRepository
     ▲
     │ implements
PrismaUserRepository
```

`RegisterUser` does not know that PostgreSQL or Prisma is being used.

### Ports and Adapters

Application ports define what the application needs:

```text
IdGenerator
PasswordHasher
UserRepository
```

Infrastructure provides concrete implementations:

```text
UuidV7Generator
Argon2PasswordHasher
PrismaUserRepository
```

## Dependency Injection

Dependencies are created at application startup rather than on every request.

```text
Application
    │
    ├── PrismaUserRepository
    ├── UuidV7Generator
    ├── Argon2PasswordHasher
    │
    └── RegisterUser
             │
             ▼
         tRPC Router
```

The same dependency instances are reused while the Node.js process is running.

## User Registration Flow

The current registration flow is:

```text
HTTP Request
     │
     ▼
Fastify
     │
     ▼
tRPC
     │
     ▼
auth.register
     │
     ▼
Zod Validation
     │
     ▼
RegisterUser
     │
     ├── Validate Email
     │
     ├── Check existing user
     │
     ├── Hash password using Argon2id
     │
     ├── Generate UUIDv7
     │
     ├── Create User entity
     │
     └── Save user
             │
             ▼
     PrismaUserRepository
             │
             ▼
        PostgreSQL
```

## API

### Register User

**Endpoint**

```text
POST /trpc/auth.register
```

**Request**

```bash
curl -X POST "http://localhost:3000/trpc/auth.register" \
  -H "Content-Type: application/json" \
  --data '{"email":"aman@test.com","password":"password123"}'
```

**Response**

```json
{
  "result": {
    "data": {
      "userId": "01a0fe07-a688-7412-a3d6-898122690202",
      "email": "aman@test.com"
    }
  }
}
```

The password is never returned in the response.

## Database

PostgreSQL runs locally using Docker.

Example environment configuration:

```env
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=auth_service
DATABASE_URL=postgresql://your_database_user:your_database_password@localhost:5432/auth_service
```

Never commit the real `.env` file.

Use `.env.example` for sharing required environment variables.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd auth-service
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Update `.env` with your local PostgreSQL credentials.

### 4. Start PostgreSQL

```bash
docker compose up -d
```

Check the container:

```bash
docker compose ps
```

### 5. Run Prisma migrations

```bash
pnpm exec prisma migrate dev
```

### 6. Generate Prisma Client

```bash
pnpm exec prisma generate
```

### 7. Type-check the project

```bash
pnpm exec tsc --noEmit
```

### 8. Start the application

```bash
pnpm exec tsx src/server.ts
```

The server will be available at:

```text
http://localhost:3000
```

## Project Status

### Completed

* [x] TypeScript project setup
* [x] Fastify setup
* [x] Domain `User` entity
* [x] `Email` value object
* [x] `UserId` value object
* [x] `UserRepository` port
* [x] `IdGenerator` port
* [x] `PasswordHasher` port
* [x] UUIDv7 ID generator
* [x] Argon2id password hashing
* [x] PostgreSQL with Docker
* [x] Prisma 7 configuration
* [x] Prisma migrations
* [x] Prisma PostgreSQL adapter
* [x] `PrismaUserRepository`
* [x] tRPC router
* [x] Fastify + tRPC integration
* [x] User registration API
* [x] End-to-end registration flow with PostgreSQL

### Planned

* [ ] Login flow
* [ ] JWT/session management
* [ ] Refresh token flow
* [ ] Authentication middleware
* [ ] Logout
* [ ] Password reset
* [ ] Automated unit tests
* [ ] Integration tests
* [ ] API documentation
* [ ] Production deployment

## Git

The following files should **not** be committed:

```text
.env
node_modules/
dist/
src/generated/prisma/
```

The following should be committed:

```text
prisma/schema.prisma
prisma/migrations/
prisma.config.ts
package.json
pnpm-lock.yaml
src/
```

## Development

### Type-check

```bash
pnpm exec tsc --noEmit
```

### Start PostgreSQL

```bash
docker compose up -d
```

### Stop PostgreSQL

```bash
docker compose down
```

### Remove PostgreSQL data

```bash
docker compose down -v
```

> `docker compose down -v` deletes the local PostgreSQL data volume. Use it carefully.

## License

This project is currently intended for learning and development purposes.
