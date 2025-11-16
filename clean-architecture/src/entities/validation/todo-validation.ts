import { DomainError, Result } from "../errors/domain-errors.js";

// Domain validation functions
export const validateTitle = (title: string): Result<string, DomainError> => {
  if (!title || title.trim().length === 0) {
    return {
      success: false,
      error: { type: "ValidationError", message: "Title cannot be empty" },
    };
  }
  if (title.length > 100) {
    return {
      success: false,
      error: {
        type: "ValidationError",
        message: "Title must be less than 100 characters",
      },
    };
  }
  return { success: true, value: title.trim() };
};

export const validateDescription = (
  description: string
): Result<string, DomainError> => {
  if (description.length > 500) {
    return {
      success: false,
      error: {
        type: "ValidationError",
        message: "Description must be less than 500 characters",
      },
    };
  }
  return { success: true, value: description.trim() };
};
