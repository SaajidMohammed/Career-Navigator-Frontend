import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboardpage.css';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const predictionData = location.state?.predictionData;

  const handleNewPrediction = () => {
    navigate('/predict-career');
  };

  if (!predictionData) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2 className="dashboard-heading">No Prediction Found</h2>
          <p>Please go back to the prediction page to get your career analysis.</p>
          <button onClick={handleNewPrediction} className="dashboard-button">
            New Prediction
          </button>
        </div>
      </div>
    );
  }

  const {
    careerPath = 'Not specified',
    description = 'No description available.',
    skillGap = [],
    roadmap = [],
  } = predictionData;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-heading">Your Career Analysis</h2>

        <div className="result-section">
          <h3 className="section-heading">Predicted Career Path:</h3>
          <p>{careerPath}</p>
          <p>{description}</p>
        </div>

        <div className="result-section">
          <h3 className="section-heading">Identified Skill Gaps:</h3>
          {Array.isArray(skillGap) && skillGap.length > 0 ? (
            <ul className="list">
              {skillGap.map((gap, index) => (
                <li key={index} className="list-item">{gap}</li>
              ))}
            </ul>
          ) : (
            <p>No skill gaps identified.</p>
          )}
        </div>

        <div className="result-section">
          <h3 className="section-heading">Your Recommended Roadmap:</h3>
          {Array.isArray(roadmap) && roadmap.length > 0 ? (
            <ol className="list">
              {roadmap.map((step, index) => (
                <li key={index} className="list-item">{step}</li>
              ))}
            </ol>
          ) : (
            <p>No roadmap steps provided.</p>
          )}
        </div>

        <div className="dashboard-actions">
          <button onClick={handleNewPrediction} className="dashboard-button">
            New Prediction
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;