// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

// Placeholder image URL (replace with actual URL or path if necessary)
const placeholderImage = '/path/to/placeholder-image.png'; 

const Header = ({ isLoggedIn, profilePicture }) => {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/logout/', { method: 'POST' });
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="header">
      {isLoggedIn && (
        <div className="profile-picture" onClick={handleProfileClick}>
          <img src={profilePicture || placeholderImage} alt="Profile" />
        </div>
      )}
      <div className="logo">PennyPillar</div>
      <div className="hamburger" onClick={() => document.querySelector('.header').classList.toggle('show-nav')}>
        ☰
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/cashflow">Cash Flow</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/recurring">Recurring Payments</Link>
            <Link to="/challenge">Penny Challenge</Link>
            <Link to="/insights">Insights</Link>
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
    </header>
  );
};

export default Header;
