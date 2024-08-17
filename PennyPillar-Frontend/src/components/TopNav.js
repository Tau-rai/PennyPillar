import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './TopNav.css'; // Import the CSS for styling

const TopNav = () => {
  const toggleNav = () => {
    const nav = document.querySelector('.top-nav');
    nav.classList.toggle('show-nav');
  };

  const isAuthenticated = false; // Replace false with your authentication logic

  return (
    <header className="top-nav">
      <div className="logo">PennyPillar</div>
      <div className="hamburger" onClick={toggleNav}>☰</div>
      <nav className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/cashflow">Cash Flow/Budget</Link>
            <Link to="/recurring">Recurring Payments</Link>
            <Link to="/challenge">Penny Challenge</Link>
            <Link to="/logout">Logout</Link>
            <Link to="/profile">User Profile</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/help">Help</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/help">Help</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default TopNav;

