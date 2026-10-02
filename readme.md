# DB Design

A database design platform for developers to create, manage, and visualize database schemas.

The platform provides a human-friendly way to define database schemas and automatically represent them as interactive Entity Relationship (ER) diagrams.

The project is being built as a collection of microservices with a frontend application.

---

## Vision

The goal is to build a complete database design workspace where developers can:

* Create database projects
* Define database schemas using a simple, human-friendly syntax
* Design tables and relationships
* Automatically generate ER diagrams
* Edit and arrange diagrams on an interactive canvas
* Save and manage database designs
* Import and export schemas
* Generate SQL from schemas
* Collaborate on database designs

The core workflow is:

```text
Human-friendly Schema
          |
          v
       Parser
          |
          v
    Schema Model
          |
          v
     ER Diagram
          |
          v
 Interactive Canvas
```

---

## Architecture

The backend is being developed using a microservice architecture.

```text
                         Frontend
                            |
                            v
                      API / Gateway
                            |
          +-----------------+-----------------+
          |                 |                 |
          v                 v                 v
     Auth Service     Schema Service    Project Service
          |                 |                 |
          v                 v                 v
       Database          Database          Database
```

Each service has its own responsibility and clear boundaries.

Services should communicate through well-defined APIs or events rather than depending on each other's internal implementation.

---

## Microservices

### Auth Service

The first microservice being developed.

Responsibilities:

* User registration
* User login
* Authentication
* Access tokens
* Refresh tokens
* Session management
* Password reset

Current progress:

```text
Auth Service
|
+-- Fastify              [x]
+-- tRPC                 [x]
+-- PostgreSQL           [x]
+-- Prisma               [x]
+-- DDD structure        [x]
+-- UUIDv7               [x]
+-- Argon2id             [x]
+-- User Registration    [x]
|
+-- Login                [ ]
+-- Access Token         [ ]
+-- Refresh Token        [ ]
+-- Sessions             [ ]
```

---

### Schema Service

The Schema Service will manage the actual database schema.

Responsibilities will include:

* Tables
* Columns
* Data types
* Primary keys
* Foreign keys
* Indexes
* Constraints
* Relationships
* Schema validation
* Schema parsing
* Schema versions

Example:

```text
Table users {
    id uuid [pk]
    name varchar
    email varchar [unique]
    created_at timestamp
}

Table posts {
    id uuid [pk]
    user_id uuid
    title varchar
    content text
    created_at timestamp
}

Ref: posts.user_id > users.id
```

The schema definition will be converted into a structured representation:

```text
Schema Text
     |
     v
   Parser
     |
     v
    AST
     |
     v
Validation
     |
     v
Schema Model
```

---

### Project Service

The Project Service will manage database design projects.

Responsibilities may include:

* Create project
* Delete project
* Rename project
* Project ownership
* Project members
* Project permissions
* Project settings
* Project metadata
* Schema association

Example:

```text
Project
|
+-- id
+-- name
+-- owner
+-- createdAt
+-- updatedAt
     |
     v
   Schema
     |
     +-- users
     +-- posts
     +-- comments
```

---

## Frontend

The frontend will provide the main database design workspace.

The workspace will have two primary areas:

```text
+-----------------------------------------------------+
|                   Database Design                   |
+----------------------+------------------------------+
|                      |                              |
|   Schema Editor      |       ER Diagram Canvas      |
|                      |                              |
|  Table users {       |       +------------+         |
|    id uuid [pk]      |       |   users    |         |
|    email varchar     |------>|------------|         |
|  }                   |       | id         |         |
|                      |       | email      |         |
|                      |       +------------+         |
|                      |              |               |
|                      |              v               |
|                      |       +------------+         |
|                      |       |   posts    |         |
|                      |       +------------+         |
|                      |                              |
+----------------------+------------------------------+
```

### Schema Editor

Users will write schemas using a human-friendly syntax.

Planned features:

* Syntax highlighting
* Autocomplete
* Schema validation
* Error messages
* Real-time parsing
* Real-time diagram updates

### ER Diagram Canvas

The schema will be represented as an interactive diagram.

Planned functionality:

* Move tables
* Zoom
* Pan
* View relationships
* Select tables
* Display columns
* Display primary and foreign keys
* Automatic layout
* Save diagram positions

---

## Core Product Flow

```text
User
 |
 v
Create Project
 |
 v
Database Workspace
 |
 +-------------------+
 |                   |
 v                   v
Schema Editor      ER Canvas
 |
 |
 +------ Parse ------+
          |
          v
      Schema Model
```

The schema acts as the source of truth for generating the ER diagram.

```text
Schema
  |
  +-- Tables
  +-- Columns
  +-- Keys
  +-- Indexes
  +-- Relationships
          |
          v
      ER Diagram
```

---

## Engineering Principles

This project is focused on learning and applying real-world backend architecture.

Areas being explored:

* Microservices
* Domain-Driven Design
* Clean Architecture
* Hexagonal Architecture
* Database design
* API design
* Dependency injection
* Event-driven architecture
* Distributed systems
* Authentication
* Schema parsing
* Real-time communication
* Frontend canvas architecture

The goal is to understand why architectural decisions are made rather than simply connecting frameworks together.

---

## Repository Structure

```text
dbdesign/
|
+-- auth-service/
|
+-- schema-service/
|
+-- project-service/
|
+-- frontend/
|
+-- README.md
|
+-- ...
```

Each microservice will maintain its own internal architecture and boundaries.

A typical service may contain:

```text
src/
|
+-- domain/
+-- application/
+-- infrastructure/
+-- interface/
```

The structure will evolve as the requirements become clearer.

---

## Technology Stack

### Backend

* TypeScript
* Node.js
* Fastify
* tRPC
* PostgreSQL
* Prisma
* Docker

### Frontend

* TypeScript
* React / Next.js
* Schema Editor
* Interactive Canvas

### Infrastructure

* Docker
* CI/CD
* Message broker where required
* Cloud deployment

Technologies may evolve as the project develops.

---

## Roadmap

### Phase 1 — Foundation

* [x] Repository setup
* [x] Auth Service
* [x] PostgreSQL
* [x] Prisma
* [x] DDD/Clean Architecture foundation
* [x] User registration

### Phase 2 — Backend Services

* [ ] Complete Auth Service
* [ ] Login
* [ ] Access and refresh tokens
* [ ] Schema Service
* [ ] Project Service
* [ ] Service-to-service communication
* [ ] API contracts

### Phase 3 — Schema Engine

* [ ] Human-friendly schema syntax
* [ ] Lexer
* [ ] Parser
* [ ] AST
* [ ] Schema validation
* [ ] Relationships
* [ ] Schema persistence
* [ ] Schema versioning

### Phase 4 — Frontend

* [ ] Project dashboard
* [ ] Database workspace
* [ ] Schema editor
* [ ] Syntax highlighting
* [ ] Real-time parsing
* [ ] ER diagram canvas
* [ ] Table manipulation
* [ ] Relationship visualization
* [ ] Diagram persistence

### Phase 5 — Advanced Features

* [ ] SQL generation
* [ ] Schema import/export
* [ ] Database migrations
* [ ] Multiple database engines
* [ ] Collaboration
* [ ] Sharing
* [ ] Real-time collaboration
* [ ] Production deployment

---

## Current Focus

The project is currently in the backend foundation stage.

The first microservice, Auth Service, has been started and user registration is working end-to-end.

The next focus is building the Schema Service and Project Service, followed by the frontend database workspace.

```text
Auth Service
      |
      v
Schema Service
      |
      v
Project Service
      |
      v
Frontend
      |
      +-- Schema Editor
      |
      +-- ER Diagram Canvas
```

---

## Core Idea

```text
Write your schema.
        |
        v
Understand your database.
        |
        v
Visualize your relationships.
        |
        v
Design your database.
```
