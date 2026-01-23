export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority?: "low" | "medium" | "high" | "";
}

export type Filter = "all" | "active" | "completed";
export type Priority = "low" | "medium" | "high" | "";
export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, priority: Priority) => Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}
export interface PriorityColors {
  high: string;
  medium: string;
  low: string;
}
