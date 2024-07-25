import React from 'react';
import './Feedback.css';  // Import the CSS file

const Feedback = ({ feedbacks }) => {
  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback, index) => (
          <div key={index}>
            <p>{feedback}</p>
          </div>
        ))
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default Feedback;
