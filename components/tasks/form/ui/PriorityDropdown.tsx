import { ChevronUp } from "lucide-react";
export function DueDateForm({
  priority,
  setPriority,
}: {
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="relative">
      <div className="relative group w-fit">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="  appearance-none bg-gradient-to-br from-secondary/10 to-primary/5 border border-secondary/20 rounded-lg px-3 py-2 pr-9  text-sm text-white/50 hover:text-white focus:text-white  cursor-pointer
      transition-all duration-200
focus:bg-secondary/20 hover:bg-secondary/15
      hover:border-secondary/40
      focus:outline-none
      focus:border-secondary
    "
        >
          <option value="" className="bg-bg text-white">
            No Priority
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

        <ChevronUp
          className="
      pointer-events-none
      absolute right-2.5 top-1/2 -translate-y-1/2
      w-4 h-4 text-white/60
      transition-transform duration-200
      group-focus-within:rotate-180
    "
        />
      </div>
    </div>
  );
}
