import type { Todo } from "../domain/todo.js";
import type { TodoRepository } from "../aplication/ports/todoRepository.port.js";

// In-memory repository implementation (adapter)
export const createInMemoryTodoRepository = (todos: Todo[]): TodoRepository => ({
  findAll: () => todos,

  findById: (id: number) => todos.find((todo) => todo.id === id),

  findIndexById: (id: number) => todos.findIndex((todo) => todo.id === id),

  create: (title: string) => {
    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  },

  update: (index: number, updates: Partial<Todo>) => {
    todos[index] = { ...todos[index], ...updates };
  },

  delete: (index: number) => {
    todos.splice(index, 1);
  },
});
