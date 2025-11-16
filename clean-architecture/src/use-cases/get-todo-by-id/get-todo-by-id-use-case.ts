import { Todo, TodoId } from "../../entities/entities/todo.js";
import { DomainError, Result } from "../../entities/errors/domain-errors.js";
import { TodoRepositoryGateway } from "../gateways/todo-repository-gateway.js";

export const createGetTodoByIdUseCase = (repository: TodoRepositoryGateway) => {
  return async (id: TodoId): Promise<Result<Todo, DomainError>> => {
    return repository.findById(id);
  };
};
