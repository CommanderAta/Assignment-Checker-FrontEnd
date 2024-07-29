import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import FileUpload from './Components/FileUpload';
import Feedback from './Components/Feedback';
import Marks from './Components/Marks';
import LoginSignup from './Components/LoginSignup';
import Courses from './Components/Courses';
import Assessments from './Components/Assessments';
import Submissions from './Components/Submissions';
import SubmissionDetails from './Components/SubmissionDetails';
import AppBar from './Components/AppBar';
import About from './Components/About';
import AllCourses from './Components/AllCourses';
import Home from './Components/Home';
import CourseDetails from './Components/CourseDetails';
import MyCourses from './Components/MyCourses';
import CourseForm from './Components/CourseForm'; // Import CourseForm

import './styles.css';

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
      console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
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
        <div className="content">
          <Routes>
            <Route path="/login" element={<LoginSignup onLogin={handleLogin} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/course-details/:courseId" element={<CourseDetails />} />
            <Route path="/assessments/:courseId" element={<Assessments />} />
            <Route path="/submissions/:assessmentId" element={<Submissions />} />
            <Route path="/submission-details/:submissionId" element={<SubmissionDetails />} />
            <Route path="/upload/:assessmentId" element={<FileUpload />} />
            <Route path="/course-form" element={<CourseForm />} /> {/* Add route for creating course */}
            <Route path="/course-form/:courseId" element={<CourseForm />} /> {/* Add route for editing course */}
            <Route path="*" element={<Navigate to="/login" />} />
            {user && <Route path="/" element={<Navigate to="/home" />} />}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
