import React from 'react';
import { FaLock, FaShieldAlt, FaFileAlt, FaUsers } from 'react-icons/fa';
import './Policies.css';

const Policies = () => {
  return (
    <main className="content">
      <div className="container">
        <h1>Our Policies</h1>
        <p>At PennyPillar, we are committed to providing a secure, user-friendly, and transparent experience. Below are our key policies that ensure our commitment to your financial well-being.</p>

        <div className="policy-section">
          <FaLock className="icon" />
          <h2>Privacy Policy</h2>
          <p>We prioritize your privacy and ensure that your personal and financial information is protected through advanced encryption techniques and secure storage practices.</p>
        </div>

        <div className="policy-section">
          <FaShieldAlt className="icon" />
          <h2>Security Measures</h2>
          <p>Our platform employs robust security measures to safeguard your data from unauthorized access and potential breaches. We continually update our security protocols to stay ahead of emerging threats.</p>
        </div>

        <div className="policy-section">
          <FaFileAlt className="icon" />
          <h2>Terms of Service</h2>
          <p>Our terms of service outline the guidelines and responsibilities for using our platform. By using PennyPillar, you agree to adhere to these terms, ensuring a positive experience for all users.</p>
        </div>

        <div className="policy-section">
          <FaUsers className="icon" />
          <h2>Customer Support</h2>
          <p>Our customer support team is dedicated to assisting you with any questions or concerns you may have. We offer multiple channels for support to ensure your queries are addressed promptly.</p>
        </div>
      </div>
    </main>
  );
}

export default Policies;
