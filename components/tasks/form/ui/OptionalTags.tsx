import { ChevronDown, LucideIcon } from "lucide-react";

export function OptionalTags({
  setShowState,
  showState,
  Icon,
  text,
  id,
}: {
  setShowState: React.Dispatch<React.SetStateAction<boolean>>;
  showState: boolean;
  Icon: LucideIcon;
  text: string;
  id: string;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={() => setShowState(!showState)}
      className={`flex hover:cursor-pointer bg-black items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
    transition-all duration-200 relative
    ${
      showState
        ? "bg-gradient-to-br from-secondary/50 to-primary/30 px-6 py-2 hover:bg-secondary/40  text-white shadow-sm"
        : "bg-gradient-to-br from-secondary/30 to-primary/15 px-6 py-2 hover:bg-secondary/40 text-white border border-primary/20 hover:border-primary/30"
    }`}
    >
      <Icon className="w-4 h-4" />
      {text}
      <ChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${
          showState ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>
  );
}
