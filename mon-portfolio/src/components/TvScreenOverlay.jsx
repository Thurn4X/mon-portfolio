// src/components/TvScreenOverlay.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TvScreenOverlay = ({ text }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    // On simule ici un effet "tv start" : on part d'une opacité 0 et d'un léger scaling,
    // puis en 0.5 s, l'overlay passe à opacité 1 et scale 1.
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.inOut" }
    );
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '2rem',
        fontFamily: 'monospace',
        opacity: 0,           // démarre caché
        pointerEvents: 'none', // non interactif
      }}
    >
      {text}
    </div>
  );
};

export default TvScreenOverlay;
