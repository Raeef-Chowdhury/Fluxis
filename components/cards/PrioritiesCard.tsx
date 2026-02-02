import { PriorityColors } from "@/Data/MockPriorities";
import { Todo } from "@/Types/TodoItemTypes";
import { useDaysLeft } from "@/hooks/Todo/useTodoDateConversion";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

export function PrioritiesCard({
  colors,
  todo,
}: {
  colors: PriorityColors;
  todo: Todo;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getDaysLeftText, calculateDaysLeft, isOverdue, getDaysLeftStyles } =
    useDaysLeft();
  const daysLeft = todo.dueDate ? calculateDaysLeft(todo.dueDate) : null;

  return (
    <div
      key={todo.id}
      className={`border-l-2 flex flex-col gap-4 ${colors.border} bg-secondary/10 rounded-lg p-6 hover:bg-secondary/20 transition-all duration-200 cursor-pointer relative group ${
        isExpanded ? "z-10" : ""
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {todo.priority && (
        <span
          className={`absolute top-4 right-4 uppercase text-xs px-3 py-1.5 ${colors.bg} ${colors.text} rounded-md font-semibold whitespace-nowrap`}
        >
          {todo.priority}
        </span>
      )}

      <div className="pr-20">
        <h3
          className={`text-xl mb-8 font-semibold text-white leading-tight capitalize ${
            isExpanded ? "" : "line-clamp-2"
          } transition-all duration-200`}
          title={todo.title}
        >
          {todo.title}
        </h3>
      </div>

      <div className="flex items-center flex-wrap gap-3 text-sm">
        {todo.tags && todo.tags.length > 1 && (
          <>
            {todo.tags
              .slice(0, isExpanded ? undefined : 8)
              .map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs ${tag.length > 50 ? "truncate" : ""} px-2.5 py-1 capitalize bg-secondary/20 text-accent/70 rounded font-medium`}
                >
                  {tag}
                </span>
              ))}
            {!isExpanded && todo.tags.length > 2 && (
              <span className="text-xs text-gray-500 font-medium">
                +{todo.tags.length - 2}
              </span>
            )}
          </>
        )}

        {daysLeft !== null && (
          <div className="flex items-center gap-1.5 ml-auto">
            {isOverdue(daysLeft) && (
              <TriangleAlert className="w-4 h-4 text-high-priority" />
            )}
            <span
              className={`text-xs font-medium px-3 py-1 rounded-md ${getDaysLeftStyles(daysLeft)} ${
                isOverdue(daysLeft)
                  ? "bg-high-priority/10 text-high-priority"
                  : "bg-secondary/20 text-gray-400"
              }`}
            >
              {getDaysLeftText(daysLeft)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
