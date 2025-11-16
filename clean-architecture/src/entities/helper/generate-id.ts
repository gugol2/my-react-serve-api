import { TodoId } from "../entities/todo.js";

// Helper to generate IDs (in real app, use UUID library)
export const generateId = (): TodoId => {
  return `todo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};
