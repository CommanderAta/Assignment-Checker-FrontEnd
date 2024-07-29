import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AllCourses.css';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchCourses();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
        headers: {
          Authorization: token,
        },
      });
      setUserRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses`, {
        headers: {
          Authorization: token,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course-details/${courseId}`);
  };

  const handleEditClick = (courseId, event) => {
    event.stopPropagation(); // Prevent navigating to course details when edit button is clicked
    navigate(`/course-form/${courseId}`);
  };

  const handleAddCourseClick = () => {
    navigate(`/course-form`);
  };

  return (
    <div className="all-courses-container">
      <h1>All Courses</h1>
      {userRole === 'professor' && (
        <button className="add-course-btn" onClick={handleAddCourseClick}>
          Add Course
        </button>
      )}
      <div className="course-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="course-card" key={course._id} onClick={() => handleCourseClick(course._id)}>
              <div className="course-icon">📘</div> {/* Placeholder for icon */}
              <h2>{course.name}</h2>
              <p>{course.briefDescription || 'No brief description available.'}</p>
              <div className="course-footer">
                <span>By Professor {course.professor ? course.professor.username : 'Unknown'}</span>
                {userRole === 'professor' && (
                  <button onClick={(event) => handleEditClick(course._id, event)}>Edit</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
 