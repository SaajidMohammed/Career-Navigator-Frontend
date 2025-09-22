import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';
import './SkillGapPage.css';

const SkillGapPage = () => {
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
    <div className="skill-gap-container">
      <h1 className="skill-gap-title">Skill Gap Analysis for {details.careerPath}</h1>
      <p className="skill-gap-description">
        Based on your profile, here are the skills you need to acquire to excel in this career path.
      </p>
      <ul className="skill-list">
        {details.skillsToLearn.map((skill, index) => (
          <li key={index} className="skill-item">{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillGapPage;
