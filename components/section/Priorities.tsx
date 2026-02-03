"use client";
import { PrioritiesCard } from "@/components/cards/PrioritiesCard";
import { IncompletePriorities } from "@/components/Fallback/IncompletePriorities";
import { EmptyPriorities } from "../Fallback/EmptyPriorities";
import { ArrowRight } from "lucide-react";
import { useTodoSortDasboard } from "@/hooks/dashboard/useTodoSortDashboard";
import Link from "next/link";

function Priorities() {
  const { sortedTodos } = useTodoSortDasboard();

  const priorityColors = {
    high: {
      border: "border-high-priority",
      bg: "bg-high-priority/20",
      text: "text-high-priority-shade",
      progress: "bg-high-priority",
    },
    medium: {
      border: "border-med-priority",
      bg: "bg-med-priority/20",
      text: "text-med-priority-shade",
      progress: "bg-med-priority",
    },
    low: {
      border: "border-low-priority",
      bg: "bg-low-priority/20",
      text: "text-low-priority-shade",
      progress: "bg-low-priority",
    },
    "": {
      border: "border-none",
      bg: "",
      text: "",
      progress: "",
    },
  };

  return (
    <section className="mt-32 w-full max-w-[85vw] mx-auto">
      <div className="flex justify-between mb-12 items-start">
        <h2 className="text-[1.8rem]    font-semibold tracking-tight text-white text-left">
          Your Top Priorities
        </h2>
        <Link href="/tasks">
          <button className="text-accent/70 mt-5  text-xs hover:scale-105 transition-all hover:cursor-pointer hover:text-accent underline underline-offset-4   gap-1  flex items-center">
            View all Tasks <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-12 mt-[1.6rem] items-start">
        {sortedTodos.map((todo) => {
          const colors = priorityColors[todo.priority || ""];
          return <PrioritiesCard key={todo.id} colors={colors} todo={todo} />;
        })}
        {sortedTodos.length < 3 && sortedTodos.length > 0 && (
          <IncompletePriorities />
        )}
        {sortedTodos.length < 1 && <EmptyPriorities />}
      </div>
    </section>
  );
}

export default Priorities;
