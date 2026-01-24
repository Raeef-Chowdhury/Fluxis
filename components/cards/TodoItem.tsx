import { useTodos } from "@/hooks/TodoItem";
import { Trash, Check } from "lucide-react";
import { Todo } from "@/Types/TodoItemTypes";

export function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo } = useTodos();
  const priorityColors = {
    high: "bg-high-priority-shade/20 text-high-priority",
    medium: "bg-med-priority-shade/20 text-med-priority",
    low: "bg-low-priority-shade/20 text-low-priority",
  };

  return (
    <div
      className="bg-gradient-to-br  from-primary/15 to-primary/5
                    border border-white/20 border-2 rounded-xl p-6
                    transition-all duration-200 
                    hover:shadow-xl hover:shadow-emerald-500/5 
                    hover:border-white/60 hover:-translate-y-0.5
                    flex flex-col gap-4 cursor-pointer group"
    >
      <div className="flex mt-1 items-center justify-between ">
        {todo.priority ? (
          <span
            className={`text-sm px-6 py-2 rounded-full font-bold uppercase tracking-wider shadow-sm ${priorityColors[todo.priority]}`}
          >
            {todo.priority}
          </span>
        ) : null}
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
          }}
          className="opacity-70 group-hover:opacity-100 transition-all
                     text-high-priority hover:cursor-pointer  hover:text-high-priority-shade 
                     hover:scale-110 p-1.5 rounded-lg hover:bg-red-500/10"
          aria-label="Delete task"
        >
          <Trash className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content: Checkbox and Title */}
      <label
        className={`flex ${todo.title.length > 25 ? "items-start" : "items-center"} mt-2 gap-3 cursor-pointer `}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="peer sr-only "
        />
        <div
          className={`w-4 h-4  ${todo.title.length > 25 ? "mt-1.5" : ""} border-2 border-accent/60 rounded-md shrink-0
                        peer-checked:bg-accent peer-checked:border-accent
                        transition-all duration-200 
                        hover:border-accent hover:scale-110
                        flex items-center justify-center
                        shadow-sm`}
        >
          {todo.completed && (
            <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
          )}
        </div>

        <span
          className={`text-md leading-relaxed tracking-wide  flex-1 break-words line-clamp-3 ${
            todo.completed ? "line-through text-white/40 " : "text-white"
          }`}
        >
          {todo.title}
        </span>
      </label>
    </div>
  );
}
