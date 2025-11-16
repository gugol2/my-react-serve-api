import { TodoId } from "../../entities/entities/todo.js";
import { DomainError, Result } from "../../entities/errors/domain-errors.js";
import { TodoRepositoryGateway } from "../gateways/todo-repository-gateway.js";

export const createDeleteTodoUseCase = (repository: TodoRepositoryGateway) => {
  return async (id: TodoId): Promise<Result<void, DomainError>> => {
    return repository.delete(id);
  };
};
