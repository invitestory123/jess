import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
const hall = "https://media.invitestory.in/gilded-hall/src/assets/hall.png";
const coverImg = "https://media.invitestory.in/gilded-hall/src/assets/cover.png";
const introVideo = "https://media.invitestory.in/gilded-hall/src/assets/intro.mp4";
const coupleVideo = "https://media.invitestory.in/gilded-hall/src/assets/couple.mp4";
const divider = "https://media.invitestory.in/gilded-hall/src/assets/divider.png";
const floral = "https://media.invitestory.in/gilded-hall/src/assets/floral.png";
import { LightRain } from "@/components/invite/LightRain";
import { Countdown } from "@/components/invite/Countdown";
import { StoryCountdownCard } from "@/components/invite/StoryCountdownCard";
import { CelebrationsCard } from "@/components/invite/CelebrationsCard";
import { Reveal } from "@/components/invite/Reveal";
import { useParallax } from "@/hooks/useReveal";
import { buildIcs, wedding } from "@/lib/wedding";
import { CursorGlow, ExperienceRail, PetalVeil } from "@/components/invite/InteractiveMagic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${wedding.groom} & ${wedding.bride} — ${wedding.shortDate}` },
      {
        name: "description",
        content: `${wedding.groom} weds ${wedding.bride} on ${wedding.dateLabel} at ${wedding.venue.name}. Events, venue and calendar details.`,
      },
      { property: "og:title", content: `${wedding.groom} & ${wedding.bride}` },
      {
        property: "og:description",
        content: `An invitation to our wedding — ${wedding.dateLabel}, ${wedding.venue.name}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Ornament({ className = "", width = 260 }: { className?: string; width?: number }) {
  return (
    <img
      src={divider}
      alt=""
      aria-hidden
      loading="lazy"
      width={1200}
      height={512}
      className={`mx-auto h-auto opacity-80 ${className}`}
      style={{ width }}
    />
  );
}

type Stage = "cover" | "intro" | "couple" | "content";

function CoverScreen({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className={`fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-hidden bg-black select-none transition-opacity duration-700 ${
        open ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={open}
    >
      {/* Background Cover Image */}
      <img
        src={coverImg}
        alt="Royal Wedding Invitation Cover"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 scale-100 hover:scale-[1.02]"
        fetchPriority="high"
      />

      {/* Subtle vignette & ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(20,12,3,0.6) 80%, rgba(10,5,0,0.85) 100%)",
        }}
      />
      <LightRain count={16} />

      {/* Center Tap Prompt Action */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="press group relative flex items-center gap-3 rounded-full border border-hall-glow/70 bg-[#251707]/85 px-8 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_24px_rgba(233,200,121,0.4)] backdrop-blur-md transition-all duration-300 hover:border-hall-glow hover:bg-[#34200a]/90 hover:shadow-[0_10px_40px_rgba(233,200,121,0.6)] cursor-pointer"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-hall-glow/20 text-hall-glow shadow-[0_0_12px_rgba(233,200,121,0.6)]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="font-title text-[0.72rem] uppercase tracking-[0.38em] text-hall-light group-hover:text-white">
            Tap To Open
          </span>
        </button>
      </div>
    </div>
  );
}

function Invitation() {
  const [stage, setStage] = useState<Stage>("cover");
  const [coverOpen, setCoverOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [coupleVisible, setCoupleVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const introRef = useRef<HTMLVideoElement | null>(null);
  const coupleRef = useRef<HTMLVideoElement | null>(null);
  const glowRef = useParallax(0.16);

  const startPlayback = useCallback(() => {
    setStage("intro");
    setIntroVisible(true);
    if (introRef.current) {
      introRef.current.currentTime = 0;
      introRef.current.play().catch(() => {
        if (introRef.current) {
          introRef.current.muted = true;
          setIsMuted(true);
          introRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  const handleIntroPlaying = useCallback(() => {
    setCoverOpen(true);
  }, []);

  const handleIntroEnded = useCallback(() => {
    setStage("couple");
    setCoupleVisible(true);
    if (coupleRef.current) {
      coupleRef.current.currentTime = 0;
      coupleRef.current.play().catch(() => {
        if (coupleRef.current) {
          coupleRef.current.muted = true;
          setIsMuted(true);
          coupleRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  const handleCouplePlaying = useCallback(() => {
    // When couple video starts playing, fade out intro video smoothly
    setIntroVisible(false);
  }, []);

  const handleCoupleEnded = useCallback(() => {
    setStage("content");
    setCoupleVisible(false);
  }, []);

  const skipCurrentVideo = useCallback(() => {
    if (stage === "intro") {
      handleIntroEnded();
    } else if (stage === "couple") {
      handleCoupleEnded();
    }
  }, [stage, handleIntroEnded, handleCoupleEnded]);

  const toggleSound = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (introRef.current) introRef.current.muted = next;
      if (coupleRef.current) coupleRef.current.muted = next;
      return next;
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = !coverOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [coverOpen]);

  const addToCalendar = useCallback(() => {
    const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aarav-ananya-wedding.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, []);

  const isContentStage = stage === "content";
  const isHeroTextVisible = stage === "couple" || stage === "content";

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--grad-hall)" }}
    >
      <CursorGlow />
      {isContentStage && <ExperienceRail />}
      {/* ── Initial Cover Screen (Fades out when Intro begins playing) ── */}
      <CoverScreen open={coverOpen} onOpen={startPlayback} />

      {/* ── Hero & Video Presentation Section ── */}
      <section className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden bg-[#150e04]">
        {/* Golden Hall Backdrop (Layer 0 - always solid underneath once opened) */}
        <img
          src={hall}
          alt="Golden reception hall with illuminated arches, ivory floral pillars and cascading light"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />

        {/* Video 2: Couple Standing Video (Layer 1 - z-10) */}
        <video
          ref={coupleRef}
          src={coupleVideo}
          playsInline
          muted={isMuted}
          preload="auto"
          onPlaying={handleCouplePlaying}
          onEnded={handleCoupleEnded}
          className={`absolute inset-0 h-full w-full object-cover z-10 transition-opacity duration-700 ${
            coupleVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Video 1: Luxury Intro Video (Layer 2 - z-20) */}
        <video
          ref={introRef}
          src={introVideo}
          playsInline
          muted={isMuted}
          preload="auto"
          onPlaying={handleIntroPlaying}
          onEnded={handleIntroEnded}
          className={`absolute inset-0 h-full w-full object-cover z-20 transition-opacity duration-700 ${
            introVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Ambient overlay */}
        <div
          className={`absolute inset-0 pointer-events-none z-15 transition-opacity duration-1000 ${
            isHeroTextVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(180deg, rgba(74,51,18,0.72) 0%, rgba(110,77,25,0.28) 45%, rgba(74,51,18,0.05) 65%, rgba(74,51,18,0.55) 100%)",
          }}
        />
        {isHeroTextVisible && <LightRain />}

        {/* Top Controls during video playback: Skip & Sound Toggle */}
        {(stage === "intro" || stage === "couple") && (
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="press flex h-9 w-9 items-center justify-center rounded-full border border-hall-glow/60 bg-hall-deep/80 text-hall-light shadow-lg backdrop-blur-md cursor-pointer"
              title={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={skipCurrentVideo}
              className="press flex items-center gap-1.5 rounded-full border border-hall-glow/60 bg-hall-deep/80 px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-hall-light shadow-lg backdrop-blur-md cursor-pointer hover:border-hall-glow"
            >
              <span>Skip</span>
              <span className="text-[0.7rem]">▶▶</span>
            </button>
          </div>
        )}

        {/* Names & Wedding Details revealed directly during couple video and remaining for content */}
        <div
          className={`relative z-20 px-6 text-center transition-opacity duration-700 ${
            isHeroTextVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 10svh)" }}
        >
          <p
            className={`font-body text-[0.58rem] uppercase tracking-[0.42em] text-hall-light/85 reveal ${isHeroTextVisible ? "reveal-on" : ""}`}
            style={{ transitionDelay: "300ms" }}
          >
            Shubh Vivah
          </p>
          <h1
            className={`mt-5 font-display text-[clamp(3rem,17vw,5rem)] font-light leading-[0.95] gold-text reveal ${isHeroTextVisible ? "reveal-on" : ""}`}
            style={{ transitionDelay: "900ms" }}
          >
            {wedding.groom}
            <span className="block font-title text-[0.32em] tracking-[0.3em] text-hall-light/90 my-3">
              &amp;
            </span>
            {wedding.bride}
          </h1>
          <div
            className={`reveal ${isHeroTextVisible ? "reveal-on" : ""}`}
            style={{ transitionDelay: "1200ms" }}
          >
            <Ornament className="mt-6" width={200} />
            <p className="mt-4 font-title text-[0.82rem] tracking-[0.36em] text-hall-light">
              {wedding.shortDate}
            </p>
          </div>
          <p
            className={`mx-auto mt-5 max-w-[19rem] font-display text-[1.02rem] italic leading-relaxed text-ivory/90 reveal ${isHeroTextVisible ? "reveal-on" : ""}`}
            style={{ transitionDelay: "1500ms" }}
          >
            {wedding.invitationLine}
          </p>
        </div>

        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(233,200,121,0.35), transparent 70%)",
          }}
        />
      </section>

      {/* ── Story & Countdown ── */}
      <div id="story">
        <StoryCountdownCard
          countdownTarget={wedding.countdownTarget}
          dateLabel={wedding.dateLabel}
        />
      </div>

      {/* ── Events / Celebrations ── */}
      <div id="celebrations">
        <CelebrationsCard />
      </div>

      {/* ── Venue ── */}
      <section id="venue" className="relative px-6 py-20" aria-labelledby="venue-title">
        <PetalVeil />
        <div className="mx-auto max-w-[34rem] text-center">
          <Reveal>
            <h3
              id="venue-title"
              className="font-title text-[0.66rem] uppercase tracking-[0.42em] text-hall-glow"
            >
              The Venue
            </h3>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 font-display text-[clamp(1.5rem,6.4vw,1.9rem)] font-light text-ivory">
              {wedding.venue.name}
            </p>
            <p className="mx-auto mt-3 max-w-[22rem] text-[0.92rem] font-light leading-relaxed text-ivory/75">
              {wedding.venue.address}
            </p>
            <p className="mt-2 text-[0.72rem] uppercase tracking-[0.26em] text-hall-glow/80">
              {wedding.venue.hint}
            </p>
          </Reveal>
          <Reveal delay={220} className="mt-8">
            <div className="overflow-hidden rounded-[2px] border border-hall-glow/35 shadow-[var(--shadow-warm)]">
              <iframe
                title={`Map of ${wedding.venue.name}`}
                src={wedding.venue.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-52 w-full grayscale-[0.3] sepia-[0.35] contrast-[1.05]"
              />
            </div>
          </Reveal>
          <Reveal delay={300} className="mt-7 flex flex-col gap-3">
            <a
              href={wedding.venue.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex min-h-[48px] items-center justify-center rounded-[2px] border border-hall-glow/60 bg-hall-deep/30 px-6 font-body text-[0.66rem] uppercase tracking-[0.32em] text-hall-light"
            >
              Open in Google Maps
            </a>
            <button
              type="button"
              onClick={addToCalendar}
              className="press inline-flex min-h-[48px] items-center justify-center rounded-[2px] px-6 font-body text-[0.66rem] uppercase tracking-[0.32em] text-ink"
              style={{ background: "var(--grad-gold)" }}
            >
              Add to Calendar
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── Closing ── */}
      <footer
        className="relative overflow-hidden px-6 pb-16 pt-24 text-center"
        style={{
          background: "linear-gradient(180deg, rgba(74,51,18,0.25) 0%, #6b4a17 35%, #4a3312 100%)",
        }}
      >
        <LightRain count={14} />
        <img
          src={floral}
          alt=""
          aria-hidden
          loading="lazy"
          width={640}
          height={1280}
          className="pointer-events-none absolute -right-14 bottom-0 w-32 opacity-25 mix-blend-screen sm:w-44"
        />
        <div className="relative">
          <Reveal>
            <Ornament width={190} />
            <p className="mt-8 font-display text-[clamp(2.3rem,12vw,3.2rem)] font-light leading-tight gold-text">
              {wedding.groom} &amp; {wedding.bride}
            </p>
            <p className="mt-4 font-title text-[0.74rem] tracking-[0.34em] text-hall-light">
              {wedding.shortDate}
            </p>
            <p className="mx-auto mt-6 max-w-[20rem] font-display text-[1.05rem] italic text-ivory/80">
              {wedding.closing}
            </p>
            <div className="rule-gold mx-auto mt-10 w-32" />
          </Reveal>
          <a
            href="https://www.instagram.com/invitestory.in/"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block font-body text-[0.5rem] uppercase tracking-[0.3em] text-hall-light/35 transition-colors hover:text-hall-glow/70"
          >
            Follow @invitestory.in on Instagram
          </a>
        </div>
      </footer>
    </main>
  );
}
