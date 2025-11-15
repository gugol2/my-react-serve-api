import { TodoId } from "../entities/todo.js";

// Domain errors
export type DomainError =
  | { type: "TodoNotFound"; id: TodoId }
  | { type: "ValidationError"; message: string };

// Result type for error handling
export type Result<T, E = DomainError> =
  | { success: true; value: T }
  | { success: false; error: E };
