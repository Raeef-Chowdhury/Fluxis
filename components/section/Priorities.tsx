"use client";
import { PrioritiesCard } from "@/components/cards/PrioritiesCard";
import { IncompletePriorities } from "@/components/cards/IncompletePriorities";
import { EmptyPriorities } from "../cards/EmptyPriorities";
import { useTodos } from "@/hooks/Todo/TodoItem";
import { PRIORITY_RANK } from "@/hooks/Todo/useTodoSort";
import { useDaysLeft } from "@/hooks/Todo/useTodoDateConversion";

function Priorities() {
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

  const priorityColors = {
    high: {
      border: "border-high-priority",
      bg: "bg-high-priority/20",
      text: "text-high-priority-shade",
      progress: "bg-high-priority",
    },
    medium: {
      border: "border-med-priority",
      bg: "bg-med-priority/20",
      text: "text-med-priority-shade",
      progress: "bg-med-priority",
    },
    low: {
      border: "border-low-priority",
      bg: "bg-low-priority/20",
      text: "text-low-priority-shade",
      progress: "bg-low-priority",
    },
    "": {
      border: "border-none",
      bg: "",
      text: "",
      progress: "",
    },
  };

  return (
    <section className="mt-32 w-full max-w-[85vw] mx-auto">
      <h2 className="text-[1.8rem] font-semibold tracking-tight text-white text-left">
        Your Top Priorities
      </h2>
      <div className="grid grid-cols-3 gap-12 mt-[1.6rem] items-start">
        {sortedTodos.map((todo) => {
          const colors = priorityColors[todo.priority || ""];
          return <PrioritiesCard key={todo.id} colors={colors} todo={todo} />;
        })}
        {sortedTodos.length < 3 && sortedTodos.length > 0 && (
          <IncompletePriorities />
        )}
        {sortedTodos.length < 1 && <EmptyPriorities />}
      </div>
    </section>
  );
}

export default Priorities;
