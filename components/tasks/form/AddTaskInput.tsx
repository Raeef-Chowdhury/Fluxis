import { motion, AnimatePresence } from "framer-motion";
import { SetString, SetBoolean } from "@/Types/PropTypes";

export function AddTask({
  text,
  setTitle,
  setIsFocused,
}: {
  text: string;
  setTitle: SetString;
  setIsFocused: SetBoolean;
}) {
  const maxChars = 150;
  const textLength = text.length;
  const isDisabled = textLength > maxChars;

  return (
    <div className="relative  w-full flex flex-col gap-1">
      <AnimatePresence>
        {textLength > maxChars && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute -top-5 left-0 text-high-priority text-md"
          >
            Character limit reached: {textLength} / {maxChars}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex mt-2   items-center gap-2 w-full">
        <input
          required
          type="text"
          value={text}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Add a new task..."
          className="w-[85%] bg-gradient-to-br from-secondary/15 to-primary/10
            border border-secondary/20 rounded-xl px-5 py-3.5 text-base
            text-white placeholder:text-primary/70
            focus:outline-none focus:border-secondary/80
            transition-all duration-300"
        />
        <button
          type="submit"
          disabled={isDisabled}
          className={`bg-secondary/70 hover:cursor-pointer text-white px-6 py-3.5 rounded-lg
            transition-all duration-300
            ${isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-secondary/90 hover:scale-105"}`}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
