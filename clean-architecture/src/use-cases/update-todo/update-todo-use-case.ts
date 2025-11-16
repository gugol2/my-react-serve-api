import { Todo, TodoId, UpdateTodoInput } from "../../entities/entities/todo.js";
import { DomainError, Result } from "../../entities/errors/domain-errors.js";
import { mergeTodoUpdate } from "../../entities/services/todo-domain-service.js";
import { TodoRepositoryGateway } from "../gateways/todo-repository-gateway.js";

export const createUpdateTodoUseCase = (repository: TodoRepositoryGateway) => {
  return async (
    id: TodoId,
    input: UpdateTodoInput
  ): Promise<Result<Todo, DomainError>> => {
    // Find existing todo
    const existingResult = await repository.findById(id);
    if (!existingResult.success) {
      return existingResult;
    }

    // Merge updates using domain service
    const mergedResult = mergeTodoUpdate(existingResult.value, input);
    if (!mergedResult.success) {
      return mergedResult;
    }

    // Save updated todo
    return repository.update(id, mergedResult.value);
  };
};
