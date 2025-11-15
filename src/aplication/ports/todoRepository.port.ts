import type { Todo } from "../../domain/todo.js";

// Repository port (interface) - defines what the application needs
export type TodoRepository = {
  findAll: () => Todo[];
  findById: (id: number) => Todo | undefined;
  findIndexById: (id: number) => number;
  create: (title: string) => Todo;
  update: (index: number, updates: Partial<Todo>) => void;
  delete: (index: number) => void;
};
