import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AppBar.css';

const AppBar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (user.role === 'professor') {
      navigate('/courses');
    } else {
      navigate('/courses');
    }
  };

  return (
    <div className="app-bar">
      <button className="home-button" onClick={handleHomeClick}>Home</button>
      <div className="user-info">
        <span>{user.username}</span> - <span>{user.role}</span>
      </div>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default AppBar;
