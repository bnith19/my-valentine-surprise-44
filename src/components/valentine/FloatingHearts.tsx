import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export const FloatingHearts = ({ count = 15 }: { count?: number }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 20,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 text-primary opacity-60"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animation: `float-heart ${h.duration}s ease-in ${h.delay}s infinite`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
};
