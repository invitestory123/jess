import Reveal, { SectionHeading } from "../components/Reveal";
import Aurora from "../components/Aurora";
import { wedding } from "../config";

export default function Couple() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Aurora className="opacity-60" />
      <SectionHeading kicker="The Couple" title="Two Souls, One Journey" />

      <div className="relative mx-auto flex max-w-md flex-col items-center">
        {/* illustration with glow */}
        <Reveal className="relative">
          <div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
            style={{
              background:
                "radial-gradient(circle, rgba(217,164,65,0.35), transparent 70%)",
              animation: "glow-pulse 4s ease-in-out infinite",
            }}
          />
          <img
            src="https://media.invitestory.in/rajmahal-palace/assets/couple.png"
            alt={`${wedding.brideFull} and ${wedding.groomFull}`}
            className="relative w-72 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] sm:w-80"
            style={{ animation: "float-soft 6s ease-in-out infinite" }}
          />
        </Reveal>

        {/* names + parents */}
        <div className="mt-10 grid w-full grid-cols-1 gap-8 text-center sm:grid-cols-2">
          <Reveal delay={0.1} className="flex flex-col gap-1">
            <h3 className="font-script text-gold text-4xl">{wedding.brideFull}</h3>
            <p className="text-[12px] leading-relaxed tracking-wide text-[#f3e7d3]/70">
              {wedding.brideParents}
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col gap-1">
            <h3 className="font-script text-gold text-4xl">{wedding.groomFull}</h3>
            <p className="text-[12px] leading-relaxed tracking-wide text-[#f3e7d3]/70">
              {wedding.groomParents}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
