"use client";
import { useState, createContext, useContext } from "react";
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
interface TodoContext {
  todos: Todo[];
  addTodo: (title: string) => Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContext | undefined>(undefined);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  function addTodo(title: string) {
    const newTodo = {
      id: Date.now() + Math.random(),
      title: title,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    return newTodo;
  }
  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }
  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within TodosProvider");
  }
  return context;
}
