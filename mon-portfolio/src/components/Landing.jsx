// src/components/Landing.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import Navbar from './Navbar';
import CameraController from './CameraController';
import NameOverlay from './NameOverlay';
import TvScreenOverlay from './TvScreenOverlay';
import { categories } from './Categories';

const Landing = () => {
  const [activeCategory, setActiveCategory] = useState("Landing");
  const [camera, setCamera] = useState(null);
  const [landingTransitionComplete, setLandingTransitionComplete] = useState(false);
  const [tvOverlayVisible, setTvOverlayVisible] = useState(false);
  const controlsRef = useRef(null);
  const nameOverlayRef = useRef(null);

  // Lorsqu'on change de catégorie, si ce n'est pas Landing, on cache immédiatement le NameOverlay
  useEffect(() => {
    if (activeCategory !== "Landing") {
      setLandingTransitionComplete(false);
      setTvOverlayVisible(false);
    }
  }, [activeCategory]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', backgroundColor: 'black', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [2, 2, 3], fov: 28 }}
        onCreated={({ camera }) => setCamera(camera)}
      >
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[10, 10, 5]} />
        <CameraController
          activeCategory={activeCategory}
          controlsRef={controlsRef}
          onTransitionComplete={() => {
            if (activeCategory === "Landing") {
              setLandingTransitionComplete(true);
            } else {
              setTvOverlayVisible(true);
            }
          }}
        />
        <Model />
        <OrbitControls ref={controlsRef} />
      </Canvas>

      <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* Afficher NameOverlay uniquement pour Landing */}
      {activeCategory === "Landing" && (
        <NameOverlay ref={nameOverlayRef} visible={landingTransitionComplete} />
      )}

      {/* Afficher l'overlay TV avec le texte associé pour les autres catégories */}
      {activeCategory !== "Landing" && tvOverlayVisible && (
        <TvScreenOverlay
          text={
            (categories.find(cat => cat.name === activeCategory)?.text) ||
            "Lorem ipsum dolor sit amet..."
          }
        />
      )}
    </div>
  );
};

export default Landing;
