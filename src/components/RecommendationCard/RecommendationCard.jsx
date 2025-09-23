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
      
      {/* --- Section for Skills to Learn --- */}
      <div className="skills-section">
        <h4>Skills to Develop</h4>
        <ul>
          {/* Safely checks if skillsToLearn exists and is an array before mapping */}
          {Array.isArray(recommendation.skillsToLearn) && recommendation.skillsToLearn.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* --- Section for Career Roadmap --- */}
      <div className="roadmap-section">
        <h4>Career Roadmap</h4>
        <ul>
          {/* Safely checks if roadmap exists and is an array before mapping */}
          {Array.isArray(recommendation.roadmap) && recommendation.roadmap.map((step, index) => (
            <li key={index}>{step}</li>
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
