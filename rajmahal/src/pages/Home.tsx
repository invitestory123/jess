import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import IntroGate from "../sections/IntroGate";
import Hero from "../sections/Hero";
import InviteMessage from "../sections/InviteMessage";
import Couple from "../sections/Couple";
import Events from "../sections/Events";
import Venue from "../sections/Venue";
import Footer from "../sections/Footer";
import Petals from "../components/Petals";

type Stage = "closed" | "opening" | "open";

export default function Home() {
  const [stage, setStage] = useState<Stage>("closed");

  // Buttery smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let id = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  // Lock scroll until the doors have fully opened
  useEffect(() => {
    document.body.style.overflow = stage === "open" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  return (
    <main className="relative min-h-svh bg-[#160408]">
      {/* content gently settles into place as the doors part */}
      <motion.div
        initial={{ scale: 1.07 }}
        animate={{ scale: stage === "closed" ? 1.07 : 1 }}
        transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <InviteMessage />
        <Couple />
        <Events />
        <Venue />
        <Footer />
      </motion.div>

      {stage === "open" && <Petals count={14} />}

      <AnimatePresence>
        {stage !== "open" && (
          <IntroGate
            onOpening={() => setStage("opening")}
            onOpened={() => setStage("open")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
