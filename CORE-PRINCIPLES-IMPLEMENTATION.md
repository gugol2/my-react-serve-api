# Core Principles Implementation

This document explains how **Hexagonal Architecture** and **Clean Architecture** implement fundamental software design principles.

## 📋 Table of Contents

- [Dependency Inversion Principle (DIP)](#dependency-inversion-principle-dip)
- [Single Responsibility Principle (SRP)](#single-responsibility-principle-srp)
- [Open/Closed Principle (OCP)](#openclosed-principle-ocp)
- [Separation of Concerns](#separation-of-concerns)
- [Dependency Rule](#dependency-rule)
- [Testability](#testability)

---

## Dependency Inversion Principle (DIP)

> High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).

### Hexagonal Architecture Implementation

**Uses "Ports" (interfaces) and "Adapters" (implementations)**

```typescript
// application/ports/todo-repository.ts (PORT - Interface)
export type TodoRepositoryPort = {
  findAll: () => Promise<Todo[]>;
  findById: (id: TodoId) => Promise<Result<Todo, DomainError>>;
  save: (todo: Todo) => Promise<Todo>;
  update: (id: TodoId, todo: Todo) => Promise<Result<Todo, DomainError>>;
  delete: (id: TodoId) => Promise<Result<void, DomainError>>;
}

// application/services/todo-service-impl.ts (HIGH-LEVEL MODULE)
export const createTodoService = (
  repository: TodoRepositoryPort  // ← Depends on abstraction (Port)
) => {
  return {
    getAllTodos: async () => {
      return await repository.findAll();
    }
  };
};

// adapters/persistence/in-memory-repository.ts (LOW-LEVEL MODULE - Adapter)
export const createInMemoryRepository = (): TodoRepositoryPort => {
  // ← Implements the Port interface
  return {
    findAll: async () => { /* implementation */ },
    // ...
  };
};
```

**Key points:**
- Application layer defines the **Port** (interface)
- Adapter layer implements the **Port**
- Dependency points **inward** (Adapter → Application → Domain)

### Clean Architecture Implementation

**Uses "Gateways" (interfaces) defined in Use Cases layer**

```typescript
// use-cases/gateways/todo-repository-gateway.ts (GATEWAY - Interface)
export type TodoRepositoryGateway = {
  findAll: () => Promise<Todo[]>;
  findById: (id: TodoId) => Promise<Result<Todo, DomainError>>;
  save: (todo: Todo) => Promise<Todo>;
  update: (id: TodoId, todo: Todo) => Promise<Result<Todo, DomainError>>;
  delete: (id: TodoId) => Promise<Result<void, DomainError>>;
}

// use-cases/get-all-todos/get-all-todos-use-case.ts (HIGH-LEVEL - Layer 2)
export const createGetAllTodosUseCase = (
  repository: TodoRepositoryGateway  // ← Depends on abstraction (Gateway)
) => {
  return async (): Promise<Todo[]> => {
    return await repository.findAll();
  };
};

// frameworks/database/in-memory-repository.ts (LOW-LEVEL - Layer 4)
export const createInMemoryTodoRepository = (): TodoRepositoryGateway => {
  // ← Implements the Gateway interface
  return {
    findAll: async () => { /* implementation */ },
    // ...
  };
};
```

**Key points:**
- Use Cases (Layer 2) defines the **Gateway** (interface)
- Frameworks (Layer 4) implements the **Gateway**
- Dependency points **inward** (Layer 4 → Layer 2 → Layer 1)

### Comparison

| Aspect | Hexagonal | Clean Architecture |
|--------|-----------|-------------------|
| **Interface name** | Port | Gateway |
| **Interface location** | application/ports/ | use-cases/gateways/ |
| **Implementation** | Adapters | Frameworks (Layer 4) |
| **Dependency flow** | Adapter → Port | Layer 4 → Layer 2 |

**Both achieve DIP, just different terminology!**

---

## Single Responsibility Principle (SRP)

> A module should have one, and only one, reason to change.

### Hexagonal Architecture Implementation

**Separates by technical responsibility:**

```typescript
// domain/entities/todo.ts
// RESPONSIBILITY: Define what a Todo IS
export type Todo = {
  readonly id: TodoId;
  readonly title: string;
  // ...
};

// domain/validation/todo-validation.ts
// RESPONSIBILITY: Validate Todo business rules
export const validateTitle = (title: string): Result<string, DomainError> => {
  // Validation logic
};

// domain/services/todo-domain-service.ts
// RESPONSIBILITY: Domain operations (create, merge)
export const createTodo = (input: CreateTodoInput): Result<Todo, DomainError> => {
  // Domain logic
};

// application/services/todo-service-impl.ts
// RESPONSIBILITY: Orchestrate use cases
export const createTodoService = (repository: TodoRepositoryPort) => {
  // Use case orchestration
};

// adapters/http/todo-controller.ts
// RESPONSIBILITY: Handle HTTP requests/responses
export const createTodoController = (service: TodoService) => {
  // HTTP handling
};
```

### Clean Architecture Implementation

**Separates by use case AND layer:**

```typescript
// entities/entities/todo.ts (Layer 1)
// RESPONSIBILITY: Define Todo entity
export type Todo = { /* ... */ };

// entities/validation/todo-validation.ts (Layer 1)
// RESPONSIBILITY: Business rule validation
export const validateTitle = (title: string): Result<string, DomainError> => {
  // ...
};

// entities/services/todo-domain-service.ts (Layer 1)
// RESPONSIBILITY: Domain operations
export const createTodo = (input: CreateTodoInput): Result<Todo, DomainError> => {
  // ...
};

// use-cases/create-todo/create-todo-use-case.ts (Layer 2)
// RESPONSIBILITY: ONE use case - creating todos
export const createCreateTodoUseCase = (repository: TodoRepositoryGateway) => {
  return async (input: CreateTodoInput): Promise<Result<Todo, DomainError>> => {
    // Single use case logic
  };
};

// use-cases/get-all-todos/get-all-todos-use-case.ts (Layer 2)
// RESPONSIBILITY: ONE use case - getting all todos
export const createGetAllTodosUseCase = (repository: TodoRepositoryGateway) => {
  return async (): Promise<Todo[]> => {
    // Single use case logic
  };
};

// interface-adapters/controllers/todo-controller.ts (Layer 3)
// RESPONSIBILITY: HTTP request/response handling
export const createTodoController = (useCases: UseCases) => {
  // ...
};
```

### Comparison

| Aspect | Hexagonal | Clean Architecture |
|--------|-----------|-------------------|
| **Use case organization** | Grouped in service | Individual files per use case |
| **Separation level** | By layer (Domain, App, Adapters) | By layer AND use case |
| **Granularity** | Coarser (service contains multiple use cases) | Finer (one file = one use case) |

**Clean Architecture is more granular in separating responsibilities.**

---

## Open/Closed Principle (OCP)

> Software entities should be open for extension, but closed for modification.

### Hexagonal Architecture Implementation

**Easy to add new adapters without modifying core logic:**

```typescript
// application/ports/todo-repository.ts (CLOSED - interface stable)
export type TodoRepositoryPort = {
  findAll: () => Promise<Todo[]>;
  // ...
};

// EXTENSION 1: In-memory adapter
export const createInMemoryRepository = (): TodoRepositoryPort => {
  // Implementation
};

// EXTENSION 2: PostgreSQL adapter (NEW - no modification to core)
export const createPostgresRepository = (): TodoRepositoryPort => {
  // New implementation, same interface
};

// EXTENSION 3: MongoDB adapter (NEW - no modification to core)
export const createMongoRepository = (): TodoRepositoryPort => {
  // Another new implementation
};

// Application service stays CLOSED (unchanged)
export const createTodoService = (repository: TodoRepositoryPort) => {
  // Works with ANY adapter implementation
};
```

### Clean Architecture Implementation

**Easy to add new use cases, frameworks, or adapters:**

```typescript
// use-cases/gateways/todo-repository-gateway.ts (CLOSED)
export type TodoRepositoryGateway = {
  findAll: () => Promise<Todo[]>;
  // ...
};

// EXTENSION 1: Add new use case (no modification to existing)
// use-cases/archive-todo/archive-todo-use-case.ts (NEW FILE)
export const createArchiveTodoUseCase = (repository: TodoRepositoryGateway) => {
  // New use case, existing gateway
};

// EXTENSION 2: Add new repository implementation
// frameworks/database/postgres-repository.ts (NEW FILE)
export const createPostgresRepository = (): TodoRepositoryGateway => {
  // New implementation
};

// EXTENSION 3: Add new controller
// interface-adapters/controllers/graphql-controller.ts (NEW FILE)
export const createGraphQLController = (useCases: UseCases) => {
  // New interface, same use cases
};
```

### Comparison

| Aspect | Hexagonal | Clean Architecture |
|--------|-----------|-------------------|
| **Extension points** | Adapters (primary & secondary) | Use cases, adapters, controllers, frameworks |
| **Adding new use case** | Modify service (add method) | Add new file (no modification) |
| **Adding new adapter** | New file implementing port | New file implementing gateway |
| **Core stability** | Domain & Application closed | Entities & Use Cases closed |

**Clean Architecture provides more extension points without modification.**

---

## Separation of Concerns

> Different concerns should be managed by different parts of the system.

### Hexagonal Architecture Implementation

**3 layers of separation:**

```
Domain (Business Logic Concern)
  ↓
Application (Use Case Orchestration Concern)
  ↓
Adapters (Infrastructure Concern)
```

**Example:**
```typescript
// CONCERN 1: What is a Todo? (Domain)
// domain/entities/todo.ts
export type Todo = { id: TodoId; title: string; /* ... */ };

// CONCERN 2: How to create a Todo? (Application)
// application/services/todo-service-impl.ts
export const createTodoService = (repository: TodoRepositoryPort) => ({
  createTodo: async (input) => {
    const todo = createTodo(input);  // Domain
    return await repository.save(todo);  // Port
  }
});

// CONCERN 3: How to expose via HTTP? (Adapter)
// adapters/http/todo-controller.ts
export const createTodoController = (service: TodoService) => ({
  handleCreateTodo: async (req, res) => {
    const result = await service.createTodo(req.body);
    return res.json(result);
  }
});
```

### Clean Architecture Implementation

**4 layers of separation + use case isolation:**

```
Layer 1: Entities (Enterprise Business Rules)
  ↓
Layer 2: Use Cases (Application Business Rules)
  ↓
Layer 3: Interface Adapters (Conversion)
  ↓
Layer 4: Frameworks (External Tools)
```

**Example:**
```typescript
// CONCERN 1: What is a Todo? (Layer 1 - Entities)
// entities/entities/todo.ts
export type Todo = { id: TodoId; title: string; /* ... */ };

// CONCERN 2: Domain business rules (Layer 1 - Entities)
// entities/services/todo-domain-service.ts
export const createTodo = (input: CreateTodoInput): Result<Todo, DomainError> => {
  // Pure domain logic
};

// CONCERN 3: Create todo use case (Layer 2 - Use Cases)
// use-cases/create-todo/create-todo-use-case.ts
export const createCreateTodoUseCase = (repository: TodoRepositoryGateway) => {
  return async (input: CreateTodoInput) => {
    const todoResult = createTodo(input);
    if (!todoResult.success) return todoResult;
    return await repository.save(todoResult.value);
  };
};

// CONCERN 4: HTTP presentation (Layer 3 - Interface Adapters)
// interface-adapters/controllers/todo-controller.ts
export const createTodoController = (useCases: UseCases) => ({
  handleCreateTodo: async (input: CreateTodoInput) => {
    return await useCases.createTodo(input);
  }
});

// CONCERN 5: Web framework integration (Layer 4 - Frameworks)
// frameworks/web/routes/todo-routes.tsx
export const TodoRoutes = ({ controller }: Props) => (
  <Route method="POST" path="/todos" handler={controller.handleCreateTodo} />
);
```

### Comparison

| Aspect | Hexagonal | Clean Architecture |
|--------|-----------|-------------------|
| **Separation levels** | 3 (Domain, Application, Adapters) | 4 (Entities, Use Cases, Adapters, Frameworks) |
| **Business logic split** | Domain only | Entities (enterprise) + Use Cases (application) |
| **Use case isolation** | Grouped in services | Individual files |
| **Granularity** | Coarser separation | Finer separation |

**Clean Architecture provides more granular separation of concerns.**

---

## Dependency Rule

> Source code dependencies must point only inward, toward higher-level policies.

### Hexagonal Architecture Implementation

**Implicit dependency flow:**

```
Adapters → Application → Domain
(Outer)      (Middle)     (Center)
```

**Not strictly enforced, but followed by convention:**

```typescript
// ✅ ALLOWED: Adapter imports from Application
// adapters/persistence/in-memory-repository.ts
import { TodoRepositoryPort } from "../../application/ports/todo-repository.js";

// ✅ ALLOWED: Application imports from Domain
// application/services/todo-service-impl.ts
import { Todo, createTodo } from "../../domain/todo-domain-service.js";

// ❌ VIOLATION: Would be caught in code review
// domain/entities/todo.ts
import { TodoRepositoryPort } from "../../application/ports/todo-repository.js";
// ^ Domain should NOT import from Application
```

**Enforcement:** Convention-based (code reviews, team discipline)

### Clean Architecture Implementation

**Explicit 4-layer dependency rule:**

```
Layer 4 → Layer 3 → Layer 2 → Layer 1
(Outer)   (Adapters) (Use Cases) (Entities)
```

**Strictly enforced with DTOs and Gateways:**

```typescript
// ✅ ALLOWED: Layer 4 imports from Layer 2 (DTOs)
// frameworks/database/in-memory-repository.ts
import { TodoRepositoryGateway } from "../../use-cases/gateways/todo-repository-gateway.js";
import { Todo, TodoId } from "../../use-cases/dtos/todo-dtos.js";

// ✅ ALLOWED: Layer 3 imports from Layer 2 (DTOs)
// interface-adapters/controllers/todo-controller.ts
import { CreateTodoInput } from "../../use-cases/dtos/todo-dtos.js";

// ✅ ALLOWED: Layer 2 imports from Layer 1 (Entities)
// use-cases/create-todo/create-todo-use-case.ts
import { Todo, createTodo } from "../../entities/services/todo-domain-service.js";

// ❌ PREVENTED: Layer 1 cannot import from outer layers
// entities/entities/todo.ts
// (No imports from use-cases, interface-adapters, or frameworks)

// ❌ PREVENTED: Layer 3 cannot import directly from Layer 1
// interface-adapters/controllers/todo-controller.ts
import { Todo } from "../../entities/entities/todo.js";  // ❌ Must use DTOs
// Should be:
import { Todo } from "../../use-cases/dtos/todo-dtos.js";  // ✅
```

**Enforcement:** Architectural pattern + DTOs layer + linting rules (optional)

### Comparison

| Aspect | Hexagonal | Clean Architecture |
|--------|-----------|-------------------|
| **Rule strictness** | Implicit, convention-based | Explicit, enforced by structure |
| **Layers** | 3 (flexible) | 4 (rigid) |
| **Boundary enforcement** | Ports | DTOs + Gateways |
| **Violation prevention** | Code reviews | Architecture + DTOs prevent imports |
| **Layer skipping** | Generally avoided | Allowed but discouraged (use DTOs) |

**Clean Architecture has stricter, more enforceable dependency rules.**

---

## Testability

> Code should be easy to test in isolation without external dependencies.

### Hexagonal Architecture Implementation

**Test through ports (mock adapters):**

```typescript
// Testing application service by mocking the port
import { describe, it, expect } from 'vitest';
import { createTodoService } from '../application/services/todo-service-impl.js';
import { TodoRepositoryPort } from '../application/ports/todo-repository.js';

describe('TodoService', () => {
  it('should create a todo', async () => {
    // Mock the port (adapter)
    const mockRepository: TodoRepositoryPort = {
      save: async (todo) => todo,  // Mock implementation
      findAll: async () => [],
      // ... other methods
    };

    const service = createTodoService(mockRepository);

    const result = await service.createTodo({
      title: 'Test Todo',
      description: 'Test Description',
    });

    expect(result.success).toBe(true);
  });
});
```

**Test domain in complete isolation:**

```typescript
// Testing pure domain logic (no dependencies)
import { describe, it, expect } from 'vitest';
import { createTodo } from '../domain/services/todo-domain-service.js';

describe('createTodo', () => {
  it('should create a valid todo', () => {
    const result = createTodo({
      title: 'Valid Title',
      description: 'Valid Description',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.title).toBe('Valid Title');
    }
  });

  it('should reject empty title', () => {
    const result = createTodo({
      title: '',
      description: 'Valid Description',
    });

    expect(result.success).toBe(false);
  });
});
```

### Clean Architecture Implementation

**Test each layer independently:**

```typescript
// Testing Layer 1 (Entities) - Pure domain logic, zero dependencies
import { describe, it, expect } from 'vitest';
import { createTodo } from '../entities/services/todo-domain-service.js';

describe('Domain: createTodo', () => {
  it('should create valid todo', () => {
    const result = createTodo({
      title: 'Test',
      description: 'Description',
    });

    expect(result.success).toBe(true);
  });
});

// Testing Layer 2 (Use Cases) - Mock gateways
import { createCreateTodoUseCase } from '../use-cases/create-todo/create-todo-use-case.js';
import { TodoRepositoryGateway } from '../use-cases/gateways/todo-repository-gateway.js';

describe('UseCase: createTodo', () => {
  it('should create and save todo', async () => {
    // Mock the gateway
    const mockGateway: TodoRepositoryGateway = {
      save: async (todo) => todo,
      findAll: async () => [],
      // ... other methods
    };

    const useCase = createCreateTodoUseCase(mockGateway);

    const result = await useCase({
      title: 'Test',
      description: 'Description',
    });

    expect(result.success).toBe(true);
  });
});

// Testing Layer 3 (Controllers) - Mock use cases
import { createTodoController } from '../interface-adapters/controllers/todo-controller.js';

describe('Controller: createTodo', () => {
  it('should handle create request', async () => {
    const mockUseCases = {
      createTodo: async (input) => ({ success: true, value: { id: '1', ...input } }),
      // ... other use cases
    };

    const controller = createTodoController(mockUseCases);

    const result = await controller.createTodo({
      title: 'Test',
      description: 'Description',
    });

    expect(result.success).toBe(true);
  });
});
```

### Comparison

| Aspect | Hexagonal | Clean Architecture |
|--------|-----------|-------------------|
| **Test granularity** | 3 layers (Domain, Application, Adapters) | 4 layers (Entities, Use Cases, Adapters, Frameworks) |
| **Domain tests** | Pure, no dependencies | Pure, no dependencies |
| **Use case tests** | Mock ports (grouped service) | Mock gateways (individual use cases) |
| **Isolation level** | High | Very high (more granular) |
| **Test organization** | By layer | By layer + use case |

**Both are highly testable; Clean Architecture offers finer-grained testing.**

---

## Summary Table

| Principle | Hexagonal | Clean Architecture | Winner |
|-----------|-----------|-------------------|--------|
| **DIP** | Ports & Adapters | Gateways & DTOs | Tie (same principle) |
| **SRP** | Layer separation | Layer + use case separation | Clean (more granular) |
| **OCP** | Add adapters | Add use cases/adapters/frameworks | Clean (more extension points) |
| **Separation of Concerns** | 3 layers | 4 layers + use case isolation | Clean (finer separation) |
| **Dependency Rule** | Implicit, convention | Explicit, enforced | Clean (stricter) |
| **Testability** | High (mock ports) | Very high (mock gateways) | Clean (more granular) |
| **Simplicity** | Simpler, less layers | More complex, stricter | Hexagonal (easier) |
| **Flexibility** | More flexible | More structured | Hexagonal (less rigid) |

## Key Takeaway

- **Hexagonal Architecture**: Simpler, more flexible, easier to learn
- **Clean Architecture**: More structured, stricter rules, better for large-scale projects

**Both implement SOLID principles effectively, just with different levels of granularity and enforcement.**
