import { useEffect, useState } from 'react';

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const emojis = ['🌶️', '🍃', '✨', '🌿', '🫚', '🌾', '🍂', '🧄', '🫛', '🌰'];

const FloatingEmojis = () => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const generated: FloatingEmoji[] = [];
    for (let i = 0; i < 25; i++) {
      generated.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 20,
        size: 16 + Math.random() * 20,
      });
    }
    setFloatingEmojis(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingEmojis.map((item) => (
        <span
          key={item.id}
          className="absolute animate-float-up opacity-30"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingEmojis;
