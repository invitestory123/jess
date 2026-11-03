import { useMemo } from "react";

// Floating marigold petals — pure CSS animation, randomized per petal
export default function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 9 + Math.random() * 10,
        fallDuration: 11 + Math.random() * 10,
        swayDuration: 2.4 + Math.random() * 2,
        delay: -Math.random() * 20,
        hue: Math.random() > 0.5,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            animation: `fall ${p.fallDuration}s linear ${p.delay}s infinite`,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size * 1.35,
              borderRadius: "60% 40% 55% 45%",
              background: p.hue
                ? "linear-gradient(160deg,#f7b733,#e06a1b 70%)"
                : "linear-gradient(160deg,#ffd166,#d9822b 70%)",
              boxShadow: "0 0 6px rgba(230,140,40,0.45)",
              animation: `sway ${p.swayDuration}s ease-in-out infinite alternate`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
