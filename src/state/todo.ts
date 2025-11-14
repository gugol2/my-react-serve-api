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

const findTodoById = (id: number) => {
  return todos.find((todo) => todo.id === id);
};

const createNewTodo = (title: string) => {
  const newTodo = {
    id: todos.length + 1,
    title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const findTodoIndexById = (id: string) => {
  return todos.findIndex((todo) => todo.id === parseInt(id));
};

const editTodo = (todoIndex: number, body: any) => {
  todos[todoIndex] = { ...todos[todoIndex], ...body };
};

const deleteTodo = (todoIndex: number) => {
  todos.splice(todoIndex, 1);
};

export {
  todos,
  findTodoById,
  createNewTodo,
  findTodoIndexById,
  editTodo,
  deleteTodo,
};
