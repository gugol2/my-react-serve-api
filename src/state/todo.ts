// Mock database (in real app, use a real database)
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const createTodoService = (todosArray: Todo[]) => ({
  findTodoById: (id: number) => {
    return todosArray.find((todo) => todo.id === id);
  },

  createNewTodo: (title: string) => {
    const newTodo = {
      id: todosArray.length + 1,
      title,
      completed: false,
    };
    todosArray.push(newTodo);
    return newTodo;
  },

  findTodoIndexById: (id: string) => {
    return todosArray.findIndex((todo) => todo.id === parseInt(id));
  },

  editTodo: (todoIndex: number, body: any) => {
    todosArray[todoIndex] = { ...todosArray[todoIndex], ...body };
  },

  deleteTodo: (todoIndex: number) => {
    todosArray.splice(todoIndex, 1);
  },

  getAllTodos: () => {
    return todosArray;
  },
});
