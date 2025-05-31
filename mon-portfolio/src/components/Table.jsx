// src/components/Table.jsx
import React from 'react';
import { useGLTF } from '@react-three/drei';

const Table = () => {
  const { scene } = useGLTF('/mesa_table.glb');
  // Ajustez la position, l'échelle et la rotation selon votre besoin
  return (
    <group position={[0, -1.7, 0]} scale={[1.5, 1.5, 1.5]}>
  <primitive object={scene} dispose={null} />
</group>

  );
};

export default Table;
