import { createTodoController } from "./adapters/http/todo-controller.js";
import { createInMemoryTodoRepository } from "./adapters/persistence/in-memory-repository.js";
import { initialTodos } from "./adapters/persistence/seed-data.js";
import { createTodoService } from "./application/services/todo-service-impl.js";

// Composition root - wires everything together
export const createApp = () => {
  // Create instances (dependency injection)
  const repository = createInMemoryTodoRepository(initialTodos);
  const service = createTodoService(repository);
  const controller = createTodoController(service);

  // Only expose what's needed by the HTTP layer
  return {
    controller,
  };
};
