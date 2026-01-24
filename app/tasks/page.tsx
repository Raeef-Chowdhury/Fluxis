"use client";
import { useTodos } from "@/hooks/TodoItem";
import { useState } from "react";
import { TodoItem } from "@/components/cards/TodoItem";
import { Priority, Filter } from "@/Types/TodoItemTypes";

function Tasks() {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("");
  const [filter, setFilter] = useState<Filter>("all");
  const { todos, addTodo } = useTodos();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title, priority);
    setTitle("");
    setPriority("");
  }
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed" && todo.completed) return true;
    if (filter === "active" && !todo.completed) return true;
    return false;
  });
  return (
    <section className="w-full   mt-6 pb-24">
      <h1 className="tracking-tight text-5xl font-bold text-center mb-12">
        Tasks
      </h1>

      <div className="mb-12 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value as string)}
            placeholder="Add a new task..."
            className="input__checkbox flex-1 bg-gradient-to-br from-secondary/20 to-primary/10 
              border border-secondary/20 rounded-xl px-6 py-4 text-lg 
              text-white placeholder:text-primary/80
              focus:outline-none focus:border-secondary/80 
              transition-all duration-300"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className={`${priority === "" ? "text-white/30 from-secondary/5 to-primary/5 p-4" : "text-white from-secondary/20 to-primary/10"}  bg-gradient-to-br from-secondary/20 to-primary/10 border border-secondary/20 rounded-xl px-4  py-4 text-lg text-white focus:outline-none focus:border-secondary/80 transition-all duration-300 hover:scale-105 cursor-pointer
`}
          >
            <option value="" className="bg-bg text-white" disabled>
              Priority...
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
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium 
              px-8 py-4 rounded-xl transition-all duration-300 
              hover:scale-105 active:scale-95"
          >
            Add Task
          </button>
        </form>
        <div className="flex gap-12 mt-6 jsutify-around w-full justify-center mb-24">
          <button
            onClick={() => setFilter("all")}
            className={`px-8 ${filter === "all" ? "bg-secondary  hover:bg-primary/80 text-black" : "text-white"} py-3 bg-primary/20 hover:bg-primary/30 rounded-full hover:scale-105 transition-all  hover:cursor-pointer  text-lg`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-8 ${filter === "active" ? "bg-secondary hover:bg-primary/80 text-black" : "text-white"} py-3 bg-primary/20 hover:bg-primary/30 rounded-full hover:scale-105 transition-all  hover:cursor-pointer  text-lg`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-8 ${filter === "completed" ? "bg-secondary hover:bg-primary/80 text-black" : "text-white"} py-3 bg-primary/20 hover:bg-primary/30 rounded-full hover:scale-105 transition-all  hover:cursor-pointer  text-lg`}
          >
            Completed
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-3 md:grid-cols-3  gap-12 max-w-6xl mx-auto">
        {filteredTodos.length === 0 ? (
          <div className="col-span-full text-center py-12 text-emerald-400/50">
            {todos.length === 0
              ? "No tasks yet. Add one to get started!"
              : filter === "active"
                ? "All tasks completed! 🎉"
                : "No completed tasks yet!"}
          </div>
        ) : (
          filteredTodos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })
        )}
      </ul>
    </section>
  );
}

export default Tasks;
