import { Filter } from "@/Types/TodoItemTypes";
import { SetString, SetFilter, SetBoolean } from "./PropTypes";
import { LucideIcon } from "lucide-react";
export interface FilterButtonProps {
  text: Filter;
  filter: Filter;
  setFilter: SetFilter;
}
export interface OptionalFieldsType {
  id: string;
  label: string;
  value: string;
  onChange: SetString;
  type: "text" | "date" | "select";
  width: string;
  options?: { value: string; label: string }[];
  show: boolean;
  placeholder?: string;
  min?: string;
}
export interface OptionalTagsType {
  id: string;
  label: string;
  icon: LucideIcon;
  state: boolean;
  setter: SetBoolean;
}
