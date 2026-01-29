"use client";
import { createContext, useContext } from "react";

interface DaysLeftContextType {
  calculateDaysLeft: (dueDate: string) => number;
  getDaysLeftText: (daysLeft: number) => string;
  getDaysLeftStyles: (daysLeft: number) => string;
  isOverdue: (daysLeft: number) => boolean;
}

const DaysLeftContext = createContext<DaysLeftContextType | undefined>(
  undefined,
);

export function DaysLeftProvider({ children }: { children: React.ReactNode }) {
  function calculateDaysLeft(dueDate: string): number {
    const today = new Date();
    const due = new Date(dueDate);
    const difference = due.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return days;
  }

  function getDaysLeftText(daysLeft: number): string {
    if (daysLeft === 0) return "Due Today";
    if (daysLeft === 1) return "Due Tomorrow";
    if (daysLeft < 0)
      return `Overdue by ${Math.abs(daysLeft)} ${daysLeft === -1 ? "day" : "days"}`;
    return `Due in ${daysLeft} days`;
  }

  function getDaysLeftStyles(daysLeft: number): string {
    if (daysLeft === 0)
      return "bg-high-priority/15 text-high-priority border border-high-priority/30";
    if (daysLeft === 1)
      return "bg-med-priority/10 border-med-priority/30 border text-med-priority/70";
    if (daysLeft < 0)
      return "bg-high-priority/20 border-high-priority-shade text-high-priority";
    return "bg-white/5 border border-white/10 text-white/70";
  }

  function isOverdue(daysLeft: number): boolean {
    return daysLeft < 0;
  }

  return (
    <DaysLeftContext.Provider
      value={{
        calculateDaysLeft,
        getDaysLeftText,
        getDaysLeftStyles,
        isOverdue,
      }}
    >
      {children}
    </DaysLeftContext.Provider>
  );
}

export function useDaysLeft() {
  const context = useContext(DaysLeftContext);
  if (!context) {
    throw new Error("useDaysLeft must be used within DaysLeftProvider");
  }
  return context;
}
