import OptionalTags from "@/components/tasks/form/OptionalTags";
import { OptionalField } from "@/components/tasks/form/OptionalFields";
import { AddTask } from "./AddTaskInput";
import { Dispatch, SetStateAction } from "react";

function TaskForm({
  handleSubmit,
  title,
  setTitle,
  setIsFocused,
  isFocused,
  optionalFields,
  optionalTags,
}: {
  handleSubmit: any;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  isFocused: boolean;
  optionalFields: any[];
  optionalTags: any[];
}) {
  return (
    <div
      className="mb-12 max-w-5xl mx-auto rounded-2xl 
        bg-primary/5 border border-primary/10 
        p-6 md:p-8 backdrop-blur-sm  "
    >
      <form onSubmit={handleSubmit} className="space-y-3  ">
        <div className="flex gap-3 items-start">
          <div className="flex-1">
            <AddTask
              text={title}
              setTitle={setTitle}
              setIsFocused={setIsFocused}
            />

            {isFocused && (
              <div className="flex gap-2 mt-6 bg-primary/5 p-3 rounded-xl inline-flex">
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
              </div>
            )}

            <div className="flex gap-4 mt-6 pl-1">
              {optionalFields.map((field) => (
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
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="hover:cursor-pointer bg-secondary/70 hover:bg-secondary/90 text-white font-medium 
                px-6 py-3.5 rounded-lg text-sm transition-all duration-300 
                hover:scale-105 active:scale-95 shrink-0"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
export default TaskForm;
