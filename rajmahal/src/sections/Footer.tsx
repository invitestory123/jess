import Reveal from "../components/Reveal";
import { wedding } from "../config";

// Grand footer: texture behind, giant outlined names, static garland overlay on top
export default function Footer() {
  return (
    <footer className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden">
      {/* background texture */}
      <img
        src="https://media.invitestory.in/rajmahal-palace/assets/hero-bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#160408] via-[#160408]/40 to-[#0c0204]/90" />

      {/* marquee strip */}
      <div className="relative z-10 mb-6 overflow-hidden border-y border-[#d9a441]/25 py-3">
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "marquee 22s linear infinite" }}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-display px-4 text-sm uppercase tracking-[0.4em] text-[#d9b36a]"
            >
              {Array(6).fill(`${wedding.hashtag} ✦ ${wedding.dateLabel} ✦ `).join("")}
            </span>
          ))}
        </div>
      </div>

      {/* giant outlined names in the flow */}
      <div className="pointer-events-none relative z-0 -mb-8 flex select-none justify-center overflow-hidden">
        <span className="font-display text-outline-gold whitespace-nowrap text-[15vw] font-semibold uppercase leading-none tracking-tight opacity-45 sm:text-[11vw]">
          {wedding.bride} ♥ {wedding.groom}
        </span>
      </div>

      {/* closing message */}
      <Reveal className="relative z-10 mx-auto mb-14 mt-4 flex max-w-sm flex-col items-center gap-4 px-6 text-center">
        <img src="https://media.invitestory.in/rajmahal-palace/assets/mandala.png" alt="" className="w-14 opacity-80" />
        <p className="font-script text-gold text-4xl leading-snug">
          We can't wait to celebrate with you
        </p>
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#f3e7d3]/60">
          With love, the Sharma & Mehta families
        </p>
        <div className="hairline-gold mt-2 w-32" />
        <p className="text-[10px] tracking-[0.2em] text-[#f3e7d3]/40">
          {wedding.hashtag}
        </p>
        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 text-[10px] uppercase tracking-[0.35em] text-[#d9b36a]/70 transition-colors hover:text-[#d9b36a]"
        >
          Follow @invitestory.in on Instagram
        </a>
      </Reveal>

      {/* static garland overlay — hangs over the footer top */}
      <img
        src="https://media.invitestory.in/rajmahal-palace/assets/footer-garland.png"
        alt=""
        className="pointer-events-none absolute left-1/2 top-0 z-20 w-[150%] max-w-none -translate-x-1/2 sm:w-full"
      />
    </footer>
  );
}
