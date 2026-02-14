import { Dispatch, SetStateAction } from "react";
import { Priority, Filter } from "@/Types/TodoItemTypes";

export type SetBoolean = Dispatch<SetStateAction<boolean>>;
export type SetPriority = Dispatch<SetStateAction<Priority>>;
export type SetString = Dispatch<SetStateAction<string>>;
export type SetFilter = Dispatch<SetStateAction<Filter>>;
