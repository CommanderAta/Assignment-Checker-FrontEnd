import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SubmissionDetails.css';

const SubmissionDetails = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    fetchSubmissionDetails();
  }, [submissionId]);

  const fetchSubmissionDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/submissions/details/${submissionId}`, {
        headers: {
          Authorization: token,
        },
      });
      setSubmission(response.data);
    } catch (error) {
      console.error('Error fetching submission details:', error.response.data);
    }
  };

  if (!submission) {
    return <div>Loading...</div>;
  }

  return (
    <div className="submission-details-container">
      <h2>Submission Details</h2>
      <div className="submission-details-content">
        <div className="submission-content-box">
          <h3>Content</h3>
          <pre>{submission.content}</pre>
        </div>
        <div className="marks-box">
          <h3>Marks</h3>
          <p>{submission.marks}</p>
        </div>
        <div className="feedback-box">
          <h3>Feedback</h3>
          <pre>{submission.feedback}</pre>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;
