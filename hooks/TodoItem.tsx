"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { Priority, Todo, TodoContextType } from "@/Types/TodoItemTypes";
import { LoadTodo, saveTodos } from "@/utils/Storage";

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => LoadTodo());
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);
  function addTodo(
    title: string,
    priority: Priority,
    dueDate: string,
    tags: string[],
  ) {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
      priority: priority,
      dueDate: dueDate,
      tags: tags,
    };
    setTodos((prev) => [...prev, newTodo]);
    return newTodo;
  }
  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }
  function deleteTodo(id: string) {
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
