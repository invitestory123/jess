import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function useCountdown(targetISO: string) {
  const target = new Date(targetISO).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="flex w-[72px] flex-col items-center gap-2 rounded-2xl border border-[#d9a441]/30 bg-white/[0.04] px-2 py-4 backdrop-blur-md sm:w-20">
      <div className="relative h-10 overflow-visible">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={text}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-display text-gold block text-4xl font-semibold leading-none"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] uppercase tracking-[0.25em] text-[#d9b36a]/80">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ targetISO }: { targetISO: string }) {
  const { days, hours, minutes, seconds } = useCountdown(targetISO);
  return (
    <div className="flex items-stretch justify-center gap-3 sm:gap-4">
      <Unit value={days} label="Days" />
      <Unit value={hours} label="Hours" />
      <Unit value={minutes} label="Mins" />
      <Unit value={seconds} label="Secs" />
    </div>
  );
}
