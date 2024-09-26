import React, { useState } from 'react';
import api from '../api/axiosConfig';

const RegisterScreenTest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await api.post('/api/users/register', formData);
      console.log('User registered successfully:', response.data);
      setIsRegistered(true);
    } catch (err) {
        if (err.response && err.response.status === 400) {
            setErrorMessage(err.response.data);
          } else {
            setErrorMessage('Numele sau mail-ul sunt deja folosite!');
          }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      {isRegistered ? ( 
        <div className="success-message font-bold">
          <h1>Contul a fost creat cu succes!</h1>
          <p>Vă puteți loga acum.</p>
        </div>
      ) : ( 
        <form className="register-form bg-gray-900 min-w-96 my-auto justify-center items-center" onSubmit={handleSubmit}>
         <p className="text-2xl font-bold text-center py-8 text-white">Register</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-group text-[#00df9a] flex flex-col items-center mb-4">
            <label  className = "text-center text-[#00df9a] mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className= "text-center  text-[#00df9a]" htmlFor="email">Email</label>
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
            <label className= "text-center  text-[#00df9a]" htmlFor="password">Password</label>
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
            Register
        </button>
        </form>
      )}
    </div>
  );
};

export default RegisterScreenTest;