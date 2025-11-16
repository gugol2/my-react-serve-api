# Todo API - Hexagonal Architecture (Ports & Adapters)

A clean architecture REST API built with [react-serve-js](https://github.com/react-serve/react-serve-js) and TypeScript, following hexagonal architecture (ports and adapters) principles.

## 🏗️ Architecture

This project demonstrates a **hexagonal architecture** (also known as ports and adapters) with functional programming patterns:

- **Domain Layer**: Pure business logic, entities, and validations
- **Application Layer**: Use cases and port definitions (interfaces)
- **Adapters Layer**: HTTP controllers and persistence implementations
- **Functional approach**: No classes, factory functions, and immutable data structures


## 📁 Project Structure

```
src/
├── domain/                      # Domain layer (core business logic)
│   ├── entities/
│   │   └── todo.ts             # Domain entities and types
│   ├── errors/
│   │   └── domain-errors.ts    # Domain-specific errors
│   ├── services/
│   │   └── todo-domain-service.ts  # Domain services
│   ├── validation/
│   │   └── todo-validation.ts  # Business rules validation
│   └── helper/
│       └── generate-id.ts      # Domain utilities
│
├── application/                 # Application layer (use cases)
│   ├── ports/
│   │   ├── todo-repository.ts  # Repository port (interface)
│   │   └── todo-service.ts     # Service port (interface)
│   └── services/
│       └── todo-service-impl.ts  # Service implementation
│
├── adapters/                    # Adapters layer (external interfaces)
│   ├── http/
│   │   ├── routes/
│   │   │   └── todo-routes.tsx # HTTP routes (react-serve)
│   │   └── todo-controller.ts  # HTTP controller
│   └── persistence/
│       ├── in-memory-repository.ts  # In-memory implementation
│       └── seed-data.ts        # Initial data
│
├── create-app.ts               # Composition root (DI)
└── index.tsx                   # Application entry point
```

## 🎯 Key Features

- ✅ **Hexagonal Architecture**: Clean separation of concerns
- ✅ **Functional Programming**: Pure functions, no classes
- ✅ **Type Safety**: Full TypeScript with strict mode
- ✅ **Result Type Pattern**: Explicit error handling (no exceptions)
- ✅ **Dependency Injection**: Manual DI with factory functions
- ✅ **Port/Adapter Pattern**: Easy to swap implementations
- ✅ **Domain-Driven Design**: Rich domain model with validations
- ✅ **Immutable Data**: Readonly types throughout
- ✅ **Testing**: Unit tests for domain logic 

## 📚 Learn More

### Architecture & Patterns
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

### Libraries
- [react-serve-js Documentation](https://github.com/react-serve/react-serve-js)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vitest Documentation](https://vitest.dev/)
