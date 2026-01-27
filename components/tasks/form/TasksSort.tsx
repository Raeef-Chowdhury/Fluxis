export function TasksSort({
  sort,
  setSort,
}: {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className={` text-white from-secondary/20 to-primary/10  bg-linear-to-br from-secondary/20 to-primary/10 border border-secondary/20 rounded-xl px-4  py-4 text-lg text-white focus:outline-none focus:border-secondary/80 transition-all duration-300 hover:scale-105 cursor-pointer
`}
    >
      <option value="dueDate" className="bg-bg hover:cursor-pointer text-white">
        Soring by Due Date...
      </option>
      <option
        value="prioritySort"
        className="bg-bg hover:cursor-pointer text-white"
      >
        Sort by Priority...
      </option>
      <option
        value="alphabetSort"
        className="bg-bg hover:cursor-pointer text-white"
      >
        Sorting Alphabetically
      </option>
    </select>
  );
}
