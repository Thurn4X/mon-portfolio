// src/components/TvScreenOverlay.jsx
import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./TvScreenOverlay.css";
import HLSideTab from "./effects/HLSideTab.jsx";

const TvScreenOverlay = ({
  title = "ABOUT",
  text,
  children,
  appear = true,
  appearDuration = 0.35,
  appearDelay = 0.05,
  motion = "slide",
  backdropFade = true,
  instant = false,

  // side photo window (floating sibling)
  sideTab = false,
  sideImgSrc = "/me.jpg",
  sideTitle = "PROFILE",
  sideDelay = 0.55,

  // NEW: fine-tune placement
  sideGap = 14,        // base distance from main window
  sideRaise = 12,      // move UP a bit
  sideOverlap = 12,    // overlap onto the main window
}) => {
  const backdropRef = useRef(null);
  const winRef = useRef(null);
  const tlRef = useRef(null);

  const [sideStyle, setSideStyle] = useState(null);
  const [sideAnchor, setSideAnchor] = useState("right");

  // Main window entrance
  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (instant || !appear || prefersReduced || motion === "none") {
      gsap.set(backdropRef.current, { opacity: 1 });
      gsap.set(winRef.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    tlRef.current?.kill();
    tlRef.current = gsap.timeline({ delay: appearDelay });

    gsap.set(backdropRef.current, { opacity: 0 });

    const from = { opacity: 0 };
    if (motion === "slide") Object.assign(from, { y: 18, scale: 0.985 });
    if (motion === "scale") Object.assign(from, { y: 0, scale: 0.95 });
    gsap.set(winRef.current, from);

    if (backdropFade) {
      tlRef.current.to(
        backdropRef.current,
        { opacity: 1, duration: appearDuration * 0.5, ease: "power2.out" },
        0
      );
    } else {
      gsap.set(backdropRef.current, { opacity: 1 });
    }

    tlRef.current.to(
      winRef.current,
      { opacity: 1, y: 0, scale: 1, duration: appearDuration, ease: "power2.out" },
      0
    );

    return () => tlRef.current?.kill();
  }, [instant, appear, appearDuration, appearDelay, motion, backdropFade]);

  // Compute a fixed position OUTSIDE the main window (raised + overlapping)
  useLayoutEffect(() => {
    if (!sideTab || !winRef.current) return;

    const placeTab = () => {
      const rect = winRef.current.getBoundingClientRect();
      const tabW = 260;      // width of side window (matches CSS)
      const pad = 16;        // viewport padding

      // Place on the right by default, slightly higher and overlapping
      let left = rect.right + sideGap - sideOverlap;
      let top = rect.top - sideRaise;
      let anchor = "right";

      // If it would overflow, flip to the left (keep same overlap/raise logic)
      if (left + tabW + pad > window.innerWidth) {
        left = rect.left - (tabW + sideGap) + sideOverlap;
        anchor = "left";
      }

      setSideAnchor(anchor);
      setSideStyle({
        position: "fixed",
        left: Math.round(left),
        top: Math.round(top),
        right: "auto",
        bottom: "auto",
        zIndex: 3, // ensure above main window
      });
    };

    placeTab();
    window.addEventListener("resize", placeTab);
    return () => window.removeEventListener("resize", placeTab);
  }, [sideTab, sideGap, sideRaise, sideOverlap]);

  return (
    <div ref={backdropRef} className="hl-overlay-backdrop" style={{ opacity: 0 }}>
      {/* Main centered window */}
      <div ref={winRef} className="hl-window">
        <div className="hl-scanlines" />
        <div className="hl-header">
          <span className="hl-header-dot" />
          <span className="hl-header-title">{title}</span>
        </div>
        <div className="hl-body">{children ?? text}</div>
      </div>

      {/* Separate floating window (outside) */}
      {sideTab && sideStyle && (
        <HLSideTab
          imgSrc={sideImgSrc}
          title={sideTitle}
          delay={sideDelay}
          anchor={sideAnchor}
          style={sideStyle}
        />
      )}
    </div>
  );
};

export default TvScreenOverlay;
