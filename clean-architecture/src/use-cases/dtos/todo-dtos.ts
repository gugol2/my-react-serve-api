// DTOs (Data Transfer Objects) for use cases
// Re-export entity types for use by outer layers

export type {
  Todo,
  TodoId,
  TodoStatus,
  CreateTodoInput,
  UpdateTodoInput,
} from "../../entities/entities/todo.js";

export type { DomainError, Result } from "../../entities/errors/domain-errors.js";
