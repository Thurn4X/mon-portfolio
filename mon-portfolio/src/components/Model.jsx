// src/components/Model.jsx
import React from 'react';
import { Center, useGLTF } from '@react-three/drei';

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

export default Model;
