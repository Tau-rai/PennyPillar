import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../PillarFooter';
import './SignInForm.css';
import axiosInstance from '../../axiosConfig';

const SignInPage = () => {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = false;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please fill in all the required fields.');
            return;
        }

        try {
            const response = await axiosInstance.post('/token/', { username, password }); 
            
            // Store both access and refresh tokens
            localStorage.setItem('authToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            localStorage.setItem('user', JSON.stringify({ username }));

            // Redirect to the home page
            navigate('/');
        } catch (error) {
            setError("Login failed. Incorrect username or password.");
            console.error("Login error:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <div className="sign-content">
                <div className="form-container">
                    <div className="header-content">
                        <h3>Great to have you back! Your next financial milestone awaits.</h3>
                    </div>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input
                                type="text" 
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
