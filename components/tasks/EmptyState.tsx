function EmptyState({
  todosLength,
  filter,
}: {
  todosLength: number;
  filter: string;
}) {
  return (
    <div className="text-center py-12 text-emerald-400/50">
      {todosLength === 0
        ? "No tasks yet. Add one to get started!"
        : filter === "active"
          ? "All tasks completed! 🎉"
          : "No completed tasks yet!"}
    </div>
  );
}
export default EmptyState;
