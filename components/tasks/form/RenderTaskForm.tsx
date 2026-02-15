import { OptionalTags } from "@/components/tasks/form/ui/OptionalTags";
import { OptionalField } from "@/components/tasks/form/ui/OptionalField";
import { AddTask } from "./AddTaskInput";
import { DueDateForm } from "@/components/tasks/form/ui/PriorityDropdown";
import { motion, AnimatePresence } from "framer-motion";
import { DueDateCalendar } from "./ui/DueDateCalendar";
import { SetBoolean, SetString } from "@/Types/PropTypes";

import { OptionalTagsType, OptionalFieldsType } from "@/Types/TodoFormTypes";
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
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  setTitle: SetString;
  setIsFocused: SetBoolean;
  isFocused: boolean;
  optionalFields: OptionalFieldsType[];
  optionalTags: OptionalTagsType[];
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  dueDate: string;
  setDueDate: SetString;
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
                  <DueDateForm priority={priority} setPriority={setPriority} />
                  <DueDateCalendar dueDate={dueDate} setDueDate={setDueDate} />
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
