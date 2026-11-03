import { motion } from "framer-motion";
import Aurora from "../components/Aurora";
import { wedding } from "../config";

// Diya with flickering glow — the auspicious lamp
function Diya({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1 }}
      className={`pointer-events-none absolute ${className}`}
    >
      <div
        className="absolute left-1/2 top-[18%] h-20 w-20 -translate-x-1/2 rounded-full blur-[26px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,70,0.75), rgba(255,120,30,0.25) 60%, transparent 75%)",
          animation: "flame-flicker 1.8s ease-in-out infinite",
          transformOrigin: "center bottom",
        }}
      />
      <img
        src="https://media.invitestory.in/rajmahal-palace/assets/diya.png"
        alt=""
        className="relative w-24 drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)] sm:w-28"
        style={{ animation: "diya-sway 5s ease-in-out infinite" }}
      />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-20">
      {/* texture + aurora */}
      <img
        src="https://media.invitestory.in/rajmahal-palace/assets/hero-bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#160408]/70 via-transparent to-[#160408]" />
      <Aurora />

      {/* rotating mandala behind everything */}
      <img
        src="https://media.invitestory.in/rajmahal-palace/assets/mandala.png"
        alt=""
        className="pointer-events-none absolute top-1/2 w-[125vmin] max-w-none -translate-y-1/2 opacity-[0.14]"
        style={{ animation: "spin-slow 80s linear infinite" }}
      />

      {/* diyas flanking the stage */}
      <Diya className="bottom-16 left-4 sm:left-10" delay={1.2} />
      <Diya className="bottom-16 right-4 sm:right-10" delay={1.45} />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        {/* Ganesha emblem — auspicious beginning */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px]"
            style={{
              background:
                "radial-gradient(circle, rgba(217,164,65,0.45), transparent 70%)",
              animation: "glow-pulse 4s ease-in-out infinite",
            }}
          />
          <img
            src="https://media.invitestory.in/rajmahal-palace/assets/ganesha.png"
            alt="Lord Ganesha"
            className="relative w-36 drop-shadow-[0_0_25px_rgba(217,164,65,0.45)] sm:w-44"
            style={{ animation: "float-soft 7s ease-in-out infinite" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="font-display text-sm tracking-[0.3em] text-[#e8c874]"
        >
          {wedding.verse.hindi}
        </motion.p>

        {/* names with sacred Om divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="font-script text-gold text-[20vw] leading-[1.15] sm:text-8xl">
            {wedding.bride}
          </h1>
          <div className="my-1 flex items-center gap-4">
            <div className="hairline-gold w-14" />
            <span className="text-gold font-display text-2xl leading-none">ॐ</span>
            <div className="hairline-gold w-14" />
          </div>
          <h1 className="font-script text-gold text-[20vw] leading-[1.15] sm:text-8xl">
            {wedding.groom}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-2 flex flex-col items-center gap-2"
        >
          <p className="font-display text-xl tracking-wide text-[#f3e7d3]">
            {wedding.dateLabel}
          </p>
          <p className="text-[12px] uppercase tracking-[0.3em] text-[#d9b36a]">
            {wedding.timeLabel} · {wedding.venue.name}
          </p>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 z-10 flex flex-col items-center gap-1.5"
        style={{ animation: "float-soft 3s ease-in-out infinite" }}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#d9b36a]/80">
          Scroll
        </span>
        <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
          <rect x="1" y="1" width="16" height="24" rx="8" stroke="#d9a441" strokeOpacity="0.6" />
          <motion.circle
            cx="9"
            cy="8"
            r="2.5"
            fill="#d9a441"
            animate={{ cy: [8, 16, 8], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
