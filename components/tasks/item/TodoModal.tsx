"use client";
import { Todo } from "@/Types/TodoItemTypes";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { useInlineEditingText } from "@/hooks/useInlineEditingText";
import { useTodos } from "@/hooks/Todo/TodoItem";
export function TodoModal({
  todo,
  onClose,
}: {
  todo: Todo;
  onClose: Dispatch<SetStateAction<string | null>>;
}) {
  const { onUpdateTodo } = useTodos();
  const {
    isEditing,
    curText,
    inputRef,
    handleDoubleClick,
    handleBlur,
    handleChange,
    handleKeyDown,
  } = useInlineEditingText({
    text: todo.title,
  });

  const handleSaveTitle = () => {
    handleBlur();

    if (curText.trim() !== todo.title && curText.trim() !== "") {
      onUpdateTodo(todo.id, { title: curText.trim() });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e); // Handle Enter/Escape

    if (e.key === "Enter" && curText.trim() !== "") {
      onUpdateTodo(todo.id, { title: curText.trim() });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-gradient-to-br from-emerald-950 to-emerald-900/95 border border-primary/40 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden pointer-events-auto backdrop-blur-sm">
          {/* Header Section */}
          <div className="relative p-8 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <input
                    ref={inputRef}
                    type="text"
                    defaultValue={todo.title}
                    value={curText}
                    onChange={handleChange}
                    onBlur={handleSaveTitle}
                    onKeyDown={handleKeyPress}
                    className="text-3xl font-bold text-white leading-tight mb-1 bg-emerald-800/50 border-2 border-primary/60 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter todo title..."
                  />
                ) : (
                  <h2
                    onClick={handleDoubleClick}
                    className="text-3xl font-bold text-white leading-tight mb-1 break-words hover:cursor-pointer transition-all hover:bg-emerald-800/30 rounded-lg px-3 py-2"
                    title="Double-click to edit"
                  >
                    {todo.title}
                  </h2>
                )}
              </div>

              <button
                onClick={() => onClose(null)}
                className="text-white/40 hover:text-high-priority hover:bg-high-priority/30 transition-all duration-200 flex-shrink-0 rounded-lg p-2 group"
                type="button"
              >
                <X
                  className="w-6 h-6 group-hover:cursor-pointer transition-transform duration-200"
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {/* Tags Section */}
            {todo.tags && todo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {todo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 truncate bg-accent/20 text-accent border border-accent/40 text-xs rounded-full font-semibold tracking-wide uppercase backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Due Date Section */}
          {todo.dueDate && (
            <div className="px-8 pb-8">
              <div className="flex items-center gap-3 text-white/90 bg-emerald-900/50 border border-primary/30 rounded-xl p-5 backdrop-blur-sm">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-white/60 font-medium uppercase tracking-wider mb-0.5">
                    Due Date
                  </div>
                  <div className="text-base font-semibold">
                    {new Date(todo.dueDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
