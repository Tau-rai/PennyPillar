// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn }) => {
  const [profilePicture, setProfilePicture] = useState('/path/to/profile-picture.png'); // Replace with actual profile picture URL or null
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    fetch('/logout/', { method: 'POST' })
      .then(response => {
        if (response.ok) {
          // Navigate to home after logout
          navigate('/');
        }
      })
      .catch(error => console.error('Logout failed:', error.message));
  };

  const handleProfileClick = () => {
    // Navigate to the profile form page
    navigate('/profile');
  };

  return (
    <header className="header">
      <div className="logo">PennyPillar</div>
      <div className="hamburger" onClick={() => document.querySelector('.header').classList.toggle('show-nav')}>
        ☰
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/cashflow">Cash Flow/Budget</Link>
            <Link to="/recurring">Recurring Payments</Link>
            <Link to="/challenge">Penny Challenge</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout" onClick={handleLogout}>Logout</Link>
          </>
        )}
        {!isLoggedIn ? (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : null}
        <Link to="/about">About Us</Link>
        <Link to="/help">Help</Link>
      </nav>
      {isLoggedIn && profilePicture && (
        <div className="profile-picture" onClick={handleProfileClick}>
          <img src={profilePicture} alt="Profile" />
        </div>
      )}
    </header>
  );
};

export default Header;
