import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Submissions.css';

const Submissions = () => {
  const { assessmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
  }, [assessmentId]);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/submissions/${assessmentId}`, {
        headers: {
          Authorization: token,
        },
      });
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error.response.data);
    }
  };

  return (
    <div className="submissions-container">
      <h2>Submissions</h2>
      <ul>
        {submissions.map((submission) => (
          <li key={submission._id} onClick={() => navigate(`/submission-details/${submission._id}`)}>
            {submission.student.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Submissions;
