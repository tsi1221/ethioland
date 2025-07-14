import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    avatar: "",
  });

  useEffect(() => {
    // Optional: Load current profile data from backend
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile"); // adjust your endpoint
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedData.append(key, value);
    });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        body: updatedData,
      });
      const result = await res.json();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
<label>
          Phone Number
          <input type="number" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          National ID
          <input type="number" name="nationalId" value={formData.nationalId} onChange={handleChange} />
        </label>
       <label>
          Kebele ID
          <input type="number" name="kebeleId" value={formData.kebeleId} onChange={handleChange} />
        </label>
        <label>
          Bio
          <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
        </label>

        <label>
          Location
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </label>

        <label>
          Profile Picture
          <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
