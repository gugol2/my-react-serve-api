import { describe, it, expect, beforeEach } from "vitest";
import { createInMemoryTodoRepository } from "./in-memory-repository.js";
import { Todo } from "../../domain/entities/todo.js";

describe("InMemoryTodoRepository", () => {
  let repository: ReturnType<typeof createInMemoryTodoRepository>;

  const mockTodo: Todo = {
    id: "todo_test_1",
    title: "Test Todo",
    description: "Test description",
    status: "pending",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z"),
  };

  const mockedInitialTodos: Todo[] = [
    {
      id: "todo_seed_1",
      title: "Seed Todo 1",
      description: "This is the first seed todo",
      status: "pending",
      createdAt: new Date("2024-01-01T09:00:00Z"),
      updatedAt: new Date("2024-01-01T09:00:00Z"),
    },
    {
      id: "todo_seed_2",
      title: "Seed Todo 2",
      description: "This is the second seed todo",
      status: "completed",
      createdAt: new Date("2024-01-02T09:00:00Z"),
      updatedAt: new Date("2024-01-02T10:00:00Z"),
    },
  ];

  beforeEach(() => {
    // Create fresh repository for each test
    repository = createInMemoryTodoRepository(mockedInitialTodos);
  });

  describe("findAll", () => {
    it("should return initial seed data", async () => {
      const todos = await repository.findAll();

      expect(Array.isArray(todos)).toBe(true);
      expect(todos.length).toBe(mockedInitialTodos.length);
      expect(todos[0]).toHaveProperty("id");
      expect(todos[0]).toHaveProperty("title");
      expect(todos[0]).toHaveProperty("status");
    });

    it("should return all saved todos", async () => {
      await repository.save(mockTodo);
      const todos = await repository.findAll();

      expect(todos.length).toBe(mockedInitialTodos.length + 1);
      const found = todos.find((t) => t.id === mockTodo.id);
      expect(found).toBeDefined();
    });

    it("should return empty array-like result after deleting all todos", async () => {
      const initialTodos = await repository.findAll();

      // Delete all initial todos
      for (const todo of initialTodos) {
        await repository.delete(todo.id);
      }

      const todos = await repository.findAll();
      expect(todos.length).toBe(0);
    });
  });

  describe("findById", () => {
    it("should find existing todo by id", async () => {
      await repository.save(mockTodo);
      const result = await repository.findById(mockTodo.id);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.id).toBe(mockTodo.id);
        expect(result.value.title).toBe(mockTodo.title);
      }
    });

    it("should return error for non-existent id", async () => {
      const result = await repository.findById("non_existent_id");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.type).toBe("TodoNotFound");
      }
      if (!result.success && result.error.type === "TodoNotFound") {
        expect(result.error.id).toBe("non_existent_id");
      }
    });

    it("should find one of the seeded todos", async () => {
      const todos = await repository.findAll();
      const firstTodo = todos[0];

      const result = await repository.findById(firstTodo.id);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value).toEqual(firstTodo);
      }
    });
  });

  describe("save", () => {
    it("should save a new todo", async () => {
      const savedTodo = await repository.save(mockTodo);

      expect(savedTodo).toEqual(mockTodo);

      const result = await repository.findById(mockTodo.id);
      expect(result.success).toBe(true);
    });

    it("should overwrite existing todo with same id", async () => {
      await repository.save(mockTodo);

      const updatedTodo = {
        ...mockTodo,
        title: "Updated Title",
      };

      await repository.save(updatedTodo);

      const result = await repository.findById(mockTodo.id);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.title).toBe("Updated Title");
      }
    });

    it("should persist multiple todos", async () => {
      const todo1 = { ...mockTodo, id: "todo_1" };
      const todo2 = { ...mockTodo, id: "todo_2", title: "Second Todo" };

      await repository.save(todo1);
      await repository.save(todo2);

      const todos = await repository.findAll();
      const savedIds = todos.map((t) => t.id);

      expect(savedIds).toContain("todo_1");
      expect(savedIds).toContain("todo_2");
    });
  });

  describe("update", () => {
    it("should update existing todo", async () => {
      await repository.save(mockTodo);

      const updatedTodo = {
        ...mockTodo,
        title: "Updated Title",
        status: "completed" as const,
      };

      const result = await repository.update(mockTodo.id, updatedTodo);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.title).toBe("Updated Title");
        expect(result.value.status).toBe("completed");
      }
    });

    it("should return error when updating non-existent todo", async () => {
      const result = await repository.update("non_existent_id", mockTodo);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.type).toBe("TodoNotFound");
        if (result.error.type === "TodoNotFound") {
          expect(result.error.id).toBe("non_existent_id");
        }
      }
    });

    it("should persist the update", async () => {
      await repository.save(mockTodo);

      const updatedTodo = { ...mockTodo, title: "New Title" };
      await repository.update(mockTodo.id, updatedTodo);

      const result = await repository.findById(mockTodo.id);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.title).toBe("New Title");
      }
    });
  });

  describe("delete", () => {
    it("should delete existing todo", async () => {
      await repository.save(mockTodo);

      const deleteResult = await repository.delete(mockTodo.id);
      expect(deleteResult.success).toBe(true);

      const findResult = await repository.findById(mockTodo.id);
      expect(findResult.success).toBe(false);
    });

    it("should return error when deleting non-existent todo", async () => {
      const result = await repository.delete("non_existent_id");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.type).toBe("TodoNotFound");
        if (result.error.type === "TodoNotFound") {
          expect(result.error.id).toBe("non_existent_id");
        }
      }
    });

    it("should remove todo from findAll results", async () => {
      await repository.save(mockTodo);

      let todos = await repository.findAll();
      const initialCount = todos.length;

      await repository.delete(mockTodo.id);

      todos = await repository.findAll();
      expect(todos.length).toBe(initialCount - 1);
      expect(todos.find((t) => t.id === mockTodo.id)).toBeUndefined();
    });
  });

  describe("persistence across operations", () => {
    it("should maintain data integrity across multiple operations", async () => {
      // Save
      await repository.save(mockTodo);

      // Update
      const updatedTodo = { ...mockTodo, title: "Updated" };
      await repository.update(mockTodo.id, updatedTodo);

      // Verify
      const result = await repository.findById(mockTodo.id);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.title).toBe("Updated");
      }

      // Delete
      await repository.delete(mockTodo.id);

      // Verify deletion
      const deletedResult = await repository.findById(mockTodo.id);
      expect(deletedResult.success).toBe(false);
    });
  });
});
