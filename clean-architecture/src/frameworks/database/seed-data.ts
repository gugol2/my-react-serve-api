import { Todo } from "../../use-cases/dtos/todo-dtos.js";

// Seed data for initial todos
export const initialTodos: Todo[] = [
  {
    id: "todo_1",
    title: "Learn Hexagonal Architecture",
    description: "Study the principles of ports and adapters",
    status: "pending",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z"),
  },
  {
    id: "todo_2",
    title: "Build a REST API",
    description: "Create a clean architecture REST API with TypeScript",
    status: "completed",
    createdAt: new Date("2024-01-02T10:00:00Z"),
    updatedAt: new Date("2024-01-02T14:00:00Z"),
  },
];
