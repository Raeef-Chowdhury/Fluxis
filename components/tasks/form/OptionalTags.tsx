import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
function OptionalTags({
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
      className={`flex hover:cursor-pointer  items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
    transition-all duration-200
    ${
      showState
        ? "bg-secondary/20 text-white border-2 border-secondary/60 shadow-sm"
        : "bg-primary/5 text-white/50 hover:text-white hover:bg-primary/15 border border-primary/20 hover:border-primary/30"
    }`}
    >
      <Icon className="w-4 h-4" />
      {text}
      {showState && <ChevronUp className="w-3 h-3" />}
      {!showState && <ChevronDown className="w-3 h-3" />}
    </button>
  );
}
export default OptionalTags;
