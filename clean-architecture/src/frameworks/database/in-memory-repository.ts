import { TodoRepositoryGateway } from "../../use-cases/gateways/todo-repository-gateway.js";
import { Todo, TodoId, DomainError, Result } from "../../use-cases/dtos/todo-dtos.js";

// In-Memory Repository (Framework implementation of Gateway)
export const createInMemoryTodoRepository = (
  initialTodos: Todo[]
): TodoRepositoryGateway => {
  // Initialize with seed data
  let todos: Map<TodoId, Todo> = new Map(
    initialTodos.map((todo) => [todo.id, todo])
  );

  return {
    findAll: async (): Promise<Todo[]> => {
      return Array.from(todos.values());
    },

    findById: async (id: TodoId): Promise<Result<Todo, DomainError>> => {
      const todo = todos.get(id);
      if (!todo) {
        return {
          success: false,
          error: { type: "TodoNotFound", id },
        };
      }
      return { success: true, value: todo };
    },

    save: async (todo: Todo): Promise<Todo> => {
      todos.set(todo.id, todo);
      return todo;
    },

    update: async (
      id: TodoId,
      todo: Todo
    ): Promise<Result<Todo, DomainError>> => {
      if (!todos.has(id)) {
        return {
          success: false,
          error: { type: "TodoNotFound", id },
        };
      }
      todos.set(id, todo);
      return { success: true, value: todo };
    },

    delete: async (id: TodoId): Promise<Result<void, DomainError>> => {
      if (!todos.has(id)) {
        return {
          success: false,
          error: { type: "TodoNotFound", id },
        };
      }
      todos.delete(id);
      return { success: true, value: undefined };
    },
  };
};
