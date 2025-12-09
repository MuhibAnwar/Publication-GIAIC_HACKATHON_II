import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Simple humanoid robot model component
const HumanoidRobot = ({ position, rotation, scale = 1 }) => {
  const meshRef = useRef();
  
  // Simple animation for subtle movement
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slight breathing animation
      meshRef.current.scale.y = scale + Math.sin(state.clock.elapsedTime) * 0.01;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Head */}
      <mesh position={[0, 1.5 * scale, 0]}>
        <sphereGeometry args={[0.3 * scale, 16, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 0.8 * scale, 0]}>
        <boxGeometry args={[0.6 * scale, 0.8 * scale, 0.3 * scale]} />
        <meshStandardMaterial color="#4a86e8" />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-0.5 * scale, 0.8 * scale, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.08 * scale, 0.08 * scale, 0.8 * scale, 8]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[0.5 * scale, 0.8 * scale, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.08 * scale, 0.08 * scale, 0.8 * scale, 8]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Left Leg */}
      <mesh position={[-0.2 * scale, -0.2 * scale, 0]}>
        <cylinderGeometry args={[0.08 * scale, 0.08 * scale, 0.8 * scale, 8]} />
        <meshStandardMaterial color="#38761d" />
      </mesh>
      
      {/* Right Leg */}
      <mesh position={[0.2 * scale, -0.2 * scale, 0]}>
        <cylinderGeometry args={[0.08 * scale, 0.08 * scale, 0.8 * scale, 8]} />
        <meshStandardMaterial color="#38761d" />
      </mesh>
    </group>
  );
};

// Simple ground plane
const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#cccccc" wireframe={false} />
    </mesh>
  );
};

// Scene with lights
const SceneSetup = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight 
        position={[5, 10, 7]} 
        intensity={0.8} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
};

// Interactive 3D Viewer Component
const ThreeDModelViewer = () => {
  const [robotPosition, setRobotPosition] = useState([0, 0, 0]);
  const [robotRotation, setRobotRotation] = useState([0, 0, 0]);
  const [robotScale, setRobotScale] = useState(1);
  
  const moveRobot = (direction) => {
    const moveAmount = 0.5;
    const [x, y, z] = robotPosition;
    
    switch(direction) {
      case 'forward':
        setRobotPosition([x, y, z - moveAmount]);
        break;
      case 'backward':
        setRobotPosition([x, y, z + moveAmount]);
        break;
      case 'left':
        setRobotPosition([x - moveAmount, y, z]);
        break;
      case 'right':
        setRobotPosition([x + moveAmount, y, z]);
        break;
      default:
        break;
    }
  };
  
  const rotateRobot = (direction) => {
    const rotateAmount = Math.PI / 8;
    const [rx, ry, rz] = robotRotation;
    
    switch(direction) {
      case 'left':
        setRobotRotation([rx, ry - rotateAmount, rz]);
        break;
      case 'right':
        setRobotRotation([rx, ry + rotateAmount, rz]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="three-d-viewer" style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#fff'
    }}>
      <h3>Interactive 3D Robot Model</h3>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: '1' }}>
          <h4>Robot Controls</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '15px' }}>
            <div></div>
            <button 
              onClick={() => moveRobot('forward')}
              style={buttonStyle}
            >
              ↑ Forward
            </button>
            <div></div>
            
            <button 
              onClick={() => moveRobot('left')}
              style={buttonStyle}
            >
              ← Left
            </button>
            <button 
              onClick={() => moveRobot('backward')}
              style={buttonStyle}
            >
              ↓ Backward
            </button>
            <button 
              onClick={() => moveRobot('right')}
              style={buttonStyle}
            >
              Right →
            </button>
            
            <div></div>
            <button 
              onClick={() => rotateRobot('left')}
              style={buttonStyle}
            >
              ↺ Rotate Left
            </button>
            <button 
              onClick={() => rotateRobot('right')}
              style={buttonStyle}
            >
              Rotate Right ↻
            </button>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Scale: {robotScale.toFixed(1)}</label>
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1" 
              value={robotScale} 
              onChange={(e) => setRobotScale(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          
          <div>
            <p><strong>Position:</strong> [{robotPosition.map(p => p.toFixed(1)).join(', ')}]</p>
            <p><strong>Rotation:</strong> [{robotRotation.map(r => (r * 180 / Math.PI).toFixed(1)).join(', ')}] degrees</p>
          </div>
        </div>
      </div>
      
      <div style={{ height: '400px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
          <PerspectiveCamera makeDefault position={[5, 5, 5]} />
          <SceneSetup />
          <Ground />
          <HumanoidRobot 
            position={robotPosition} 
            rotation={robotRotation}
            scale={robotScale}
          />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Canvas>
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px', fontSize: '14px' }}>
        <p><strong>Note:</strong> This is an interactive 3D model viewer using React Three Fiber. In a real implementation, you would load actual robot models (URDF/STL files) and potentially integrate with physics simulation.</p>
      </div>
    </div>
  );
};

// Button style object
const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#007cba',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  textAlign: 'center'
};

export default ThreeDModelViewer;