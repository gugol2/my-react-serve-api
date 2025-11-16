// Domain entities and types
export type TodoId = string;

export type TodoStatus = "pending" | "completed";

export type Todo = {
  readonly id: TodoId;
  readonly title: string;
  readonly description: string;
  readonly status: TodoStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type CreateTodoInput = {
  readonly title: string;
  readonly description: string;
};

export type UpdateTodoInput = {
  readonly title?: string;
  readonly description?: string;
  readonly status?: TodoStatus;
};
