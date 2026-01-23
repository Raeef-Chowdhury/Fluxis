"use client";
import { useTodos } from "@/hooks/TodoItem";
import { useState } from "react";
import { Trash, Check } from "lucide-react";

function Tasks() {
  const [title, setTitle] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title);
    setTitle("");
  }
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed" && todo.completed) return true;
    if (filter === "active" && !todo.completed) return true;
    return false;
  });
  return (
    <section className="w-full max-w-4xl mx-auto mt-6 pb-24">
      {/* Header */}
      <h1 className="tracking-tight text-5xl font-bold text-center mb-12">
        Tasks
      </h1>

      {/* Input Section */}
      <div className="mb-12">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="input__checkbox flex-1 bg-gradient-to-br from-secondary/20 to-primary/10 
              border border-secondary/20 rounded-xl px-6 py-4 text-lg 
              text-white placeholder:text-primary/80
              focus:outline-none focus:border-secondary/80 
              transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium 
              px-8 py-4 rounded-xl transition-all duration-300 
              hover:scale-105 active:scale-95"
          >
            Add Task
          </button>
        </form>
        <div className="flex gap-6 mt-6 jsutify-around w-full justify-center mb-24">
          <button
            onClick={() => setFilter("all")}
            className={`px-8 ${filter === "all" ? "bg-secondary/60 hover:bg-primary/60" : ""} py-3 bg-primary/20 hover:bg-primary/30 rounded-full hover:scale-105 transition-all  hover:cursor-pointer text-white text-lg`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-8 ${filter === "active" ? "bg-secondary/60 hover:bg-primary/60" : ""} py-3 bg-primary/20 hover:bg-primary/30 rounded-full hover:scale-105 transition-all  hover:cursor-pointer text-white text-lg`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-8 ${filter === "completed" ? "bg-secondary/60 hover:bg-primary/60" : ""} py-3 bg-primary/20 hover:bg-primary/30 rounded-full hover:scale-105 transition-all  hover:cursor-pointer text-white text-lg`}
          >
            Completed
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 text-emerald-400/50">
            {todos.length === 0
              ? "No tasks yet. Add one to get started!"
              : filter === "active"
                ? "All tasks completed! 🎉"
                : "No completed tasks yet!"}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="bg-gradient-to-br flex items-center gap-4 from-primary/10 to-primary/5 
    border border-emerald-800/40 rounded-xl p-5 
    transition-all duration-300 
    hover:scale-[1.01] hover:shadow-lg hover:shadow-emerald-500/10 
    hover:border-emerald-700/60"
            >
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="peer sr-only"
                />
                <div
                  className="w-5 h-5 border-2 border-cyan-500/50 rounded flex-shrink-0
    peer-checked:bg-cyan-500 peer-checked:border-cyan-500
    transition-all duration-300 
    group-hover:border-cyan-400 group-hover:scale-110
    flex items-center justify-center"
                >
                  {todo.completed && <Check className="w-4 h-4 text-white" />}
                </div>
              </label>

              <span
                className={`flex-1 truncate ${
                  todo.completed ? "line-through text-accent/40" : "text-white"
                }`}
              >
                {todo.title}
              </span>

              <Trash
                onClick={() => deleteTodo(todo.id)}
                className="flex-shrink-0 text-high-priority hover:text-high-priority-shade 
      hover:scale-105 transition-all cursor-pointer w-5 h-5"
              />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default Tasks;
