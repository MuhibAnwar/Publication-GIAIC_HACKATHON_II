import React, { useState, useEffect } from 'react';

const ProgressTrackingDashboard = () => {
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "The Robotic Nervous System (ROS 2)",
      lessons: [
        { id: 1, title: "Introduction to ROS 2", completed: true },
        { id: 2, title: "Nodes, Topics, and Services", completed: true },
        { id: 3, title: "ROS 2 with Python", completed: false },
        { id: 4, title: "URDF Robot Description", completed: false },
      ],
      progress: 50,
      timeSpent: 120, // in minutes
      estimatedTime: 300 // in minutes
    },
    {
      id: 2,
      title: "The Digital Twin (Gazebo & Unity)",
      lessons: [
        { id: 1, title: "Gazebo Simulation Basics", completed: false },
        { id: 2, title: "Creating World Files", completed: false },
        { id: 3, title: "URDF to SDF Conversion", completed: false },
        { id: 4, title: "Unity Integration", completed: false },
      ],
      progress: 0,
      timeSpent: 0,
      estimatedTime: 240
    },
    {
      id: 3,
      title: "The AI-Robot Brain (NVIDIA Isaac™)",
      lessons: [
        { id: 1, title: "Isaac Sim Setup", completed: false },
        { id: 2, title: "Isaac ROS Perception", completed: false },
        { id: 3, title: "Navigation with Nav2", completed: false },
        { id: 4, title: "Reinforcement Learning", completed: false },
      ],
      progress: 0,
      timeSpent: 0,
      estimatedTime: 360
    },
    {
      id: 4,
      title: "Vision-Language-Action (VLA)",
      lessons: [
        { id: 1, title: "LLM Integration", completed: false },
        { id: 2, title: "Voice Command Processing", completed: false },
        { id: 3, title: "Vision-Language Integration", completed: false },
        { id: 4, title: "Capstone Project", completed: false },
      ],
      progress: 0,
      timeSpent: 0,
      estimatedTime: 300
    }
  ]);

  const [selectedModule, setSelectedModule] = useState(null);
  const [overallProgress, setOverallProgress] = useState(0);

  // Calculate overall progress
  useEffect(() => {
    const totalProgress = modules.reduce((sum, module) => sum + module.progress, 0);
    const avgProgress = modules.length > 0 ? totalProgress / modules.length : 0;
    setOverallProgress(Math.round(avgProgress));
  }, [modules]);

  const toggleLessonCompletion = (moduleId, lessonId) => {
    setModules(prevModules => 
      prevModules.map(module => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
          );
          
          // Calculate new progress based on completed lessons
          const completedCount = updatedLessons.filter(lesson => lesson.completed).length;
          const newProgress = Math.round((completedCount / updatedLessons.length) * 100);
          
          return {
            ...module,
            lessons: updatedLessons,
            progress: newProgress
          };
        }
        return module;
      })
    );
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 75) return '#28a745'; // Green
    if (percentage >= 50) return '#ffc107'; // Yellow
    if (percentage >= 25) return '#fd7e14'; // Orange
    return '#dc3545'; // Red
  };

  return (
    <div className="progress-dashboard" style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#fff'
    }}>
      <h3>Learning Progress Dashboard</h3>
      
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: overallProgress >= 50 ? '#d4edda' : '#fff3cd',
        border: `1px solid ${overallProgress >= 50 ? '#c3e6cb' : '#ffeaa7'}`,
        borderRadius: '4px'
      }}>
        <h4>Overall Progress: {overallProgress}%</h4>
        <div style={{ 
          width: '100%', 
          height: '20px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '10px', 
          overflow: 'hidden',
          marginTop: '10px'
        }}>
          <div 
            style={{ 
              width: `${overallProgress}%`, 
              height: '100%', 
              backgroundColor: getProgressColor(overallProgress),
              transition: 'width 0.3s ease'
            }} 
          />
        </div>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          You're {overallProgress >= 50 ? 'making great progress!' : 'on your way to mastering Physical AI!'}
        </p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>Module Breakdown</h4>
        {modules.map(module => (
          <div key={module.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '4px', 
            marginBottom: '10px',
            padding: '15px'
          }}>
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
            >
              <h5 style={{ margin: 0 }}>{module.title}</h5>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  marginRight: '15px', 
                  fontWeight: 'bold',
                  color: getProgressColor(module.progress)
                }}>
                  {module.progress}%
                </span>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {module.timeSpent}m / {module.estimatedTime}m
                </span>
              </div>
            </div>
            
            <div style={{ 
              width: '100%', 
              height: '10px', 
              backgroundColor: '#e9ecef', 
              borderRadius: '5px', 
              overflow: 'hidden',
              marginTop: '8px'
            }}>
              <div 
                style={{ 
                  width: `${module.progress}%`, 
                  height: '100%', 
                  backgroundColor: getProgressColor(module.progress),
                  transition: 'width 0.3s ease'
                }} 
              />
            </div>
            
            {selectedModule === module.id && (
              <div style={{ marginTop: '15px' }}>
                <h6>Lessons:</h6>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {module.lessons.map(lesson => (
                    <li key={lesson.id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '8px',
                      margin: '5px 0',
                      borderRadius: '4px',
                      backgroundColor: lesson.completed ? '#d4edda' : '#f8f9fa',
                      border: lesson.completed ? '1px solid #c3e6cb' : '1px solid #e9ecef'
                    }}>
                      <div>
                        <input
                          type="checkbox"
                          id={`lesson-${module.id}-${lesson.id}`}
                          checked={lesson.completed}
                          onChange={() => toggleLessonCompletion(module.id, lesson.id)}
                          style={{ marginRight: '10px' }}
                        />
                        <label htmlFor={`lesson-${module.id}-${lesson.id}`}>
                          {lesson.title}
                        </label>
                      </div>
                      {lesson.completed && (
                        <span style={{ 
                          color: '#28a745', 
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}>
                          ✓ Completed
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <div style={{ 
          padding: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#007cba' }}>{modules.length}</h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Modules</p>
        </div>
        <div style={{ 
          padding: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#28a745' }}>
            {modules.reduce((total, module) => 
              total + module.lessons.filter(l => l.completed).length, 0
            )}
          </h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Lessons Completed</p>
        </div>
        <div style={{ 
          padding: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#fd7e14' }}>
            {modules.reduce((total, module) => total + module.timeSpent, 0)}m
          </h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Time Spent</p>
        </div>
        <div style={{ 
          padding: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#6f42c1' }}>
            {Math.round(
              (modules.reduce((total, module) => total + module.timeSpent, 0) / 
              modules.reduce((total, module) => total + module.estimatedTime, 0)) * 100
            )}%
          </h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Schedule Adherence</p>
        </div>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px', fontSize: '14px' }}>
        <p><strong>Tracking Note:</strong> This progress dashboard simulates learning tracking. In a real implementation, this would connect to a backend service to persist user progress data.</p>
      </div>
    </div>
  );
};

export default ProgressTrackingDashboard;