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
  dueDate: string;
  priority: PriorityLevel;
  completionRate: number; // 0-100

  estimatedTime?: string; // "2h", "30min"

  // Project-specific (optional)
  completedSubtasks?: number;
  totalSubtasks?: number;
}
export interface PriorityColors {
  bg: string;
  text: string;
  border: string;
  progress: string;
}
// mockData.ts
export const mockPriorities: Priority[] = [
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
    priority: "MEDIUM",
    completionRate: 75,
    estimatedTime: "2h",
  },
  {
    id: "3",
    type: "project",
    title: "Launch Marketing Campaign",
    category: "Work",
    dueDate: "This week",
    priority: "LOW",
    completionRate: 25,
    completedSubtasks: 3,
    totalSubtasks: 12,
  },
];
