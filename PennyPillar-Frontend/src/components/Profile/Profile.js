import React, { useState } from 'react';
import './Profile.css';
import axiosInstance from '../../axiosConfig';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/100');
    const [formVisible, setFormVisible] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        const updatedProfile = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            profilePicture: profilePicture
        };

        try {
            // Check if the profile already exists in the database
            const response = await axiosInstance.get('/profile/');
            if (response.status === 200) {
                // Profile exists, update it
                await axiosInstance.put('/profile/', updatedProfile);
            } else {
                // Profile doesn't exist, create it
                await axiosInstance.post('/profile/', updatedProfile);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="profile-container">
            <h1>Welcome to Your Profile</h1>
            
            {/* Profile Display Section */}
            <div className="profile-info">
                <div className="profile-picture">
                    <img src={profilePicture} alt="Profile Picture" />
                </div>
                <div className="profile-details">
                    <h2>{firstName} {lastName}</h2>
                    <p>Username: {username}</p>
                </div>
            </div>

            {/* Edit Button */}
            <button className="edit-button" onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? 'Cancel' : 'Edit Profile'}
            </button>

            {/* Profile Update Form */}
            {formVisible && (
                <form className="profile-form" onSubmit={handleSubmit}>
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    <label htmlFor="lastname">Last Name:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
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
                            src={profilePicture}
                            alt="Profile Preview"
                        />
                    </div>

                    <button type="submit">Update Profile</button>
                </form>
            )}
        </div>
    );
};

export default Profile;