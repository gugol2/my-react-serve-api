// ============================================
// DOMAIN SERVICES - Business logic
// ============================================

import {
  CreateTodoInput,
  Todo,
  TodoId,
  UpdateTodoInput,
} from "../entities/todo.js";
import { DomainError, Result } from "../errors/domain-errors.js";
import {
  validateDescription,
  validateTitle,
} from "../validation/todo-validation.js";

// Factory function to create a new Todo
export const createTodo = (
  input: CreateTodoInput
): Result<Todo, DomainError> => {
  const titleValidation = validateTitle(input.title);
  if (!titleValidation.success) {
    return titleValidation;
  }

  const descValidation = validateDescription(input.description);
  if (!descValidation.success) {
    return descValidation;
  }

  const now = new Date();
  return {
    success: true,
    value: {
      id: generateId(),
      title: titleValidation.value,
      description: descValidation.value,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    },
  };
};

// Helper to generate IDs (in real app, use UUID library)
const generateId = (): TodoId => {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Function to merge updates into existing todo
export const mergeTodoUpdate = (
  existing: Todo,
  update: UpdateTodoInput
): Result<Todo, DomainError> => {
  // Validate title if provided
  if (update.title !== undefined) {
    const titleValidation = validateTitle(update.title);
    if (!titleValidation.success) {
      return titleValidation;
    }
  }

  // Validate description if provided
  if (update.description !== undefined) {
    const descValidation = validateDescription(update.description);
    if (!descValidation.success) {
      return descValidation;
    }
  }

  return {
    success: true,
    value: {
      ...existing,
      title: update.title !== undefined ? update.title.trim() : existing.title,
      description:
        update.description !== undefined
          ? update.description.trim()
          : existing.description,
      status: update.status !== undefined ? update.status : existing.status,
      updatedAt: new Date(),
    },
  };
};
