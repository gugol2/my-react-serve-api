import { describe, it, expect } from "vitest";
import { generateId } from "./generate-id.js";

describe("generateId", () => {
  it("should generate a string ID", () => {
    const id = generateId();
    expect(typeof id).toBe("string");
  });

  it("should generate an ID with the correct prefix", () => {
    const id = generateId();
    expect(id).toMatch(/^todo_/);
  });

  it("should generate unique IDs", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it("should generate IDs with timestamp and random components", () => {
    const id = generateId();
    // Format: todo_{timestamp}_{random}
    const parts = id.split("_");
    expect(parts).toHaveLength(3);
    expect(parts[0]).toBe("todo");
    expect(parts[1]).toMatch(/^\d+$/); // timestamp is numeric
    expect(parts[2].length).toBeGreaterThan(0); // random part exists
  });

  it("should generate multiple unique IDs in sequence", () => {
    const ids = Array.from({ length: 100 }, () => generateId());
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(100);
  });

  it("should always return a TodoId type", () => {
    const id = generateId();
    // Type check - should compile without errors
    const todoId: string = id;
    expect(todoId).toBeDefined();
  });
});
