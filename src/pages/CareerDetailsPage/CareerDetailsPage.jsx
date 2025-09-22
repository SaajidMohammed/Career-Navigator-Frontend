import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';
import './CareerDetailsPage.css';

const CareerDetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(`https://career-navigator-api-rptb.onrender.com/api/predictions/${id}`, config);
        setDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch prediction details:', error);
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id, user, navigate]);

  if (isLoading) {
    return <div className="loading-container">Loading details...</div>;
  }

  if (!details) {
    return <div className="loading-container">Prediction not found.</div>;
  }

  return (
    <div className="career-details-container">
      <h1 className="details-title">Your Plan for becoming a {details.careerPath}</h1>
      
      <div className="details-section">
        <h3>Skill Gap Analysis</h3>
        <p className="section-description">Here are the skills you need to acquire to succeed in this career.</p>
        <div className="skill-gap-list">
          {details.skillsToLearn.map((skill, index) => (
            <div key={index} className="skill-item">
              <span className="skill-name">{skill}</span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar"
                  // You would set the progress dynamically if your backend provided it
                  style={{ width: `${Math.floor(Math.random() * 100)}%` }} 
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="details-section">
        <h3>Career Roadmap</h3>
        <p className="section-description">A step-by-step plan to guide your journey.</p>
        <ol className="roadmap-list">
          {details.roadmap.map((step, index) => (
            <li key={index} className="roadmap-step">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default CareerDetailsPage;
