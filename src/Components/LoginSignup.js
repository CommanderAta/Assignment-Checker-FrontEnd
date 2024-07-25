import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/user/login' : '/user/signup';
    try {
      const response = await axios.post(url, formData);
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        navigate('/courses');
      } else {
        alert('User created successfully');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      alert(error.response.data.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="student">Student</option>
              <option value="professor">Professor</option>
            </select>
          )}
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <button className="toggle-btn" onClick={toggleForm}>
          {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
