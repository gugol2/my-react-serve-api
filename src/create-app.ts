import { createTodoController } from "./adapters/http/todo-controller.js";
import { createInMemoryTodoRepository } from "./adapters/persistence/in-memory-repository.js";
import { createTodoService } from "./application/services/todo-service-impl.js";

// This is where we wire everything together
export const createApp = () => {
  // Create instances (dependency injection)
  const repository = createInMemoryTodoRepository();
  const service = createTodoService(repository);
  const controller = createTodoController(service);

  return {
    controller,
    service,
    repository,
  };
};
