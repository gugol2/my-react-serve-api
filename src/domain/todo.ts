import { createTodoService } from "../state/todo.js";

// Mock database (in real app, use a real database)
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

let todos: Todo[] = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Try react-serve", completed: false },
];

// Create and export the default todo service instance
export const {
  findTodoById,
  createNewTodo,
  findTodoIndexById,
  editTodo,
  deleteTodo,
  getAllTodos,
} = createTodoService(todos);
