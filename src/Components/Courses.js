import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/courses', {
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
      await axios.post('/courses', { name: courseName }, {
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
      <ul>
        {courses.map((course) => (
          <li key={course._id} onClick={() => navigate(`/assessments/${course._id}`)}>
            {course.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
