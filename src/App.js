import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import FileUpload from './Components/FileUpload';
import Feedback from './Components/Feedback';
import Marks from './Components/Marks';
import LoginSignup from './Components/LoginSignup';
import Courses from './Components/Courses';
import Assessments from './Components/Assessments';
import Submissions from './Components/Submissions';
import SubmissionDetails from './Components/SubmissionDetails';
import AppBar from './Components/AppBar';

import './styles.css';  // Import the CSS file

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
        headers: {
          Authorization: token,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error.response.data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login'; // Redirect to login
  };

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    fetchUser(token);
  };

  return (
    <Router>
      <div>
        {user && <AppBar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={<LoginSignup onLogin={handleLogin} />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assessments/:courseId" element={<Assessments />} />
          <Route path="/submissions/:assessmentId" element={<Submissions />} />
          <Route path="/submission-details/:submissionId" element={<SubmissionDetails />} />
          <Route path="/upload/:assessmentId" element={<FileUpload />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
