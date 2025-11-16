import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createTodo, mergeTodoUpdate } from "./todo-domain-service.js";
import { Todo } from "../entities/todo.js";

describe("createTodo", () => {
  beforeEach(() => {
    // Mock Date to get consistent timestamps
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T10:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create a todo with valid input", () => {
    const input = {
      title: "Test Todo",
      description: "Test description",
    };

    const result = createTodo(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.title).toBe("Test Todo");
      expect(result.value.description).toBe("Test description");
      expect(result.value.status).toBe("pending");
      expect(result.value.id).toMatch(/^todo_/);
      expect(result.value.createdAt).toEqual(new Date("2024-01-15T10:00:00Z"));
      expect(result.value.updatedAt).toEqual(new Date("2024-01-15T10:00:00Z"));
    }
  });

  it("should trim whitespace from title and description", () => {
    const input = {
      title: "  Test Todo  ",
      description: "  Test description  ",
    };

    const result = createTodo(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.title).toBe("Test Todo");
      expect(result.value.description).toBe("Test description");
    }
  });

  it("should fail with empty title", () => {
    const input = {
      title: "",
      description: "Test description",
    };

    const result = createTodo(input);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.type).toBe("ValidationError");
      expect(result.error.message).toBe("Title cannot be empty");
    }
  });

  it("should fail with title longer than 100 characters", () => {
    const input = {
      title: "a".repeat(101),
      description: "Test description",
    };

    const result = createTodo(input);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.type).toBe("ValidationError");
      expect(result.error.message).toBe("Title must be less than 100 characters");
    }
  });

  it("should fail with description longer than 500 characters", () => {
    const input = {
      title: "Test Todo",
      description: "a".repeat(501),
    };

    const result = createTodo(input);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.type).toBe("ValidationError");
      expect(result.error.message).toBe("Description must be less than 500 characters");
    }
  });

  it("should create todo with empty description", () => {
    const input = {
      title: "Test Todo",
      description: "",
    };

    const result = createTodo(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.description).toBe("");
    }
  });

  it("should generate unique IDs for different todos", () => {
    const input = {
      title: "Test Todo",
      description: "Test description",
    };

    const result1 = createTodo(input);
    const result2 = createTodo(input);

    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
    if (result1.success && result2.success) {
      expect(result1.value.id).not.toBe(result2.value.id);
    }
  });
});

describe("mergeTodoUpdate", () => {
  const existingTodo: Todo = {
    id: "todo_1",
    title: "Original Title",
    description: "Original description",
    status: "pending",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z"),
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T10:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should update only the title", () => {
    const update = { title: "New Title" };
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.title).toBe("New Title");
      expect(result.value.description).toBe("Original description");
      expect(result.value.status).toBe("pending");
      expect(result.value.updatedAt).toEqual(new Date("2024-01-15T10:00:00Z"));
      expect(result.value.createdAt).toEqual(existingTodo.createdAt);
    }
  });

  it("should update only the description", () => {
    const update = { description: "New description" };
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.title).toBe("Original Title");
      expect(result.value.description).toBe("New description");
      expect(result.value.status).toBe("pending");
    }
  });

  it("should update only the status", () => {
    const update = { status: "completed" as const };
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.title).toBe("Original Title");
      expect(result.value.description).toBe("Original description");
      expect(result.value.status).toBe("completed");
    }
  });

  it("should update multiple fields at once", () => {
    const update = {
      title: "New Title",
      description: "New description",
      status: "completed" as const,
    };
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.title).toBe("New Title");
      expect(result.value.description).toBe("New description");
      expect(result.value.status).toBe("completed");
    }
  });

  it("should trim whitespace from updated title", () => {
    const update = { title: "  New Title  " };
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.title).toBe("New Title");
    }
  });

  it("should trim whitespace from updated description", () => {
    const update = { description: "  New description  " };
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.description).toBe("New description");
    }
  });

  it("should fail with empty title", () => {
    const update = { title: "" };
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.type).toBe("ValidationError");
      expect(result.error.message).toBe("Title cannot be empty");
    }
  });

  it("should fail with title longer than 100 characters", () => {
    const update = { title: "a".repeat(101) };
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.type).toBe("ValidationError");
    }
  });

  it("should fail with description longer than 500 characters", () => {
    const update = { description: "a".repeat(501) };
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.type).toBe("ValidationError");
    }
  });

  it("should preserve all original fields when no updates provided", () => {
    const update = {};
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.id).toBe(existingTodo.id);
      expect(result.value.title).toBe(existingTodo.title);
      expect(result.value.description).toBe(existingTodo.description);
      expect(result.value.status).toBe(existingTodo.status);
      expect(result.value.createdAt).toEqual(existingTodo.createdAt);
      expect(result.value.updatedAt).toEqual(new Date("2024-01-15T10:00:00Z"));
    }
  });

  it("should always update the updatedAt timestamp", () => {
    const update = { title: "New Title" };
    const result = mergeTodoUpdate(existingTodo, update);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.updatedAt).not.toEqual(existingTodo.updatedAt);
      expect(result.value.updatedAt).toEqual(new Date("2024-01-15T10:00:00Z"));
    }
  });
});
