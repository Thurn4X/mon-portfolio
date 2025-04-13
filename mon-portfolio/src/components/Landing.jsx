// src/components/Landing.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/3tvs.glb');
  return (
    <Center>
      <group>
        <primitive object={scene} dispose={null} />
      </group>
    </Center>
  );
}

const Landing = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        overflow: 'hidden',
      }}
    >
      <Canvas camera={{ position: [2, 2, 3], fov: 28 }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[10, 10, 5]} />
        <Model />
        <OrbitControls />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '3rem', margin: 0 }}>WILLIAM MASIH</h1>
      </div>
    </div>
  );
};

export default Landing;
