import { CreateTodoInput, UpdateTodoInput } from "../../use-cases/dtos/todo-dtos.js";
import { presentTodo, presentTodos } from "../presenters/todo-presenter.js";

// HTTP types
export type HttpRequest = {
  params: Record<string, string>;
  body: unknown;
};

export type HttpResponse<T = unknown> = {
  status: number;
  body: T;
};

// Use case dependencies
type TodoUseCases = {
  getAllTodos: () => Promise<any[]>;
  getTodoById: (id: string) => Promise<any>;
  createTodo: (input: CreateTodoInput) => Promise<any>;
  updateTodo: (id: string, input: UpdateTodoInput) => Promise<any>;
  deleteTodo: (id: string) => Promise<any>;
};

// Controller factory
export const createTodoController = (useCases: TodoUseCases) => {
  return {
    getAllTodos: async (): Promise<HttpResponse> => {
      const todos = await useCases.getAllTodos();
      return {
        status: 200,
        body: presentTodos(todos),
      };
    },

    getTodoById: async (req: HttpRequest): Promise<HttpResponse> => {
      const { id } = req.params;
      const result = await useCases.getTodoById(id);

      if (!result.success) {
        return {
          status: result.error.type === "TodoNotFound" ? 404 : 400,
          body: { error: result.error },
        };
      }

      return {
        status: 200,
        body: presentTodo(result.value),
      };
    },

    createTodo: async (req: HttpRequest): Promise<HttpResponse> => {
      const input = req.body as CreateTodoInput;
      const result = await useCases.createTodo(input);

      if (!result.success) {
        return {
          status: 400,
          body: { error: result.error },
        };
      }

      return {
        status: 201,
        body: presentTodo(result.value),
      };
    },

    updateTodo: async (req: HttpRequest): Promise<HttpResponse> => {
      const { id } = req.params;
      const input = req.body as UpdateTodoInput;
      const result = await useCases.updateTodo(id, input);

      if (!result.success) {
        return {
          status: result.error.type === "TodoNotFound" ? 404 : 400,
          body: { error: result.error },
        };
      }

      return {
        status: 200,
        body: presentTodo(result.value),
      };
    },

    deleteTodo: async (req: HttpRequest): Promise<HttpResponse> => {
      const { id } = req.params;
      const result = await useCases.deleteTodo(id);

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

export type TodoController = ReturnType<typeof createTodoController>;
