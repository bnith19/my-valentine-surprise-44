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

// ── Section 2: Reasons ──
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

  return (
    <section
      id="reasons"
      className="flex min-h-screen flex-col items-center justify-center bg-card px-6 py-20"
    >
      <h2 className="mb-12 text-4xl font-bold text-primary md:text-5xl">
        {config.reasonsTitle}
      </h2>
      <div className="flex w-full max-w-lg flex-col gap-5">
        {config.reasons.map((reason, i) => (
          <div
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className="rounded-2xl bg-secondary px-6 py-5 text-center text-lg font-medium text-foreground shadow-md transition-all duration-700"
            style={{
              opacity: visible[i] ? 1 : 0,
              transform: visible[i] ? "translateY(0)" : "translateY(30px)",
              transitionDelay: `${i * 120}ms`,
            }}
          >
            💖 {reason}
          </div>
        ))}
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
          className="group overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
          style={{
            transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
          }}
        >
          <img
            src={src}
            alt={`Moment ${i + 1}`}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
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
  const [noPos, setNoPos] = useState<{ top: string; left: string } | null>(null);
  const [shake, setShake] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleNo = useCallback(() => {
    setNoCount((c) => c + 1);
    setShake(true);
    setTimeout(() => setShake(false), 400);

    // random position within section bounds
    const top = 10 + Math.random() * 70;
    const left = 10 + Math.random() * 70;
    setNoPos({ top: `${top}%`, left: `${left}%` });
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
          onClick={handleNo}
          className="rounded-full bg-muted px-8 py-4 font-bold text-foreground shadow-md transition-all duration-200"
          style={{
            position: noPos ? "absolute" : "relative",
            top: noPos?.top,
            left: noPos?.left,
            animation: shake ? "shake 0.4s ease-in-out" : "none",
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
