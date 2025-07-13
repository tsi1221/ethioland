import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import apiRequest from '../../lib/apirequest'; 
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await apiRequest.post('auth/login', formData);
      navigate('/list');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles['loginpage-container']}>
      <h2 className={styles['loginpage-title']}><strong>Welcome Back</strong></h2>
      {error && <p className={styles['loginpage-error']}>{error}</p>}
      <form onSubmit={handleLogin} className={styles['loginpage-form']}>
        <div className={styles['loginpage-inputGroup']}>
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['loginpage-inputGroup']}>
          <label>Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles['loginpage-button']}>Login</button>
        <p className={styles['loginpage-link']}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
