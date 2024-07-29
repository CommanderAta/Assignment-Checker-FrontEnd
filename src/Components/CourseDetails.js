import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${courseId}`, {
        headers: {
          Authorization: token,
        },
      });
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const getEnrollmentInfo = () => {
    if (course.type === 'open') {
      return `Use the code ${course.courseId} to enroll in the course.`;
    } else {
      return 'Contact your professor for Course ID to enroll.';
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-details-container">
      <h1>{course.name || 'Course Name'}</h1>
      <section>
        <h2>Course Description</h2>
        <p>{course.courseDescription || 'No description available.'}</p>
      </section>
      <section>
        <h2>Outline</h2>
        <p>{course.outline || 'No outline available.'}</p>
      </section>
      <section>
        <h2>Learning Outcomes</h2>
        <p>{course.learningOutcomes || 'No learning outcomes available.'}</p>
      </section>
      <section>
        <h2>How to Enroll</h2>
        <p>{getEnrollmentInfo()}</p>
      </section>
    </div>
  );
};

export default CourseDetails;
