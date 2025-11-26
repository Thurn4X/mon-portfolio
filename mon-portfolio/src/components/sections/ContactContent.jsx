// src/components/sections/ContactContent.jsx
import React, { useEffect, useMemo, useState } from "react";
import TypewriterText from "../effects/TypewriterText.jsx";

export default function ContactContent() {
  const slides = useMemo(
    () => [
      {
        title: "Let’s talk",
        body: (
          <TypewriterText
            text={`I’m open to collaborations, Data Science/ML/Deep Learning roles.
Right now I’m looking for an internship of at least 6 months starting February-April 2026.
Feel free to reach out via email, GitHub, or LinkedIn! (details on next slides)
              
Looking forward to connecting! 😊`}
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Email",
        body: (
          <TypewriterText
            text={`📧 william.masih@cpe.fr
              
Feel free to drop me a line! I'll get back to you as soon as I can.`}
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "GitHub",
        body: (
          <TypewriterText
            text={`💻 github.com/Thurn4X

Check out my personal and academic projects here!`}
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "LinkedIn",
        body: (
          <TypewriterText
            text={`🔗 linkedin.com/in/william-masihml

Let’s connect and explore opportunities together!`}
            speed={9}
            startDelay={30}
          />
        ),
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const clamp = (n) => Math.max(0, Math.min(slides.length - 1, n));
  const next = () => setIdx((i) => clamp(i + 1));
  const prev = () => setIdx((i) => clamp(i - 1));

  // navigation clavier
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <div className="about-title">
        <span>{slides[idx].title}</span>
      </div>

      {/* key pour rejouer le typewriter à chaque changement */}
      <div key={`contact-slide-${idx}`} style={{ marginTop: 6 }}>
        {slides[idx].body}
      </div>

      <div className="hl-footer">
        <button
          className="nav-btn"
          onClick={prev}
          disabled={idx === 0}
          aria-label="Previous slide"
        >
          ←
        </button>

        <div className="dots" role="tablist" aria-label="Contact slides">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === idx}
              className={`dot ${i === idx ? "active" : ""}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>

        <button
          className="nav-btn"
          onClick={next}
          disabled={idx === slides.length - 1}
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </div>
  );
}
