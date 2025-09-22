import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext.jsx';
import './Footer.css';

const Footer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate('/auth');
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            Career Navigator
          </Link>
          <p className="footer-tagline">Your path to a brighter future.</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <div className="footer-link" onClick={() => handleLinkClick('/about')}>About</div>
            </li>
            <li>
              <div className="footer-link" onClick={() => handleLinkClick('/predict-career')}>Predict Career</div>
            </li>
            <li>
              <div className="footer-link" onClick={() => handleLinkClick('/dashboard')}>Dashboard</div>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Connect With Us</h4>
          <div className="social-icons">
            <a href="https://github.com/SaajidMohammed" target='_blank' rel='noopener noreferrer'>
              <FaGithub />
            </a>
            <a href="https://x.com/MohammedSa87212" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/k-a-mohammed-saajid-4b31712ba/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/_.saajxd._/" target='_blank' rel='noopener noreferrer'>
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AI Career Navigator. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;