import { useState, useMemo } from "react";
import { Filter, Priority } from "@/Types/TodoItemTypes";
import { useTodos } from "./TodoItem";
import { Flag, Calendar, Tag } from "lucide-react";

export interface FilterButtonProps {
  text: Filter;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}
export function useTaskForm() {
  const priorityRank = useMemo(
    () => ({
      high: 3,
      medium: 2,
      "": 1,
      low: 0,
    }),
    [],
  );

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

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "all") return true;
      if (filter === "completed") return todo.completed;
      if (filter === "active") return !todo.completed;
      return false;
    });
  }, [todos, filter]);

  const sortedTodos = useMemo(
    () =>
      [...filteredTodos].sort((a, b) => {
        if (a.completed !== b.completed) {
          return Number(a.completed) - Number(b.completed);
        }
        switch (sortBy) {
          case "dueDate":
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            return dateA - dateB;
          case "prioritySort":
            return (
              priorityRank[b.priority || ""] - priorityRank[a.priority || ""]
            );
          case "alphabetSort":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      }),
    [filteredTodos, sortBy, priorityRank],
  );

  return {
    title,
    setTitle,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    tags,
    setTags,
    showPriority,
    setShowPriority,
    showDueDate,
    setShowDueDate,
    showTags,
    setShowTags,
    isFocused,
    setIsFocused,
    optionalFields,
    optionalTags,
    handleSubmit,
    sortedTodos,
    filter,
    filteredTodos,
    setFilter,
    FilterButtons,
    sortBy,
    setSortBy,
  };
}
