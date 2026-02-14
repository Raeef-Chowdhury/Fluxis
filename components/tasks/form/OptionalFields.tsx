import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { Priority } from "@/Types/TodoItemTypes";
import { SetString, SetPriority } from "@/Types/PropTypes";

export function OptionalField({
  label,
  value,
  onChange,
  type,
  placeholder,
  min,
}: {
  label: string;
  value: string;
  onChange: SetString | SetPriority;
  type: "text" | "date" | "select";
  options?: { value: string; label: string }[];
  show: boolean;
  placeholder?: string;
  min?: string;
}) {
  const handleChange = (newValue: string) => {
    (onChange as SetPriority | SetString)(newValue as string & Priority);
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <label className="text-[11px] mt-4 text-white/40 mb-1 block ml-1">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        type={type}
        min={min}
        placeholder={placeholder}
        className="bg-gradient-to-br from-secondary/20 to-primary/10 
            border border-secondary/20 rounded-lg px-3 py-2 text-sm
            text-white placeholder:text-primary/30
            focus:outline-none focus:border-secondary/80 
            transition-all duration-200"
      />
    </motion.div>
  );
}
