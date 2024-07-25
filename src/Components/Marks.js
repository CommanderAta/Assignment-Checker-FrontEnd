import React from 'react';
import '../styles.css';

const Marks = ({ marks, totalMarks }) => {
  return (
    <div className="marks-container">
      <h2>Marks</h2>
      <p>Total Marks: {totalMarks}</p>
      <ul>
        {marks.map((mark, index) => (
          <li key={index}>Question {index + 1}: {mark}</li>
        ))}
      </ul>
    </div>
  );
};

export default Marks;
