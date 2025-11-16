import { beforeEach, describe, expect, it, vi } from "vitest";
import { Todo } from "../../domain/entities/todo.js";
import { DomainError } from "../../domain/errors/domain-errors.js";
import { TodoRepository } from "../ports/todo-repository.js";
import { createTodoService } from "./todo-service-impl.js";

describe("TodoService", () => {
  // Mock repository
  let mockRepository: TodoRepository;
  let service: ReturnType<typeof createTodoService>;

  const mockTodo: Todo = {
    id: "todo_1",
    title: "Test Todo",
    description: "Test description",
    status: "pending",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z"),
  };

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    // Create service with mock repository
    service = createTodoService(mockRepository);
  });

  describe("getAllTodos", () => {
    it("should return all todos from repository", async () => {
      const todos = [mockTodo];
      vi.mocked(mockRepository.findAll).mockResolvedValue(todos);

      const result = await service.getAllTodos();

      expect(result).toEqual(todos);
      expect(mockRepository.findAll).toHaveBeenCalledOnce();
    });

    it("should return empty array when no todos exist", async () => {
      vi.mocked(mockRepository.findAll).mockResolvedValue([]);

      const result = await service.getAllTodos();

      expect(result).toEqual([]);
      expect(mockRepository.findAll).toHaveBeenCalledOnce();
    });
  });

  describe("getTodoById", () => {
    it("should return todo when it exists", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue({
        success: true,
        value: mockTodo,
      });

      const result = await service.getTodoById("todo_1");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value).toEqual(mockTodo);
      }
      expect(mockRepository.findById).toHaveBeenCalledWith("todo_1");
    });

    it("should return error when todo not found", async () => {
      const notFoundError: DomainError = {
        type: "TodoNotFound",
        id: "todo_999",
      };
      vi.mocked(mockRepository.findById).mockResolvedValue({
        success: false,
        error: notFoundError,
      });

      const result = await service.getTodoById("todo_999");

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.type).toBe("TodoNotFound");
      }
      if (!result.success && result.error.type === "TodoNotFound") {
        expect(result.error.id).toBe("todo_999");
      }
    });
  });

  describe("createTodo", () => {
    it("should create and save a valid todo", async () => {
      const input = {
        title: "New Todo",
        description: "New description",
      };

      vi.mocked(mockRepository.save).mockImplementation(async (todo) => todo);

      const result = await service.createTodo(input);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.title).toBe("New Todo");
        expect(result.value.description).toBe("New description");
        expect(result.value.status).toBe("pending");
      }
      expect(mockRepository.save).toHaveBeenCalledOnce();
    });

    it("should return validation error for invalid title", async () => {
      const input = {
        title: "",
        description: "Test description",
      };

      const result = await service.createTodo(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.type).toBe("ValidationError");
      }
      if (!result.success && result.error.type === "ValidationError") {
        expect(result.error.message).toBe("Title cannot be empty");
      }
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should return validation error for title too long", async () => {
      const input = {
        title: "a".repeat(101),
        description: "Test description",
      };

      const result = await service.createTodo(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.type).toBe("ValidationError");
      }
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should return validation error for description too long", async () => {
      const input = {
        title: "Valid title",
        description: "a".repeat(501),
      };

      const result = await service.createTodo(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.type).toBe("ValidationError");
      }
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should trim whitespace from input", async () => {
      const input = {
        title: "  Trimmed Title  ",
        description: "  Trimmed description  ",
      };

      vi.mocked(mockRepository.save).mockImplementation(async (todo) => todo);

      const result = await service.createTodo(input);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.title).toBe("Trimmed Title");
        expect(result.value.description).toBe("Trimmed description");
      }
    });
  });

  describe("updateTodo", () => {
    it("should update existing todo", async () => {
      const existingTodo = { ...mockTodo };
      const update = { title: "Updated Title" };

      vi.mocked(mockRepository.findById).mockResolvedValue({
        success: true,
        value: existingTodo,
      });

      vi.mocked(mockRepository.update).mockImplementation(
        async (_id, todo) => ({
          success: true,
          value: todo,
        })
      );

      const result = await service.updateTodo("todo_1", update);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.title).toBe("Updated Title");
        expect(result.value.description).toBe(existingTodo.description);
      }
      expect(mockRepository.findById).toHaveBeenCalledWith("todo_1");
      expect(mockRepository.update).toHaveBeenCalledOnce();
    });

    it("should return error when todo not found", async () => {
      const notFoundError: DomainError = {
        type: "TodoNotFound",
        id: "todo_999",
      };
      vi.mocked(mockRepository.findById).mockResolvedValue({
        success: false,
        error: notFoundError,
      });

      const result = await service.updateTodo("todo_999", { title: "Updated" });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.type).toBe("TodoNotFound");
      }
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it("should return validation error for invalid update", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue({
        success: true,
        value: mockTodo,
      });

      const result = await service.updateTodo("todo_1", { title: "" });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.type).toBe("ValidationError");
      }
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it("should update status to completed", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue({
        success: true,
        value: mockTodo,
      });

      vi.mocked(mockRepository.update).mockImplementation(
        async (_id, todo) => ({
          success: true,
          value: todo,
        })
      );

      const result = await service.updateTodo("todo_1", {
        status: "completed",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.status).toBe("completed");
      }
    });

    it("should update multiple fields at once", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue({
        success: true,
        value: mockTodo,
      });

      vi.mocked(mockRepository.update).mockImplementation(
        async (_id, todo) => ({
          success: true,
          value: todo,
        })
      );

      const result = await service.updateTodo("todo_1", {
        title: "New Title",
        description: "New description",
        status: "completed",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.title).toBe("New Title");
        expect(result.value.description).toBe("New description");
        expect(result.value.status).toBe("completed");
      }
    });
  });

  describe("deleteTodo", () => {
    it("should delete existing todo", async () => {
      vi.mocked(mockRepository.delete).mockResolvedValue({
        success: true,
        value: undefined,
      });

      const result = await service.deleteTodo("todo_1");

      expect(result.success).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith("todo_1");
    });

    it("should return error when todo not found", async () => {
      const notFoundError: DomainError = {
        type: "TodoNotFound",
        id: "todo_999",
      };
      vi.mocked(mockRepository.delete).mockResolvedValue({
        success: false,
        error: notFoundError,
      });

      const result = await service.deleteTodo("todo_999");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.type).toBe("TodoNotFound");
      }
    });
  });
});
