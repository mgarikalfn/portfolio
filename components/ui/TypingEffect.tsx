"use client";

import { useEffect, useState, useRef } from "react";

type Props = {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
};

export default function TypingEffect({
  text,
  speed = 28,
  onComplete,
  className,
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      setDone(true);
      onComplete?.();
      return;
    }

    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{displayed}</span>
      {/* Cursor: always visible, blinks after typing completes */}
      <span
        className="cursor-blink"
        aria-hidden="true"
        style={!done && !reducedMotion ? { animation: "none", opacity: 1 } : undefined}
      />
    </span>
  );
}
