import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Homepage from './components/Homepage/Homepage'; // Adjusted path without '.js'
import './components/Homepage/Homepage.css'; 
import SignIn from './components/SignIn/SignInForm'; 
import SignUp from './components/SignUp/SignUpForm'; 
import About from './components/Aboutus/AboutUs'; 
import Policy from './components/Policy/Policies';
import Help from './components/Help/Helppage';
import Challenge from './components/Challenge/Challenge';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/policy" element={<Policy/>} />
                <Route path="/help" element={<Help/>} />
                <Route path="/challenge" element={<Challenge/>} />
                
                {/* Add other routes as necessary */}
            </Routes>
        </Router>
    );
};

export default App;
