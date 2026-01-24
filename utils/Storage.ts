import { Todo } from "@/Types/TodoItemTypes";
export function LoadTodo(): Todo[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const stored = localStorage.getItem("todopage.todos");
    return stored ? JSON.parse(stored) : [];
  } catch {
    console.error("Failed to load todos from localStorage");
    return [];
  }
}
export function saveTodos(todos: Todo[]) {
  try {
    localStorage.setItem("todopage.todos", JSON.stringify(todos));
  } catch {
    console.error("Failed to save todos to localStorage");
  }
}
