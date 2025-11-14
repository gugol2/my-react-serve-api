import type { Todo } from "../domain/todo.js";
import { createInMemoryTodoRepository } from "./todoRepository.js";
import { createTodoService } from "../aplication/todo.js";

// Initial data
const initialTodos: Todo[] = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Try react-serve", completed: false },
];

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
