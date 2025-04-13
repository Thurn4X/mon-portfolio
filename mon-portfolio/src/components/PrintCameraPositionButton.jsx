// src/components/PrintCameraPositionButton.jsx
import React from 'react';
import { Html, useThree } from '@react-three/drei';
import * as THREE from 'three';

const PrintCameraPositionButton = () => {
  const { camera } = useThree();

  const handleClick = () => {
    // Get the position as an array
    const pos = camera.position.toArray();
    // Convert the camera's quaternion to Euler angles (using a common order, 'YXZ' works well for OrbitControls)
    const euler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
    const rot = [euler.x, euler.y, euler.z];
    console.log('Camera Position:', pos);
    console.log('Camera Rotation (Euler):', rot);
    alert(
      'Camera Position: ' + pos.join(', ') +
      '\nCamera Rotation: ' + rot.join(', ')
    );
  };

  return (
    <Html style={{ position: 'absolute', top: '20px', right: '20px' }}>
      <button 
        onClick={handleClick} 
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Print Camera Position
      </button>
    </Html>
  );
};

export default PrintCameraPositionButton;
