// ============================================
// COMPOSITION ROOT - Clean Architecture
// ============================================
// This is where all dependencies are wired together
// Following the Dependency Rule: dependencies point inward

import { createInMemoryTodoRepository } from "./frameworks/database/in-memory-repository.js";
import { initialTodos } from "./frameworks/database/seed-data.js";
import { createCreateTodoUseCase } from "./use-cases/create-todo/create-todo-use-case.js";
import { createGetAllTodosUseCase } from "./use-cases/get-all-todos/get-all-todos-use-case.js";
import { createGetTodoByIdUseCase } from "./use-cases/get-todo-by-id/get-todo-by-id-use-case.js";
import { createUpdateTodoUseCase } from "./use-cases/update-todo/update-todo-use-case.js";
import { createDeleteTodoUseCase } from "./use-cases/delete-todo/delete-todo-use-case.js";
import { createTodoController } from "./interface-adapters/controllers/todo-controller.js";

export const createApp = () => {
  // Layer 4: Frameworks & Drivers
  // Create repository implementation
  const todoRepository = createInMemoryTodoRepository(initialTodos);

  // Layer 3: Use Cases
  // Create all use cases with repository dependency
  const getAllTodosUseCase = createGetAllTodosUseCase(todoRepository);
  const getTodoByIdUseCase = createGetTodoByIdUseCase(todoRepository);
  const createTodoUseCase = createCreateTodoUseCase(todoRepository);
  const updateTodoUseCase = createUpdateTodoUseCase(todoRepository);
  const deleteTodoUseCase = createDeleteTodoUseCase(todoRepository);

  // Layer 2: Interface Adapters
  // Create controller with use cases
  const controller = createTodoController({
    getAllTodos: getAllTodosUseCase,
    getTodoById: getTodoByIdUseCase,
    createTodo: createTodoUseCase,
    updateTodo: updateTodoUseCase,
    deleteTodo: deleteTodoUseCase,
  });

  // Only expose what the web framework needs
  return {
    controller,
  };
};
