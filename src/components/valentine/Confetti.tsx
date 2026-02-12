import { useEffect, useState } from "react";

export const Confetti = () => {
  const [pieces, setPieces] = useState<
    { id: number; left: number; color: string; delay: number; duration: number; size: number }[]
  >([]);

  useEffect(() => {
    const colors = [
      "hsl(340,82%,52%)",
      "hsl(350,60%,90%)",
      "hsl(40,80%,55%)",
      "hsl(20,80%,60%)",
      "hsl(0,0%,100%)",
    ];
    setPieces(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: colors[i % colors.length],
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
        size: 6 + Math.random() * 8,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};
