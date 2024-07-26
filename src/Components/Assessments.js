import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Assessments.css';

const Assessments = () => {
  const { courseId } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserRole();
    fetchAssessments();
  }, [courseId]);

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

  const fetchAssessments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/assessments/${courseId}`, {
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
      await axios.post(`${process.env.REACT_APP_API_URL}/assessments`, { title, content, courseId }, {
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

  const handleAssessmentClick = (assessmentId) => {
    if (userRole === 'professor') {
      navigate(`/submissions/${assessmentId}`);
    } else {
      navigate(`/upload/${assessmentId}`);
    }
  };

  return (
    <div className="assessments-container">
      <h2>Assessments</h2>
      {userRole === 'professor' && (
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
      )}
      <ul>
        {assessments.map((assessment) => (
          <li key={assessment._id} onClick={() => handleAssessmentClick(assessment._id)}>
            {assessment.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assessments;
