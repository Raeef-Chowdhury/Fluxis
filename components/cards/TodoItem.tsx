"use client";
import { useTodos } from "@/hooks/Todo/TodoItem";
import { Trash, Check, TriangleAlert } from "lucide-react";
import { Todo } from "@/Types/TodoItemTypes";
import { motion } from "framer-motion";
import { useDaysLeft } from "@/hooks/Todo/useTodoDateConversion";
import { TodoModal } from "../tasks/item/TodoModal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
//TODO: COnfirmation toast when todo submitted
//TODO: inline editing, use onDoubleClick
//TODO: Fix animations when deleted/checked
//TODO: Confirmation delete toast once delete?

export function TodoItem({ todo }: { todo: Todo; delay: number }) {
  const { toggleTodo, deleteTodo } = useTodos();
  const { calculateDaysLeft, getDaysLeftText, getDaysLeftStyles, isOverdue } =
    useDaysLeft();
  const daysLeft = todo.dueDate ? calculateDaysLeft(todo.dueDate) : null;
  const [modalId, setModalId] = useState<null | string>(null);

  const priorityColors = {
    high: "bg-high-priority-shade/20 text-high-priority",
    medium: "bg-med-priority-shade/20 text-med-priority",
    low: "bg-low-priority-shade/20 text-low-priority",
  };

  const priorityBorderColors = {
    high: "border-l-4 border-high-priority hover:border-high-priority-shade",
    medium: "border-l-4 border-med-priority",
    low: "border-l-4 border-low-priority",
  };

  return (
    <>
      <motion.li
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: todo.completed ? 0.4 : 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        onClick={() => setModalId(todo.id)}
        className={`bg-gradient-to-br ${todo.completed ? "from-primary/15 to-primary/5 opacity-40" : "from-primary/25 to-primary/10"}
                    rounded-lg hover:cursor-pointer
                    ${todo.priority ? priorityBorderColors[todo.priority] : ""}
                    transition-all duration-200 
                    hover:shadow-lg hover:shadow-emerald-500/5 
                    hover:-translate-y-0.5
                    flex flex-col gap-2 px-6 py-4 group`}
      >
        <div className="flex items-center gap-3">
          <label
            className="flex items-center cursor-pointer shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="peer sr-only"
            />
            <div
              className={`w-6 h-6 border-2 border-accent/60 rounded-md shrink-0
                        peer-checked:bg-accent peer-checked:border-accent
                        transition-all duration-200 
                        hover:border-accent hover:scale-110
                        flex items-center justify-center
                        shadow-sm`}
            >
              {todo.completed && (
                <Check className="w-4.5 h-4.5 text-black stroke-[3]" />
              )}
            </div>
          </label>

          <span
            className={`text-lg leading-relaxed tracking-wider hover:cursor-pointer cursor-text 
    border w-fit border-transparent rounded px-2 py-1 
    transition-all duration-200 flex-1 truncate ${
      todo.completed ? "line-through text-white/40" : "text-white"
    }`}
          >
            {todo.title}
          </span>

          {todo.priority && (
            <span
              className={`text-xs px-3 py-1 mr-2 rounded-full font-semibold uppercase tracking-wide ${priorityColors[todo.priority]} shrink-0`}
            >
              {todo.priority === "medium" ? "MED" : todo.priority}
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(todo.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-all shrink-0
          text-high-priority hover:cursor-pointer hover:text-high-priority-shade 
                   hover:scale-110 p-1.5 rounded-lg hover:bg-red-500/10"
            aria-label="Delete task"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
        {(todo.dueDate ||
          (todo.tags && Array.isArray(todo.tags) && todo.tags.length > 0)) && (
          <div className="flex items-center gap-4 truncate  flex-wrap">
            {todo.dueDate && daysLeft !== null && (
              <span
                className={`text-xs px-4 py-2 rounded-md ${getDaysLeftStyles(daysLeft)} font-medium flex items-center gap-1.5 shrink-0`}
              >
                {isOverdue(daysLeft) && (
                  <TriangleAlert className="w-5 h-5 text-high-priority" />
                )}
                {getDaysLeftText(daysLeft)}
              </span>
            )}
            {todo.tags &&
              Array.isArray(todo.tags) &&
              todo.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs px-4 py-1 rounded-md ${tag.length < 1 ? "hidden" : ""} font-medium bg-accent/10 border border-accent/20 text-accent flex items-center gap-1.5 shrink-0`}
                >
                  {tag}
                </span>
              ))}
          </div>
        )}
      </motion.li>{" "}
      <AnimatePresence>
        {modalId === todo.id && (
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setModalId(null)}
          >
            {" "}
            <div
              className="bg-white max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <TodoModal todo={todo} onClose={setModalId} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
