# Todo API - Clean Architecture

A REST API built with [react-serve-js](https://github.com/react-serve/react-serve-js) and TypeScript, following **Clean Architecture** principles by Uncle Bob.

## 🏗️ Architecture

This project demonstrates **Clean Architecture** (Robert C. Martin) with functional programming patterns:

- **Layer 1 - Entities**: Enterprise business rules (pure domain logic)
- **Layer 2 - Use Cases**: Application business rules (individual use cases)
- **Layer 3 - Interface Adapters**: Controllers, Presenters, Gateways
- **Layer 4 - Frameworks & Drivers**: Web framework, Database, External tools
- **Functional approach**: No classes, pure functions, and immutable data

## 📁 Project Structure

```
src/
├── entities/                           # Layer 1: Enterprise Business Rules
│   ├── entities/
│   │   └── todo.ts                    # Domain entities and types
│   ├── errors/
│   │   └── domain-errors.ts           # Domain errors
│   ├── services/
│   │   └── todo-domain-service.ts     # Domain services
│   ├── validation/
│   │   └── todo-validation.ts         # Business rules
│   └── helper/
│       └── generate-id.ts             # Domain utilities
│
├── use-cases/                          # Layer 2: Application Business Rules
│   ├── create-todo/
│   │   └── create-todo-use-case.ts    # Create todo use case
│   ├── get-all-todos/
│   │   └── get-all-todos-use-case.ts  # Get all todos use case
│   ├── get-todo-by-id/
│   │   └── get-todo-by-id-use-case.ts # Get by ID use case
│   ├── update-todo/
│   │   └── update-todo-use-case.ts    # Update todo use case
│   ├── delete-todo/
│   │   └── delete-todo-use-case.ts    # Delete todo use case
│   ├── gateways/
│   │   └── todo-repository-gateway.ts # Repository gateway (interface)
│   └── dtos/
│       └── todo-dtos.ts               # DTOs re-exported for outer layers
│
├── interface-adapters/                 # Layer 3: Interface Adapters
│   ├── controllers/
│   │   └── todo-controller.ts         # HTTP controller
│   └── presenters/
│       └── todo-presenter.ts          # View model presenter
│
├── frameworks/                         # Layer 4: Frameworks & Drivers
│   ├── web/
│   │   └── routes/
│   │       └── todo-routes.tsx        # React-serve routes
│   └── database/
│       ├── in-memory-repository.ts    # Repository implementation
│       └── seed-data.ts               # Initial data
│
├── create-app.ts                       # Composition root (DI)
└── index.tsx                           # Application entry point
```

## 🎯 Key Features

- ✅ **Clean Architecture**: 4-layer architecture following Uncle Bob's principles
- ✅ **Dependency Rule**: Dependencies point inward only
- ✅ **Functional Programming**: Pure functions, no classes
- ✅ **Individual Use Cases**: Each use case is a separate, testable function
- ✅ **Type Safety**: Full TypeScript with strict mode
- ✅ **Result Type Pattern**: Explicit error handling (no exceptions)
- ✅ **Presenters**: Separate presentation logic from business logic
- ✅ **Dependency Injection**: Manual DI at composition root
- ✅ **Gateway Pattern**: Interface adapters for external dependencies
- ✅ **Domain-Driven Design**: Rich domain model with validations
- ✅ **Immutable Data**: Readonly types throughout
- ✅ **Testing**: Full test coverage across all layers

## 🧰 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: react-serve-js
- **Testing**: Vitest
- **Architecture**: Clean Architecture (Uncle Bob)

## 📚 Learn More

### Architecture & Patterns
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - Uncle Bob's original article
- [Clean Architecture Book](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164) - Robert C. Martin
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

### Libraries
- [react-serve-js Documentation](https://github.com/react-serve/react-serve-js)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vitest Documentation](https://vitest.dev/)
