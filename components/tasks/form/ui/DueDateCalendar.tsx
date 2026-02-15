import { SetString } from "@/Types/PropTypes";

export function DueDateCalendar({
  dueDate,
  setDueDate,
}: {
  dueDate: string;
  setDueDate: SetString;
}) {
  return (
    <input
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      type="date"
      className="  appearance-none bg-gradient-to-br from-secondary/40 to-primary/20 border border-secondary/20 rounded-lg px-6 py-2 pr-9  text-md text-white/80 hover:text-white focus:text-white  cursor-pointer
      transition-all duration-200
focus:bg-secondary/60 hover:bg-secondary/50
      hover:border-white/50
      focus:outline-none
      focus:border-secondary
    "
    />
  );
}
