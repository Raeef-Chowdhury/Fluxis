import { ChevronRight, Plus } from "lucide-react";
export type PriorityLevel = "HIGH" | "MEDIUM" | "LOW";
export type Category =
  | "Work"
  | "Personal"
  | "Health"
  | "Development"
  | "Finance";
export type PriorityType = "task" | "project";

export interface Priority {
  id: string;
  type: PriorityType;
  title: string;
  category: Category;
  dueDate: string; // ISO string or readable format
  priority: PriorityLevel;
  completionRate: number; // 0-100

  // Task-specific (optional)
  estimatedTime?: string; // "2h", "30min"

  // Project-specific (optional)
  completedSubtasks?: number;
  totalSubtasks?: number;
}

// mockData.ts
export const mockPriorities: Priority[] = [
  // Todo Task 1
  {
    id: "1",
    type: "task",
    title: "Complete Q1 Financial Report",
    category: "Work",
    dueDate: "Today, 5:00 PM",
    priority: "HIGH",
    completionRate: 75,
    estimatedTime: "2h",
  },
  {
    id: "2",
    type: "task",
    title: "Complete Q1 Financial Report",
    category: "Work",
    dueDate: "Today, 5:00 PM",
    priority: "HIGH",
    completionRate: 75,
    estimatedTime: "2h",
  },

  {
    id: "3",
    type: "project",
    title: "Launch Marketing Campaign",
    category: "Work",
    dueDate: "This week",
    priority: "MEDIUM",
    completionRate: 25, // Calculated as: (3/12) * 100 = 25%
    completedSubtasks: 3,
    totalSubtasks: 12,
  },
];
function Priorities() {
  return (
    <section className="mt-[2.8rem] w-full max-w-[85vw] mx-auto">
      <h2 className="text-[1.6rem] text-left ">Your Top Priorities</h2>{" "}
      <div className="grid grid-cols-3 gap-[2.4rem] mt-[1.6rem] ">
        {mockPriorities.map((priority) => {
          // Dynamic priority colors
          const priorityColors = {
            HIGH: {
              border: "border-red-500",
              bg: "bg-red-500/20",
              text: "text-red-400",
              progress: "bg-red-500",
            },
            MEDIUM: {
              border: "border-yellow-500",
              bg: "bg-yellow-500/20",
              text: "text-yellow-400",
              progress: "bg-yellow-500",
            },
            LOW: {
              border: "border-blue-500",
              bg: "bg-blue-500/20",
              text: "text-blue-400",
              progress: "bg-blue-500",
            },
          };

          const colors = priorityColors[priority.priority];

          return (
            <div
              key={priority.id}
              className={`border-l-4 flex flex-col gap-4 ${colors.border} bg-[#012010] rounded-r-lg p-6 hover:bg-[#013015] hover:shadow-lg transition-all duration-200 cursor-pointer`}
            >
              {/* Header: Title + Priority Badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-lg font-semibold text-white leading-tight flex-1">
                  {priority.title}
                </h3>
                <span
                  className={`text-xs px-2.5 py-1 ${colors.bg} ${colors.text} rounded font-medium whitespace-nowrap`}
                >
                  {priority.priority}
                </span>
              </div>

              {/* Metadata Row */}
              <div className="flex items-center flex-wrap gap-3 text-sm text-gray-400 mb-4">
                <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded font-medium">
                  {priority.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {priority.dueDate}
                </span>
                {priority.estimatedTime && (
                  <span className="flex items-center gap-1.5 text-xs">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {priority.estimatedTime}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">
                    {priority.type === "project" &&
                    priority.completedSubtasks !== undefined &&
                    priority.totalSubtasks !== undefined
                      ? `${priority.completedSubtasks}/${priority.totalSubtasks} tasks`
                      : "Progress"}
                  </span>
                  <span className={`font-semibold ${colors.text}`}>
                    {priority.completionRate}%
                  </span>
                </div>
                <div className="h-2 bg-[#01130a] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colors.progress} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${priority.completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}{" "}
        {mockPriorities.length < 3 && (
          <div className="mb-6 p-4 flex flex-col gap-[1.2rem] items-center  bg-primary/10 border-3 border-dashed border-primary/30 rounded-lg hover:scale-[1.02] hover:shadow-lg transition-all">
            <div className="p-2 rounded-full bg-primary/20">
              <Plus className="w-8 h-8 text-primary " strokeWidth={2} />
            </div>
            <p className="text-[1rem] text-center  tracking-widest leading-loose text-text/90">
              Add Priority #{1 + mockPriorities.length}
            </p>
            <button className="bg-primary/90 hover:bg-primary/80 flex gap-2 items-center  hover:gap-4 hover:cursor-pointer  duration-300 px-4 py-2 text-black mx-auto rounded-2xl">
              Add More Priorities <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
export default Priorities;
