import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with actual auth logic
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
      <div className="hamburger" onClick={() => document.querySelector('.nav-links').classList.toggle('nav-open')}>☰</div>
      <nav className="nav-links">
        {isLoggedIn && profilePicture && (
          <div className="prof-container" onClick={handleProfileClick}>
            <img src={profilePicture || '/images/placeholder.png'} alt="Profile" className="prof-pic" />
          </div>
        )}
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/signup">Sign Up</Link>}
        <Link to="/about">About Us</Link>
        <Link to="/help">Help</Link>
        <Link to="/contact">Contact</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/cashflow">Cash Flow</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/recurring">Recurring Payments</Link>
            <Link to="/challenge">Penny Challenge</Link>
            <Link to="/logout" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
