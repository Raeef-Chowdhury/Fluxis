import { Todo, Filter } from "@/Types/TodoItemTypes";
import { useMemo } from "react";
export function useTodoFilter({
  todos,
  filter,
}: {
  todos: Todo[];
  filter: Filter;
}) {
  return useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "all") return true;
      if (filter === "completed") return todo.completed;
      if (filter === "active") return !todo.completed;
      return false;
    });
  }, [todos, filter]);
}
