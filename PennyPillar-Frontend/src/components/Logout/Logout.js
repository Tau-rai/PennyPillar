import React from 'react';
import axiosInstance from '../../axiosConfig';
import Cookies from 'js-cookie'; // Import js-cookie to handle CSRF token

const Logout = () => {
    const handleLogout = async () => {
        try {
            // Get the CSRF token from cookies
            const csrfToken = Cookies.get('csrftoken');
            
            // Perform the POST request with CSRF token in headers
            await axiosInstance.post('/api/logout/', {}, {
                headers: {
                    'X-CSRFToken': csrfToken, // Add CSRF token to the request headers
                }
            });
            
            // Perform any additional logout logic here, such as redirecting the user
            console.log('Logout successful');
            // Optionally redirect or update the UI after logout
            
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
