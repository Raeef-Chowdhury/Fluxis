import { motion } from "framer-motion";
import { Priority } from "@/Types/TodoItemTypes";
import { SetPriority, SetString } from "@/Types/PropTypes";
interface Option {
  value: string;
  label: string;
}
export function OptionalField({
  label,
  value,
  onChange,
  type,
  options,
  show,
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
  if (!show) return null;
  const handleChange = (newValue: string) => {
    (onChange as SetString | SetPriority)(newValue as string & Priority);
  };
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.3 }}
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
        className={` bg-gradient-to-br from-secondary/40 to-primary/20 
            border border-secondary/20 rounded-lg px-6 py-2 text-md
            text-white placeholder:text-white/70
            focus:outline-none focus:border-secondary/80 
            transition-all duration-200`}
      />
    </motion.div>
  );
}
