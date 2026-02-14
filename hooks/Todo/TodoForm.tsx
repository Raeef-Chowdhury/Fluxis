import { useState } from "react";
import { Filter, Priority } from "@/Types/TodoItemTypes";
import { useTodos } from "./TodoItem";
import { Tag } from "lucide-react";
import { useTodoSort } from "./useTodoSort";
import { useTodoFilter } from "./useTodoFilter";
import {
  FilterButtonProps,
  OptionalFieldsType,
  OptionalTagsType,
} from "@/Types/TodoFormTypes";
export function useTaskForm() {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");

  const [showTags, setShowTags] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [sortBy, setSortBy] = useState<string>("dueDate");
  const { todos, addTodo } = useTodos();
  const filteredTodos = useTodoFilter({ todos, filter });
  const sortedTodos = useTodoSort({ todos: filteredTodos, sortBy });

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
  const optionalFields: OptionalFieldsType[] = [
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
  const optionalTags: OptionalTagsType[] = [
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
    addTodo(title, priority as Priority, dueDate, tagsArray);

    setTitle("");
    setPriority("");
    setDueDate("");
    setTags("");
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
    priority,
    setPriority,
    dueDate,
    setDueDate,
  };
}
