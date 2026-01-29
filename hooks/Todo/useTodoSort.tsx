import { Todo, Priority } from "@/Types/TodoItemTypes";
import { useMemo } from "react";

export const PRIORITY_RANK: Record<Priority | "", number> = {
  high: 3,
  medium: 2,
  "": 1,
  low: 0,
};
export function useTodoSort({
  todos,
  sortBy,
}: {
  todos: Todo[];
  sortBy: string;
}) {
  return useMemo(() => {
    return [...todos].sort((a, b) => {
      if (a.completed !== b.completed) {
        return Number(a.completed) - Number(b.completed);
      }

      switch (sortBy) {
        case "dueDate": {
          const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          return dateA - dateB;
        }
        case "prioritySort":
          return (
            PRIORITY_RANK[b.priority || ""] - PRIORITY_RANK[a.priority || ""]
          );
        case "alphabetSort":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [todos, sortBy]);
}
