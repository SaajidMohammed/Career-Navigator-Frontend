import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';
import './Navbar.css';
import logo from '../../assets/Logo.png'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="" className='navbar-logo-img' />
          <h2>Career Navigator</h2>
        </Link>
      </div>

      <div className="navbar-center">
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          {user ? (
            <>
              <Link to="/predict-career" className="nav-link">Predict Career</Link>
              <Link to="/chat" className="nav-link">Chat</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button className="nav-link-btn" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <Link to="/auth" className="nav-link">Login</Link>
          )}
        </div>
      </div>

      <div className="navbar-right">
        <ThemeToggle />
        {/* Hamburger icon now lives within navbar-right, but only displayed on mobile */}
        <button className="hamburger-icon" onClick={toggleMenu}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </button>
      </div>

      {/* Mobile-specific links, toggled by hamburger */}
      <div className={`navbar-mobile-links ${isMenuOpen ? 'open' : ''}`}>
        <div className="navbar-links-mobile">
          <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
          <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
          {user ? (
            <>
              <Link to="/predict-career" className="nav-link" onClick={toggleMenu}>Predict Career</Link>
              <Link to="/chat" className="nav-link" onClick={toggleMenu}>Chat</Link>
              <Link to="/dashboard" className="nav-link" onClick={toggleMenu}>Dashboard</Link>
              <button className="nav-link-btn" onClick={() => { onLogout(); toggleMenu(); }}>Logout</button>
            </>
          ) : (
            <Link to="/auth" className="nav-link" onClick={toggleMenu}>Login</Link>
          )}
        </div>
        <div className="navbar-right-mobile">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;