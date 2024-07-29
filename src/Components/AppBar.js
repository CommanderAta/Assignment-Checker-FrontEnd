import React from 'react';
import { Link } from 'react-router-dom';
import './AppBar.css';

const AppBar = ({ user, onLogout }) => {
  return (
    <div className="app-bar">
      <div className="app-bar-left">
        <Link to="/home" className="app-bar-button">Home</Link>
        <Link to="/all-courses" className="app-bar-button">All Courses</Link>
        {user.role === 'student' && (
          <Link to="/my-courses" className="app-bar-button">My Courses</Link>
        )}
        {user.role === 'professor' && (
          <Link to="/courses" className="app-bar-button">Courses</Link>
        )}
      </div>
      <div className="app-bar-center">
        <span>{user.username} - {user.role}</span>
      </div>
      <div className="app-bar-right">
        <button className="app-bar-button" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AppBar;
