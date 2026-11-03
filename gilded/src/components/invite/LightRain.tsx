import { useMemo } from "react";

/** Cascading strands of golden light — the reference's ceiling treatment. */
export function LightRain({ count = 26, className = "" }: { count?: number; className?: string }) {
  const strands = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: ((i + 0.5) / count) * 100 + (i % 3) * 0.6,
        delay: (i % 7) * 1.1 + (i % 3) * 0.4,
        duration: 7 + (i % 5) * 1.6,
        height: 22 + (i % 4) * 12,
        opacity: 0.25 + (i % 4) * 0.18,
      })),
    [count],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {strands.map((s, i) => (
        <span
          key={i}
          className="absolute top-0 w-px"
          style={{
            left: `${s.left}%`,
            height: `${s.height}%`,
            opacity: s.opacity,
            background:
              "linear-gradient(180deg, transparent, var(--hall-glow) 30%, var(--hall-light) 60%, transparent)",
            animation: `rain-light ${s.duration}s linear ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
