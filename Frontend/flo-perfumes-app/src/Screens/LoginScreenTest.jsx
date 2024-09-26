import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../api/axiosConfig';


const LoginScreenTest = ({ onLogin }) => {
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
    <div className="flex justify-center items-center min-h-screen bg-black">
      {isLoggedIn ? (
        <div className="success-message">
          <h1>Autentificare reușită!</h1>
          <p>Veti fi redirectionat...</p>
        </div>
      ) : (
        <form className="bg-gray-900 min-w-96 min-h-72 justify-center items-center" onSubmit={handleSubmit}>
          <h1 className='text-center text-[#00df9a] font-bold text-2xl'>Login</h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-group">
            <label  className="text-center text-white" htmlFor="email">Email</label>
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
            <label className="text-center text-white" htmlFor="password">Parola</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit' class="bg-[#00df9a] hover:bg-blue-700 text-white font-bold py-2 px-4 mx-auto block text-center rounded">
            Submit
        </button>
        </form>
      )}
    </div>
  );
};

export default LoginScreenTest;
