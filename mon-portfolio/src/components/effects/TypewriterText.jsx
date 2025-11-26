import React, { useEffect, useRef, useState } from "react";

// Simple, dependency-free typewriter
export default function TypewriterText({
  text = "",
  speed = 1,          // ms per char
  startDelay = 0,      // ms before start
  cursor = true,
  onDone,
  className,
  style,
}) {
  const [out, setOut] = useState("");
  const iRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (iRef.current >= text.length) {
        cursor && setOut((s) => s); // keep as-is
        onDone?.();
        return;
      }
      // Support newlines
      const next = text.slice(0, iRef.current + 1);
      setOut(next);
      iRef.current += 1;
      timerRef.current = setTimeout(tick, speed);
    };

    timerRef.current = setTimeout(tick, startDelay);
    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, startDelay, cursor, onDone]);

  return (
    <span className={className} style={{ whiteSpace: "pre-wrap", ...style }}>
      {out}
      {cursor && <span className="tw-cursor">▌</span>}
    </span>
  );
}
