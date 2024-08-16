import React, { useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile= () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/100');

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

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({
            firstName,
            lastName,
            email,
            username,
            profilePicture,
        });
    };

    return (
        <div className="profile-container">
            <h1>Your Profile Zone</h1>
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

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        alt="Profile Picture Preview"
                    />
                </div>

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
