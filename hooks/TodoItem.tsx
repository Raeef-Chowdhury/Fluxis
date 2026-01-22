"use client";
import { useState } from "react";
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function useTodos() {
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
  return { todos, addTodo, toggleTodo, deleteTodo };
}
