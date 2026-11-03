// Aurora background — drifting blurred light blobs (react-bits style, hand-rolled)
export default function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute -left-[20%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(217,164,65,0.28), transparent 65%)",
          animation: "drift-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[-25%] top-[20%] h-[55vmax] w-[55vmax] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(140,24,48,0.42), transparent 65%)",
          animation: "drift-b 32s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[10%] h-[50vmax] w-[50vmax] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(245,158,60,0.18), transparent 65%)",
          animation: "drift-c 38s ease-in-out infinite",
        }}
      />
    </div>
  );
}
