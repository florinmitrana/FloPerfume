import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../api/axiosConfig';

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/login', formData, { withCredentials: true });
      console.log('Login successful:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      if (onLogin) {
        onLogin(response.data);
      }
      setIsLoggedIn(true);

      setTimeout(() => {
        navigate('/');
        window.location.reload(); 
      }, 2000);
    } catch (err) {
      console.log('Login error:', err);
      setErrorMessage('Email sau parolă greșită.');
    }
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div className="success-message">
          <h1>Autentificare reușită!</h1>
          <p>Veti fi redirectionat...</p>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Parola</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginScreen;
