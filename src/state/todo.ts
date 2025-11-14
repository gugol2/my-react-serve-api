import type { TodoRepository } from "../infrastructure/todoRepository.js";

// Application service (use cases)
export const createTodoService = (repository: TodoRepository) => ({
  getAllTodos: () => repository.findAll(),

  findTodoById: (id: number) => repository.findById(id),

  findTodoIndexById: (id: string) => repository.findIndexById(parseInt(id)),

  createNewTodo: (title: string) => repository.create(title),

  editTodo: (todoIndex: number, body: any) => repository.update(todoIndex, body),

  deleteTodo: (todoIndex: number) => repository.delete(todoIndex),
});
