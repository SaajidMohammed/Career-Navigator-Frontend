import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendationCard.css';

const RecommendationCard = ({ recommendation }) => {
  const navigate = useNavigate();

  // This check prevents the component from crashing if recommendation data is missing.
  if (!recommendation) {
    return null; 
  }

  return (
    <div className="recommendation-card">
      <h3 className="card-title">{recommendation.careerPath}</h3>
      <p className="card-description">{recommendation.description}</p>
      
      <div className="skills-section">
        <h4>Skills to Develop</h4>
        <ul>
          {/* ✅ FIX: Changed recommendation.skills to recommendation.skillsToLearn */}
          {Array.isArray(recommendation.skillsToLearn) && recommendation.skillsToLearn.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="card-buttons">
        <button onClick={() => navigate(`/skill-gap/${recommendation._id}`)} className="details-button">
          View Skill Gap
        </button>
        <button onClick={() => navigate(`/career-roadmap/${recommendation._id}`)} className="details-button">
          View Roadmap
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;
