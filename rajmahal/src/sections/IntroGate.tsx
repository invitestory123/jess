import { useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "../config";

const doorEase: [number, number, number, number] = [0.65, 0, 0.35, 1];

// Envelope-style gate + palace-door opening transition
export default function IntroGate({
  onOpening,
  onOpened,
}: {
  onOpening: () => void;
  onOpened: () => void;
}) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpening();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Left door ── */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#1d060a]"
        animate={opening ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.5, delay: 0.35, ease: doorEase }}
      >
        <img
          src="https://media.invitestory.in/rajmahal-palace/assets/hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#160408]/60 to-transparent" />
        {/* half mandala — splits as doors part */}
        <img
          src="https://media.invitestory.in/rajmahal-palace/assets/mandala.png"
          alt=""
          className="absolute right-[-42vmin] top-1/2 w-[84vmin] max-w-none -translate-y-1/2 opacity-25"
        />
      </motion.div>

      {/* ── Right door ── */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-[#1d060a]"
        animate={opening ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.5, delay: 0.35, ease: doorEase }}
        onAnimationComplete={() => opening && onOpened()}
      >
        <img
          src="https://media.invitestory.in/rajmahal-palace/assets/hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-left opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#160408]/60 to-transparent" />
        <img
          src="https://media.invitestory.in/rajmahal-palace/assets/mandala.png"
          alt=""
          className="absolute left-[-42vmin] top-1/2 w-[84vmin] max-w-none -translate-y-1/2 opacity-25"
        />
      </motion.div>

      {/* ── Light spilling through the seam ── */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[70px] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,214,130,0.85), transparent)",
          filter: "blur(10px)",
        }}
        initial={{ opacity: 0, scaleX: 0.1 }}
        animate={opening ? { opacity: [0, 1, 0.9], scaleX: [0.1, 1, 2.2] } : {}}
        transition={{ duration: 1.5, delay: 0.35, ease: doorEase }}
      />

      {/* ── Gate content ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        animate={opening ? { opacity: 0, y: -26 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative flex flex-col items-center gap-6 text-center"
        >
          <motion.img
            src="https://media.invitestory.in/rajmahal-palace/assets/ganesha.png"
            alt="Lord Ganesha"
            className="w-24 drop-shadow-[0_0_20px_rgba(217,164,65,0.5)] sm:w-28"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          />
          <span className="font-display text-sm tracking-[0.35em] text-[#d9b36a]">
            {wedding.verse.hindi}
          </span>
          <p className="text-[11px] uppercase tracking-[0.5em] text-[#f3e7d3]/70">
            You are cordially invited to
          </p>
          <h1 className="font-script text-gold text-6xl leading-tight sm:text-7xl">
            {wedding.bride} & {wedding.groom}
          </h1>

          <motion.button
            onClick={handleOpen}
            whileTap={{ scale: 0.94 }}
            className="group relative mt-4 rounded-full border border-[#d9a441]/60 px-10 py-4 text-[12px] uppercase tracking-[0.35em] text-[#f6e2ae] transition-colors hover:bg-[#d9a441]/10"
          >
            <span
              className="absolute inset-0 rounded-full border border-[#d9a441]/40"
              style={{ animation: "glow-pulse 2.6s ease-in-out infinite" }}
            />
            Open Invitation ✦
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
