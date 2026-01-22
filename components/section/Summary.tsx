import { ChevronRight } from "lucide-react";
export function Summary() {
  return (
    <section className="mt-[6rem] mb w-full max-w-[85vw] mx-auto">
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br    from-emerald-900/30 to-emerald-950/20 border border-emerald-700/30 rounded-lg p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-400/70 text-sm font-medium">
              Weekly Progress{" "}
            </span>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
          <div className="text-4xl font-bold text-white mb-1">24</div>
          <div className="flex w-full items-center justify-between">
            <p className="text-emerald-400/60 text-xs">+3 from yesterday</p>
            <div className="bg-emerald-400 flex gap-2 items-center hover:gap-4 transition-all duration-300 hover:cursor-pointer rounded-xl  text-black px-4 py-2 font-light text-xs">
              Finish Remaining Tasks
              <ChevronRight />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
