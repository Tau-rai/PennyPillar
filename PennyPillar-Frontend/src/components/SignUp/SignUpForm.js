// src/SignUpPage.js
import React,{ useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header';
import Footer from '../Footer';
import './SignUpForm.css';
import axiosInstance from '../../axiosConfig';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/signup/', { username, email, password, password2 });

            // Store the token if login is successful
            localStorage.setItem('authToken', response.data.token);

            // Redirect to the login page
            navigate('/signin');
            console.log("Registration successful");
        } catch (error) {
            console.error("Registration error", error.response ? error.response.data : error.message);
        }
    };
    // const toggleNav = () => {
    //     document.querySelector('.header').classList.toggle('show-nav');
    // };

    return (
        <>
            <Header />

            <div className="main-content mt-16 md:mt-0 flex items-center justify-center min-h-screen bg-gray-100">
                <div className="form-container bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="header-content bg-teal-800 text-white p-4 rounded-t-lg">
                        <h3 className="text-lg font-semibold">Discover the Easiest Way to Manage Your Finances. Sign Up!</h3>
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                            <input 
                            type="text" 
                            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" 
                            id="username" 
                            placeholder="Enter your username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input 
                            type="email" 
                            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" 
                            id="email" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                             required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                            <input 
                            type="password" 
                            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" 
                            id="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password2" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                            <input 
                            type="password" 
                            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" 
                            id="password2" 
                            placeholder="Confirm your password" 
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required />
                        </div>
                        <button type="submit" className="btn btn-primary w-full py-2 px-4 bg-teal-800 text-white font-semibold rounded-md shadow-sm hover:bg-teal-700">Sign Up</button>
                    </form>
                    <Link to="/signin" className="block mt-4 text-center text-teal-800 hover:underline">Already have an account? Log In</Link>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default SignUpPage;
