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
          {Array.isArray(recommendation.skillsToLearn) && recommendation.skillsToLearn.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="roadmap-section">
        <h3>Roadmap</h3>
        <ul className="roadmap-list">
          {/* ✅ FIX 1: Add a check to ensure roadmap is an array before mapping */}
          {Array.isArray(recommendation.roadmap) && recommendation.roadmap.map((item, index) => (
            // ✅ FIX 2: Change "item.title" to just "item"
            <li key={index}>{item}</li>
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
