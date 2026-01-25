"use client";
import { useTodos } from "@/hooks/TodoItem";
import { useState } from "react";
import { TodoItem } from "@/components/cards/TodoItem";
import { Priority, Filter } from "@/Types/TodoItemTypes";
import { AnimatePresence } from "framer-motion";
import { Calendar, Flag, Tag } from "lucide-react";

const priorityRank = {
  high: 3,
  medium: 2,
  low: 1,
  "": 0,
};

function Tasks() {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");

  const [showPriority, setShowPriority] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { todos, addTodo } = useTodos();
  const today = new Date().toISOString().split("T")[0];
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title, priority, dueDate);
    setTitle("");
    setPriority("");
    setDueDate("");
    setShowPriority(false);
    setShowDueDate(false);
    setShowTags(false);
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed" && todo.completed) return true;
    if (filter === "active" && !todo.completed) return true;
    return false;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return Number(a.completed) - Number(b.completed);
    }
    return priorityRank[b.priority ?? ""] - priorityRank[a.priority ?? ""];
  });

  return (
    <section className="w-full mt-6 pb-24">
      <h1 className="tracking-tight text-5xl font-bold text-center mb-12">
        Tasks
      </h1>

      <div className="mb-12 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-3 items-start">
            <div className="flex-1">
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value as string)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(true), 1000)}
                placeholder="Add a new task..."
                className="w-full bg-gradient-to-br from-secondary/20 to-primary/10 
                  border border-secondary/20 rounded-xl px-6 py-4 text-lg 
                  text-white placeholder:text-primary/80
                  focus:outline-none focus:border-secondary/80 
                  transition-all duration-300"
              />

              {isFocused && (
                <div className="flex gap-8 mt-8 ">
                  <button
                    type="button"
                    onClick={() => setShowPriority(!showPriority)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                      transition-all duration-200 hover:scale-105
                      ${
                        showPriority
                          ? "bg-secondary/30 text-white border border-secondary/50"
                          : "bg-primary/10 text-white/60 hover:text-white hover:bg-primary/20"
                      }`}
                  >
                    <Flag className="w-4 h-4" />
                    Priority
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDueDate(!showDueDate)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                      transition-all duration-200 hover:scale-105
                      ${
                        showDueDate
                          ? "bg-secondary/30 text-white border border-secondary/50"
                          : "bg-primary/10 text-white/60 hover:text-white hover:bg-primary/20"
                      }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Due date
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowTags(!showTags)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                      transition-all duration-200 hover:scale-105
                      ${
                        showTags
                          ? "bg-secondary/30 text-white border border-secondary/50"
                          : "bg-primary/10 text-white/60 hover:text-white hover:bg-primary/20"
                      }`}
                  >
                    <Tag className="w-4 h-4" />
                    Tags
                  </button>
                </div>
              )}

              <div className="space-y-2 mt-2 animate-in slide-in-from-top-2">
                {showPriority && (
                  <div className="ml-2 animate-in slide-in-from-top-2 duration-200">
                    <label className="text-xs text-white/60 mb-1 block ml-1">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as Priority)}
                      className="w-full bg-gradient-to-br from-secondary/20 to-primary/10 
                        border border-secondary/20 rounded-lg px-4 py-2 text-sm
                        text-white focus:outline-none focus:border-secondary/80 
                        transition-all duration-300"
                    >
                      <option value="" className="bg-bg text-white/50">
                        No priority
                      </option>
                      <option value="low" className="bg-bg text-white">
                        Low
                      </option>
                      <option value="medium" className="bg-bg text-white">
                        Medium
                      </option>
                      <option value="high" className="bg-bg text-white">
                        High
                      </option>
                    </select>
                  </div>
                )}

                {showDueDate && (
                  <div className="ml-2 animate-in slide-in-from-top-2 duration-200">
                    <label className="text-xs text-white/60 mb-1 block ml-1">
                      Due date
                    </label>
                    <input
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value as string)}
                      type="date"
                      min={today}
                      className="w-full bg-gradient-to-br from-secondary/20 to-primary/10 
                        border border-secondary/20 rounded-lg px-4 py-2 text-sm
                        text-white focus:outline-none focus:border-secondary/80 
                        transition-all duration-300"
                    />
                  </div>
                )}

                {showTags && (
                  <div className="ml-2 animate-in slide-in-from-top-2 duration-200">
                    <label className="text-xs text-white/60 mb-1 block ml-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      placeholder="work, urgent, personal..."
                      className="w-full bg-gradient-to-br from-secondary/20 to-primary/10 
                        border border-secondary/20 rounded-lg px-4 py-2 text-sm
                        text-white placeholder:text-primary/60
                        focus:outline-none focus:border-secondary/80 
                        transition-all duration-300"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-secondary/70 hover:cursor-pointer hover:bg-secondary/90 text-black font-medium 
                px-8 py-4 rounded-xl transition-all duration-300 
                hover:scale-105 active:scale-95 shrink-0"
            >
              Add Task
            </button>
          </div>
        </form>

        <div className="flex gap-3 mt-8 justify-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2.5 rounded-full transition-all text-sm font-medium
              ${
                filter === "all"
                  ? "bg-secondary text-black"
                  : "bg-primary/20 text-white/80 hover:bg-primary/30 hover:text-white"
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-6 py-2.5 rounded-full transition-all text-sm font-medium
              ${
                filter === "active"
                  ? "bg-secondary text-black"
                  : "bg-primary/20 text-white/80 hover:bg-primary/30 hover:text-white"
              }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-6 py-2.5 rounded-full transition-all text-sm font-medium
              ${
                filter === "completed"
                  ? "bg-secondary text-black"
                  : "bg-primary/20 text-white/80 hover:bg-primary/30 hover:text-white"
              }`}
          >
            Completed
          </button>
        </div>
      </div>

      <ul className="flex flex-col gap-12 max-w-3xl mx-auto">
        {filteredTodos.length === 0 ? (
          <div className="col-span-full text-center py-12 text-emerald-400/50">
            {todos.length === 0
              ? "No tasks yet. Add one to get started!"
              : filter === "active"
                ? "All tasks completed! 🎉"
                : "No completed tasks yet!"}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {sortedTodos.map((todo, index) => {
              return <TodoItem key={todo.id} todo={todo} delay={index} />;
            })}
          </AnimatePresence>
        )}
      </ul>
    </section>
  );
}

export default Tasks;
