import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserRole();
    fetchCourses();
  }, []);

  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/role`, {
        headers: {
          Authorization: token,
        },
      });
      setUserRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error.response.data);
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
      console.error('Error fetching courses:', error.response.data);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/courses`, { name: courseName }, {
        headers: {
          Authorization: token,
        },
      });
      setCourseName('');
      fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error.response.data);
    }
  };

  return (
    <div className="courses-container">
      <h2>Courses</h2>
      {userRole === 'professor' && (
        <form onSubmit={handleCreateCourse}>
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
          <button type="submit">Create Course</button>
        </form>
      )}
      {courses.length === 0 ? (
        <p>No courses yet</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id} onClick={() => navigate(`/assessments/${course._id}`)}>
              {course.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Courses;
