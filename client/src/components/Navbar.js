// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css'; // or Navbar.scss

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="logo">EthioEstate</div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/agents">Agents</Link>
      </nav>

      <div className="user-profile">
        {currentUser ? (
          <>
            <img
              src={currentUser.profilePicture || '/images/noavatar.png'}
              alt="profile"
            />
            <span className="user-name">{currentUser.fullName}</span>
            <Link to="/profile">
              <button className="profile-btn">Profile</button>
              <div className="notification">3</div>
            </Link>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">
              <button>Login</button>
            </Link>
            <Link to="/register" className="register-btn">
              <button>Register</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
