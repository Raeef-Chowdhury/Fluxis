import { SetStateAction, Dispatch } from "react";
export function DueDateCalendar({
  dueDate,
  setDueDate,
}: {
  dueDate: string;
  setDueDate: Dispatch<SetStateAction<string>>;
}) {
  return (
    <input
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      type="date"
      className="  appearance-none bg-gradient-to-br from-secondary/10 to-primary/5 border border-secondary/20 rounded-lg px-3 py-2 pr-9  text-sm text-white/50 hover:text-white focus:text-white  cursor-pointer
      transition-all duration-200
focus:bg-secondary/20 hover:bg-secondary/15
      hover:border-secondary/40
      focus:outline-none
      focus:border-secondary
    "
    />
  );
}
