import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterForm.css'; // Make sure this path is correct
import apiRequest  from '../lib/apirequest';



const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    nationalId: '',
    kebeleId: '',
    profilePhotoUrl: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { fullName, email, phone, password, nationalId } = formData;

    if (!fullName || fullName.length < 4) {
      setError('Full Name must be at least 4 characters');
      return;
    }
    if (!email || !phone || !password) {
      setError('Please fill in all required fields');
      return;
    }
    if (password.length < 6 || password.length > 12) {
      setError('Password must be between 6 and 12 characters');
      return;
    }
    if (nationalId && nationalId.length !== 10) {
      setError('National ID must be exactly 10 characters');
      return;
    }

    try {
      const response = await apiRequest.post('auth/register', formData);
      setSuccess(response.data.message || 'Registration successful!');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        role: '',
        nationalId: '',
        kebeleId: '',
        profilePhotoUrl: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const fields = [
    { name: 'fullName', label: 'Full Name', required: true, minLength: 4 },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'number', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true, minLength: 6, maxLength: 12 },
    { name: 'role', label: 'Role' },
    { name: 'nationalId', label: 'National ID', minLength: 10, maxLength: 10 },
    { name: 'kebeleId', label: 'Kebele ID' },
    { name: 'profilePhotoUrl', label: 'Profile Photo URL' },
  ];

  return (
    <div className="container">
      <h2>Create an Account</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="form">
        {fields.map((field) => (
          <div key={field.name} className="inputGroup">
            <label>
              {field.label}{field.required && '*'}
            </label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              minLength={field.minLength}
              maxLength={field.maxLength}
            />
            {field.name === 'password' && (
              <small className="hint">Password must be 6–12 characters</small>
            )}
            {field.name === 'fullName' && (
              <small className="hint">Full name must be at least 4 characters</small>
            )}
            {field.name === 'nationalId' && (
              <small className="hint">National ID must be exactly 10 characters</small>
            )}
          </div>
        ))}

        <button type="submit" className="button">Register</button>

        <p className="footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
