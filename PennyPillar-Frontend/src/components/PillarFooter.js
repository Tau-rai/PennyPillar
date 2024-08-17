import React from 'react';
import './PillarFooter.css';

const PillarFooter = () => {
  return (
    <footer className="pillar-footer">
      <div className="pillar-footer-content">
        <p>&copy; {new Date().getFullYear()} Penny Pillar. All rights reserved.</p>
        <div className="pillar-footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/contact-us">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default PillarFooter;

