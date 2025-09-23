import React from 'react';
import { Link } from 'react-router-dom';
import './RecommendationCard.css';

const RecommendationCard = ({ recommendation }) => {
  return (
    <div className="recommendation-card">
      <h2>{recommendation.careerPath}</h2>
      <p>{recommendation.description}</p>
      <div className="skills-section">
        <h3>Skills to Learn</h3>
        <ul className="skills-list">
          {/* ✅ FIX: Changed recommendation.skills to recommendation.skillsToLearn */}
          {recommendation.skillsToLearn.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="card-actions">
        <Link to={`/roadmap/${recommendation._id}`} className="btn-roadmap">View Roadmap</Link>
        <Link to={`/skill-gap/${recommendation._id}`} className="btn-skill-gap">Analyze Skill Gap</Link>
      </div>
    </div>
  );
};

export default RecommendationCard;
