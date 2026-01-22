"use client";
import { useTodos } from "@/hooks/TodoItem";
import { useState } from "react";
import { Trash } from "lucide-react";

function Tasks() {
  const [title, setTitle] = useState<string>("");
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title);
    setTitle("");
  }

  return (
    <section className="w-full max-w-4xl mx-auto mt-24">
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
            className="flex-1 bg-gradient-to-br from-secondary/20 to-primary/10 
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
      </div>

      <ul className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-emerald-400/50">
            No tasks yet. Add one to get started!
          </div>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-gradient-to-br flex  items-center justify-between from-emerald-950/40 to-emerald-900/20 
                border border-emerald-800/40 rounded-xl p-5 
                transition-all duration-300 
                hover:scale-[1.01] hover:shadow-lg hover:shadow-emerald-500/10 
                hover:border-emerald-700/60"
            >
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-3 cursor-pointer"
                />
                <span
                  className={
                    todo.completed
                      ? "line-through text-accent/40"
                      : "text-white truncate block"
                  }
                >
                  {todo.title}
                </span>
              </div>
              <div>
                <Trash
                  onClick={() => deleteTodo(todo.id)}
                  className="justify-self-end self-center text-high-priority hover:text-high-priority-shade hover:scale-105 transition-all  cursor-pointer w-4 h-4 "
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default Tasks;
