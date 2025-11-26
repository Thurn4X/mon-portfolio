// src/components/sections/SkillsContent.jsx
import React, { useEffect, useMemo, useState } from "react";
import TypewriterText from "../effects/TypewriterText.jsx";

export default function SkillsContent() {
  const slides = useMemo(
    () => [
      {
        title: "Data experience",
        body: (
          <TypewriterText
            text={
`• Data wrangling: Pandas, SQL
• Cleaning, augmentation, feature engineering
• Handling large datasets
• Visualization & dashboards for insights (Grafana, Dash)`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Machine learning",
        body: (
          <TypewriterText
            text={
`• Supervised & unsupervised learning
• Scikit-learn, XGBoost, LightGBM
• Feature selection, hyperparameter tuning
• Model evaluation and validation`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Mathematical foundations",
        body: (
          <TypewriterText
            text={
`• Linear algebra: vectors, matrices, SVD
• Calculus: derivatives, gradients, optimization basics
• Probability & statistics
• Core CS: algorithms, complexity, OOP`
            }
            speed={9}
            startDelay={30}
          />
        ),
      },
      {
        title: "Model training",
        body: (
          <TypewriterText
            text={
`• TensorFlow for deep learning
• Regularization: dropout, weight decay, early stopping
• Optimization: SGD, Adam, learning rate
• Evaluation: metrics, cross-validation, confusion matrices`
            }
            speed={9}
            startDelay={30}
          />
        ),
      }
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

      {/* key → rejoue le typewriter à chaque slide */}
      <div key={`skills-slide-${idx}`} style={{ marginTop: 6 }}>
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

        <div className="dots" role="tablist" aria-label="Skills slides">
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
