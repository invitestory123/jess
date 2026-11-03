import { CalendarPlus, Navigation, MapPin } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding, googleCalendarUrl, downloadICS, mapsEmbedUrl, mapsDirectionsUrl } from "../config";

export default function Venue() {
  return (
    <section className="relative px-6 py-24">
      <SectionHeading kicker="Where & When" title="The Venue" />

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-display text-3xl text-[#f6e2ae]">{wedding.venue.name}</h3>
          <p className="flex items-center gap-2 text-[13px] text-[#f3e7d3]/70">
            <MapPin size={14} className="text-[#d9a441]" />
            {wedding.venue.address}
          </p>
        </Reveal>

        {/* map */}
        <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-[#d9a441]/30 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
          <iframe
            title="Wedding venue map"
            src={mapsEmbedUrl}
            className="h-64 w-full grayscale-[35%] contrast-[1.05] sm:h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>

        {/* actions */}
        <Reveal delay={0.15} className="grid grid-cols-1 gap-3">
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#b9832e] via-[#e8c874] to-[#b9832e] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.25em] text-[#2b0a10] shadow-[0_8px_30px_rgba(217,164,65,0.35)] transition-transform active:scale-95"
          >
            <Navigation size={16} /> Get Directions
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-[#d9a441]/50 px-4 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f6e2ae] transition-colors hover:bg-[#d9a441]/10 active:scale-95"
            >
              <CalendarPlus size={15} /> Google Cal
            </a>
            <button
              onClick={downloadICS}
              className="flex items-center justify-center gap-2 rounded-full border border-[#d9a441]/50 px-4 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f6e2ae] transition-colors hover:bg-[#d9a441]/10 active:scale-95"
            >
              <CalendarPlus size={15} /> Apple / ICS
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
