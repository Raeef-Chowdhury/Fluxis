import { PrioritiesCard } from "@/components/cards/PrioritiesCard";
import { mockPriorities } from "@/Data/MockPriorities";
import { IncompletePriorities } from "@/components/cards/IncompletePriorities";
import { EmptyPriorities } from "../cards/EmptyPriorities";
function Priorities() {
  return (
    <section className="mt-[6rem] w-full max-w-[85vw] mx-auto">
      <h2 className="text-[1.8rem] font-semibold tracking-tight text-white text-left ">
        Your Top Priorities
      </h2>{" "}
      <div className="grid grid-cols-3 gap-12 mt-[1.6rem] items-start">
        {mockPriorities.map((priority) => {
          const priorityColors = {
            HIGH: {
              border: "border-high-priority",
              bg: "bg-high-priority/20",
              text: "text-high-priority-shade",
              progress: "bg-high-priority",
            },
            MEDIUM: {
              border: "border-med-priority",
              bg: "bg-med-priority/20",
              text: "text-med-priority-shade",
              progress: "bg-med-priority",
            },
            LOW: {
              border: "border-low-priority",
              bg: "bg-low-priority/20",
              text: "text-low-priority-shade",
              progress: "bg-low-priority",
            },
          };

          const colors = priorityColors[priority.priority];

          return (
            <PrioritiesCard
              key={priority.id}
              colors={colors}
              priority={priority}
            />
          );
        })}
        {mockPriorities.length < 3 && mockPriorities.length > 0 && (
          <IncompletePriorities />
        )}
        {mockPriorities.length < 1 && <EmptyPriorities />}
      </div>
    </section>
  );
}
export default Priorities;
