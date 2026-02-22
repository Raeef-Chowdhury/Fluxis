import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function TaskAddedToast({ title }: { title: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="relative flex items-center gap-3.5 
                   bg-primary/10 backdrop-blur-md
                   border border-emerald-500/20
                   rounded-xl px-5 py-4
                   shadow-[0_0_24px_rgba(16,185,129,0.08),0_8px_32px_rgba(0,0,0,0.4)]
                   min-w-[300px] max-w-sm overflow-hidden"
      >
        {/* Subtle glow streak */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

        {/* Icon */}
        <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" strokeWidth={2} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-emerald-300 font-semibold text-sm tracking-wide">
            Task Added
          </p>
          <p className="text-white/40 text-xs truncate mt-0.5 tracking-wider">
            {title}
          </p>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500/80 to-emerald-300/40 rounded-full"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 3, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
