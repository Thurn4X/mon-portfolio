// src/components/sections/AboutContent.jsx
import React, { useEffect, useMemo, useState } from "react";
import TypewriterText from "../effects/TypewriterText.jsx";

export default function AboutContent() {
  const slides = useMemo(
    () => [
      {
        title: "Who I am",
        body: (
          <TypewriterText
            text={
`Hi, I’m William — a Master's student in Software Engineering, Big Data & AI.
I'm passionate about AI and Data’s impact on the future of humanity and its actual implementations.

This section is about me; projects and case studies are in the Projects tab.`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "What I do",
        body: (
          <>
            <TypewriterText
              text={
`I study computer science at CPE Lyon, specializing in AI, Big Data, and software engineering.
I’m particularly into:
• Deep Learning and machine learning for real-world applications
• Data Science, analysis, and visualization
• Computer Vision, LLMs, and generative AI
• Building end-to-end AI products`
              }
              speed={9}
              startDelay={30}
              style={{ display: "block", marginTop: 0 }}
            />
            {/* chips non-typés pour garder la lisibilité */}
            <div className="chip-row" style={{ marginTop: 10 }}>
              <span className="chip">Python</span>
              <span className="chip">AWS</span>
              <span className="chip">Keras</span>
              <span className="chip">Grafana</span>
              <span className="chip">Javascript</span>
              <span className="chip">OpenCV</span>
              <span className="chip">Linear Algebra</span>

            </div>
          </>
        ),
      },
      {
        title: "How I work",
        body: (
          <>
            <TypewriterText
              text={
`I value clear communication, collaboration, and continuous learning.
I thrive in team settings and adapt quickly to new challenges.
my main qualities are:
• Problem-solving mindset
• Strong communication skills
• Adaptability and eagerness to learn
• An insatiable curiosity`
              }
              speed={9}
              startDelay={30}
              style={{ display: "block", marginTop: 0 }}
            />
          </>
        ),
      },
      {
        title: "Fun bits",
        body: (
          <TypewriterText
            text={
`• I like video games, especially RPGs where I can explore rich stories
• I value Nature and I enjoy living close to it
• I play a bit of different instruments, and I like picking up a new one to discover how it works
• I am a football enjoyer, both playing and watching


If that sounds like your vibe, ping me in Contact 😊 .`
            }
            speed={9}
            startDelay={30}
            style={{ display: "block", marginTop: 0 }}
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

      {/* key pour forcer le remount → rejoue le typewriter à chaque slide */}
      <div key={`slide-${idx}`} style={{ marginTop: 6 }}>
        {slides[idx].body}
      </div>

      <div className="hl-footer">
        <button className="nav-btn" onClick={prev} disabled={idx === 0} aria-label="Previous slide">←</button>
        <div className="dots" role="tablist" aria-label="About sections">
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
        <button className="nav-btn" onClick={next} disabled={idx === slides.length - 1} aria-label="Next slide">→</button>
      </div>
    </div>
  );
}
