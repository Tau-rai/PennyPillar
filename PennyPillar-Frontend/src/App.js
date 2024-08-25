import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Homepage from './components/Homepage/Homepage';
import SignIn from './components/SignIn/SignInForm'; 
import SignUp from './components/SignUp/SignUpForm'; 
import Help from './components/Help/Helppage';
import AboutUs from './components/AboutUs/AboutUs';
import Policy from './components/Policy/Policy';
import Challenge from './components/Challenge/Challenge';
import Recurring from './components/Recurring/Recurring';
import Dashboard from './components/Dashboard/Dashboard';
import Logout from './components/Logout/Logout';
import Profile from './components/Profile/Profile';
import Cashflow from './components/Cashflow/Cashflow';
import Budget from './components/Budget/Budget';
import InsightsPage from './components/Insights/Insights'



const App = () => {
    return (
        
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/help" element={<Help />} />
                <Route path="/privacy-policy" element={<Policy />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/recurring" element={<Recurring />} />
                <Route path="/challenge" element={<Challenge />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/cashflow" element={<Cashflow />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
        
    );
};

export default App;
