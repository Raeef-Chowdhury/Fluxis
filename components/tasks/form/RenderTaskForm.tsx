import OptionalTags from "@/components/tasks/form/OptionalTags";
import { OptionalField } from "@/components/tasks/form/OptionalFields";
import { AddTask } from "./AddTaskInput";
import { Dispatch, SetStateAction } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function TaskForm({
  handleSubmit,
  title,
  setTitle,
  setIsFocused,
  isFocused,
  optionalFields,
  optionalTags,
  priority,
  setPriority,
  dueDate,
  setDueDate,
}: {
  handleSubmit: any;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  isFocused: boolean;
  optionalFields: any[];
  optionalTags: any[];
  priority: string;
  setPriority: Dispatch<SetStateAction<string>>;
  dueDate: string;
  setDueDate: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div
      className="mb-12 max-w-5xl mx-auto rounded-2xl 
        bg-primary/5 border  border-primary/10 
        p-6 md:p-8 backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-3 ">
        <div className=" flex gap-3 items-start">
          <div className="flex-1">
            <AddTask
              text={title}
              setTitle={setTitle}
              setIsFocused={setIsFocused}
            />

            <AnimatePresence>
              {isFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex gap-8 mt-6  p-3 rounded-xl inline-flex"
                >
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
                  <input
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    type="date"
                    placeholder="Priority"
                    className="  appearance-none bg-gradient-to-br from-secondary/10 to-primary/5 border border-secondary/20 rounded-lg px-3 py-2 pr-9  text-sm text-white/50 hover:text-white focus:text-white  cursor-pointer
      transition-all duration-200
focus:bg-secondary/20 hover:bg-secondary/15
      hover:border-secondary/40
      focus:outline-none
      focus:border-secondary
    "
                  />
                  {optionalTags.map((field) => (
                    <OptionalTags
                      key={field.id}
                      setShowState={field.setter}
                      showState={field.state}
                      Icon={field.icon}
                      text={field.label}
                      id={field.id}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 mt-6 pl-1">
              <AnimatePresence mode="sync">
                {optionalFields.map(
                  (field) =>
                    field.show && (
                      <OptionalField
                        key={field.id}
                        label={field.label}
                        value={field.value}
                        onChange={field.onChange}
                        type={field.type}
                        show={field.show}
                        options={field.options}
                        placeholder={field.placeholder}
                        min={field.min}
                      />
                    ),
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
