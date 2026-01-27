import { AnimatePresence } from "framer-motion";
import EmptyState from "@/components/tasks/EmptyState";
import { TodoItem } from "@/components/cards/TodoItem";
export function RenderTaskList({ filteredTodos, filter, sortedTodos }) {
  return (
    <ul className="flex flex-col gap-12 max-w-3xl mx-auto">
      {filteredTodos.length === 0 ? (
        <EmptyState todosLength={filteredTodos.length} filter={filter} />
      ) : (
        <AnimatePresence mode="wait">
          {sortedTodos.map((todo, index) => (
            <TodoItem key={todo.id} todo={todo} delay={index} />
          ))}
        </AnimatePresence>
      )}
    </ul>
  );
}
