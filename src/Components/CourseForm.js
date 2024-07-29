import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseForm.css';

const CourseForm = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    briefDescription: '',
    courseDescription: '',
    outline: '',
    learningOutcomes: '',
    type: 'open', // default type
  });
  const [isEdit, setIsEdit] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      setIsEdit(true);
      fetchCourseDetails(courseId);
    }
  }, [courseId]);

  const fetchCourseDetails = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setCourseData(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = isEdit
        ? `${process.env.REACT_APP_API_URL}/courses/${courseId}`
        : `${process.env.REACT_APP_API_URL}/courses`;
      const method = isEdit ? 'put' : 'post';
      await axios({
        method,
        url,
        data: courseData,
        headers: {
          Authorization: token,
        },
      });
      navigate('/courses');
    } catch (error) {
      console.error('Error creating/updating course:', error);
    }
  };

  return (
    <div className="course-form-container">
      <h1>{isEdit ? 'Edit Course' : 'Create Course'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={courseData.name}
          onChange={handleChange}
          placeholder="Course Name"
          required
        />
        <textarea
          name="briefDescription"
          value={courseData.briefDescription}
          onChange={handleChange}
          placeholder="Brief Description"
          required
        ></textarea>
        <textarea
          name="courseDescription"
          value={courseData.courseDescription}
          onChange={handleChange}
          placeholder="Course Description"
          required
        ></textarea>
        <textarea
          name="outline"
          value={courseData.outline}
          onChange={handleChange}
          placeholder="Outline"
          required
        ></textarea>
        <textarea
          name="learningOutcomes"
          value={courseData.learningOutcomes}
          onChange={handleChange}
          placeholder="Learning Outcomes"
          required
        ></textarea>
        <select
          name="type"
          value={courseData.type}
          onChange={handleChange}
          required
        >
          <option value="open">Open</option>
          <option value="restricted">Restricted</option>
        </select>
        <button type="submit">{isEdit ? 'Update Course' : 'Create Course'}</button>
      </form>
    </div>
  );
};

export default CourseForm;
