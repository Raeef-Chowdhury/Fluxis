import { useTodos } from "@/hooks/Todo/TodoItem";
export function TasksStats() {
  const { todos } = useTodos();
  return (
    <div className="flex max-w-4xl mx-auto mt-4 gap-4 mb-24 px-4">
      <div className="flex-1 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl px-6 py-4 border border-secondary/30 shadow-lg">
        <div className="text-secondary text-md font-medium mb-4 tracking-tight">
          Total Tasks
        </div>
        <div className="text-3xl font-bold text-white">{todos.length}</div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl px-6 py-4 border border-primary/30 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="text-primary text-md font-medium mb-4 tracking-tight">
            Completed
          </div>{" "}
          <div className="text-primary text-sm font-medium">
            {todos.length > 0
              ? Math.round(
                  (todos.filter((todo) => todo.completed).length /
                    todos.length) *
                    100,
                )
              : 0}
            %
          </div>
        </div>
        <div className="">
          <div className="text-3xl font-bold text-white">
            {todos.filter((todo) => todo.completed).length}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-accent/15 to-accent/10 rounded-xl px-6 py-4 border border-accent/50 shadow-lg">
        <div className="text-accent text-md font-medium mb-4 tracking-tight">
          Active
        </div>
        <div className="text-3xl font-bold text-white">
          {todos.filter((todo) => !todo.completed).length}
        </div>
      </div>
    </div>
  );
}
