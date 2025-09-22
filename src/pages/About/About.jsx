import React from 'react';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <div className="about-content">
        <h1 className="about-title">About Our Project</h1>
        <p className="about-description">
          The **AI-Based Career Path Navigator** is a tool designed to help students and professionals find their ideal career path. Our mission is to provide personalized guidance by analyzing your interests, academic records, and market trends.
        </p>
        <p className="about-description">
          We believe that with the right data and guidance, anyone can make an informed decision about their future. This platform leverages the power of artificial intelligence to identify skill gaps and provide a clear roadmap to success.
        </p>
        <div className="about-details">
          <h3>Our Technology</h3>
          <ul>
            <li>**Frontend:** ReactJS</li>
            <li>**Backend:** MERN Stack (MongoDB, Express.js, React, Node.js)</li>
            <li>**AI Services:** Python and Machine Learning Libraries</li>
          </ul>
        </div>
        <div className="about-details">
          <h3>Developed By</h3>
          <h5 className='team-name'>Team Anonymous</h5>
          <ol>
            <li>Mohammed Saajid K A</li>
            <li>Sarim Ahmed. N</li>
            <li>Zahan. R</li>
            <li>Hamid Asrar A H</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;