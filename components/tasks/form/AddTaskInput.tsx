import { Dispatch, SetStateAction } from "react";
export function AddTask({
  text,
  setTitle,
  setIsFocused,
}: {
  text: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <input
      required
      type="text"
      value={text}
      onChange={(e) => setTitle(e.target.value as string)}
      onFocus={() => setIsFocused(true)}
      placeholder="Add a new task..."
      className="w-full bg-gradient-to-br from-secondary/15 to-primary/10
                  border border-secondary/20 rounded-xl px-5 py-3.5 text-base
                  text-white placeholder:text-primary/70
                  focus:outline-none focus:border-secondary/80 
                  transition-all duration-300"
    />
  );
}
