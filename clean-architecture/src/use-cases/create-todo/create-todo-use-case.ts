import { CreateTodoInput, Todo } from "../../entities/entities/todo.js";
import { DomainError, Result } from "../../entities/errors/domain-errors.js";
import { createTodo } from "../../entities/services/todo-domain-service.js";
import { TodoRepositoryGateway } from "../gateways/todo-repository-gateway.js";

export const createCreateTodoUseCase = (repository: TodoRepositoryGateway) => {
  return async (input: CreateTodoInput): Promise<Result<Todo, DomainError>> => {
    // Validate and create todo using domain service
    const todoResult = createTodo(input);

    if (!todoResult.success) {
      return todoResult;
    }

    // Save using repository gateway
    const savedTodo = await repository.save(todoResult.value);
    return { success: true, value: savedTodo };
  };
};
