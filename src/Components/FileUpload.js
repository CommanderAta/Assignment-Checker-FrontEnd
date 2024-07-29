import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './FileUpload.css';

const FileUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const { assessmentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    checkIfSubmitted();
  }, [assessmentId]);

  const checkIfSubmitted = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/submissions/${assessmentId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.length > 0) {
        setHasSubmitted(true);
        setSubmissionData(response.data[0]);
      }
    } catch (error) {
      console.error('Error checking submission status:', error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('message', 'Check');
    formData.append('assessmentId', assessmentId);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat/prompt`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      onUploadComplete(response.data);
      setSubmissionData(response.data);  // Store the submission data
      setHasSubmitted(true); // Set the flag to true to show the feedback and marks
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (hasSubmitted && submissionData) {
    return (
      <div>
        <p>You have already submitted for this assessment.</p>
        <div className="submission-container">
          <div className="marks-box">
            <h3>Your Marks</h3>
            <p><strong>Marks:</strong> {submissionData.marks}</p>
          </div>
          <div className="feedback-box">
            <h3>Your Feedback</h3>
            <pre>{submissionData.feedbacks ? submissionData.feedbacks.join('\n') : submissionData.feedback}</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <input type="file" onChange={handleFileChange} />
      {/* <input type="text" placeholder="Enter your message" value={message} onChange={handleMessageChange} /> */}
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
