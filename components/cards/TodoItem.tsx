import { useTodos } from "@/hooks/TodoItem";
import { Trash, Check } from "lucide-react";
import { Todo } from "@/Types/TodoItemTypes";
export function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo } = useTodos();
  const priorityColors = {
    high: "bg-high-priority text-white",
    medium: "bg-med-priority text-black",
    low: "bg-low-priority text-black",
  };
  return (
    <div
      key={todo.id}
      className="bg-gradient-to-br from-primary/10 to-primary/5 
                    border border-emerald-800/40 rounded-lg p-3 
                    transition-all duration-300 
                    hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10 
                    hover:border-emerald-700/60 flex flex-col gap-2"
    >
      <div className="flex items-start justify-between gap-2">
        {todo.priority && (
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[todo.priority]}`}
          >
            {todo.priority}
          </span>
        )}
        <Trash
          onClick={() => deleteTodo(todo.id)}
          className="text-high-priority hover:text-high-priority-shade 
                        hover:scale-110 transition-all cursor-pointer w-4 h-4 shrink-0"
        />
      </div>

      <label className="flex items-start gap-2 cursor-pointer group flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="peer sr-only"
        />
        <div
          className="w-4 h-4 mt-0.5 border-2 border-cyan-500/50 rounded shrink-0
                        peer-checked:bg-cyan-500 peer-checked:border-cyan-500
                        transition-all duration-300 
                        group-hover:border-cyan-400 group-hover:scale-110
                        flex items-center justify-center"
        >
          {todo.completed && <Check className="w-3 h-3 text-white" />}
        </div>

        <span
          className={`text-sm leading-tight wrap-break-word ${
            todo.completed
              ? "line-through truncate text-accent/40"
              : "text-white truncate"
          }`}
        >
          {todo.title}
        </span>
      </label>
    </div>
  );
}
