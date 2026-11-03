import { Flower2, Music, Heart, Sparkles, MapPin, Clock } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding } from "../config";

const icons: Record<string, typeof Flower2> = {
  flower: Flower2,
  music: Music,
  heart: Heart,
  sparkles: Sparkles,
};

export default function Events() {
  return (
    <section className="relative px-6 py-24">
      <SectionHeading kicker="Save the Date" title="The Wedding" />

      <div className="relative mx-auto max-w-md">
        {/* timeline spine */}
        <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#d9a441]/40 to-transparent" />

        <div className="flex flex-col gap-8">
          {wedding.events.map((e, i) => {
            const Icon = icons[e.icon] ?? Sparkles;
            return (
              <Reveal key={e.name} delay={i * 0.08} className="relative pl-20">
                {/* node */}
                <div className="absolute left-0 top-1 flex h-14 w-14 items-center justify-center rounded-full border border-[#d9a441]/50 bg-[#2b0a10] shadow-[0_0_20px_rgba(217,164,65,0.25)]">
                  <Icon size={22} className="text-[#e8c874]" />
                </div>

                <div className="rounded-2xl border border-[#d9a441]/25 bg-white/[0.04] p-5 backdrop-blur-md transition-colors hover:border-[#d9a441]/50">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-script text-gold text-3xl">{e.name}</h3>
                    <span className="shrink-0 text-[9px] uppercase tracking-[0.18em] text-[#d9b36a]">
                      {e.date}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] italic text-[#f3e7d3]/75">{e.note}</p>
                  <div className="mt-3 flex flex-col gap-1.5 text-[12px] text-[#f3e7d3]/85">
                    <span className="flex items-center gap-2">
                      <Clock size={13} className="text-[#d9a441]" /> {e.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={13} className="text-[#d9a441]" /> {e.venue}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
