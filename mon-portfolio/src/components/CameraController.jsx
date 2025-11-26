// src/components/CameraController.jsx
import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { categories } from './Categories';

const CameraController = ({ activeCategory, controlsRef, onTransitionStart, onTransitionComplete }) => {
  const { camera } = useThree();
  const tlRef = useRef(null);

  useEffect(() => {
    const cat = categories.find(c => c.name === activeCategory);
    if (!cat || !controlsRef?.current) return;

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    const tl = gsap.timeline({
      onStart: () => {        // 👈 hide overlay immediately
        onTransitionStart?.(activeCategory);
      },
      onUpdate: () => controlsRef.current?.update?.(),
      onComplete: () => {     // 👈 show overlay when finished
        onTransitionComplete?.(activeCategory);
      },
    });

    tl.to(camera.position, {
      x: cat.stage1.position[0],
      y: cat.stage1.position[1],
      z: cat.stage1.position[2],
      duration: 1.2,
      ease: 'power2.inOut',
    })
    .to(controlsRef.current.target, {
      x: cat.stage1.target[0],
      y: cat.stage1.target[1],
      z: cat.stage1.target[2],
      duration: 1.2,
      ease: 'power2.inOut',
    }, 0)
    .to(camera.position, {
      x: cat.stage2.position[0],
      y: cat.stage2.position[1],
      z: cat.stage2.position[2],
      duration: 0.6,
      ease: 'power2.inOut',
    })
    .to(controlsRef.current.target, {
      x: cat.stage2.target[0],
      y: cat.stage2.target[1],
      z: cat.stage2.target[2],
      duration: 0.6,
      ease: 'power2.inOut',
    }, "-=0.6");

    tlRef.current = tl;
    return () => { tlRef.current?.kill(); tlRef.current = null; };
    // ⬇️ do NOT depend on the callbacks to avoid double-runs
  }, [activeCategory, camera, controlsRef]);

  return null;
};

export default CameraController;
