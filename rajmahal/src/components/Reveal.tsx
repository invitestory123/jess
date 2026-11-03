import type { ReactNode } from "react";
import { motion } from "framer-motion";

// Scroll-reveal wrapper used across sections
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="mb-10 flex flex-col items-center gap-3 text-center">
      <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b36a]">
        {kicker}
      </span>
      <h2 className="font-script text-gold text-5xl sm:text-6xl">{title}</h2>
      <div className="hairline-gold w-40" />
    </Reveal>
  );
}
