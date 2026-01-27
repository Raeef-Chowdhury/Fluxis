import FilterButton from "@/components/tasks/form/FilterButtons";
import { TasksSort } from "@/components/tasks/form/TasksSort";
import { FilterButtonProps } from "@/hooks/TodoForm";
export function RenderTaskFilters({
  filter,
  sortBy,
  setSortBy,
  FilterButtons,
}: {
  filter: string;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  FilterButtons: FilterButtonProps[];
}) {
  return (
    <div className="mt-16 mb-48 flex justify-center max-w-5xl  mx-auto">
      <div className="flex gap-8 w-full ">
        {FilterButtons.map((button) => (
          <FilterButton
            key={button.text}
            setFilter={button.setFilter}
            filter={filter}
            text={button.text}
          />
        ))}
      </div>
      <TasksSort sort={sortBy} setSort={setSortBy} />
    </div>
  );
}
