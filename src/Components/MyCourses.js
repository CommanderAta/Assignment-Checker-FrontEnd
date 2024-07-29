import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyCourses.css';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/enrolled-courses`, {
        headers: {
          Authorization: token,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/enroll`,
        { courseId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessage(response.data.message);
      setError(null);
      fetchEnrolledCourses(); // Refresh the list of enrolled courses
    } catch (error) {
      setMessage(null);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course-details/${courseId}`);
  };

  return (
    <div className="my-courses-container">
      <h1>My Courses</h1>
      <div className="enroll-container">
        <input
          type="text"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          placeholder="Enter Course ID"
        />
        <button onClick={handleEnroll}>Enroll</button>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
      </div>
      <div className="course-grid">
        {courses.length > 0 ? (
          courses.map(course => (
            <div className="course-card" key={course._id} onClick={() => handleCourseClick(course._id)}>
              <div className="course-icon">📘</div> {/* Placeholder for icon */}
              <h2>{course.name}</h2>
              <p>{course.briefDescription || 'No brief description available.'}</p>
              <div className="course-footer">
                <span>By Professor {course.professor ? course.professor.username : 'Unknown'}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No enrolled courses found.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
