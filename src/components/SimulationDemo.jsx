import React, { useState, useEffect, useRef } from 'react';

const SimulationDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [robotPosition, setRobotPosition] = useState({ x: 50, y: 50 });
  const [path, setPath] = useState([]);
  const [targetPosition, setTargetPosition] = useState({ x: 300, y: 200 });
  const [robotAngle, setRobotAngle] = useState(0);
  const [status, setStatus] = useState('Ready');
  const animationRef = useRef();

  // Animation loop for simulation
  useEffect(() => {
    if (isRunning) {
      const animate = () => {
        setSimulationTime(prevTime => {
          const newTime = prevTime + 0.05;
          
          // Simple path planning: move towards target
          setRobotPosition(prevPos => {
            const dx = targetPosition.x - prevPos.x;
            const dy = targetPosition.y - prevPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Add current position to path
            setPath(prevPath => {
              const newPath = [...prevPath, { ...prevPos }];
              return newPath.slice(-100); // Keep only last 100 points
            });
            
            // Check if reached target
            if (distance < 5) {
              setIsRunning(false);
              setStatus('Target reached!');
              return prevPos;
            }
            
            // Move robot towards target
            const speed = 2;
            const newX = prevPos.x + (dx / distance) * speed;
            const newY = prevPos.y + (dy / distance) * speed;
            
            // Update robot angle based on movement direction
            setRobotAngle(Math.atan2(dy, dx));
            
            return { x: newX, y: newY };
          });
          
          return newTime;
        });
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, targetPosition]);

  const startSimulation = () => {
    setIsRunning(true);
    setStatus('Running...');
    setSimulationTime(0);
    setPath([]);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setStatus('Stopped');
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setSimulationTime(0);
    setRobotPosition({ x: 50, y: 50 });
    setTargetPosition({ x: 300, y: 200 });
    setPath([]);
    setRobotAngle(0);
    setStatus('Ready');
  };

  const handleCanvasClick = (e) => {
    if (!isRunning) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTargetPosition({ x, y });
    }
  };

  return (
    <div className="simulation-demo" style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#fff'
    }}>
      <h3>Robot Navigation Simulation</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <span style={{ 
          marginRight: '15px',
          fontWeight: 'bold'
        }}>
          Status: {status}
        </span>
        <span style={{ 
          marginRight: '15px'
        }}>
          Time: {simulationTime.toFixed(2)}s
        </span>
        
        <div>
          <button 
            onClick={startSimulation}
            disabled={isRunning}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Start
          </button>
          <button 
            onClick={stopSimulation}
            disabled={!isRunning}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffc107',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Stop
          </button>
          <button 
            onClick={resetSimulation}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </div>
      
      <div style={{ position: 'relative', width: '100%', height: '400px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <canvas 
          ref={animationRef}
          onClick={handleCanvasClick}
          style={{ 
            width: '100%', 
            height: '100%', 
            cursor: isRunning ? 'default' : 'crosshair' 
          }}
          width={600}
          height={400}
        >
          Your browser does not support the canvas element.
        </canvas>
        
        {/* Using SVG for visualization since we can't easily use canvas in JSX */}
        <svg 
          width="100%" 
          height="100%" 
          style={{ position: 'absolute', top: 0, left: 0 }}
          onClick={handleCanvasClick}
        >
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e0e0e0" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Path trace */}
          {path.length > 1 && (
            <polyline
              points={path.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#007cba"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
          )}
          
          {/* Target position */}
          <circle
            cx={targetPosition.x}
            cy={targetPosition.y}
            r="10"
            fill="#dc3545"
            stroke="white"
            strokeWidth="2"
          />
          <text
            x={targetPosition.x}
            y={targetPosition.y - 15}
            textAnchor="middle"
            fill="#dc3545"
            fontSize="12"
            fontWeight="bold"
          >
            Target
          </text>
          
          {/* Robot */}
          <g transform={`translate(${robotPosition.x}, ${robotPosition.y}) rotate(${robotAngle * 180 / Math.PI})`}>
            <rect
              x="-15"
              y="-10"
              width="30"
              height="20"
              fill="#007cba"
              stroke="white"
              strokeWidth="2"
              rx="3"
            />
            <circle cx="12" cy="-5" r="3" fill="white" />
            <circle cx="12" cy="5" r="3" fill="white" />
            <polygon 
              points="15,0 25,5 25,-5" 
              fill="#28a745" 
            />
          </g>
          
          {/* Obstacles (example) */}
          <rect x="150" y="100" width="40" height="40" fill="#6c757d" rx="5" />
          <circle cx="250" cy="150" r="20" fill="#6c757d" />
        </svg>
      </div>
      
      <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p><strong>Robot Position:</strong> ({robotPosition.x.toFixed(1)}, {robotPosition.y.toFixed(1)})</p>
          <p><strong>Target Position:</strong> ({targetPosition.x}, {targetPosition.y})</p>
        </div>
        <div>
          <p><strong>Instructions:</strong> Click anywhere to set a new target position (when simulation is stopped)</p>
        </div>
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px', fontSize: '14px' }}>
        <p><strong>Note:</strong> This is a simplified simulation demo. In a real implementation, this would integrate with Gazebo, Isaac Sim, or other robotics simulation environments.</p>
      </div>
    </div>
  );
};

export default SimulationDemo;