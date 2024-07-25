import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FileUpload from './Components/FileUpload';
import Feedback from './Components/Feedback';
import Marks from './Components/Marks';
import LoginSignup from './Components/LoginSignup';
import Courses from './Components/Courses';
import Assessments from './Components/Assessments';
import Submissions from './Components/Submissions';

import './styles.css';  // Import the CSS file

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assessments/:courseId" element={<Assessments />} />
          <Route path="/submissions/:assessmentId" element={<Submissions />} />
          <Route path="/upload" element={
            <div className="container">
              <h1>Assignment Checker</h1>
              <FileUpload />
            </div>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
