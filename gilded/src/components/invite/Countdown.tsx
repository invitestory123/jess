import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <li className="flex flex-1 flex-col items-center gap-2">
      <span
        key={text}
        className="min-w-0 w-full rounded-[2px] border border-hall-glow/35 bg-hall-deep/35 px-1 py-3 text-center font-title text-[clamp(1.35rem,7vw,2rem)] leading-none text-hall-light tabular-nums"
        style={{ animation: "shimmer-slow 600ms var(--ease-silk) 1" }}
      >
        {text}
      </span>
      <span className="text-[0.58rem] uppercase tracking-[0.32em] text-ivory-soft/70">{label}</span>
    </li>
  );
}

export function Countdown({ target }: { target: string }) {
  const ts = new Date(target).getTime();
  const [t, setT] = useState(() => diff(ts));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(diff(ts));
    const id = setInterval(() => setT(diff(ts)), 1000);
    return () => clearInterval(id);
  }, [ts]);

  return (
    <ul
      className="mx-auto flex w-full max-w-xs items-start gap-2"
      aria-label="Countdown to the wedding"
      suppressHydrationWarning
    >
      <Digit value={mounted ? t.days : 0} label="Days" />
      <Digit value={mounted ? t.hours : 0} label="Hrs" />
      <Digit value={mounted ? t.minutes : 0} label="Min" />
      <Digit value={mounted ? t.seconds : 0} label="Sec" />
    </ul>
  );
}
