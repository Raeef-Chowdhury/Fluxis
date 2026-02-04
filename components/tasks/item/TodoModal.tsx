import { Todo } from "@/Types/TodoItemTypes";
import { X } from "lucide-react";
export function TodoModal({ todo }: { todo: Todo }) {
  return (
    <>
      <div className="fixed  inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-emerald-950 border border-primary/30 rounded-xl shadow-2xl max-w-2xl w-full  overflow-y-auto pointer-events-auto">
          <div className="flex items-start relative justify-between p-8 border-b border-primary/20">
            <div className="flex-1 relative pr-6 line-clamp-6">
              <h2 className="text-2xl break-words font-semibold mb-6 tracking-tight text-white ">
                {todo.title}
              </h2>

              {todo.tags && todo.tags.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mt-4">
                  {todo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 truncate bg-accent/15 text-accent border border-accent/30 text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              className="text-white/50  hover:text-high-priority hover:bg-high-priority/20 hover:cursor-pointer transition-all duration-200 flex-shrink-0 rounded-lg p-2"
              type="button"
            >
              <X className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>

          <div className="p-8">
            {/* Due Date */}
            {todo.dueDate && (
              <div className="flex items-center gap-3 text-gray-300 bg-gray-800 border border-primary/25 rounded-lg p-5">
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  Due:{" "}
                  {new Date(todo.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
