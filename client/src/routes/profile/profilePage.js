import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './ProfilePage.scss';            // ✅ SCSS in same folder
import apiRequest from '../../lib/apirequest'; // ✅ Go up to /src/lib/


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Example: fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await apiRequest.get('auth/me'); // Adjust the route to your backend
        setUser(res.data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await apiRequest.post('auth/logout'); // Adjust if needed
      navigate('/login');
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
          src={user.profilePhotoUrl || '/default-avatar.png'}
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
    </div>
  );
};

export default ProfilePage;
