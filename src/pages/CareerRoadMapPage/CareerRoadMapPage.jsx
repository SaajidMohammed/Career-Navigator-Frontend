import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';
import './CareerRoadmapPage.css';

const CareerRoadmapPage = () => {
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
        const response = await axios.get(`http://localhost:5000/api/predictions/${id}`, config);
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
    <div className="roadmap-container">
      <h1 className="roadmap-title">Career Roadmap for {details.careerPath}</h1>
      <p className="roadmap-description">
        Here is a step-by-step plan to guide your journey.
      </p>
      <ol className="roadmap-list">
        {details.roadmap && details.roadmap.length > 0 ? (
          details.roadmap.map((step, index) => (
            <li key={index} className="roadmap-step">{step}</li>
          ))
        ) : (
          <p className="no-roadmap-message">No roadmap available for this prediction.</p>
        )}
      </ol>
    </div>
  );
};

export default CareerRoadmapPage;