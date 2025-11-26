// src/components/effects/HLSideTab.jsx
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "../TvScreenOverlay.css";

export default function HLSideTab({
  imgSrc = "/me.jpg",
  title = "PROFILE",
  delay = 0.45,
  anchor = "right",          // "right" | "left"
  tiltDeg = -2.0,            // ⟵ a bit more crooked
  style,                     // left/top/zIndex come from parent
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // entrance from the side
    gsap.set(el, {
      opacity: 0,
      x: anchor === "right" ? 24 : -24,
      y: 12,
      scale: 0.985,
      rotation: tiltDeg,     // keep tilt during anim
    });
    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: tiltDeg,
      duration: 0.35,
      ease: "power2.out",
      delay,
    });

    return () => gsap.killTweensOf(el);
  }, [delay, anchor, tiltDeg]);

  return (
    <div
      ref={ref}
      className={`hl-side-tab floating ${anchor === "left" ? "left" : "right"}`}
      style={{ ...style, transform: `rotate(${tiltDeg}deg)` }}  // inline wins over CSS
    >
      <div className="hl-side-header">{title}</div>
      <div className="hl-side-body">
        <img src={imgSrc} alt="Profile" className="hl-side-photo" />
      </div>
    </div>
  );
}
