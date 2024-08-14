import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

import './SignInForm.css';
import axiosInstance from '../../axiosConfig';

const SignInPage = () => {
    const [username, setUsername] = useState(''); // Use username instead of email
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use axiosInstance for the login request
            const response = await axiosInstance.post('/login/', { username, password });
            
            // Store the token if login is successful
            localStorage.setItem('authToken', response.data.token);

            // Redirect to the home page 
            navigate('/');
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
        }
    };

    // const toggleNav = () => {
    //     const navLinks = document.querySelector('.header .nav-links');
    //     navLinks.classList.toggle('show-nav');
    // };

    return (
        <>
        <Header />
            <div className="main-content">
                <div className="form-container">
                    <div className="header-content">
                        <h3>Great to have you back! Your next financial milestone awaits.</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input
                                type="text" // Change to text
                                className="form-control"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                        <Link to="/signup">Don't have an account? Sign Up</Link>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default SignInPage;
