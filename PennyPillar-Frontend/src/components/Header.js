import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [profilePicture, setProfilePicture] = useState('/path/to/profile-picture.png'); // Replace with actual dynamic URL if available
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/logout/', { method: 'POST' });
      if (response.ok) {
        // Perform logout actions
        console.log('Logout successful');
        navigate('/'); // Redirect to home after logout
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  // const handleProfileClick = () => {
  //   navigate('/profile');
  // };

  const isLoggedIn = false; // Set to true if user is logged in
  return (
    <header className="header">
      <div className="logo">PennyPillar</div>
      <div className="hamburger" onClick={() => document.querySelector('.header').classList.toggle('show-nav')}>
        ☰
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/cashflow">Cash Flow/Budget</Link>
            <Link to="/recurring">Recurring Payments</Link>
            <Link to="/challenge">Penny Challenge</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        <Link to="/about">About Us</Link>
        <Link to="/help">Help</Link>
      </nav>
      {/* {isLoggedIn && profilePicture && (
        <div className="profile-picture" onClick={handleProfileClick}>
          <img src={profilePicture} alt="Profile" />
        </div>
      )} */}
    </header>
  );
};

export default Header;
