import { useState, useRef, useEffect } from "react";

interface UseInlineEditingTextProps {
  text: string;
}

export function useInlineEditingText({ text }: UseInlineEditingTextProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [curText, setCurText] = useState<string>(text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setCurText(text);
    }
  }, [text, isEditing]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function handleDoubleClick() {
    setIsEditing(true);
    setCurText(text);
  }

  function handleBlur() {
    if (isEditing) {
      setIsEditing(false);

      if (curText.trim() !== text) {
        setCurText(text);
      } else {
        setCurText(text);
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurText(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setCurText(text);
      setIsEditing(false);
    }
  }

  return {
    isEditing,
    curText,
    inputRef,
    handleDoubleClick,
    handleBlur,
    handleChange,
    handleKeyDown,
  };
}
