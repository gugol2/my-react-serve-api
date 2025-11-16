import { Todo, TodoId, DomainError, Result } from "../dtos/todo-dtos.js";

// Repository Gateway (Output Port - defines what use cases need)
export type TodoRepositoryGateway = {
  findAll: () => Promise<Todo[]>;
  findById: (id: TodoId) => Promise<Result<Todo, DomainError>>;
  save: (todo: Todo) => Promise<Todo>;
  update: (id: TodoId, todo: Todo) => Promise<Result<Todo, DomainError>>;
  delete: (id: TodoId) => Promise<Result<void, DomainError>>;
};
