import { useState } from "react";
import { Filter, Priority } from "@/Types/TodoItemTypes";
import { useTodos } from "./TodoItem";
import { Flag, Calendar, Tag } from "lucide-react";
import { useTodoSort } from "./useTodoSort";
import { useTodoFilter } from "./useTodoFilter";

export interface FilterButtonProps {
  text: Filter;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}
export function useTaskForm() {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");

  const [showPriority, setShowPriority] = useState<boolean>(false);
  const [showDueDate, setShowDueDate] = useState<boolean>(false);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [sortBy, setSortBy] = useState<string>("dueDate");
  const { todos, addTodo } = useTodos();
  const filteredTodos = useTodoFilter({ todos, filter });
  const sortedTodos = useTodoSort({ todos: filteredTodos, sortBy });

  const today = new Date().toISOString().split("T")[0];
  const FilterButtons: FilterButtonProps[] = [
    {
      text: "all",
      filter: filter,
      setFilter: setFilter,
    },
    {
      text: "active",
      filter: filter,
      setFilter: setFilter,
    },
    {
      text: "completed",
      filter: filter,
      setFilter: setFilter,
    },
  ];
  const optionalFields = [
    {
      id: "priority",
      label: "Priority",
      type: "select" as const,
      width: "w-48",
      value: priority,
      onChange: setPriority,
      show: showPriority,
      options: [
        { value: "", label: "No priority" },
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
      ],
    },
    {
      id: "dueDate",
      label: "Due date",
      type: "date" as const,
      width: "w-56",
      value: dueDate,
      onChange: setDueDate,
      show: showDueDate,
      min: today,
    },
    {
      id: "tags",
      label: "Tags",
      type: "text" as const,
      width: "w-72",
      value: tags,
      onChange: setTags,
      show: showTags,
      placeholder: "work, urgent, personal...",
    },
  ];
  const optionalTags = [
    {
      id: "priority",
      label: "Priority",
      icon: Flag,
      state: showPriority,
      setter: setShowPriority,
    },

    {
      id: "dueDate",
      label: "Due Date",
      icon: Calendar,
      state: showDueDate,
      setter: setShowDueDate,
    },
    {
      id: "tags",
      label: "Tags",
      icon: Tag,
      state: showTags,
      setter: setShowTags,
    },
  ];
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;

    const tagsArray = tags.split(",").map((tag) => tag.trim());
    addTodo(title, priority, dueDate, tagsArray);

    setTitle("");
    setPriority("");
    setDueDate("");
    setTags("");
    setShowPriority(false);
    setShowDueDate(false);
    setShowTags(false);
  }

  return {
    title,
    setTitle,
    isFocused,
    setIsFocused,
    optionalFields,
    optionalTags,
    handleSubmit,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    FilterButtons,
    filteredTodos,
    sortedTodos,
  };
}
