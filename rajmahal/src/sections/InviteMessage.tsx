import Reveal from "../components/Reveal";
import Countdown from "../components/Countdown";
import { wedding } from "../config";

export default function InviteMessage() {
  return (
    <section className="relative flex flex-col items-center gap-12 px-6 py-24">
      <Reveal className="flex max-w-md flex-col items-center gap-5 text-center">
        <span className="font-display text-base tracking-[0.3em] text-[#d9b36a]">
          {wedding.verse.hindi}
        </span>
        <img src="https://media.invitestory.in/rajmahal-palace/assets/mandala.png" alt="" className="w-16 opacity-70" />
        <p className="font-display text-2xl italic leading-relaxed text-[#f3e7d3]/90">
          “{wedding.verse.text}”
        </p>
      </Reveal>

      <Reveal delay={0.15} className="flex flex-col items-center gap-6">
        <span className="text-[11px] uppercase tracking-[0.45em] text-[#d9b36a]">
          Counting down to the big day
        </span>
        <Countdown targetISO={wedding.dateISO} />
      </Reveal>
    </section>
  );
}
