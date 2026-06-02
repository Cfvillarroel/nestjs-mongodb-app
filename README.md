```markdown
# NestJS MongoDB App

[![CI](https://github.com/Cfvillarroel/nestjs-mongodb-app/actions/workflows/ci.yml/badge.svg)](https://github.com/Cfvillarroel/nestjs-mongodb-app/actions/workflows/ci.yml)
[![NestJS](https://img.shields.io/badge/NestJS-11-red.svg)](https://nestjs.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8-green.svg)](https://mongoosejs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A practical example of building a **REST API with NestJS and MongoDB** using Mongoose. This project demonstrates how to structure a real-world NestJS application with MongoDB, including CRUD operations, transactions, validation, Swagger documentation, and more.

## Features

- **NestJS 11** with TypeScript 5
- **MongoDB** with Mongoose 8 (schemas, models, references)
- **Swagger/OpenAPI** documentation at `/api`
- **Validation** with `class-validator` and global `ValidationPipe`
- **Transactions** for data consistency
- **Repository pattern** for clean data access
- **Docker Compose** for local MongoDB setup
- **GitHub Actions CI** for lint, build, and tests
- **Unit tests** with Jest

## Architecture

```
src/
├── dto/                    # Shared DTOs (query, response)
├── entities/               # Mongoose schemas/models
├── repositories/           # Data access layer
├── modules/
│   ├── user/               # User CRUD (ADMIN/USER roles)
│   ├── client/             # Client management (admin only)
│   ├── product/            # Product CRUD with status tracking
│   └── sale/               # Sales with product + client refs
├── app.module.ts           # Root module with MongoDB connection
└── main.ts                 # Bootstrap with Swagger + ValidationPipe
```

## Quick Start

### Prerequisites

- Node.js 20+
- MongoDB (local, Docker, or MongoDB Atlas)

### 1. Clone and install

```bash
git clone https://github.com/Cfvillarroel/nestjs-mongodb-app.git
cd nestjs-mongodb-app
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your MongoDB credentials
```

### 3. Start MongoDB (optional — using Docker)

```bash
docker compose up -d
```

> If using Docker, update your `.env`:
> ```
> MONGO_HOST=localhost:27017
> MONGO_USER=admin
> MONGO_PASSWORD=strongpassword
> MONGO_DATABASE=testing
> ```

### 4. Run the app

```bash
# Development (with hot reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```

### 5. Open Swagger docs

Navigate to [http://localhost:3000/api](http://localhost:3000/api) to explore the API documentation.

## API Endpoints

| Method | Endpoint                     | Description              |
|--------|------------------------------|--------------------------|
| GET    | `/`                          | Health check             |
| POST   | `/user/createUser`           | Create a user            |
| GET    | `/user/getUserById/:id`      | Get user by ID           |
| POST   | `/client/createClient`       | Create a client (admin)  |
| GET    | `/client/getClients`         | List clients             |
| GET    | `/client/getClientById/:id`  | Get client by ID         |
| POST   | `/product/createProduct`     | Create a product         |
| PUT    | `/product/updateProduct/:id` | Update a product         |
| GET    | `/product/getProductById/:id`| Get product by ID        |
| GET    | `/product/getProducts`       | List products            |
| POST   | `/sale/createSale`           | Create a sale (admin)    |
| GET    | `/sale/getSaleById/:id`      | Get sale by ID           |

## Testing

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## Scripts

| Script          | Description                    |
|-----------------|--------------------------------|
| `npm run start:dev` | Start in development mode |
| `npm run build`     | Compile TypeScript         |
| `npm run lint`      | Lint with ESLint           |
| `npm run format`    | Format with Prettier       |
| `npm run test`      | Run unit tests             |

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| [NestJS](https://nestjs.com) | 11 | Framework |
| [Mongoose](https://mongoosejs.com) | 8 | MongoDB ODM |
| [TypeScript](https://typescriptlang.org) | 5 | Language |
| [Swagger](https://swagger.io) | via `@nestjs/swagger` | API Docs |
| [class-validator](https://github.com/typestack/class-validator) | 0.14 | DTO Validation |
| [Jest](https://jestjs.io) | 29 | Testing |
| [Docker](https://docker.com) | - | Local MongoDB |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

- **Carlos Villarroel** — [@Cfvillarroel](https://github.com/Cfvillarroel)

## License

This project is [MIT licensed](LICENSE).
```
