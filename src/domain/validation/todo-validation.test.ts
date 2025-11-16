import { describe, it, expect } from "vitest";
import { validateTitle, validateDescription } from "./todo-validation.js";

describe("validateTitle", () => {
  it("should return success for valid title", () => {
    const result = validateTitle("Valid Title");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe("Valid Title");
    }
  });

  it("should trim whitespace from title", () => {
    const result = validateTitle("  Trimmed Title  ");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe("Trimmed Title");
    }
  });

  it("should fail for empty title", () => {
    const result = validateTitle("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.type).toBe("ValidationError");
      expect(result.error.message).toBe("Title cannot be empty");
    }
  });

  it("should fail for whitespace-only title", () => {
    const result = validateTitle("   ");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.type).toBe("ValidationError");
      expect(result.error.message).toBe("Title cannot be empty");
    }
  });

  it("should fail for title longer than 100 characters", () => {
    const longTitle = "a".repeat(101);
    const result = validateTitle(longTitle);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.type).toBe("ValidationError");
      expect(result.error.message).toBe("Title must be less than 100 characters");
    }
  });

  it("should succeed for title with exactly 100 characters", () => {
    const title = "a".repeat(100);
    const result = validateTitle(title);
    expect(result.success).toBe(true);
  });

  it("should succeed for title with 99 characters", () => {
    const title = "a".repeat(99);
    const result = validateTitle(title);
    expect(result.success).toBe(true);
  });
});

describe("validateDescription", () => {
  it("should return success for valid description", () => {
    const result = validateDescription("Valid description");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe("Valid description");
    }
  });

  it("should trim whitespace from description", () => {
    const result = validateDescription("  Trimmed description  ");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe("Trimmed description");
    }
  });

  it("should allow empty description", () => {
    const result = validateDescription("");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe("");
    }
  });

  it("should fail for description longer than 500 characters", () => {
    const longDescription = "a".repeat(501);
    const result = validateDescription(longDescription);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.type).toBe("ValidationError");
      expect(result.error.message).toBe("Description must be less than 500 characters");
    }
  });

  it("should succeed for description with exactly 500 characters", () => {
    const description = "a".repeat(500);
    const result = validateDescription(description);
    expect(result.success).toBe(true);
  });

  it("should succeed for description with 499 characters", () => {
    const description = "a".repeat(499);
    const result = validateDescription(description);
    expect(result.success).toBe(true);
  });
});
