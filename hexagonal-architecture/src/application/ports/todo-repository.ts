import { Todo, TodoId } from "../../domain/entities/todo.js";
import { DomainError, Result } from "../../domain/errors/domain-errors.js";

// Repository port (output port)
export interface TodoRepository {
  findAll: () => Promise<Todo[]>;
  findById: (id: TodoId) => Promise<Result<Todo, DomainError>>;
  save: (todo: Todo) => Promise<Todo>;
  update: (id: TodoId, todo: Todo) => Promise<Result<Todo, DomainError>>;
  delete: (id: TodoId) => Promise<Result<void, DomainError>>;
}
