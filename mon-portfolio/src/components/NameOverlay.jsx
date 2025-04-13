// src/components/NameOverlay.jsx
import React, { forwardRef, useEffect } from 'react';
import { gsap } from 'gsap';

const NameOverlay = forwardRef(({ visible }, ref) => {
  useEffect(() => {
    if (visible) {
      gsap.to(ref.current, {
        duration: 0.8,
        opacity: 1,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(ref.current, {
        duration: 0.8,
        opacity: 0,
        ease: "power2.inOut",
      });
    }
  }, [visible, ref]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: '33%',     // dans le tiers supérieur
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '5rem',
        fontWeight: 'bold',
        pointerEvents: 'none',
        opacity: 0,  // démarre transparent
      }}
    >
      WILLIAM MASIH
    </div>
  );
});

export default NameOverlay;
