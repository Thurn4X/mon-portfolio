// src/components/sections/ExperienceContent.jsx
import React, { useEffect, useMemo, useState } from "react";
import TypewriterText from "../effects/TypewriterText.jsx";

export default function ExperienceContent() {
  const slides = useMemo(
    () => [
      {
        title: "BMW Group — Internship (2024-2025)",
        body: (
          <TypewriterText
            text={
`Machine Learning / Computer Vision intern
Autonomous Driving Campus, Munich (12 months)

Focus: data-driven development to improve autonomous driving pipelines`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Main contributions",
        body: (
          <TypewriterText
            text={
`• Built validation pipelines for data quality
• Designed submission dashboard for reviewing sessions
• Developed Grafana dashboards for monitoring
• Implemented scene finder tool for dataset exploration`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Tech & methods",
        body: (
          <TypewriterText
            text={
`• Python, SQL, Pandas, Dash
• Grafana, AWS S3
• Data augmentation strategies for CV
• Active learning experiments with tracking models`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Other experience",
        body: (
          <TypewriterText
            text={
`Taxi call center for France's main trainline company (2023)

Improved communication & fast decision-making under pressure.`
            }
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

  // keyboard navigation
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

      {/* key forces re-render → typewriter replays */}
      <div key={`exp-slide-${idx}`} style={{ marginTop: 6 }}>
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

        <div className="dots" role="tablist" aria-label="Experience slides">
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
