import { useState, useRef, useCallback, useEffect } from "react";
import { config } from "@/config/valentine";
import { FloatingHearts } from "@/components/valentine/FloatingHearts";
import { Confetti } from "@/components/valentine/Confetti";

const resolveText = (text: string) => text.replace("{name}", config.name);

// ── Section 1: Intro ──
const IntroSection = () => {
  const scrollDown = () =>
    document.getElementById("reasons")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="valentine-gradient relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <FloatingHearts />
      <h1 className="relative z-10 mb-4 text-5xl font-bold text-primary md:text-7xl">
        {resolveText(config.introHeading)}
      </h1>
      <p className="relative z-10 mb-10 max-w-md text-lg text-foreground/80 md:text-xl">
        {config.introSubtext}
      </p>
      <button
        onClick={scrollDown}
        className="relative z-10 rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition hover:scale-105 active:scale-95"
        aria-label="Scroll to reasons section"
      >
        {config.ctaLabel}
      </button>
    </section>
  );
};

// ── Section 2: Reasons (Timeline) ──
const ReasonsSection = () => {
  const [visible, setVisible] = useState<boolean[]>(
    Array(config.reasons.length).fill(false)
  );
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = refs.current.indexOf(e.target as HTMLDivElement);
            if (idx !== -1)
              setVisible((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
          }
        });
      },
      { threshold: 0.2 }
    );
    refs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const reasons = config.reasons.slice(0, 5);

  return (
    <section
      id="reasons"
      className="flex min-h-screen flex-col items-center justify-center bg-card px-6 py-20"
    >
      <h2 className="mb-16 text-4xl font-bold text-primary md:text-5xl">
        {config.reasonsTitle}
      </h2>

      {/* Timeline */}
      <div className="relative w-full max-w-2xl">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/30" />

        {reasons.map((reason, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              ref={(el) => (refs.current[i] = el)}
              className="relative mb-12 flex items-center last:mb-0"
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i]
                  ? "translateX(0)"
                  : isLeft
                    ? "translateX(-40px)"
                    : "translateX(40px)",
                transition: `all 0.6s ease ${i * 150}ms`,
              }}
            >
              {/* Dot on the line */}
              <div className="absolute left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-primary shadow-md shadow-primary/40" />

              {/* Card – alternating side */}
              <div
                className={`w-[calc(50%-2rem)] rounded-2xl border border-primary/10 bg-secondary/80 px-5 py-4 text-base font-medium text-foreground shadow-lg backdrop-blur-sm ${
                  isLeft ? "mr-auto text-right" : "ml-auto text-left"
                }`}
              >
                <span className="text-primary">💖</span> {reason}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ── Section 3: Photo Collage ──
const CollageSection = () => (
  <section className="valentine-gradient min-h-screen px-6 py-20">
    <h2 className="mb-12 text-center text-4xl font-bold text-primary md:text-5xl">
      {config.collageTitle}
    </h2>
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
      {config.images.map((src, i) => (
        <div
          key={i}
          className="group aspect-square overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
          style={{
            transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
          }}
        >

          <img
            src={src}
            alt={`Moment ${i + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  </section>
);

// ── Section 4: Valentine Question ──
const QuestionSection = ({
  onYes,
}: {
  onYes: () => void;
}) => {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [shake, setShake] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleNo = useCallback(() => {
  setNoCount((c) => c + 1);
  setShake(true);
  setTimeout(() => setShake(false), 300);

  if (!sectionRef.current) return;

  const section = sectionRef.current;

  const maxX = section.clientWidth - 140; // button width buffer
  const maxY = section.clientHeight - 80; // button height buffer

  const x = Math.random() * maxX - maxX / 2;
  const y = Math.random() * maxY - maxY / 2;

  setNoPos({ x, y });
}, []);

  const yesScale = 1 + noCount * 0.15;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-card px-6 text-center"
    >
      <h2 className="mb-12 text-4xl font-bold text-primary md:text-5xl">
        {config.questionText}
      </h2>

      <div className="relative flex gap-6">
        {/* Yes Button */}
        <button
          onClick={onYes}
          className="rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground shadow-xl transition-all duration-300"
          style={{
            transform: `scale(${yesScale})`,
            animation: noCount > 0 ? "pulse-glow 1.5s ease-in-out infinite" : "none",
          }}
          aria-label="Yes, be my Valentine"
        >
          {config.yesLabel}
        </button>

        {/* No Button */}
        <button
          onMouseEnter={handleNo}
          onClick={handleNo}
          className="absolute rounded-full bg-muted px-8 py-4 font-bold text-foreground shadow-md"
          style={{
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
            transition: "transform 0.1s ease-out", // ← SPEED (lower = faster)
            animation: shake ? "shake 0.3s ease-in-out" : "none",
          }}
          aria-label="No"
          >
          {config.noLabel}
        </button>
      </div>

      {noCount > 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          You've said no {noCount} time{noCount > 1 ? "s" : ""}… but the heart grows 😏
        </p>
      )}
    </section>
  );
};

// ── Section 5: Yes Modal ──
const YesModal = ({ onContinue }: { onContinue: () => void }) => (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
    <div className="mx-4 max-w-sm rounded-3xl bg-card p-10 text-center shadow-2xl">
      <h2 className="mb-2 text-4xl font-bold text-primary">{config.modalTitle}</h2>
      <p className="mb-8 text-lg text-foreground/80">{config.modalSubtext}</p>
      <button
        onClick={onContinue}
        className="rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition hover:scale-105 active:scale-95"
      >
        {config.modalCta}
      </button>
    </div>
  </div>
);

// ── Section 6: Finale ──
const FinaleSection = ({ onReplay }: { onReplay: () => void }) => (
  <section className="finale-gradient relative flex min-h-screen flex-col items-center justify-center px-6 text-center text-primary-foreground">
    <Confetti />
    <h1 className="relative z-10 mb-6 text-5xl font-bold md:text-7xl">
      {config.finaleHeading}
    </h1>
    <p className="relative z-10 mb-8 text-xl">{config.finaleSubtext}</p>
    <img
      src={config.kissingGifUrl}
      alt="Kissing GIF"
      className="relative z-10 mb-10 w-64 rounded-2xl shadow-2xl"
    />
    <button
      onClick={onReplay}
      className="relative z-10 rounded-full border-2 border-primary-foreground bg-transparent px-8 py-3 text-lg font-semibold text-primary-foreground transition hover:bg-primary-foreground hover:text-primary"
    >
      {config.replayLabel}
    </button>
  </section>
);

// ── Main Page ──
type Stage = "experience" | "modal" | "finale";

const Index = () => {
  const [stage, setStage] = useState<Stage>("experience");

  const handleYes = () => setStage("modal");
  const handleContinue = () => setStage("finale");
  const handleReplay = () => {
    setStage("experience");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (stage === "finale") return <FinaleSection onReplay={handleReplay} />;

  return (
    <>
      <IntroSection />
      <ReasonsSection />
      <CollageSection />
      <QuestionSection onYes={handleYes} />
      {stage === "modal" && <YesModal onContinue={handleContinue} />}
    </>
  );
};

export default Index;
