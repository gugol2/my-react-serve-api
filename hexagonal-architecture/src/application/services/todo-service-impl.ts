import {
  CreateTodoInput,
  Todo,
  TodoId,
  UpdateTodoInput,
} from "../../domain/entities/todo.js";
import { DomainError, Result } from "../../domain/errors/domain-errors.js";
import {
  createTodo,
  mergeTodoUpdate,
} from "../../domain/services/todo-domain-service.js";
import { TodoRepository } from "../ports/todo-repository.js";
import { TodoService } from "../ports/todo-service.js";

// Service Adapter (Application Service)
export const createTodoService = (repository: TodoRepository): TodoService => {
  return {
    getAllTodos: async (): Promise<Todo[]> => {
      return repository.findAll();
    },

    getTodoById: async (id: TodoId): Promise<Result<Todo, DomainError>> => {
      return repository.findById(id);
    },

    createTodo: async (
      input: CreateTodoInput
    ): Promise<Result<Todo, DomainError>> => {
      const todoResult = createTodo(input);
      if (!todoResult.success) {
        return todoResult;
      }
      const savedTodo = await repository.save(todoResult.value);
      return { success: true, value: savedTodo };
    },

    updateTodo: async (
      id: TodoId,
      input: UpdateTodoInput
    ): Promise<Result<Todo, DomainError>> => {
      const existingResult = await repository.findById(id);
      if (!existingResult.success) {
        return existingResult;
      }

      const mergedResult = mergeTodoUpdate(existingResult.value, input);
      if (!mergedResult.success) {
        return mergedResult;
      }

      return repository.update(id, mergedResult.value);
    },

    deleteTodo: async (id: TodoId): Promise<Result<void, DomainError>> => {
      return repository.delete(id);
    },
  };
};
