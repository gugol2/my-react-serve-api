import { Todo } from "../../entities/entities/todo.js";
import { TodoRepositoryGateway } from "../gateways/todo-repository-gateway.js";

export const createGetAllTodosUseCase = (repository: TodoRepositoryGateway) => {
  return async (): Promise<Todo[]> => {
    return repository.findAll();
  };
};
