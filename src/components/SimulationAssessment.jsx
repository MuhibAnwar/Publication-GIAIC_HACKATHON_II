import React, { useState } from 'react';

const SimulationAssessment = () => {
  const [currentTask, setCurrentTask] = useState(0);
  const [taskStatus, setTaskStatus] = useState([]);
  const [userCode, setUserCode] = useState('');
  const [executionResult, setExecutionResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Define simulation tasks
  const simulationTasks = [
    {
      id: 1,
      title: "Basic Navigation",
      description: "Program the robot to navigate to the specified target location without colliding with obstacles.",
      scenario: "A simple room with one obstacle in the middle. Robot starts at (1,1) and needs to reach (4,4).",
      successCriteria: ["Robot reaches target", "No collisions", "Efficient path"],
      starterCode: `# Your navigation code here
def navigate_to_target(robot, target_x, target_y):
    # Implement navigation algorithm
    pass`
    },
    {
      id: 2,
      title: "Object Manipulation",
      description: "Program the robot to identify, approach, and pick up the red cube.",
      scenario: "A table with multiple colored cubes. Robot needs to identify and grasp the red one.",
      successCriteria: ["Correct object identified", "Successful grasp", "Object lifted"],
      starterCode: `# Your manipulation code here
def identify_and_grasp_red_cube(robot):
    # Implement object detection and manipulation
    pass`
    },
    {
      id: 3,
      title: "Human-Robot Interaction",
      description: "Program the robot to respond to voice commands and perform appropriate actions.",
      scenario: "Simulated voice command processing with basic actions.",
      successCriteria: ["Command recognized", "Appropriate action", "Feedback provided"],
      starterCode: `# Your voice processing code here
def process_voice_command(robot, command):
    # Implement voice command processing
    pass`
    }
  ];

  const runSimulation = () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      const result = {
        success: Math.random() > 0.3, // 70% success rate for simulation
        metrics: {
          time: Math.floor(Math.random() * 30) + 10, // 10-40 seconds
          efficiency: Math.floor(Math.random() * 50) + 50, // 50-100%
          collisions: Math.floor(Math.random() * 3), // 0-2 collisions
        },
        output: userCode ? `Code executed successfully with ${userCode.split(' ').length} words.` : 'No code provided'
      };
      
      setExecutionResult(result);
      setIsRunning(false);
      
      // Update task status
      const newStatus = [...taskStatus];
      newStatus[currentTask] = result.success;
      setTaskStatus(newStatus);
    }, 2000);
  };

  const nextTask = () => {
    if (currentTask < simulationTasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setExecutionResult(null);
    }
  };

  const prevTask = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1);
      setExecutionResult(null);
    }
  };

  const resetTask = () => {
    setUserCode(simulationTasks[currentTask].starterCode);
    setExecutionResult(null);
  };

  const currentSim = simulationTasks[currentTask];
  const completedTasks = taskStatus.filter(status => status === true).length;

  return (
    <div className="simulation-assessment" style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#fff'
    }}>
      <h3>Simulation-Based Assessment</h3>
      
      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span>Task {currentTask + 1} of {simulationTasks.length}</span>
          <div style={{ marginTop: '5px' }}>
            {simulationTasks.map((task, index) => (
              <span 
                key={task.id}
                onClick={() => {
                  setCurrentTask(index);
                  setExecutionResult(null);
                }}
                style={{ 
                  padding: '5px 10px',
                  margin: '0 2px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: index === currentTask ? '#007cba' : 
                                 taskStatus[index] ? '#28a745' : '#e9ecef',
                  color: index === currentTask ? 'white' : 
                        taskStatus[index] ? 'white' : '#495057'
                }}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Completed: {completedTasks}/{simulationTasks.length}</span>
        </div>
      </div>
      
      <div style={{ 
        border: '1px solid #e9ecef', 
        borderRadius: '4px', 
        padding: '15px', 
        marginBottom: '20px',
        backgroundColor: '#f8f9fa'
      }}>
        <h4>{currentSim.title}</h4>
        <p><strong>Description:</strong> {currentSim.description}</p>
        <p><strong>Scenario:</strong> {currentSim.scenario}</p>
        
        <div style={{ marginTop: '10px' }}>
          <strong>Success Criteria:</strong>
          <ul>
            {currentSim.successCriteria.map((criterion, idx) => (
              <li key={idx}>{criterion}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <h5>Programming Environment</h5>
          <div style={{ 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            <textarea
              value={userCode || currentSim.starterCode}
              onChange={(e) => setUserCode(e.target.value)}
              style={{ 
                width: '100%', 
                height: '300px', 
                padding: '10px',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                resize: 'vertical'
              }}
              placeholder="Write your simulation code here..."
            />
          </div>
          
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button 
              onClick={runSimulation}
              disabled={isRunning}
              style={{
                padding: '8px 16px',
                backgroundColor: isRunning ? '#6c757d' : '#007cba',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isRunning ? 'not-allowed' : 'pointer'
              }}
            >
              {isRunning ? 'Running...' : 'Run Simulation'}
            </button>
            <button 
              onClick={resetTask}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset Code
            </button>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h5>Simulation Visualization</h5>
          <div style={{ 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            height: '300px', 
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Simple visualization of the simulation environment */}
            <div style={{
              width: '90%',
              height: '90%',
              border: '1px solid #999',
              position: 'relative',
              backgroundColor: 'white'
            }}>
              {/* Robot (blue square) */}
              <div style={{
                position: 'absolute',
                left: '10%',
                top: '10%',
                width: '30px',
                height: '30px',
                backgroundColor: '#007cba',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                🤖
              </div>
              
              {/* Target (green circle) */}
              <div style={{
                position: 'absolute',
                right: '10%',
                bottom: '10%',
                width: '30px',
                height: '30px',
                backgroundColor: '#28a745',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                🎯
              </div>
              
              {/* Obstacle */}
              {currentTask === 0 && (
                <div style={{
                  position: 'absolute',
                  left: '45%',
                  top: '45%',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#6c757d',
                  borderRadius: '4px'
                }}></div>
              )}
              
              {/* Cubes for manipulation task */}
              {currentTask === 1 && (
                <>
                  <div style={{
                    position: 'absolute',
                    left: '30%',
                    top: '40%',
                    width: '25px',
                    height: '25px',
                    backgroundColor: '#dc3545', // red
                    transform: 'rotate(45deg)'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '35%',
                    width: '25px',
                    height: '25px',
                    backgroundColor: '#28a745', // green
                    transform: 'rotate(45deg)'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    left: '40%',
                    top: '55%',
                    width: '25px',
                    height: '25px',
                    backgroundColor: '#ffc107', // yellow
                    transform: 'rotate(45deg)'
                  }}></div>
                </>
              )}
              
              {/* Path visualization when simulation runs */}
              {executionResult && (
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <line 
                    x1="10%" y1="10%" 
                    x2="90%" y2="90%" 
                    stroke="#007cba" strokeWidth="2" 
                    strokeDasharray="5,5" 
                  />
                </svg>
              )}
            </div>
            
            {isRunning && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                SIMULATION RUNNING...
              </div>
            )}
          </div>
        </div>
      </div>
      
      {executionResult && (
        <div style={{ 
          border: `1px solid ${executionResult.success ? '#28a745' : '#dc3545'}`, 
          borderRadius: '4px', 
          padding: '15px', 
          marginBottom: '20px',
          backgroundColor: executionResult.success ? '#d4edda' : '#f8d7da'
        }}>
          <h5 style={{ color: executionResult.success ? '#155724' : '#721c24' }}>
            {executionResult.success ? '✅ Simulation Successful!' : '❌ Simulation Failed!'}
          </h5>
          <p><strong>Output:</strong> {executionResult.output}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px' }}>
            <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
              <strong>Time:</strong> {executionResult.metrics.time}s
            </div>
            <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
              <strong>Efficiency:</strong> {executionResult.metrics.efficiency}%
            </div>
            <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
              <strong>Collisions:</strong> {executionResult.metrics.collisions}
            </div>
          </div>
          
          {!executionResult.success && (
            <div style={{ marginTop: '10px', fontStyle: 'italic' }}>
              <p>Try modifying your code to meet the success criteria:</p>
              <ul>
                {currentSim.successCriteria.map((criterion, idx) => (
                  <li key={idx}>{criterion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button 
          onClick={prevTask}
          disabled={currentTask === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentTask === 0 ? 'not-allowed' : 'pointer',
            opacity: currentTask === 0 ? 0.5 : 1
          }}
        >
          Previous Task
        </button>
        
        {currentTask < simulationTasks.length - 1 ? (
          <button 
            onClick={nextTask}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Next Task
          </button>
        ) : (
          <button 
            onClick={() => {
              alert(`Assessment complete! You've completed ${completedTasks + (executionResult?.success ? 1 : 0)}/${simulationTasks.length} tasks.`);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Complete Assessment
          </button>
        )}
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px', fontSize: '14px' }}>
        <p><strong>Note:</strong> This simulation assessment provides a framework for evaluating robotics programming skills. In a real implementation, this would connect to a backend simulator like Gazebo or Isaac Sim.</p>
      </div>
    </div>
  );
};

export default SimulationAssessment;