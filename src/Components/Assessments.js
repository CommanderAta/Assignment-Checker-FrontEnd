import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Assessments.css';

const Assessments = () => {
  const { courseId } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchAssessments();
  }, [courseId]);

  const fetchAssessments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/assessments/${courseId}`, {
        headers: {
          Authorization: token,
        },
      });
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching assessments:', error.response.data);
    }
  };

  const handleCreateAssessment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/assessments', { title, content, courseId }, {
        headers: {
          Authorization: token,
        },
      });
      setTitle('');
      setContent('');
      fetchAssessments();
    } catch (error) {
      console.error('Error creating assessment:', error.response.data);
    }
  };

  return (
    <div className="assessments-container">
      <h2>Assessments</h2>
      <form onSubmit={handleCreateAssessment}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Create Assessment</button>
      </form>
      <ul>
        {assessments.map((assessment) => (
          <li key={assessment._id}>
            {assessment.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assessments;
