# Hexagonal Architecture vs Clean Architecture - Comparison

A REST API built with [react-serve-js](https://github.com/react-serve/react-serve-js) and TypeScript, demonstrating the differences between **Hexagonal Architecture** and **Clean Architecture**.

## 🎯 Purpose

This repository contains **two different implementations** of the same Todo API to help you understand the practical differences between:

1. **Hexagonal Architecture** (Ports & Adapters) -> Deployed: (https://my-react-serve-api-hexagonal-architecture.onrender.com)
2. **Clean Architecture** (Uncle Bob's 4-Layer Architecture) -> Deployed: (https://my-react-serve-api-clean-architecture.onrender.com/)

Both implementations follow **functional programming** principles (no classes, pure functions, immutable data).

## 📂 Repository Structure

This repository contains **both implementations in the main branch** for easy side-by-side comparison:

```
my-react-serve-api/
├── hexagonal-architecture/       # Hexagonal Architecture implementation
│   └── src/
│       ├── domain/
│       ├── application/
│       └── adapters/
│
├── clean-architecture/           # Clean Architecture implementation
│   └── src/
│       ├── entities/
│       ├── use-cases/
│       ├── interface-adapters/
│       └── frameworks/
│
├── CORE-PRINCIPLES-IMPLEMENTATION.md  # Detailed principle comparisons
└── README.md                     # This file
```

**Alternative:** You can also switch between branches to see each implementation in isolation:

```bash
# Hexagonal Architecture implementation
git checkout hexagonal-architecture

# Clean Architecture implementation
git checkout clean-architecture
```

## 🏗️ Architecture Comparison

### Hexagonal Architecture (Ports & Adapters)

**3-Layer Structure:**

```
src/
├── domain/          # Core business logic (center of hexagon)
├── application/     # Use cases and ports (interfaces)
└── adapters/        # External interfaces (HTTP, DB, etc.)
```

**Key Concepts:**
- **Ports**: Interfaces that define how the application communicates (input/output)
- **Adapters**: Implementations that connect to external systems
- **Domain**: Pure business logic, isolated from infrastructure
- **Symmetry**: Primary ports (driving) and secondary ports (driven)

**Folder Structure (see `hexagonal-architecture/src/`):**
```
src/
├── domain/
│   ├── entities/
│   ├── errors/
│   ├── services/
│   ├── validation/
│   └── helper/
├── application/
│   ├── ports/                    # Interfaces
│   └── services/                 # Use case implementations
└── adapters/
    ├── http/                     # Primary adapter (driving)
    └── persistence/              # Secondary adapter (driven)
```

### Clean Architecture (Uncle Bob)

**4-Layer Structure:**

```
├── entities/              # Layer 1: Enterprise business rules
├── use-cases/             # Layer 2: Application business rules
├── interface-adapters/    # Layer 3: Controllers, presenters
└── frameworks/            # Layer 4: External tools (DB, web, etc.)
```

**Key Concepts:**
- **Dependency Rule**: Dependencies must point INWARD only (Layer 4 → 3 → 2 → 1)
- **Entities**: Enterprise-wide business rules
- **Use Cases**: Application-specific business rules (individual use cases)
- **DTOs**: Data Transfer Objects to enforce layer boundaries
- **Concentric Circles**: Explicit layer hierarchy

**Folder Structure (see `clean-architecture/src/`):**
```
src/
├── entities/                     # Layer 1
│   ├── entities/
│   ├── errors/
│   ├── services/
│   ├── validation/
│   └── helper/
├── use-cases/                    # Layer 2
│   ├── create-todo/
│   ├── get-all-todos/
│   ├── get-todo-by-id/
│   ├── update-todo/
│   ├── delete-todo/
│   ├── gateways/                 # Port interfaces
│   └── dtos/                     # Re-exported types
├── interface-adapters/           # Layer 3
│   ├── controllers/
│   └── presenters/
└── frameworks/                   # Layer 4
    ├── web/
    └── database/
```

## 🔍 Key Differences

| Aspect | Hexagonal Architecture | Clean Architecture |
|--------|------------------------|-------------------|
| **Layers** | 3 layers (Domain, Application, Adapters) | 4 layers (Entities, Use Cases, Interface Adapters, Frameworks) |
| **Focus** | Port/Adapter separation | Strict dependency flow (Dependency Rule) |
| **Use Cases** | Grouped in application/services | Individual folders per use case |
| **Interfaces** | Ports (input/output) | Gateways + DTOs |
| **Mental Model** | Center (domain) + symmetric adapters | Concentric circles (onion) |
| **Layer Boundary** | Ports define boundaries | DTOs + Gateways define boundaries |
| **Dependency Flow** | Domain ← Application ← Adapters | Layer 1 ← Layer 2 ← Layer 3 ← Layer 4 |
| **Complexity** | Simpler, less prescriptive | More structured, stricter rules |

## 📊 When to Use Each

### Use Hexagonal Architecture when:
- You want a simpler, more flexible structure
- You need to swap adapters frequently (e.g., different databases, APIs)
- Team is smaller or less experienced with architectural patterns
- Project scope is well-defined and medium-sized

### Use Clean Architecture when:
- You need strict separation of business rules (enterprise vs application)
- Large team working on complex enterprise applications
- Multiple applications sharing the same domain logic
- You want explicit, enforceable dependency rules

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd my-react-serve-api
```

2. **Explore both implementations side by side**

On the `main` branch, you can view both architectures simultaneously:

```bash
# View Hexagonal Architecture
ls -R hexagonal-architecture/src/

# View Clean Architecture
ls -R clean-architecture/src/

# Compare specific files side by side
diff hexagonal-architecture/src/create-app.ts clean-architecture/src/create-app.ts
```

3. **Read the detailed comparison**
```bash
# Read core principles implementation
cat CORE-PRINCIPLES-IMPLEMENTATION.md
```

4. **Run either implementation** (switch to respective branch)

```bash
# Try Hexagonal Architecture
git checkout hexagonal-architecture
npm install
npm run dev

# OR Try Clean Architecture
git checkout clean-architecture
npm install
npm run dev
```

## 📡 API Endpoints (Same in Both)

Both implementations expose identical REST APIs:

- `GET /` - Welcome message
- `GET /todos` - List all todos
- `GET /todos/:id` - Get todo by ID
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

**Example:**
```bash
curl -X POST http://localhost:6969/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Architecture Patterns",
    "description": "Compare Hexagonal and Clean Architecture"
  }'
```

## 🧪 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run debug` - Start with debugger (port 9229)
- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run typecheck` - TypeScript type checking
- `npm run test` - Run unit tests

## 🧰 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript (strict mode)
- **Framework**: react-serve-js
- **Testing**: Vitest
- **Patterns**: Functional Programming (no classes)

## 📚 Learn More

### Architecture Patterns
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) - Alistair Cockburn
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - Uncle Bob's article
- [Clean Architecture Book](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164) - Robert C. Martin
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html) - Martin Fowler

### Comparison Articles
- [Hexagonal vs Clean Architecture](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
- [Ports and Adapters Pattern](https://jmgarridopaz.github.io/content/hexagonalarchitecture.html)

### Framework Documentation
- [react-serve-js](https://github.com/react-serve/react-serve-js)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)

## 💡 Key Takeaways

1. **Both architectures** achieve the same goal: **decoupling business logic from infrastructure**
2. **Hexagonal** is more flexible and easier to grasp initially
3. **Clean Architecture** provides stricter rules and better scalability for large projects
4. **Both work great** with functional programming patterns
5. **Choose based on** your team size, project complexity, and preference for structure vs flexibility

---

**Ready to explore?** Switch to `hexagonal-architecture` or `clean-architecture` branch and compare the implementations side by side!
