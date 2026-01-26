import { Filter } from "@/Types/TodoItemTypes";
function FilterButton({
  setFilter,
  filter,
  text,
}: {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filter: string;
  text: Filter;
}) {
  return (
    <button
      onClick={() => setFilter(text)}
      className={`px-6 py-2.5 uppercase hover:cursor-pointer rounded-full transition-all text-md font-medium
        ${
          filter === text
            ? "bg-secondary text-black"
            : "bg-primary/20 text-white/80 hover:bg-primary/30 hover:text-white"
        }`}
    >
      {text}
    </button>
  );
}
export default FilterButton;
