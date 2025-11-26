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
  import AboutContent from "./sections/AboutContent.jsx";
  import ProjectsContent from "./sections/ProjectsContent.jsx";
  import ExperienceContent from "./sections/ExperienceContent.jsx";
  import SkillsContent from "./sections/SkillsContent.jsx";
  import ContactContent from "./sections/ContactContent.jsx";


  const Landing = () => {
    const [activeCategory, setActiveCategory] = useState("Landing");
    const [camera, setCamera] = useState(null);
    const [landingTransitionComplete, setLandingTransitionComplete] = useState(false);
    const [tvOverlayVisible, setTvOverlayVisible] = useState(false);
    const controlsRef = useRef(null);
    const nameOverlayRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

  const SECTION_NODE = {
    About: <AboutContent />,
    Projects: <ProjectsContent />,
    Experience: <ExperienceContent />,
    Skills: <SkillsContent />,
    Contact: <ContactContent />,
  };

    // Lorsqu'on change de catégorie, si ce n'est pas Landing, on cache immédiatement le NameOverlay
    useEffect(() => {
      if (activeCategory !== "Landing") {
        setLandingTransitionComplete(false);
        setTvOverlayVisible(false);
      }
    }, [activeCategory]);

    return (
        <div style={{ position: 'relative', height: '100dvh', width: '100vw', backgroundColor: 'black' }}>
        <Canvas
          camera={{ position: [2, 2, 3], fov: 28 }}
          onCreated={({ camera }) => setCamera(camera)}
        >
          <ambientLight intensity={0.5} />
          <directionalLight intensity={1} position={[10, 10, 5]} />
          <CameraController
            activeCategory={activeCategory}
            controlsRef={controlsRef}
            onTransitionStart={() => {
              setIsTransitioning(true);
              setTvOverlayVisible(false);          // prevent early flash
              setLandingTransitionComplete(false); // hide name overlay when leaving Landing
            }}
            onTransitionComplete={() => {
              setIsTransitioning(false);
              if (activeCategory === "Landing") {
                setLandingTransitionComplete(true);
              } else {
                setTvOverlayVisible(true);         // show HL window only after finish
              }
            }}
          />
          <Model />
          <OrbitControls
            ref={controlsRef}
            enabled={activeCategory === "Landing" && !isTransitioning}
          />

        </Canvas>

        <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {/* Afficher NameOverlay uniquement pour Landing */}
        {activeCategory === "Landing" && (
          <NameOverlay ref={nameOverlayRef} visible={landingTransitionComplete} />
        )}

       {/* Fenêtre HL avec le contenu de la section (sauf Landing) */}
      {activeCategory !== "Landing" && tvOverlayVisible && !isTransitioning && (
        <TvScreenOverlay
          title={activeCategory.toUpperCase()}
          appear
          motion="slide"
          backdropFade
          sideTab={activeCategory === "About"}
          sideImgSrc="/methug.png"
          sideTitle="Profile"
          sideDelay={0.55}
          sideGap={14}
          sideRaise={16}
          sideOverlap={12}
        >
          {SECTION_NODE[activeCategory] ?? <div>Coming soon…</div>}
        </TvScreenOverlay>
      )}
      </div>
    );
  };

  export default Landing;
