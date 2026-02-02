import { useTodos } from "@/hooks/Todo/TodoItem";
import { Plus, ChevronRight } from "lucide-react";
import { Todo } from "@/Types/TodoItemTypes";
export function IncompletePriorities() {
  const { todos } = useTodos();
  const length = todos.filter((todo: Todo) => !todo.completed).length;
  return (
    <div className="mb-6  py-8  flex flex-col gap-[1.2rem] items-center  bg-primary/10 border-3 border-dashed border-primary/30 rounded-lg hover:scale-[1.02] hover:shadow-lg transition-all">
      <div className="p-2 rounded-full bg-primary/20">
        <Plus className="w-8 h-8 text-primary " strokeWidth={2} />
      </div>
      <p className="text-[1rem] text-center  tracking-widest leading-loose text-text/90">
        Add Priority #{1 + length}
      </p>
      <button className="bg-primary/90 hover:bg-primary/80 flex gap-2 items-center  hover:gap-4 hover:cursor-pointer  duration-300 px-4 py-2 text-black mx-auto rounded-2xl">
        Add More Priorities <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
