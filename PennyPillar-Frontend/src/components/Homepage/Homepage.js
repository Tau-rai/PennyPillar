import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Import your CSS file

// Define the Homepage component
const Homepage = () => {
  const setCurrentIndex = useState(0)[1];

  // Function to handle navigation toggle
  const toggleNav = () => {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('nav-open');
  };

  // Function to show the next carousel item
  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
  // };

  // Remove the unused prevSlide function
  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
  // };

  const isLoggedIn = true; // Replace with your login logic

  return (
    <div>
      <header className="header">
        <div className="logo">PennyPillar</div>
        <div className="hamburger" onClick={toggleNav}>☰</div>
        <nav className="nav-links">
          <a href="/">Home</a>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/cashflow">Cash Flow/Budget</Link>
              <Link to="/recurring">Recurring Payments</Link>
              <Link to="/challenge">Penny Challenge</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/logout" onClick={() => {
                fetch('/logout/', {
                  method: 'POST'
                })
                .then(response => {
                  if (response.ok) {
                    window.location.href = '/';
                  }
                })
                .catch(error => {
                  console.error('Logout failed:', error.message);
                });
              }}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/about">About Us</Link>
              <Link to="/help">Help</Link>
              <Link to="/contact">Contact</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Homepage;
