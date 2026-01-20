import { Target, Plus } from "lucide-react";
export function EmptyPriorities() {
  return (
    <div className="flex flex-col border-primary/10 bg-accent/10 border-2 border-solid rounded-sm items-center  py-8 px-3 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Target className="w-8 h-8 text-primary " strokeWidth={2} />
      </div>

      <h3 className="text-[1.6rem] font-semibold text-white mb-2">
        No priorities set
      </h3>

      <p className="text-sm text-text/50 mb-8 max-w-[80%] my-4">
        Set your top 3 priorities. Choose tasks from your task list or create
        new ones.
      </p>

      <button className="px-6 py-3 hover:cursor-pointer bg-primary/20 text-primary rounded-lg font-medium hover:bg-primary/30 transition-colors flex items-center gap-2">
        <Plus className="w-6 h-6" strokeWidth={2} />
        Add Your First Priority
      </button>
    </div>
  );
}
