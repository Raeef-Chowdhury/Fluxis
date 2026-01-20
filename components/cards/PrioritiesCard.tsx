import { Priority } from "@/Data/MockPriorities";
import { PriorityColors } from "@/Data/MockPriorities";
export function PrioritiesCard({
  colors,
  priority,
}: {
  colors: PriorityColors;
  priority: Priority;
}) {
  return (
    <div
      key={priority.id}
      className={`border-l-2 flex flex-col gap-4 ${colors.border} bg-secondary/10 rounded-lg p-8 hover:bg-secondary/20 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-xl font-semibold text-white leading-tight flex-1">
          {priority.title}
        </h3>
        <span
          className={`text-md px-4 py-2 ${colors.bg} ${colors.text} rounded font-medium whitespace-nowrap`}
        >
          {priority.priority}
        </span>
      </div>

      <div className="flex items-center flex-wrap gap-6  text-sm text-gray-400 mb-4">
        <span className="text-sm px-2.5 py-1 bg-secondary/10 text-accent/40 rounded font-medium">
          {priority.category}
        </span>
        <div>⋅</div>
        <span className="flex items-center gap-1.5 text-md text-accent/50">
          {priority.dueDate}
        </span>

        {priority.estimatedTime && (
          <>
            <div>⋅</div>
            <span className="flex items-center gap-1.5 text-md text-accent/50">
              {priority.estimatedTime}
            </span>
          </>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 text-[0.7rem] font-medium">
            {priority.type === "project" &&
            priority.completedSubtasks !== undefined &&
            priority.totalSubtasks !== undefined
              ? `${priority.completedSubtasks}/${priority.totalSubtasks} tasks`
              : "Progress"}
          </span>
          <span className={`font-semibold text-lg ${colors.text}`}>
            {priority.completionRate}%
          </span>
        </div>
        <div className="h-2 bg-black rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.progress} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${priority.completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
