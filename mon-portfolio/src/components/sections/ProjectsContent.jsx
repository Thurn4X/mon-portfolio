// src/components/sections/ProjectsContent.jsx
import React, { useEffect, useMemo, useState } from "react";
import TypewriterText from "../effects/TypewriterText.jsx";

export default function ProjectsContent() {
  const slides = useMemo(
    () => [
      {
        title: "Portfolio UI",
        body: (
          <TypewriterText
            text={
`Interactive portfolio website.
• Built with React, Vite, Three.js / R3F, GSAP
• Half-Life inspired UI windows
• 3D scene integration + smooth transitions`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Data dashboards",
        body: (
          <TypewriterText
            text={
`Data monitoring & visualization for ML pipelines.
• Grafana dashboards to track dataset distribution
• Python/Dash apps for validation & scene exploration
• Optimized queries with materialized views`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "RPG AI sandbox",
        body: (
          <TypewriterText
            text={
`Experimental 2D RPG with AI Game Master.
• Turn-based system with dice rolls & stats
• LLM-driven GM for narrative freedom
• JSON-based maps & interaction rules
• Unity + Python back-end prototyping`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Pokémon store (microservices)",
        body: (
          <TypewriterText
            text={
`E-commerce prototype for Pokémon cards.
• Microservices in Java Spring Boot (StoreAPI, CardAPI, UserAPI)
• Dockerized architecture with REST endpoints
• PostgreSQL + auth & sessions
• Focus on scalability and clean design`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Intent-based Chatbot (NLP)",
        body: (
          <TypewriterText
            text={
`Simple intent-classifier chatbot.
• Data: intents.json (+ variants & preprocessing)
• Pipeline: tokenization, bag-of-words, classes.pkl/words.pkl
• Model: small NN (Keras/TensorFlow), training & inference scripts
• Goal: quick prototype for FAQ / command-style chat`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Exploration Robot — Face & Shapes",
        body: (
          <TypewriterText
            text={
`Real-time perception for a small explorer bot.
• Face verification with DeepFace (VGG-Face) on webcam frames
• OpenCV: Haar cascades + HSV masks for colored shapes (red/blue/green)
• Threaded verification loop; on-screen status (enemy spotted / sector clear)
• Purpose: simple patrol-demo & perception sandbox`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "More projects…",
        body: (
          <TypewriterText
            text={
`Other experiments & side projects:
• Crypto alert bot (Python + Binance API, TradingView)
• RL trading with Stable-Baselines3
• Emergency response simulator (CPE Fighter, RL + routing)
• Data augmentation pipelines (SAM, ControlNet, superpixels)
• Personal website v1 (React + Vite, football landing page)

See more on GitHub: github.com/Thurn4X`
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

      {/* key → rejoue le typewriter à chaque slide */}
      <div key={`proj-slide-${idx}`} style={{ marginTop: 6 }}>
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

        <div className="dots" role="tablist" aria-label="Projects slides">
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
