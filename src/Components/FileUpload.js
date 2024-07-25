import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('message', message);

    try {
      const response = await axios.post('http://100.25.179.142:3000/chat/prompt%0A', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUploadComplete(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container">
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Enter your message" value={message} onChange={handleMessageChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
