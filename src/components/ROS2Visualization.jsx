import React, { useState, useEffect } from 'react';

const ROS2Visualization = () => {
  // Simulated ROS2 topic data
  const [robotPose, setRobotPose] = useState({ x: 0, y: 0, theta: 0 });
  const [jointStates, setJointStates] = useState({
    joint1: 0,
    joint2: 0,
    joint3: 0
  });
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [messages, setMessages] = useState([]);

  // Simulate connecting to ROS2
  useEffect(() => {
    const connectInterval = setInterval(() => {
      // Simulate connection status
      if (connectionStatus === 'disconnected') {
        setConnectionStatus('connecting');
        
        // Simulate successful connection after 2 seconds
        setTimeout(() => {
          setConnectionStatus('connected');
          
          // Start simulating data updates
          const dataInterval = setInterval(() => {
            // Simulate pose updates
            setRobotPose(prev => ({
              x: prev.x + (Math.random() - 0.5) * 0.1,
              y: prev.y + (Math.random() - 0.5) * 0.1,
              theta: prev.theta + (Math.random() - 0.5) * 0.05
            }));
            
            // Simulate joint state updates
            setJointStates({
              joint1: jointStates.joint1 + (Math.random() - 0.5) * 0.1,
              joint2: jointStates.joint2 + (Math.random() - 0.5) * 0.1,
              joint3: jointStates.joint3 + (Math.random() - 0.5) * 0.1
            });
            
            // Add a simulated message occasionally
            if (Math.random() > 0.7) {
              setMessages(prev => [
                ...prev.slice(-4), // Keep only last 5 messages
                {
                  id: Date.now(),
                  topic: '/joint_states',
                  data: `Joint positions updated`,
                  timestamp: new Date().toLocaleTimeString()
                }
              ]);
            }
          }, 500); // Update every 500ms
          
          // Cleanup data interval on unmount
          return () => clearInterval(dataInterval);
        }, 2000);
      }
    }, 5000); // Try to connect every 5 seconds if disconnected

    // Cleanup on unmount
    return () => clearInterval(connectInterval);
  }, [connectionStatus]);

  const handleConnect = () => {
    if (connectionStatus === 'disconnected') {
      setConnectionStatus('connecting');
    }
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
  };

  return (
    <div className="ros2-visualization-container" style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>ROS2 Visualization Dashboard</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <span style={{
          padding: '5px 10px',
          borderRadius: '4px',
          backgroundColor: connectionStatus === 'connected' ? '#d4edda' : 
                          connectionStatus === 'connecting' ? '#fff3cd' : '#f8d7da',
          color: connectionStatus === 'connected' ? '#155724' : 
                 connectionStatus === 'connecting' ? '#856404' : '#721c24'
        }}>
          Status: {connectionStatus}
        </span>
        
        {connectionStatus === 'disconnected' && (
          <button 
            onClick={handleConnect}
            style={{
              marginLeft: '10px',
              padding: '5px 15px',
              backgroundColor: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Connect to ROS2
          </button>
        )}
        
        {connectionStatus !== 'disconnected' && (
          <button 
            onClick={handleDisconnect}
            style={{
              marginLeft: '10px',
              padding: '5px 15px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Disconnect
          </button>
        )}
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h4>Robot Pose</h4>
          <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
            <p><strong>Position:</strong> ({robotPose.x.toFixed(3)}, {robotPose.y.toFixed(3)})</p>
            <p><strong>Orientation:</strong> {robotPose.theta.toFixed(3)} rad</p>
            
            <div style={{ marginTop: '15px', height: '200px', position: 'relative', border: '1px solid #ddd' }}>
              <div 
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#007cba',
                  borderRadius: '50%',
                  transform: `translate(-50%, -50%) rotate(${robotPose.theta}rad)`,
                  transformOrigin: 'center'
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '12px',
                    color: '#007cba',
                    fontWeight: 'bold'
                  }}
                >
                  🤖
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h4>Joint States</h4>
          <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
            <div style={{ marginBottom: '10px' }}>
              <label>Joint 1: {jointStates.joint1.toFixed(3)} rad</label>
              <input 
                type="range" 
                min="-3.14" 
                max="3.14" 
                value={jointStates.joint1} 
                readOnly
                style={{ width: '100%', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Joint 2: {jointStates.joint2.toFixed(3)} rad</label>
              <input 
                type="range" 
                min="-3.14" 
                max="3.14" 
                value={jointStates.joint2} 
                readOnly
                style={{ width: '100%', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Joint 3: {jointStates.joint3.toFixed(3)} rad</label>
              <input 
                type="range" 
                min="-3.14" 
                max="3.14" 
                value={jointStates.joint3} 
                readOnly
                style={{ width: '100%', marginTop: '5px' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Recent Messages</h4>
        <div style={{ 
          maxHeight: '150px', 
          overflowY: 'auto', 
          padding: '10px', 
          backgroundColor: 'white', 
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          {messages.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#666' }}>No messages yet...</p>
          ) : (
            messages.map(msg => (
              <div key={msg.id} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                <small style={{ color: '#888' }}>[{msg.timestamp}]</small>
                <strong> {msg.topic}</strong>: {msg.data}
              </div>
            ))
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '20px', fontStyle: 'italic', color: '#666' }}>
        <p>This is a simulated ROS2 visualization interface. In a real implementation, this would connect to an actual ROS2 system using roslibjs or similar libraries.</p>
      </div>
    </div>
  );
};

export default ROS2Visualization;