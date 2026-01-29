import { PriorityColors } from "@/Data/MockPriorities";
import { Todo } from "@/Types/TodoItemTypes";
import { useDaysLeft } from "@/hooks/Todo/useTodoDateConversion";
import { TriangleAlert } from "lucide-react";
export function PrioritiesCard({
  colors,
  todo,
}: {
  colors: PriorityColors;
  todo: Todo;
}) {
  const { getDaysLeftText, calculateDaysLeft, isOverdue, getDaysLeftStyles } =
    useDaysLeft();
  const daysLeft = todo.dueDate ? calculateDaysLeft(todo.dueDate) : null;
  console.log(todo.tags);
  return (
    <div
      key={todo.id}
      className={`border-l-2 flex flex-col gap-4 ${colors.border} bg-secondary/10 rounded-lg p-8 hover:bg-secondary/20 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-2xl truncate font-semibold text-white leading-tight capitalize mb-2 flex-1">
          {todo.title}
        </h3>
        {todo.priority && (
          <span
            className={`uppercase text-md px-4 py-2 ${colors.bg} ${colors.text} rounded font-medium whitespace-nowrap`}
          >
            {todo.priority}
          </span>
        )}
      </div>

      <div className="flex items-center truncate flex-wrap gap-6  text-sm text-gray-400 mb-4">
        {todo.tags && todo.tags.length > 1 && (
          <>
            {todo.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-md px-2.5 py-1 bg-secondary/10 text-accent/60 rounded font-medium"
              >
                {tag}
              </span>
            ))}
            <div>⋅</div>
          </>
        )}

        {daysLeft !== null && (
          <>
            {isOverdue(daysLeft) && (
              <TriangleAlert className="w-5 h-5 text-high-priority" />
            )}
            <span
              className={`flex items-center gap-1.5 text-md ${getDaysLeftStyles(daysLeft)} px-4 py-1  ${isOverdue(daysLeft) ? "text-high-priority" : ""}`}
            >
              {getDaysLeftText(daysLeft)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
