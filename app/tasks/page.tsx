"use client";

import { useTodos } from "@/hooks/TodoItem";
import { TodoItem } from "@/components/cards/TodoItem";
import { AnimatePresence } from "framer-motion";
import OptionalTags from "@/components/tasks/form/ui/OptionalTags";
import { OptionalField } from "@/components/tasks/form/ui/OptionalFields";
import { useTaskForm } from "@/hooks/TodoForm";
import FilterButton from "@/components/tasks/form/ui/FilterButtons";
function Tasks() {
  const { todos } = useTodos();
  const {
    title,
    setTitle,
    isFocused,
    setIsFocused,
    optionalFields,
    optionalTags,
    handleSubmit,
    sortedTodos,
    filter,
    filteredTodos,
    FilterButtons,
  } = useTaskForm();

  return (
    <section className="w-full  mt-6  pb-24">
      <h1 className="tracking-tight text-5xl font-bold text-center mb-12">
        Tasks
      </h1>

      <div
        className="mb-12 max-w-5xl mx-auto rounded-2xl 
        bg-primary/5 border border-primary/10 
        p-6 md:p-8 backdrop-blur-sm  "
      >
        <form onSubmit={handleSubmit} className="space-y-3  ">
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
                className="w-full bg-gradient-to-br from-secondary/15 to-primary/10
                  border border-secondary/20 rounded-xl px-5 py-3.5 text-base
                  text-white placeholder:text-primary/70
                  focus:outline-none focus:border-secondary/80 
                  transition-all duration-300"
              />

              {isFocused && (
                <div className="flex gap-2 mt-6 bg-primary/5 p-3 rounded-xl inline-flex">
                  {optionalTags.map((field) => (
                    <OptionalTags
                      key={field.id}
                      setShowState={field.setter}
                      showState={field.state}
                      Icon={field.icon}
                      text={field.label}
                      id={field.id}
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-4 mt-6 pl-1">
                {optionalFields.map((field) => (
                  <OptionalField
                    key={field.id}
                    label={field.label}
                    value={field.value}
                    onChange={field.onChange}
                    type={field.type}
                    show={field.show}
                    options={field.options}
                    placeholder={field.placeholder}
                    min={field.min}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="hover:cursor-pointer bg-secondary/70 hover:bg-secondary/90 text-black font-medium 
                px-6 py-3.5 rounded-lg text-sm transition-all duration-300 
                hover:scale-105 active:scale-95 shrink-0"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
      <div className="flex gap-8 mt-16 mb-32 justify-center">
        {FilterButtons.map((button) => (
          <FilterButton
            key={button.text}
            setFilter={button.setFilter}
            filter={filter}
            text={button.text}
          />
        ))}
      </div>
      <ul className="flex flex-col gap-12 max-w-3xl mx-auto">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 text-emerald-400/50">
            {todos.length === 0
              ? "No tasks yet. Add one to get started!"
              : filter === "active"
                ? "All tasks completed! 🎉"
                : "No completed tasks yet!"}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {sortedTodos.map((todo, index) => (
              <TodoItem key={todo.id} todo={todo} delay={index} />
            ))}
          </AnimatePresence>
        )}
      </ul>
    </section>
  );
}

export default Tasks;
