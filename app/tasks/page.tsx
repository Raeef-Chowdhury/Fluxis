"use client";

import { useTaskForm } from "@/hooks/Todo/TodoForm";
import { RenderTaskFilters } from "@/components/tasks/form/RenderTaskFilters";
import TaskForm from "@/components/tasks/form/RenderTaskForm";
import { RenderTaskList } from "@/components/tasks/form/RenderTaskList";
import { TasksStats } from "@/components/tasks/stats/TasksStats";

function Tasks() {
  const {
    title,
    setTitle,
    isFocused,
    setIsFocused,
    optionalFields,
    optionalTags,
    handleSubmit,
    sortedTodos,
    sortBy,
    setSortBy,
    filter,
    filteredTodos,
    FilterButtons,
  } = useTaskForm();

  return (
    <section className="w-full  mt-6  pb-24">
      <h1 className="tracking-tight text-5xl font-bold text-center mb-12">
        Tasks
      </h1>
      <TasksStats />
      <TaskForm
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        setIsFocused={setIsFocused}
        isFocused={isFocused}
        optionalFields={optionalFields}
        optionalTags={optionalTags}
      />
      <RenderTaskFilters
        FilterButtons={FilterButtons}
        filter={filter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <RenderTaskList
        filteredTodos={filteredTodos}
        filter={filter}
        sortedTodos={sortedTodos}
      />
    </section>
  );
}

export default Tasks;
