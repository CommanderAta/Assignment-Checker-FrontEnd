import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Submissions.css';

const Submissions = () => {
  const { assessmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, [assessmentId]);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/submissions/${assessmentId}`, {
        headers: {
          Authorization: token,
        },
      });
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error.response.data);
    }
  };

  const handleCreateSubmission = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/submissions', { content, assessmentId }, {
        headers: {
          Authorization: token,
        },
      });
      setContent('');
      fetchSubmissions();
    } catch (error) {
      console.error('Error creating submission:', error.response.data);
    }
  };

  return (
    <div className="submissions-container">
      <h2>Submissions</h2>
      <form onSubmit={handleCreateSubmission}>
        <textarea
          placeholder="Submission Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {submissions.map((submission) => (
          <li key={submission._id}>
            {submission.student.username}: {submission.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Submissions;
