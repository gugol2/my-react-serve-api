import { Todo } from "../../use-cases/dtos/todo-dtos.js";

// View Model for presentation
export type TodoViewModel = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

// Presenter functions to transform domain models to view models
export const presentTodo = (todo: Todo): TodoViewModel => ({
  id: todo.id,
  title: todo.title,
  description: todo.description,
  status: todo.status,
  createdAt: todo.createdAt.toISOString(),
  updatedAt: todo.updatedAt.toISOString(),
});

export const presentTodos = (todos: Todo[]): TodoViewModel[] =>
  todos.map(presentTodo);
