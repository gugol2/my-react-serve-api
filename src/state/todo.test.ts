import { describe, it, expect, beforeEach } from "vitest";
import type { Todo } from "../domain/todo.js";
import { createInMemoryTodoRepository } from "../infrastructure/todoRepository.js";
import { createTodoService } from "./todo.js";

const mockedTodos: Todo[] = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Try react-serve", completed: false },
];

let getAllTodos: ReturnType<typeof createTodoService>["getAllTodos"];
let findTodoById: ReturnType<typeof createTodoService>["findTodoById"];
let createNewTodo: ReturnType<typeof createTodoService>["createNewTodo"];
let findTodoIndexById: ReturnType<typeof createTodoService>["findTodoIndexById"];
let editTodo: ReturnType<typeof createTodoService>["editTodo"];
let deleteTodo: ReturnType<typeof createTodoService>["deleteTodo"];

// Reset the todos array before each test
beforeEach(() => {
  // Create fresh test data
  const testTodos = [...mockedTodos];

  // Create repository and service with test data
  const repository = createInMemoryTodoRepository(testTodos);
  const service = createTodoService(repository);

  getAllTodos = service.getAllTodos;
  findTodoById = service.findTodoById;
  createNewTodo = service.createNewTodo;
  findTodoIndexById = service.findTodoIndexById;
  editTodo = service.editTodo;
  deleteTodo = service.deleteTodo;
});

describe("getAllTodos", () => {
  it("should return all todos", () => {
    const todos = getAllTodos();
    expect(Array.isArray(todos)).toBe(true);
    expect(todos.length).toBeGreaterThan(0);
    expect(todos[0]).toHaveProperty("id");
    expect(todos[0]).toHaveProperty("title");
    expect(todos[0]).toHaveProperty("completed");
  });
});

describe("findTodoById", () => {
  it("should return todo when id exists", () => {
    const result = findTodoById(1);
    expect(result).toBeDefined();
    expect(result?.title).toBe("Learn React");
    expect(result?.completed).toBe(false);
  });

  it("should return todo for second id", () => {
    const result = findTodoById(2);
    expect(result).toBeDefined();
    expect(result?.title).toBe("Try react-serve");
    expect(result?.completed).toBe(false);
  });

  it("should return undefined when id does not exist", () => {
    const result = findTodoById(999);
    expect(result).toBeUndefined();
  });

  it("should return undefined for negative id", () => {
    const result = findTodoById(-1);
    expect(result).toBeUndefined();
  });

  it("should return undefined for zero id", () => {
    const result = findTodoById(0);
    expect(result).toBeUndefined();
  });
});

describe("createNewTodo", () => {
  let initialLength: number;

  beforeEach(() => {
    initialLength = getAllTodos().length;
  });

  it("should create a new todo with correct properties", () => {
    const title = "Test todo";
    const newTodo = createNewTodo(title);

    expect(newTodo).toBeDefined();
    expect(newTodo.title).toBe(title);
    expect(newTodo.completed).toBe(false);
    expect(newTodo.id).toBe(initialLength + 1);
  });

  it("should add the new todo to the todos array", () => {
    const title = "Another test todo";
    createNewTodo(title);

    const todos = getAllTodos();
    expect(todos.length).toBe(initialLength + 1);
    expect(todos[todos.length - 1].title).toBe(title);
  });

  it("should handle empty title", () => {
    const newTodo = createNewTodo("");

    expect(newTodo.title).toBe("");
    expect(newTodo.completed).toBe(false);
  });
});

describe("findTodoIndexById", () => {
  it("should return correct index for existing todo", () => {
    const index = findTodoIndexById("1");
    expect(index).toBeGreaterThanOrEqual(0);
    const todos = getAllTodos();
    expect(todos[index].id).toBe(1);
  });

  it("should return correct index for second todo", () => {
    const index = findTodoIndexById("2");
    expect(index).toBeGreaterThanOrEqual(0);
    const todos = getAllTodos();
    expect(todos[index].id).toBe(2);
  });

  it("should return -1 when id does not exist", () => {
    const index = findTodoIndexById("999");
    expect(index).toBe(-1);
  });

  it("should parse string id to number", () => {
    const index = findTodoIndexById("1");
    expect(index).not.toBe(-1);
  });
});

describe("editTodo", () => {
  it("should update todo title", () => {
    const index = findTodoIndexById("1");
    const newTitle = "Updated title";

    editTodo(index, { title: newTitle });

    const todos = getAllTodos();
    expect(todos[index].title).toBe(newTitle);
  });

  it("should update todo completed status", () => {
    const index = findTodoIndexById("1");

    editTodo(index, { completed: true });

    const todos = getAllTodos();
    expect(todos[index].completed).toBe(true);
  });

  it("should update multiple properties", () => {
    const index = findTodoIndexById("1");
    const updates = { title: "New title", completed: true };

    editTodo(index, updates);

    const todos = getAllTodos();
    expect(todos[index].title).toBe(updates.title);
    expect(todos[index].completed).toBe(updates.completed);
  });

  it("should preserve unchanged properties", () => {
    const index = findTodoIndexById("1");
    const todos = getAllTodos();
    const originalId = todos[index].id;

    editTodo(index, { title: "Changed title" });

    expect(todos[index].id).toBe(originalId);
  });
});

describe("deleteTodo", () => {
  it("should remove todo at given index", () => {
    const todos = getAllTodos();
    const initialLength = todos.length;
    const index = findTodoIndexById("1");
    const todoId = todos[index].id;

    deleteTodo(index);

    expect(todos.length).toBe(initialLength - 1);
    expect(findTodoById(todoId)).toBeUndefined();
  });

  it("should maintain array integrity after deletion", () => {
    const todos = getAllTodos();
    const initialLength = todos.length;
    const lastTodo = todos[todos.length - 1];
    const index = 0;

    deleteTodo(index);

    expect(todos.length).toBe(initialLength - 1);
    expect(todos[todos.length - 1]).toEqual(lastTodo);
  });
});
