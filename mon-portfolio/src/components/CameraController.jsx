// src/components/CameraController.jsx
import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { categories } from './Categories';

const CameraController = ({ activeCategory, controlsRef, onTransitionComplete }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    const cat = categories.find(c => c.name === activeCategory);
    if (cat && controlsRef.current) {
      const tl = gsap.timeline({
        onUpdate: () => controlsRef.current && controlsRef.current.update(),
        onComplete: () => {
          if (activeCategory === "Landing" && onTransitionComplete) {
            onTransitionComplete(); // Notifier que la transition est terminée
          }
        }
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
    }
  }, [activeCategory, camera, controlsRef, onTransitionComplete]);
  
  return null;
};

export default CameraController;
