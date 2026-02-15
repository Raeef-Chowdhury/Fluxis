import { useState } from "react";
import { PriorityColors } from "@/Types/PrioritiesType";
import { Todo } from "@/Types/TodoItemTypes";
import { useDaysLeft } from "@/hooks/Todo/useTodoDateConversion";
import { TriangleAlert } from "lucide-react";
import { TodoModal } from "../tasks/item/TodoModal";
import { AnimatePresence } from "framer-motion";

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
  const [modalId, setModalId] = useState<null | string>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModalId(null);
    }
  };

  return (
    <>
      <div
        onClick={() => setModalId(todo.id)}
        key={todo.id}
        className={`border-l-2 flex flex-col gap-4 ${colors.border} bg-secondary/25 rounded-lg p-6 hover:bg-secondary/40 transition-all duration-200 cursor-pointer relative group`}
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
            className={`text-xl mb-8 font-semibold text-white leading-tight capitalize line-clamp-2 transition-all duration-200`}
            title={todo.title}
          >
            {todo.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {todo.tags && todo.tags.length > 1 && (
            <>
              {todo.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs ${tag.length > 50 ? "truncate" : ""} px-2.5 py-1 capitalize bg-secondary/20 text-accent/70 rounded font-medium`}
                >
                  {tag}
                </span>
              ))}
              {todo.tags.length > 2 && (
                <span className="text-xs text-gray-500 font-medium">
                  +{todo.tags.length - 2}
                </span>
              )}
            </>
          )}
        </div>
        {daysLeft !== null && (
          <div className="flex items-center justify-self-start gap-1.5 mr-auto">
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

      {/* Modal is now OUTSIDE the card */}
      <AnimatePresence>
        {modalId === todo.id && (
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleBackdropClick}
          >
            <div
              className="bg-white max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <TodoModal todo={todo} onClose={() => setModalId(null)} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PrioritiesCard;
