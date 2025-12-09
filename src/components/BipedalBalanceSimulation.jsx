import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Bipedal Balance Simulation Component
const BipedalBalanceSimulation = () => {
  // Simulation parameters
  const [mass, setMass] = useState(75); // kg
  const [length, setLength] = useState(1.0); // meters
  const [kp, setKp] = useState(150); // Proportional gain
  const [kd, setKd] = useState(15); // Derivative gain
  const [disturbance, setDisturbance] = useState(0); // N
  const [activeScenario, setActiveScenario] = useState('balance'); // balance, push, sway
  
  // Visualization parameters
  const [timeHistory, setTimeHistory] = useState([]);
  const [angleHistory, setAngleHistory] = useState([]);
  const [torqueHistory, setTorqueHistory] = useState([]);
  const [energyHistory, setEnergyHistory] = useState([]);
  
  // Simulation state
  const [angle, setAngle] = useState(0.01); // initial angle (radians)
  const [angularVelocity, setAngularVelocity] = useState(0);
  const [torque, setTorque] = useState(0);
  const [energy, setEnergy] = useState(0);
  
  // Refs for Three.js
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const pendulumRef = useRef(null);
  
  // Physics constants
  const g = 9.81; // gravitational acceleration (m/s^2)
  const dt = 0.01; // time step (s)
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888,
      metalness: 0.1,
      roughness: 0.7
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    scene.add(floor);
    
    // Create inverted pendulum (simplified humanoid)
    const bodyGeometry = new THREE.CylinderGeometry(0.1, 0.1, length, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00aaff,
      metalness: 0.3,
      roughness: 0.4
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = length / 2;
    body.castShadow = true;
    
    // Create feet
    const feetGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.3);
    const feetMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      metalness: 0.5,
      roughness: 0.3
    });
    const feet = new THREE.Mesh(feetGeometry, feetMaterial);
    feet.position.y = -0.05;
    feet.castShadow = true;
    
    // Group the pendulum parts
    const pendulum = new THREE.Group();
    pendulum.add(body);
    pendulum.add(feet);
    pendulum.position.y = 0;
    scene.add(pendulum);
    pendulumRef.current = pendulum;
    
    // Add support point (ankle)
    const supportGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const supportMaterial = new THREE.MeshStandardMaterial({ color: 0xff6600 });
    const support = new THREE.Mesh(supportGeometry, supportMaterial);
    support.position.y = -0.1;
    scene.add(support);
    
    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);
  
  // Update physics simulation
  useEffect(() => {
    let animationFrameId;
    
    // Physics simulation loop
    const simulate = () => {
      // Calculate control torque based on current state
      let currentDisturbance = 0;
      
      // Apply scenario-specific disturbances
      switch(activeScenario) {
        case 'balance':
          // Maintain balance with small disturbances
          currentDisturbance = 0;
          break;
        case 'push':
          // Apply a push at specific intervals
          if (Math.abs(timeHistory[timeHistory.length - 1] - 5) < 0.05) {
            currentDisturbance = -100; // Push backward
          } else if (Math.abs(timeHistory[timeHistory.length - 1] - 10) < 0.05) {
            currentDisturbance = 80; // Push forward
          } else {
            currentDisturbance = 0;
          }
          break;
        case 'sway':
          // Apply periodic sway torque for energy efficiency
          currentDisturbance = 5 * Math.sin(timeHistory[timeHistory.length - 1] * 0.5);
          break;
      }
      
      // Simple PD controller for balance
      const controlTorque = -kp * angle - kd * angularVelocity;
      
      // Total torque including disturbance
      const totalTorque = controlTorque + disturbance + currentDisturbance;
      
      // Update physics (inverted pendulum dynamics)
      // θ'' = (g/L)*sin(θ) - (torque)/(m*L^2)
      const angularAcceleration = (g / length) * Math.sin(angle) - (totalTorque / (mass * length * length));
      
      // Update state using Euler integration
      const newAngularVelocity = angularVelocity + angularAcceleration * dt;
      const newAngle = angle + newAngularVelocity * dt;
      
      // Calculate energy (kinetic + potential)
      const kineticEnergy = 0.5 * mass * length * length * newAngularVelocity * newAngularVelocity;
      const potentialEnergy = mass * g * length * (1 - Math.cos(newAngle));
      const newEnergy = kineticEnergy + potentialEnergy;
      
      // Update states
      setAngle(newAngle);
      setAngularVelocity(newAngularVelocity);
      setTorque(totalTorque);
      setEnergy(newEnergy);
      
      // Update history arrays for plotting
      const currentTime = timeHistory.length > 0 ? timeHistory[timeHistory.length - 1] + dt : 0;
      setTimeHistory(prev => [...prev.slice(-100), currentTime]);
      setAngleHistory(prev => [...prev.slice(-100), newAngle * 180 / Math.PI]); // Convert to degrees
      setTorqueHistory(prev => [...prev.slice(-100), totalTorque]);
      setEnergyHistory(prev => [...prev.slice(-100), newEnergy]);
      
      // Update visualization
      if (pendulumRef.current) {
        pendulumRef.current.rotation.z = newAngle;
      }
      
      animationFrameId = requestAnimationFrame(simulate);
    };
    
    animationFrameId = requestAnimationFrame(simulate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mass, length, kp, kd, disturbance, activeScenario, angle, angularVelocity, timeHistory]);
  
  // Reset simulation
  const resetSimulation = () => {
    setAngle(0.01);
    setAngularVelocity(0);
    setTorque(0);
    setEnergy(0);
    setTimeHistory([]);
    setAngleHistory([]);
    setTorqueHistory([]);
    setEnergyHistory([]);
  };
  
  // Preset scenario handlers
  const loadBalanceScenario = () => {
    setActiveScenario('balance');
    resetSimulation();
  };
  
  const loadPushScenario = () => {
    setActiveScenario('push');
    resetSimulation();
  };
  
  const loadSwayScenario = () => {
    setActiveScenario('sway');
    resetSimulation();
  };
  
  return (
    <div className="balance-simulation-container" style={{ padding: '20px' }}>
      <h3>Inverted Pendulum Balance Simulation</h3>
      <p>
        This simulation demonstrates the control of an inverted pendulum model, 
        which approximates the balance control problem in humanoid robotics. 
        The pendulum represents the body of a humanoid robot balancing on its feet.
      </p>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        gap: '20px',
        margin: '20px 0'
      }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h4>Parameters</h4>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="mass">Body Mass (kg): {mass}</label>
            <input
              id="mass"
              type="range"
              min="10"
              max="200"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              style={{ width: '100%' }}
              aria-label="Adjust body mass"
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="length">Body Length (m): {length.toFixed(2)}</label>
            <input
              id="length"
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              style={{ width: '100%' }}
              aria-label="Adjust body length"
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="kp">Proportional Gain: {kp}</label>
            <input
              id="kp"
              type="range"
              min="10"
              max="500"
              value={kp}
              onChange={(e) => setKp(Number(e.target.value))}
              style={{ width: '100%' }}
              aria-label="Adjust proportional control gain"
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="kd">Derivative Gain: {kd}</label>
            <input
              id="kd"
              type="range"
              min="1"
              max="100"
              value={kd}
              onChange={(e) => setKd(Number(e.target.value))}
              style={{ width: '100%' }}
              aria-label="Adjust derivative control gain"
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="disturbance">Disturbance Force (N): {disturbance}</label>
            <input
              id="disturbance"
              type="range"
              min="-100"
              max="100"
              value={disturbance}
              onChange={(e) => setDisturbance(Number(e.target.value))}
              style={{ width: '100%' }}
              aria-label="Apply external disturbance force"
            />
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <button onClick={resetSimulation} style={{ marginRight: '10px' }}>Reset</button>
            <button onClick={loadBalanceScenario} style={{ marginRight: '10px' }}>Standing Balance</button>
            <button onClick={loadPushScenario} style={{ marginRight: '10px' }}>Push Response</button>
            <button onClick={loadSwayScenario}>Energy-Efficient Sway</button>
          </div>
        </div>
        
        <div 
          ref={mountRef} 
          style={{ 
            flex: '2', 
            minWidth: '400px', 
            height: '400px', 
            border: '1px solid #ccc' 
          }}
          aria-label="3D visualization of inverted pendulum"
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', margin: '20px 0' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h4>Angular Position vs Time</h4>
          <div style={{ height: '200px', border: '1px solid #ccc', padding: '10px' }}>
            <svg width="100%" height="100%" viewBox="0 0 400 150">
              {angleHistory.length > 1 && timeHistory.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#00aaff"
                  strokeWidth="2"
                  points={angleHistory.map((a, i) => {
                    const x = (i / (angleHistory.length - 1)) * 380 + 10;
                    const y = 140 - ((a + 10) / 20) * 120; // Scale -10° to 10° to visible range
                    return `${x},${y}`;
                  }).join(' ')}
                />
              )}
              <text x="10" y="15" fontSize="12" fill="#000">Angle (degrees)</text>
              <text x="10" y="145" fontSize="12" fill="#000">Time (s)</text>
            </svg>
          </div>
        </div>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h4>Control Torque vs Time</h4>
          <div style={{ height: '200px', border: '1px solid #ccc', padding: '10px' }}>
            <svg width="100%" height="100%" viewBox="0 0 400 150">
              {torqueHistory.length > 1 && timeHistory.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#ff6600"
                  strokeWidth="2"
                  points={torqueHistory.map((t, i) => {
                    const x = (i / (torqueHistory.length - 1)) * 380 + 10;
                    const y = 140 - ((t + 150) / 300) * 120; // Scale -150 to 150 to visible range
                    return `${x},${y}`;
                  }).join(' ')}
                />
              )}
              <text x="10" y="15" fontSize="12" fill="#000">Torque (Nm)</text>
              <text x="10" y="145" fontSize="12" fill="#000">Time (s)</text>
            </svg>
          </div>
        </div>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h4>Energy Consumption</h4>
          <div style={{ height: '200px', border: '1px solid #ccc', padding: '10px' }}>
            <svg width="100%" height="100%" viewBox="0 0 400 150">
              {energyHistory.length > 1 && timeHistory.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#00cc66"
                  strokeWidth="2"
                  points={energyHistory.map((e, i) => {
                    const x = (i / (energyHistory.length - 1)) * 380 + 10;
                    const y = 140 - (e / 2000) * 120; // Scale energy values to visible range
                    return `${x},${y}`;
                  }).join(' ')}
                />
              )}
              <text x="10" y="15" fontSize="12" fill="#000">Energy (J)</text>
              <text x="10" y="145" fontSize="12" fill="#000">Time (s)</text>
            </svg>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
        <h4>Educational Explanations</h4>
        <p>
          <strong>Center of Mass Dynamics:</strong> The inverted pendulum model represents the relationship between 
          the center of mass (COM) of the humanoid robot and its base of support. For balance, the COM must remain 
          within the support polygon created by the feet.
        </p>
        <p>
          <strong>Control Moment Gyro Principles:</strong> The control torque applied at the ankle (or hip) creates 
          moments that counteract the gravitational torque trying to tip the robot over. The PD controller adjusts 
          the control output based on the measured angle and angular velocity.
        </p>
        <p>
          <strong>Stability Margins:</strong> The stability of the system depends on the control parameters (Kp, Kd). 
          If the gains are too low, the system will be sluggish and unstable. If too high, the system may oscillate 
          or require excessive actuator forces.
        </p>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e8f4fd', 
        border: '1px solid #b3d9ff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <strong>Current State:</strong><br />
          Angle: {angle.toFixed(4)} rad ({(angle * 180 / Math.PI).toFixed(2)}°)<br />
          Angular Velocity: {angularVelocity.toFixed(4)} rad/s<br />
          Applied Torque: {torque.toFixed(2)} Nm<br />
          Energy: {energy.toFixed(2)} J
        </div>
        <div>
          <button 
            onClick={() => {
              // Export data for student analysis
              const data = {
                time: timeHistory,
                angle: angleHistory,
                torque: torqueHistory,
                energy: energyHistory
              };
              const dataStr = JSON.stringify(data, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              
              const exportLink = document.createElement('a');
              exportLink.setAttribute('href', dataUri);
              exportLink.setAttribute('download', 'balance_simulation_data.json');
              exportLink.click();
            }}
          >
            Export Data for Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default BipedalBalanceSimulation;