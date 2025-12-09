import React, { useState } from 'react';

const JupyterNotebookViewer = () => {
  const [activeTab, setActiveTab] = useState('notebook1');
  const [executionCount, setExecutionCount] = useState(0);
  const [outputs, setOutputs] = useState({});

  // Sample notebook content
  const notebooks = {
    notebook1: {
      name: 'Introduction to ROS2',
      cells: [
        {
          id: 1,
          type: 'markdown',
          content: '# Getting Started with ROS2\n\nThis notebook introduces the basics of ROS2 for robotics applications.'
        },
        {
          id: 2,
          type: 'code',
          content: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1`,
          output: ''
        },
        {
          id: 3,
          type: 'markdown',
          content: '## Understanding the Code\n\nThe above code creates a simple ROS2 publisher that publishes "Hello World" messages to a topic.'
        }
      ]
    },
    notebook2: {
      name: 'Robot Kinematics',
      cells: [
        {
          id: 1,
          type: 'markdown',
          content: '# Forward Kinematics Example\n\nThis notebook demonstrates forward kinematics for a simple 2-DOF manipulator.'
        },
        {
          id: 2,
          type: 'code',
          content: `import numpy as np
import math

def forward_kinematics(joint_angles, link_lengths):
    """
    Calculate end-effector position for a 2-DOF planar manipulator
    """
    theta1, theta2 = joint_angles
    L1, L2 = link_lengths
    
    x = L1 * math.cos(theta1) + L2 * math.cos(theta1 + theta2)
    y = L1 * math.sin(theta1) + L2 * math.sin(theta1 + theta2)
    
    return x, y

# Example: Calculate position with joint angles [0.5, 0.3] and link lengths [1.0, 0.8]
joint_angles = [0.5, 0.3]
link_lengths = [1.0, 0.8]
position = forward_kinematics(joint_angles, link_lengths)
print(f"End-effector position: ({position[0]:.3f}, {position[1]:.3f})")`,
          output: 'End-effector position: (1.565, 0.696)'
        }
      ]
    }
  };

  const executeCell = (cellId) => {
    const newExecutionCount = executionCount + 1;
    setExecutionCount(newExecutionCount);
    
    // Simulate execution output
    if (notebooks[activeTab].cells[cellId - 1].type === 'code') {
      const newOutputs = { ...outputs };
      
      // For this example, we'll just simulate a simple output
      newOutputs[cellId] = `Executed cell ${cellId} (In[${newExecutionCount}])`;
      setOutputs(newOutputs);
    }
  };

  const renderCell = (cell) => {
    if (cell.type === 'markdown') {
      // In a real implementation, we would use a markdown renderer
      return (
        <div key={cell.id} className="notebook-markdown-cell">
          <div 
            style={{ 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              border: '1px solid #e9ecef',
              borderRadius: '4px',
              marginBottom: '10px'
            }}
            dangerouslySetInnerHTML={{ __html: cell.content }}
          />
        </div>
      );
    } else if (cell.type === 'code') {
      return (
        <div key={cell.id} className="notebook-code-cell" style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '5px 10px', 
              border: '1px solid #e9ecef',
              borderRight: 'none',
              borderRadius: '4px 0 0 4px',
              minWidth: '60px',
              textAlign: 'center'
            }}>
              In [{outputs[cell.id] ? executionCount : ''}]
            </div>
            <pre style={{ 
              flex: 1,
              margin: 0,
              padding: '10px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: '0 4px 4px 0',
              overflowX: 'auto',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}>
              {cell.content}
            </pre>
          </div>
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#ffffff', 
            border: '1px solid #e9ecef',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            display: outputs[cell.id] ? 'block' : 'none'
          }}>
            <div style={{ color: '#28a745', fontFamily: 'monospace' }}>
              {cell.output}
            </div>
          </div>
          <button 
            onClick={() => executeCell(cell.id)}
            style={{
              marginTop: '5px',
              padding: '5px 10px',
              backgroundColor: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Run Cell
          </button>
        </div>
      );
    }
  };

  return (
    <div className="jupyter-notebook-viewer" style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#fff'
    }}>
      <h3>Jupyter Notebook Integration</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => setActiveTab('notebook1')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'notebook1' ? '#007cba' : '#e9ecef',
            color: activeTab === 'notebook1' ? 'white' : '#495057',
            border: '1px solid #ced4da',
            cursor: 'pointer',
            borderRadius: '4px 0 0 4px'
          }}
        >
          {notebooks.notebook1.name}
        </button>
        <button
          onClick={() => setActiveTab('notebook2')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'notebook2' ? '#007cba' : '#e9ecef',
            color: activeTab === 'notebook2' ? 'white' : '#495057',
            border: '1px solid #ced4da',
            cursor: 'pointer',
            borderRadius: '0 4px 4px 0',
            marginLeft: '-1px'
          }}
        >
          {notebooks.notebook2.name}
        </button>
      </div>
      
      <div style={{ 
        border: '1px solid #e9ecef', 
        borderRadius: '4px',
        backgroundColor: '#f8f9fa',
        padding: '15px',
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        <h4>{notebooks[activeTab].name}</h4>
        {notebooks[activeTab].cells.map(cell => renderCell(cell))}
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px', fontSize: '14px' }}>
        <p><strong>Note:</strong> This is a simulated Jupyter notebook viewer. In a real implementation, you would connect to a Jupyter server or embed actual notebook content.</p>
      </div>
    </div>
  );
};

export default JupyterNotebookViewer;