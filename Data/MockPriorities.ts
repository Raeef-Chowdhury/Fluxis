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
  completionRate: number;

  estimatedTime?: string;

  completedSubtasks?: number;
  totalSubtasks?: number;
}
export interface PriorityColors {
  bg: string;
  text: string;
  border: string;
  progress?: string;
}
