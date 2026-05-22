import React from 'react';
import '../home/Homepage.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* About */}
          <div>
            <h3 className="footer-title">About</h3>
            <ul className="footer-links">
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li><a href="#">Study Materials</a></li>
              <li><a href="#">Career Resources</a></li>
              <li><a href="#">Skill Development</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="footer-title">Connect</h3>
            <ul className="footer-links">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="mb-2">&copy; 2025 <span>Student Resources Portal</span>. All rights reserved.</p>
          <p>Crafted with 💡 & passion for learners.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
