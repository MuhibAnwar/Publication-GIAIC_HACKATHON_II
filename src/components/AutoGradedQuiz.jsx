import React, { useState } from 'react';

const AutoGradedQuiz = ({ quizData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
      if (onComplete) {
        onComplete(score, quizData.questions.length);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quizData.questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      if (userAnswer !== undefined && question.correctAnswerId === userAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const currentQ = quizData.questions[currentQuestion];

  if (showResults) {
    const percentage = Math.round((score / quizData.questions.length) * 100);
    return (
      <div className="quiz-results" style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        margin: '20px 0',
        backgroundColor: '#f8f9fa'
      }}>
        <h3>Quiz Results</h3>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2>Your Score: {score}/{quizData.questions.length}</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: percentage >= 70 ? '#28a745' : '#dc3545' }}>
            {percentage}%
          </p>
          <p style={{ fontSize: '18px' }}>
            {percentage >= 70 ? '🎉 Excellent work!' : percentage >= 50 ? '👍 Good effort!' : 'Keep studying!'}
          </p>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h4>Detailed Results:</h4>
          {quizData.questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer !== undefined && question.correctAnswerId === userAnswer;
            
            return (
              <div key={index} style={{ 
                padding: '10px', 
                marginBottom: '10px', 
                borderRadius: '4px',
                backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
                border: isCorrect ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
              }}>
                <p><strong>Q{index + 1}:</strong> {question.question}</p>
                <p style={{ color: isCorrect ? '#155724' : '#721c24' }}>
                  <strong>Your answer:</strong> {question.answers.find(a => a.id === userAnswer)?.text || 'Not answered'}
                  {!isCorrect && userAnswer !== question.correctAnswerId && (
                    <span>, Correct answer: {question.answers.find(a => a.id === question.correctAnswerId)?.text}</span>
                  )}
                </p>
                {question.explanation && !isCorrect && (
                  <p><em>Explanation: {question.explanation}</em></p>
                )}
              </div>
            );
          })}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={resetQuiz}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auto-graded-quiz" style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#fff'
    }}>
      <h3>{quizData.title}</h3>
      <div style={{ marginBottom: '15px' }}>
        <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>{currentQ.question}</h4>
        {currentQ.code && (
          <pre style={{ 
            padding: '10px', 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #e9ecef', 
            borderRadius: '4px',
            overflowX: 'auto',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            {currentQ.code}
          </pre>
        )}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        {currentQ.answers.map(answer => (
          <div key={answer.id} style={{ 
            padding: '10px', 
            marginBottom: '8px', 
            border: `2px solid ${selectedAnswers[currentQuestion] === answer.id ? '#007cba' : '#e9ecef'}`,
            borderRadius: '4px',
            backgroundColor: selectedAnswers[currentQuestion] === answer.id ? '#e3f2fd' : '#fff',
            cursor: 'pointer'
          }}
          onClick={() => handleAnswerSelect(currentQuestion, answer.id)}
          >
            <input
              type="radio"
              id={`answer-${answer.id}`}
              name={`question-${currentQuestion}`}
              checked={selectedAnswers[currentQuestion] === answer.id}
              onChange={() => handleAnswerSelect(currentQuestion, answer.id)}
              style={{ marginRight: '10px' }}
            />
            <label htmlFor={`answer-${answer.id}`} style={{ cursor: 'pointer' }}>
              {answer.text}
            </label>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button 
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
            opacity: currentQuestion === 0 ? 0.5 : 1
          }}
        >
          Previous
        </button>
        
        <button 
          onClick={handleNextQuestion}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007cba',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {currentQuestion === quizData.questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
      
      {currentQ.explanation && selectedAnswers[currentQuestion] === currentQ.correctAnswerId && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#d4edda', 
          border: '1px solid #c3e6cb', 
          borderRadius: '4px' 
        }}>
          <strong>Explanation:</strong> {currentQ.explanation}
        </div>
      )}
    </div>
  );
};

// Example usage data
const exampleQuizData = {
  title: "ROS2 Fundamentals Quiz",
  questions: [
    {
      question: "What does ROS stand for?",
      answers: [
        { id: 'a', text: "Robot Operating System" },
        { id: 'b', text: "Robotics Operating Software" },
        { id: 'c', text: "Robotic Open Source" },
        { id: 'd', text: "Remote Operating System" }
      ],
      correctAnswerId: 'a',
      explanation: "ROS stands for Robot Operating System, a flexible framework for writing robot software."
    },
    {
      question: "Which programming language is primarily used in ROS2?",
      answers: [
        { id: 'a', text: "C++ and Python" },
        { id: 'b', text: "Java and C#" },
        { id: 'c', text: "JavaScript and Ruby" },
        { id: 'd', text: "Go and Rust" }
      ],
      correctAnswerId: 'a',
      explanation: "ROS2 primarily supports C++ and Python for developing robot applications."
    },
    {
      question: "What is the purpose of a ROS2 topic?",
      code: "publisher = node.create_publisher(String, 'topic_name', 10)",
      answers: [
        { id: 'a', text: "To establish a connection between nodes for data exchange" },
        { id: 'b', text: "To store robot configuration parameters" },
        { id: 'c', text: "To define robot kinematic structure" },
        { id: 'd', text: "To manage robot hardware drivers" }
      ],
      correctAnswerId: 'a',
      explanation: "ROS2 topics provide a way for nodes to exchange data in a publish/subscribe communication pattern."
    }
  ]
};

// Wrapper component to use with example data
export const ExampleQuiz = () => {
  return <AutoGradedQuiz quizData={exampleQuizData} onComplete={(score, total) => {
    console.log(`Quiz completed with score: ${score}/${total}`);
  }} />;
};

export default AutoGradedQuiz;