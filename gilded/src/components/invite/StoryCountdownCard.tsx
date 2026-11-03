import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";
import { Reveal } from "./Reveal";

interface StoryCountdownProps {
  countdownTarget: string;
  dateLabel: string;
}

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export function StoryCountdownCard({ countdownTarget, dateLabel }: StoryCountdownProps) {
  const ts = new Date(countdownTarget).getTime();
  const [time, setTime] = useState(() => diff(ts));
  useEffect(() => {
    const tick = () => setTime(diff(ts));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [ts]);
  const units = [
    [time.days, "days"],
    [time.hours, "hours"],
    [time.minutes, "minutes"],
    [time.seconds, "seconds"],
  ] as const;

  return (
    <section className="story-editorial" aria-labelledby="story-and-countdown-title">
      <div className="story-editorial__copy">
        <Reveal>
          <p className="section-kicker">How it began</p>
          <h2 id="story-and-countdown-title">One conversation that never really ended.</h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="story-editorial__prose">
            <p>{wedding.story[0]}</p>
            <p>{wedding.story[1]}</p>
          </div>
        </Reveal>
        <Reveal delay={220}>
          <p className="countdown-label">Until the muhurtham</p>
          <div className="editorial-countdown" aria-label="Countdown to the wedding">
            {units.map(([value, label]) => (
              <div key={label}>
                <span>{String(value).padStart(2, "0")}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
          <p className="story-date">{dateLabel}</p>
        </Reveal>
      </div>
    </section>
  );
}
