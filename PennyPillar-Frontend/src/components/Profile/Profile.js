import React, { useState, useEffect } from 'react';
import './Profile.css';
import axiosInstance from '../../axiosConfig';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState('https://via.placeholder.com/100');

    // Fetch existing profile data on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/profile/');
                if (response.status === 200 && response.data.length > 0) {
                    const profile = response.data[0]; // Assuming only one profile per user
                    setFirstName(profile.first_name || '');
                    setLastName(profile.last_name || '');
                    setUsername(profile.user.username || '');
                    setProfilePicturePreview(profile.image || 'https://via.placeholder.com/100');
                }
            } catch (error) {
                console.error('Error fetching profile:', error.message);
            }
        };

        fetchProfile();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(file);
            setProfilePicturePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        if (profilePicture) {
            formData.append('image', profilePicture); // Attach the image file if provided
        }

        try {
            // Check if the profile already exists in the database
            const response = await axiosInstance.get('/profile/');
            if (response.status === 200 && response.data.length > 0) {
                // Profile exists, update it
                await axiosInstance.put('/profile/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                // Profile doesn't exist, create it
                await axiosInstance.post('/profile/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    return (
        <div className="profile-container">
            <h1>Your Profile Zone</h1>
            <form className="profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="firstname">First Name:</label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastname">Last Name:</label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    readOnly
                />

                <label htmlFor="profile-picture">Profile Picture:</label>
                <input
                    type="file"
                    id="profile-picture"
                    name="profile-picture"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <div className="profile-picture-preview">
                    <img
                        id="profile-picture-display"
                        src={profilePicturePreview}
                        alt="Profile Preview"
                    />
                </div>

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
