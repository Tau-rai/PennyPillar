import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Homepage from './components/Homepage/Homepage';
import SignIn from './components/SignIn/SignInForm'; 
import SignUp from './components/SignUp/SignUpForm'; 
import Help from './components/Help/Helppage';
import AboutUs from './components/AboutUs/AboutUs';
import { Link } from 'react-router-dom';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signin" element={<SignIn />} />
	        <Route path="/signup" element={<SignUp/>} />
                <Route path="/about" element={<AboutUs/>} />
	        <Route path="/help" element={<Help/>} />
	    {/* Add other routes as necessary */}
            </Routes>
        </Router>
    );
};

export default App;
