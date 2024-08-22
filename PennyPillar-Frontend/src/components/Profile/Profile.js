import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    profile_picture: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Assuming JWT is stored in localStorage
          },
        });
        setProfile(response.data); // Adjusted to handle a single object response
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]); // Capture the file object for upload
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('first_name', profile.first_name);
    formData.append('last_name', profile.last_name);
    formData.append('email', profile.email);
    if (profileImage) {
      formData.append('profile_picture', profileImage); // Append the image file if it's changed
    }

    try {
      const response = await axiosInstance.put('/profile/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
      setProfile(response.data);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <label>First Name:</label>
        {isEditing ? (
          <input
            type="text"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.first_name}</p>
        )}

        <label>Last Name:</label>
        {isEditing ? (
          <input
            type="text"
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.last_name}</p>
        )}

        <label>Profile Picture:</label>
        {isEditing ? (
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handleImageChange}
          />
        ) : (
          <img
            src={
              profile.profile_picture
                ? profile.profile_picture
                : 'https://via.placeholder.com/150'
            }
            alt="Profile"
            width="150"
          />
        )}

        <label>Username:</label>
        <p>{profile.username}</p> {/* Usually, username should not be editable */}

        <label>Email:</label>
        <p>{profile.email}</p> {/* Usually, email should not be editable */}
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleEditToggle}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEditToggle}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
