import { TodoService } from "../../application/ports/todo-service.js";
import {
  CreateTodoInput,
  Todo,
  UpdateTodoInput,
} from "../../domain/entities/todo.js";

// ============================================
// HTTP ADAPTER (Express-like example)
// ============================================

export type HttpRequest = {
  params: Record<string, string>;
  body: unknown;
};

export type HttpResponse<T = unknown> = {
  status: number;
  body: T;
};

// Export the controller type for use elsewhere
// export type TodoController = ReturnType<typeof createTodoController>;

export interface TodoController {
  getAllTodos: () => Promise<HttpResponse<Todo[]>>;
  getTodoById: (req: HttpRequest) => Promise<HttpResponse>;
  createTodo: (req: HttpRequest) => Promise<HttpResponse>;
  updateTodo: (req: HttpRequest) => Promise<HttpResponse>;
  deleteTodo: (req: HttpRequest) => Promise<HttpResponse>;
}

// HTTP Controller functions (pure functions)
export const createTodoController = (service: TodoService): TodoController => {
  return {
    getAllTodos: async (): Promise<HttpResponse<Todo[]>> => {
      const todos = await service.getAllTodos();
      return {
        status: 200,
        body: todos,
      };
    },

    getTodoById: async (req: HttpRequest): Promise<HttpResponse> => {
      const { id } = req.params;
      const result = await service.getTodoById(id);

      if (!result.success) {
        return {
          status: result.error.type === "TodoNotFound" ? 404 : 400,
          body: { error: result.error },
        };
      }

      return {
        status: 200,
        body: result.value,
      };
    },

    createTodo: async (req: HttpRequest): Promise<HttpResponse> => {
      const input = req.body as CreateTodoInput;
      const result = await service.createTodo(input);

      if (!result.success) {
        return {
          status: 400,
          body: { error: result.error },
        };
      }

      return {
        status: 201,
        body: result.value,
      };
    },

    updateTodo: async (req: HttpRequest): Promise<HttpResponse> => {
      const { id } = req.params;
      const input = req.body as UpdateTodoInput;
      const result = await service.updateTodo(id, input);

      if (!result.success) {
        return {
          status: result.error.type === "TodoNotFound" ? 404 : 400,
          body: { error: result.error },
        };
      }

      return {
        status: 200,
        body: result.value,
      };
    },

    deleteTodo: async (req: HttpRequest): Promise<HttpResponse> => {
      const { id } = req.params;
      const result = await service.deleteTodo(id);

      if (!result.success) {
        return {
          status: result.error.type === "TodoNotFound" ? 404 : 400,
          body: { error: result.error },
        };
      }

      return {
        status: 204,
        body: null,
      };
    },
  };
};
