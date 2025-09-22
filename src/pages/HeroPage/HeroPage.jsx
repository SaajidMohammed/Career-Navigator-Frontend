import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import './HeroPage.css';
import heroVideo from '../../assets/Video_Generation_With_Text.mp4'; // Import your video file

const HeroPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGetStarted = () => {
    if (user) {
      navigate('/predict-career');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="hero-page-container">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1 className="hero-title">
          AI Career Navigator
        </h1>
        <p className="hero-subtitle">
          Your Personalized Career Path, Powered by AI.
        </p>
        <button
          className="hero-button"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroPage;