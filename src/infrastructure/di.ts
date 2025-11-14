import { createInMemoryTodoRepository } from "./todoRepository.js";
import { createTodoService } from "../aplication/todo.js";
import { initialTodos } from "./seeds/todoSeeds.js";

// Composition root - wire everything together
const todoRepository = createInMemoryTodoRepository(initialTodos);
const todoService = createTodoService(todoRepository);

// Export the composed service
export const {
  getAllTodos,
  findTodoById,
  findTodoIndexById,
  createNewTodo,
  editTodo,
  deleteTodo,
} = todoService;
