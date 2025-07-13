import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.scss'; // SCSS for styling
import apiRequest from '../../lib/apirequest'; // Axios instance
import { AuthContext } from '../../context/AuthContext'; // Auth context

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(AuthContext); // use context values

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await apiRequest.get('auth/me');
        setUser(res.data);
      } catch (err) {
        console.error('User fetch error:', err);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await apiRequest.post('auth/logout');
      setCurrentUser(null); // Clear context
      localStorage.removeItem('currentUser'); // Optional: remove from localStorage
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleUpdateProfile = () => {
    navigate('/update-profile');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>User Information</h2>
      <div className="profile-card">
        <img
          src={user.profilePhotoUrl || '/novatar.png'}
          alt="User Avatar"
          className="avatar"
        />
        <div className="info">
          <div className="info-item">
            <label>Full Name:</label>
            <p>{user.fullName}</p>
          </div>
          <div className="info-item">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className="button update" onClick={handleUpdateProfile}>
          Update Profile
        </button>
        <button className="button logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="title">
        <h1>My List</h1>
      </div>
    </div>
  );
};

export default ProfilePage;
