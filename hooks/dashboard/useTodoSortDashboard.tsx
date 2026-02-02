import { useTodos } from "../Todo/TodoItem";
import { useDaysLeft } from "../Todo/useTodoDateConversion";
import { PRIORITY_RANK } from "../Todo/useTodoSort";
export function useTodoSortDasboard() {
  const { todos } = useTodos();

  const { calculateDaysLeft } = useDaysLeft();

  const sortedTodos = todos
    .filter((todo) => !todo.completed)
    .sort((a, b) => {
      const aDays = a.dueDate ? calculateDaysLeft(a.dueDate) : Infinity;
      const bDays = b.dueDate ? calculateDaysLeft(b.dueDate) : Infinity;

      if (aDays < 0 && bDays >= 0) return -1;
      if (bDays < 0 && aDays >= 0) return 1;
      if (aDays < 0 && bDays < 0) return aDays - bDays;

      if (aDays === 0 && bDays !== 0) return -1;
      if (bDays === 0 && aDays !== 0) return 1;

      if (aDays === bDays) {
        return (
          PRIORITY_RANK[b.priority || ""] - PRIORITY_RANK[a.priority || ""]
        );
      }

      return aDays - bDays;
    })
    .slice(0, 3);
  return { sortedTodos };
}
