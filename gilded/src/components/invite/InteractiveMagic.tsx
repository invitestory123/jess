import { useEffect, useRef, useState } from "react";
const petals = "https://media.invitestory.in/gilded-hall/src/assets/petals.png";

const moments = [
  { id: "story", label: "Story" },
  { id: "celebrations", label: "Festivities" },
  { id: "venue", label: "Venue" },
];

export function ExperienceRail() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      const marker = window.innerHeight * 0.42;
      const next = moments.reduce((found, moment, index) => {
        const el = document.getElementById(moment.id);
        return el && el.getBoundingClientRect().top <= marker ? index : found;
      }, 0);
      setActive(next);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav className="experience-rail" aria-label="Invitation sections">
      <span className="experience-rail__track" aria-hidden>
        <span style={{ transform: `scaleY(${progress})` }} />
      </span>
      {moments.map((moment, index) => (
        <button
          key={moment.id}
          type="button"
          className={active === index ? "is-active" : ""}
          onClick={() => document.getElementById(moment.id)?.scrollIntoView({ behavior: "smooth" })}
          aria-label={`Go to ${moment.label}`}
          aria-current={active === index ? "location" : undefined}
        >
          <span>{moment.label}</span>
          <i />
        </button>
      ))}
    </nav>
  );
}

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (event: PointerEvent) => {
      el.animate(
        { transform: `translate3d(${event.clientX - 230}px, ${event.clientY - 230}px, 0)` },
        { duration: 900, fill: "forwards", easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ref} className="cursor-aura" aria-hidden />;
}

export function PetalVeil() {
  return (
    <div className="petal-veil" aria-hidden>
      <img src={petals} alt="" />
    </div>
  );
}
