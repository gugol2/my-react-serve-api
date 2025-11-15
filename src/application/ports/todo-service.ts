import {
  CreateTodoInput,
  Todo,
  TodoId,
  UpdateTodoInput,
} from "../../domain/entities/todo.js";
import { DomainError, Result } from "../../domain/errors/domain-errors.js";

// Service port (input port / use cases)
export interface TodoService {
  getAllTodos: () => Promise<Todo[]>;
  getTodoById: (id: TodoId) => Promise<Result<Todo, DomainError>>;
  createTodo: (input: CreateTodoInput) => Promise<Result<Todo, DomainError>>;
  updateTodo: (
    id: TodoId,
    input: UpdateTodoInput
  ) => Promise<Result<Todo, DomainError>>;
  deleteTodo: (id: TodoId) => Promise<Result<void, DomainError>>;
}
