import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTodoController } from "./todo-controller.js";
import { TodoService } from "../../application/ports/todo-service.js";
import { Todo } from "../../domain/entities/todo.js";
import { DomainError } from "../../domain/errors/domain-errors.js";

describe("TodoController", () => {
  let mockService: TodoService;
  let controller: ReturnType<typeof createTodoController>;

  const mockTodo: Todo = {
    id: "todo_1",
    title: "Test Todo",
    description: "Test description",
    status: "pending",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z"),
  };

  beforeEach(() => {
    mockService = {
      getAllTodos: vi.fn(),
      getTodoById: vi.fn(),
      createTodo: vi.fn(),
      updateTodo: vi.fn(),
      deleteTodo: vi.fn(),
    };

    controller = createTodoController(mockService);
  });

  describe("getAllTodos", () => {
    it("should return 200 with todos array", async () => {
      const todos = [mockTodo];
      vi.mocked(mockService.getAllTodos).mockResolvedValue(todos);

      const response = await controller.getAllTodos();

      expect(response.status).toBe(200);
      expect(response.body).toEqual(todos);
      expect(mockService.getAllTodos).toHaveBeenCalledOnce();
    });

    it("should return 200 with empty array when no todos", async () => {
      vi.mocked(mockService.getAllTodos).mockResolvedValue([]);

      const response = await controller.getAllTodos();

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("getTodoById", () => {
    it("should return 200 with todo when found", async () => {
      vi.mocked(mockService.getTodoById).mockResolvedValue({
        success: true,
        value: mockTodo,
      });

      const response = await controller.getTodoById({
        params: { id: "todo_1" },
        body: {},
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTodo);
      expect(mockService.getTodoById).toHaveBeenCalledWith("todo_1");
    });

    it("should return 404 when todo not found", async () => {
      const notFoundError: DomainError = {
        type: "TodoNotFound",
        id: "todo_999",
      };
      vi.mocked(mockService.getTodoById).mockResolvedValue({
        success: false,
        error: notFoundError,
      });

      const response = await controller.getTodoById({
        params: { id: "todo_999" },
        body: {},
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: notFoundError });
    });

    it("should return 400 for validation errors", async () => {
      const validationError: DomainError = {
        type: "ValidationError",
        message: "Invalid ID",
      };
      vi.mocked(mockService.getTodoById).mockResolvedValue({
        success: false,
        error: validationError,
      });

      const response = await controller.getTodoById({
        params: { id: "invalid" },
        body: {},
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: validationError });
    });
  });

  describe("createTodo", () => {
    it("should return 201 with created todo on success", async () => {
      const input = {
        title: "New Todo",
        description: "New description",
      };

      vi.mocked(mockService.createTodo).mockResolvedValue({
        success: true,
        value: mockTodo,
      });

      const response = await controller.createTodo({
        params: {},
        body: input,
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockTodo);
      expect(mockService.createTodo).toHaveBeenCalledWith(input);
    });

    it("should return 400 on validation error", async () => {
      const input = {
        title: "",
        description: "Test",
      };

      const validationError: DomainError = {
        type: "ValidationError",
        message: "Title cannot be empty",
      };

      vi.mocked(mockService.createTodo).mockResolvedValue({
        success: false,
        error: validationError,
      });

      const response = await controller.createTodo({
        params: {},
        body: input,
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: validationError });
    });
  });

  describe("updateTodo", () => {
    it("should return 200 with updated todo on success", async () => {
      const update = { title: "Updated Title" };
      const updatedTodo = { ...mockTodo, title: "Updated Title" };

      vi.mocked(mockService.updateTodo).mockResolvedValue({
        success: true,
        value: updatedTodo,
      });

      const response = await controller.updateTodo({
        params: { id: "todo_1" },
        body: update,
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedTodo);
      expect(mockService.updateTodo).toHaveBeenCalledWith("todo_1", update);
    });

    it("should return 404 when todo not found", async () => {
      const notFoundError: DomainError = {
        type: "TodoNotFound",
        id: "todo_999",
      };

      vi.mocked(mockService.updateTodo).mockResolvedValue({
        success: false,
        error: notFoundError,
      });

      const response = await controller.updateTodo({
        params: { id: "todo_999" },
        body: { title: "Updated" },
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: notFoundError });
    });

    it("should return 400 on validation error", async () => {
      const validationError: DomainError = {
        type: "ValidationError",
        message: "Title cannot be empty",
      };

      vi.mocked(mockService.updateTodo).mockResolvedValue({
        success: false,
        error: validationError,
      });

      const response = await controller.updateTodo({
        params: { id: "todo_1" },
        body: { title: "" },
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: validationError });
    });
  });

  describe("deleteTodo", () => {
    it("should return 204 on successful deletion", async () => {
      vi.mocked(mockService.deleteTodo).mockResolvedValue({
        success: true,
        value: undefined,
      });

      const response = await controller.deleteTodo({
        params: { id: "todo_1" },
        body: {},
      });

      expect(response.status).toBe(204);
      expect(response.body).toBeNull();
      expect(mockService.deleteTodo).toHaveBeenCalledWith("todo_1");
    });

    it("should return 404 when todo not found", async () => {
      const notFoundError: DomainError = {
        type: "TodoNotFound",
        id: "todo_999",
      };

      vi.mocked(mockService.deleteTodo).mockResolvedValue({
        success: false,
        error: notFoundError,
      });

      const response = await controller.deleteTodo({
        params: { id: "todo_999" },
        body: {},
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: notFoundError });
    });
  });

  describe("HTTP status code mapping", () => {
    it("should map TodoNotFound to 404", async () => {
      const error: DomainError = { type: "TodoNotFound", id: "test" };
      vi.mocked(mockService.getTodoById).mockResolvedValue({
        success: false,
        error,
      });

      const response = await controller.getTodoById({
        params: { id: "test" },
        body: {},
      });

      expect(response.status).toBe(404);
    });

    it("should map ValidationError to 400", async () => {
      const error: DomainError = {
        type: "ValidationError",
        message: "Invalid input",
      };
      vi.mocked(mockService.createTodo).mockResolvedValue({
        success: false,
        error,
      });

      const response = await controller.createTodo({
        params: {},
        body: {},
      });

      expect(response.status).toBe(400);
    });
  });
});
