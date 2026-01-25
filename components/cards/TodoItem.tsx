import { useTodos } from "@/hooks/TodoItem";
import { Trash, Check } from "lucide-react";
import { Todo } from "@/Types/TodoItemTypes";
import { motion } from "framer-motion";

export function TodoItem({ todo }: { todo: Todo; delay: number }) {
  const { toggleTodo, deleteTodo } = useTodos();

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
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: todo.completed ? 0.4 : 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`bg-gradient-to-br ${todo.completed ? "from-primary/20 to-primary/10 opacity-40" : "from-primary/15 to-primary/5"}
                    rounded-lg
                    ${todo.priority ? priorityBorderColors[todo.priority] : ""}
                    transition-all duration-200 
                    hover:shadow-lg hover:shadow-emerald-500/5 
                     hover:-translate-y-0.5
                    flex items-center gap-3 px-4 py-3 cursor-pointer group`}
    >
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
        className={`text-md flex-1 truncate ${
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
      {todo.dueDate && (
        <span
          className={`text-xs px-3 py-1 mr-2 rounded-full font-semibold uppercase tracking-wide  shrink-0`}
        >
          {todo.dueDate}
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
    </motion.li>
  );
}
