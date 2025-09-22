import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendationCard.css';

const RecommendationCard = ({ recommendation }) => {
  const navigate = useNavigate();

  return (
    <div className="recommendation-card">
      <h3 className="card-title">{recommendation.careerPath}</h3>
      <p className="card-description">{recommendation.description}</p>
      <div className="card-buttons">
        {/* Update the ID to '_id' */}
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