import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
// import axiosInstance from '../axiosConfig';


const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const authToken = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!authToken || !refreshToken) {
        console.error('No authentication tokens found');
        return;
      }
  
      // Make logout request with the refresh token
      await axios.post(
        'http://localhost:8000/api/logout/', 
        { refresh: refreshToken },
        { headers: { Authorization: `Bearer ${authToken}` } });
  
      // Clear tokens and user data from local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
  
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.detail || error.message);
    }
  };
  

  const isLoggedIn = localStorage.getItem('authToken');

  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo">PennyPillar</div>
      </div>
      <div className="hamburger" onClick={() => document.querySelector('.header').classList.toggle('show-nav')}>
        ☰
      </div>
      <nav className="nav-links">
        <>
          <Link to="/">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/cashflow">Cash Flow</Link>
              <Link to="/budget">Budget</Link>
              <Link to="/recurring">Recurring Payments</Link>
              <Link to="/challenge">Penny Challenge</Link>
              <Link to="/insights">Insights</Link>
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
        </>
      </nav>
    </header>
  );
};

export default Header;